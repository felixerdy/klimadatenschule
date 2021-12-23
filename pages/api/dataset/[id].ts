import prisma from '../../../lib/prisma';
import jwt from 'next-auth/jwt';
import { NextApiRequest, NextApiResponse } from 'next';
import csv from 'csvtojson';
import axios from 'axios';
import { utils, writeFile } from 'xlsx';
import { mobilityToCO2, paperToCO2, treeToCO2 } from '../../../tools';
import { PaperType } from '../../../types/paper';
import { MobilityType } from '../../../types/mobility';

const convertJsonToCsv = async json => {
  const replacer = (key, value) => (value === null ? '' : value);
  const header = Object.keys(json[0]);
  const csv = [
    header.join(','), // header row first
    ...json.map(row =>
      header
        .map(fieldName => JSON.stringify(row[fieldName], replacer))
        .join(',')
    )
  ].join('\r\n');

  return csv;
};

const buildResponse = async (
  res: NextApiResponse,
  data,
  format: string,
  co2Values?: number[],
  isPaper?: boolean
) => {
  let resData;

  if (co2Values && co2Values.length > 0) {
    resData = data.map((e, i) => {
      const obj = {
        ...e,
        [isPaper ? 'co2_in_g' : 'co2_in_kg']: co2Values[i],
        school: e.user.organisation?.name || 'null'
      };

      delete obj.user;

      return obj;
    });
  } else {
    resData = data.map(e => {
      const obj = {
        ...e,
        school: e.user.organisation?.name || 'null'
      };

      delete obj.user;

      return obj;
    });
  }

  // https://github.com/vercel/next.js/discussions/15453
  res.setHeader(
    'content-disposition',
    `attachment; filename=nutrition.${format}`
  );
  switch (format) {
    case 'csv':
      res.setHeader('Content-Type', 'text/csv');
      const csv: string = await convertJsonToCsv(resData);
      res.send(csv);
      break;
    case 'json':
      res.setHeader('Content-Type', 'application/json');
      res.send(resData);
      break;
    case 'xlsx':
      res.setHeader('Content-Type', 'application/json');
      res.send(resData);
    // console.log();
    // const header = Object.keys(resData[0]);
    // const wb = utils.book_new();
    // const ws = utils.json_to_sheet(resData, { header });
    // utils.book_append_sheet(wb, ws);
    // writeFile(wb, 'out.xlsb');
    // res.setHeader('Content-Type', 'application/json');
    // res.send(resData);
    default:
      break;
  }
};

// GET /api/dataset/:id?format=:format
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const datasetId = req.query.id as string;
  const format = req.query.format as string;

  const user = {
    select: {
      organisation: {
        select: {
          name: true
        }
      }
    }
  };

  if (req.method === 'GET') {
    switch (datasetId) {
      case 'nutrition':
        const nutritionData = await prisma.mealRecord.findMany({
          select: {
            name: true,
            co2: true,
            count: true,
            createdAt: true,
            updatedAt: true,
            timestamp: true,
            user
          }
        });
        const nutritionDataRename = nutritionData.map(n => {
          return {
            name: n.name,
            co2_in_kg: n.co2,
            count: n.count,
            createdAt: n.createdAt,
            updatedAt: n.updatedAt,
            timestamp: n.timestamp,
            user: n.user
          };
        });
        return buildResponse(res, nutritionDataRename, format);
      case 'mobility':
        const mobilityData = await prisma.mobilityRecord.findMany({
          select: {
            pkw: true,
            bahn: true,
            bus: true,
            ubahn: true,
            fahrrad: true,
            fuss: true,
            createdAt: true,
            updatedAt: true,
            timestamp: true,
            user
          }
        });

        const co2ValuesMobility = mobilityData.map(p =>
          Object.keys(p)
            .filter(
              k =>
                k !== 'createdAt' &&
                k !== 'updatedAt' &&
                k !== 'user' &&
                k !== 'timestamp'
            )
            .reduce<number>(
              (prev, cur) => prev + mobilityToCO2(p[cur], cur as MobilityType),
              0
            )
        );

        return buildResponse(res, mobilityData, format, co2ValuesMobility);
      case 'tree':
        const treeData = await prisma.treeRecord.findMany({
          select: {
            circumference: true,
            height: true,
            latitude: true,
            longitude: true,
            createdAt: true,
            updatedAt: true,
            user
          }
        });

        const treeDataRename = treeData.map(t => {
          return {
            circumference_in_m: t.circumference,
            height_in_m: t.height,
            latitude: t.latitude,
            longitude: t.longitude,
            createdAt: t.createdAt,
            updatedAt: t.updatedAt,
            user: t.user
          };
        });

        const treeDataCo2 = treeDataRename.map(t => ({
          ...t,
          co2_in_kg: treeToCO2(t.circumference_in_m, t.height_in_m)
        }));

        return buildResponse(res, treeDataCo2, format);
      case 'paper':
        const paperData = await prisma.paperRecord.findMany({
          select: {
            a4: true,
            a5: true,
            a6: true,
            collegeblock: true,
            zeichenmappe: true,
            kopierpapier: true,
            createdAt: true,
            updatedAt: true,
            a4_recycling: true,
            a5_recycling: true,
            a6_recycling: true,
            collegeblock_recycling: true,
            zeichenmappe_recycling: true,
            kopierpapier_recycling: true,
            user
          }
        });

        const co2ValuesPaper = paperData.map(p =>
          Object.keys(p)
            .filter(k => k !== 'createdAt' && k !== 'updatedAt' && k !== 'user')
            .reduce<number>(
              (prev, cur) => prev + paperToCO2(p[cur], cur as PaperType),
              0
            )
        );

        return buildResponse(res, paperData, format, co2ValuesPaper, true);
      default:
        break;
    }
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
