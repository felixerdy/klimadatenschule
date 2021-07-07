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
  res.setHeader(
    'content-disposition',
    `attachment; filename=nutrition.${format}`
  );
  switch (format) {
    case 'csv':
      res.setHeader('Content-Type', 'text/csv');
      const csv: string = await convertJsonToCsv(data);
      res.send(csv);
      break;
    case 'json':
      res.setHeader('Content-Type', 'application/json');
      res.send(data);
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

  if (req.method === 'GET') {
    // https://github.com/vercel/next.js/discussions/15453
    res.setHeader('content-disposition', 'attachment; filename=nutrition.csv');
    res.setHeader('Content-Type', 'text/csv');

    switch (datasetId) {
      case 'nutrition':
        const nutritionData = await prisma.mealRecord.findMany();
        return buildResponse(res, nutritionData, format);
      case 'mobility':
        const mobilityData = await prisma.mobilityRecord.findMany();
        return buildResponse(res, mobilityData, format);
      default:
        break;
    }
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
