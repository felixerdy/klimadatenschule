import prisma from '../../../lib/prisma';
import jwt from 'next-auth/jwt';
import formidable from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';

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
        const timestamp = new Date(fields.timestamp);
        const result = await prisma.mobilityRecord.create({
          data: {
            pkw: Number(fields.pkw),
            bahn: Number(fields.bahn),
            bus: Number(fields.bus),
            ubahn: Number(fields.ubahn),
            fuss: Number(fields.fuss),
            fahrrad: Number(fields.fahrrad),
            timestamp,
            user: { connect: { email: token?.email } }
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
    res.status(401).send('Unauthorized');
  }
}
