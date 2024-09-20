import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const { AWS_S3_REGION, AWS_S3_ACCESS_KEY_ID, AWS_S3_SECRET_ACCESS_KEY, AWS_S3_BUCKET_NAME } = process.env;

if (!AWS_S3_REGION || !AWS_S3_ACCESS_KEY_ID || !AWS_S3_ACCESS_KEY_ID || !AWS_S3_BUCKET_NAME) {
  throw new Error('Missing AWS S3 variables');
}

const s3Client = new S3Client({
  region: AWS_S3_REGION || "",
  credentials: {
    accessKeyId: AWS_S3_ACCESS_KEY_ID || "",
    secretAccessKey: AWS_S3_SECRET_ACCESS_KEY || "",
  }
});

async function uploadFileToS3(fileBuffer: Buffer, fileName: string): Promise<string>{

  const params = {
    Bucket: AWS_S3_BUCKET_NAME,
    Key: `${fileName}`,
    Body: fileBuffer,
    ContentType: "image/jpg"
  }

  const command = new PutObjectCommand(params);
  await s3Client.send(command);
  return fileName;
}

export async function POST(request: Request): Promise<NextResponse> {
  
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if(!file) {
      return NextResponse.json( {error: "File is required"}, {status: 400});
    }

    const buffer = Buffer.from(await file.arrayBuffer()); //come back to this
    const fileName = await uploadFileToS3(buffer, file.name);

    return NextResponse.json({success: true, fileName})

  } catch (error) {
    return NextResponse.json({error: error});
  }
}