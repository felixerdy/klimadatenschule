import prisma from '../../../lib/prisma';
import jwt from 'next-auth/jwt';
import { NextApiRequest, NextApiResponse } from 'next';

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
