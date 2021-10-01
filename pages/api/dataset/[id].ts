import prisma from '../../../lib/prisma';
import jwt from 'next-auth/jwt';
import { NextApiRequest, NextApiResponse } from 'next';
import csv from 'csvtojson';
import axios from 'axios';

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

const buildResponse = async (res: NextApiResponse, data, format: string) => {
  const resData = data.map(e => {
    const obj = {
      ...e,
      school: e.user.organisation?.name || 'null'
    };

    delete obj.user;

    return obj;
  });

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
            createdAt: true,
            updatedAt: true,
            user
          }
        });
        return buildResponse(res, nutritionData, format);
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
            user
          }
        });
        return buildResponse(res, mobilityData, format);
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
        return buildResponse(res, treeData, format);
      case 'paper':
        const paperData = await prisma.paperRecord.findMany({
          select: {
            a4: true,
            a5: true,
            a6: true,
            collegeblock: true,
            zeichenmappe: true,
            createdAt: true,
            updatedAt: true,
            user
          }
        });
        return buildResponse(res, paperData, format);
      default:
        break;
    }
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
