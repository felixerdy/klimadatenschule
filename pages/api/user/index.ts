import prisma from '../../../lib/prisma';
import jwt from 'next-auth/jwt';
import { NextApiRequest, NextApiResponse } from 'next';
import { Role } from '@prisma/client';
import checkRole from '../../../middleware/role';

export const config = {
  api: {
    bodyParser: true
  }
};

const secret = process.env.SECRET;

// POST /api/user
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return;
  }

  const token = await jwt.getToken({ req, secret });

  // Check user role using middleware
  // TODO: catch error
  await checkRole(req, Role.ADMIN);

  if (token) {
    try {
      const { id, role } = JSON.parse(req.body);
      const result = await prisma.user.update({
        where: {
          id
        },
        data: {
          role: role
        }
      });

      res.status(201).json(result);
    } catch (e) {
      res.status(500).json({
        error: e
      });
    }
  } else {
    // Not authorized
    res.status(405);
  }
}
