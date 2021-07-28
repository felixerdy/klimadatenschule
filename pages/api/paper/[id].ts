import prisma from '../../../lib/prisma';
import jwt from 'next-auth/jwt';
import { NextApiRequest, NextApiResponse } from 'next';

const secret = process.env.SECRET;

// DELETE /api/paper/:id
// POST /api/paper/:id
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string;
  const { a4, a5, a6, collegeblock, zeichenmappe } = JSON.parse(req.body);
  const token = await jwt.getToken({ req, secret });

  if (token) {
    if (id && req.method === 'DELETE') {
      try {
        const result = await prisma.paperRecord.delete({
          where: {
            id
          }
        });

        res.status(201).json(result);
      } catch (error) {
        res.status(500).json({
          error
        });
      }
    } else if (id && req.method === 'POST') {
      try {
        const result = await prisma.paperRecord.update({
          where: {
            id
          },
          data: {
            a4: Number(a4),
            a5: Number(a5),
            a6: Number(a6),
            collegeblock: Number(collegeblock),
            zeichenmappe: Number(zeichenmappe)
          }
        });

        res.status(201).json(result);
      } catch (error) {
        res.status(500).json({
          error
        });
      }
    } else {
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`
      );
    }
  } else {
    res.status(401).send('Unauthorized');
  }
}
