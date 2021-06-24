import prisma from '../../../lib/prisma';
import jwt from 'next-auth/jwt';
import formidable from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';

type Meal = {
  name: string;
  co2: number;
};

export const config = {
  api: {
    bodyParser: false
  }
};

const secret = process.env.SECRET;

// POST /api/meal
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await jwt.getToken({ req, secret });

  if (token) {
    try {
      const form = new formidable.IncomingForm();
      form.parse(req, async (err, fields, files) => {
        const meals: Meal[] = Object.keys(fields)
          .filter(f => f.includes('_name'))
          .map(f => {
            const index = parseInt(f.toString().match(/\d+/g)[0]);
            return {
              name: fields[f],
              co2: Number(fields[`meal_${index}_co2`])
            };
          });

        if (meals.length > 10) {
          res.status(400).send('Too many records');
          return;
        }

        const results = await Promise.all(
          meals.map(m =>
            prisma.mealRecord.create({
              data: {
                ...m,
                user: { connect: { email: token?.email } }
              }
            })
          )
        );

        console.log(results);

        res.status(201).json(results);
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
