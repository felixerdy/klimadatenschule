import { getSession } from 'next-auth/client';
import prisma from '../../../lib/prisma';
import jwt from 'next-auth/jwt';

const secret = process.env.SECRET;

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { title, content } = req.body;

  const token = await jwt.getToken({ req, secret });

  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      author: { connect: { email: token?.email } }
    }
  });
  res.json(result);
}
