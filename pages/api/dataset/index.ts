import prisma from '../../../lib/prisma';
import jwt from 'next-auth/jwt';
import formidable from 'formidable';
import { s3 } from '../../../lib/aws';
import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false
  }
};

const secret = process.env.SECRET;

// POST /api/dataset
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await jwt.getToken({ req, secret });

  if (token?.email) {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (files.file.type !== 'text/csv') {
        res.status(422);
        return;
      }

      const file = fs.readFileSync(files.file.path);

      var params: AWS.S3.PutObjectRequest = {
        Bucket: process.env.BUCKET_NAME,
        Key: files.file.name,
        Body: file,
        ACL: 'public-read'
      };

      const uploadPromise = new Promise((resolve, reject) => {
        s3.putObject(params, function (err, data) {
          if (err) {
            console.error('S3 upload err', err, err.stack);
            reject(err);
          } else {
            console.log('S3 upload successful', data);
            resolve(data);
          }
        });
      });

      const uploadResult = await uploadPromise;

      const result = await prisma.dataset.create({
        data: {
          filepath: files.file.name,
          title: fields.title,
          description: fields.description,
          publisher: { connect: { email: token?.email } }
        }
      });
      res.json(result);
    });
  } else {
    res.status(405);
  }
}
