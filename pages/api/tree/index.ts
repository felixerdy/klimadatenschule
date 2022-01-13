import prisma from '../../../lib/prisma';
import jwt from 'next-auth/jwt';
import formidable from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
import { TreeRecord } from '@prisma/client';
import { treeToCO2 } from '../../../tools';

type Tree = {
  circumference: number;
  height: number;
  latitude: number;
  longitude: number;
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
        console.log(fields);

        let processedIndexes = [];
        const trees: Tree[] = Object.keys(fields)
          .map(f => {
            const index = parseInt(f.toString().match(/\d+/g)[0]);

            if (!processedIndexes.includes(index)) {
              processedIndexes.push(index);
              return {
                circumference: Number(fields[`tree_${index}_circumference`]),
                height: Number(fields[`tree_${index}_height`]),
                latitude: Number(fields[`tree_${index}_latitude`]),
                longitude: Number(fields[`tree_${index}_longitude`])
              };
            }
          })
          .filter(t => !!t); // filter undefined

        if (trees.length > 100) {
          res.status(400).send('Too many records');
          return;
        }

        const results = await Promise.all(
          trees.map(tree =>
            prisma.treeRecord.create({
              data: {
                ...tree,
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
