import { S3Client } from "@aws-sdk/client-s3";

export const s3Client = new S3Client({
  region: "us-east-1",
  endpoint: "http://localhost:9000",
  forcePathStyle: true,
});
