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

  if (token) {
    try {
      if ('role' in req.body) {
        // Check user role using middleware
        await checkRole(req, Role.ADMIN);

        const { id, role } = req.body;
        const result = await prisma.user.update({
          where: {
            id
          },
          data: {
            role: role
          }
        });
        res.status(201).json(result);
      }

      if ('organisation' in req.body) {
        if (req.body.organisation === 'null') {
          const result = await prisma.user.update({
            data: {
              name: req.body.name,
              organisationId: null
            },
            where: { email: token.email }
          });
          console.log(result);
          res.status(201).json(result);
        } else {
          const organisation = await prisma.organisation.findUnique({
            where: { id: req.body.organisation }
          });

          const result = await prisma.user.update({
            data: {
              name: req.body.name,
              organisationId: organisation.id
            },
            where: { email: token.email }
          });
          res.status(201).json(result);
        }
      }
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
