import prisma from '../../../lib/prisma';
import jwt from 'next-auth/jwt';
import { NextApiRequest, NextApiResponse } from 'next';

const secret = process.env.SECRET;

// DELETE /api/meal/:id
// POST /api/meal/:id
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string;
  const { name, co2, count } = JSON.parse(req.body);
  const token = await jwt.getToken({ req, secret });

  if (token) {
    if (id && req.method === 'DELETE') {
      try {
        const result = await prisma.mealRecord.delete({
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
        const result = await prisma.mealRecord.update({
          where: {
            id
          },
          data: {
            name: name,
            co2: Number(co2),
            count: Number(count)
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
