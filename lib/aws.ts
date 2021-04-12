import AWS from 'aws-sdk';

const spacesEndpoint = new AWS.Endpoint(process.env.KDS_AWS_ENDPOINT);
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.KDS_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.KDS_AWS_SECRET_KEY
});

export { s3 };
