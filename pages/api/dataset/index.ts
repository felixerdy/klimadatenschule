import prisma from '../../../lib/prisma';
import jwt from 'next-auth/jwt';
import formidable from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
import csv from 'csvtojson';

export const config = {
  api: {
    bodyParser: false
  }
};

const secret = process.env.SECRET;

// POST /api/dataset
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await jwt.getToken({ req, secret });

  if (token) {
    try {
      const form = new formidable.IncomingForm();
      form.parse(req, async (err, fields, files) => {
        if (files.file.type !== 'text/csv') {
          res.status(422);
          return;
        }

        const data = await csv({
          delimiter: 'auto'
        }).fromFile(files.file.path);

        const result = await prisma.dataset.create({
          data: {
            filepath: files.file.name,
            title: fields.title,
            description: fields.description,
            filetype: files.file.type || '',
            data,
            publisher: { connect: { email: token?.email } }
          }
        });
        res.status(201).json(result);
      });
    } catch (e) {
      res.status(500).json({
        error: e
      });
    }
  } else {
    res.status(405);
  }
}
