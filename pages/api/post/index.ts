import { getSession } from 'next-auth/client';
import prisma from '../../../lib/prisma';
import jwt from 'next-auth/jwt';

const secret = process.env.SECRET;

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { type, name } = req.body;

  const token = await jwt.getToken({ req, secret });

  const result = await prisma.organisation.create({
    data: {
      name: name,
      type: type
    }
  });
  res.json(result);
}
