import { env } from "@/env.mjs";
import { S3Client } from "@aws-sdk/client-s3";

const endpoint = env.S3_ENDPOINT;

export const s3Client = endpoint
  ? new S3Client({
      region: "us-east-1",
      endpoint,
      forcePathStyle: true,
    })
  : new S3Client({
      region: env.AWS_S3_REGION,
    });
