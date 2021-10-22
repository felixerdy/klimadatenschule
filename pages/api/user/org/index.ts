import prisma from '../../../../lib/prisma';
import jwt from 'next-auth/jwt';
import { NextApiRequest, NextApiResponse } from 'next';

const secret = process.env.SECRET;

// GET /api/user/org
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return;
  }

  const token = await jwt.getToken({ req, secret });

  if (token) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          email: token.email
        }
      });

      if (user.organisationId && user.organisationId != '') {
        const result = await prisma.organisation.findFirst({
          where: {
            id: user.organisationId
          },
          select: {
            name: true,
            id: true
          }
        });

        res.status(201).json(result);
      } else {
        res.status(404).json({
          error: 'Not found'
        });
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
