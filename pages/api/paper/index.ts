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

// POST /api/paper
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await jwt.getToken({ req, secret });

  if (token) {
    try {
      const form = new formidable.IncomingForm();
      form.parse(req, async (err, fields, files) => {
        const result = await prisma.paperRecord.create({
          data: {
            a4: Number(fields.a4),
            a5: Number(fields.a5),
            a6: Number(fields.a6),
            collegeblock: Number(fields.collegeblock),
            zeichenmappe: Number(fields.zeichenmappe),
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
