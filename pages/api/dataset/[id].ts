import prisma from '../../../lib/prisma';
import jwt from 'next-auth/jwt';
import { NextApiRequest, NextApiResponse } from 'next';
import csv from 'csvtojson';
import axios from 'axios';

const secret = process.env.SECRET;

// GET /api/dataset/:id
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const datasetId = req.query.id as string;

  if (req.method === 'GET') {
    const token = await jwt.getToken({ req, secret });

    if (token) {
      // Signed in

      // Get Dataset
      const dataset = await prisma.dataset.findUnique({
        where: { id: datasetId }
      });

      if (dataset) {
        const file = await axios.get(
          `${process.env.BUCKET_BASEURL}${dataset.filepath}`
        );
        const csvAsJson = await csv().fromString(file.data);
        res.json(csvAsJson);
      } else {
        res.status(404);
      }
    }
  }
  if (req.method === 'DELETE') {
    const token = await jwt.getToken({ req, secret });

    if (token) {
      // Signed in

      // Get User
      const user = await prisma.user.findUnique({
        where: { email: token.email }
      });

      // Get post to delete
      const dataset = await prisma.dataset.findUnique({
        where: { id: datasetId }
      });

      // user is author of post
      if (user && user.id === dataset.publisherId) {
        await prisma.dataset.delete({
          where: { id: datasetId }
        });
        res.json(dataset);
      } else {
        // Not allowed
        res.status(405);
      }
    } else {
      // Not Signed in
      res.status(401);
    }
    res.end();
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
