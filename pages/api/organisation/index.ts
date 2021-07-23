import prisma from '../../../lib/prisma';
import jwt from 'next-auth/jwt';
import formidable from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
import { Role, TreeRecord } from '@prisma/client';

// export const config = {
//   api: {
//     bodyParser: false
//   }
// };

const secret = process.env.SECRET;

// POST /api/organisation
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await jwt.getToken({ req, secret });
  const { name, type } = JSON.parse(req.body);

  console.log(req.body);

  if (token) {
    const user = await prisma.user.findUnique({
      where: {
        email: token.email
      }
    });
    if (user.role !== Role.ADMIN) {
      res.status(401).send('Unauthorized');
      return;
    }

    try {
      console.log(name, type);
      const result = await prisma.organisation.create({
        data: {
          name: name,
          type: type
        }
      });
      res.status(201).json(result);
    } catch (e) {
      console.log(e);
      res.status(500).json({
        error: e
      });
    }
  } else {
    res.status(401).send('Unauthorized');
  }
}