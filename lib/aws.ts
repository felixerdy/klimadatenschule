import AWS from 'aws-sdk';

const spacesEndpoint = new AWS.Endpoint(process.env.AWS_ENDPOINT);
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId:
    process.env.AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID_ALT,
  secretAccessKey: process.env.AWS_SECRET_KEY || process.env.AWS_SECRET_KEY_ALT
});

export { s3 };
