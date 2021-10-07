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
        const {
          a4,
          a5,
          a6,
          collegeblock,
          zeichenmappe,
          kopierpapier,
          a4_recycling,
          a5_recycling,
          a6_recycling,
          collegeblock_recycling,
          zeichenmappe_recycling,
          kopierpapier_recycling
        } = JSON.parse(req.body);
        const result = await prisma.paperRecord.update({
          where: {
            id
          },
          data: {
            a4: Number(a4),
            a5: Number(a5),
            a6: Number(a6),
            collegeblock: Number(collegeblock),
            zeichenmappe: Number(zeichenmappe),
            kopierpapier: Number(kopierpapier),
            a4_recycling: Number(a4_recycling),
            a5_recycling: Number(a5_recycling),
            a6_recycling: Number(a6_recycling),
            collegeblock_recycling: Number(collegeblock_recycling),
            zeichenmappe_recycling: Number(zeichenmappe_recycling),
            kopierpapier_recycling: Number(kopierpapier_recycling)
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
