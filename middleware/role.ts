import prisma from '../lib/prisma';
import jwt from 'next-auth/jwt';
import { Role } from '@prisma/client';
import { NextApiRequest } from 'next';

const secret = process.env.SECRET;

export default async function checkRole(req: NextApiRequest, role: Role) {
  const token = await jwt.getToken({ req, secret });
  // Get user and check role
  const user = await prisma.user.findUnique({
    where: {
      email: token.email
    }
  });
  if (user.role !== role) {
    throw new Error('Unathorized');
  }

  return null;
}
