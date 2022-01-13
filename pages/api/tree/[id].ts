import prisma from '../../../lib/prisma';
import jwt from 'next-auth/jwt';
import { NextApiRequest, NextApiResponse } from 'next';
import { treeToCO2 } from '../../../tools';

const secret = process.env.SECRET;

// DELETE /api/tree/:id
// POST /api/tree/:id
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string;
  const token = await jwt.getToken({ req, secret });

  if (token) {
    if (id && req.method === 'DELETE') {
      try {
        const result = await prisma.treeRecord.delete({
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
        const { circumference, height } = JSON.parse(req.body);
        const result = await prisma.treeRecord.update({
          where: {
            id
          },
          data: {
            updatedAt: new Date(),
            circumference: Number(circumference),
            height: Number(height)
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
