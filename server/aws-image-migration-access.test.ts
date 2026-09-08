import { ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";
import { describe, expect, it } from "vitest";

const bucket = "edwardsamps";
const region = "us-east-2";

describe("Edwards image-migration S3 access", () => {
  it("lists the Edwards image bucket without exposing credentials or object data", async () => {
    expect(process.env.AWS_ACCESS_KEY_ID).toBeTruthy();
    expect(process.env.AWS_SECRET_ACCESS_KEY).toBeTruthy();

    const client = new S3Client({ region });
    const response = await client.send(new ListObjectsV2Command({ Bucket: bucket, MaxKeys: 1 }));

    expect(response.$metadata.httpStatusCode).toBe(200);
  }, 30_000);
});
