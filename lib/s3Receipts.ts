import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

const { AWS_S3_REGION, AWS_S3_ACCESS_KEY_ID, AWS_S3_SECRET_ACCESS_KEY, AWS_S3_BUCKET_NAME } = process.env;

const s3Client = new S3Client({
  region: AWS_S3_REGION || "",
  credentials: {
    accessKeyId: AWS_S3_ACCESS_KEY_ID || "",
    secretAccessKey: AWS_S3_SECRET_ACCESS_KEY || "",
  }
});

export async function deleteFromS3(fileName: string): Promise<void> {
  const params = {
    Bucket: AWS_S3_BUCKET_NAME,
    Key: `${fileName}`
  }

  const command = new DeleteObjectCommand(params);
  await s3Client.send(command);
}

export async function uploadFileToS3(fileBuffer: Buffer, fileName: string): Promise<string>{
  const params = {
    Bucket: AWS_S3_BUCKET_NAME,
    Key: `${fileName}`,
    Body: fileBuffer,
    ContentType: "image/jpg"
  }

  const command = new PutObjectCommand(params);
  await s3Client.send(command);

  const storedReceiptUrl = `https://${AWS_S3_BUCKET_NAME}.s3.${AWS_S3_REGION}.amazonaws.com/${fileName}`

  return storedReceiptUrl;
}