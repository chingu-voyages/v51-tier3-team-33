import { NextResponse } from "next/server";
import { uploadFileToS3 } from "@/lib/s3Receipts";

const { AWS_S3_REGION, AWS_S3_ACCESS_KEY_ID, AWS_S3_SECRET_ACCESS_KEY, AWS_S3_BUCKET_NAME } = process.env;

if (!AWS_S3_REGION || !AWS_S3_ACCESS_KEY_ID || !AWS_S3_SECRET_ACCESS_KEY || !AWS_S3_BUCKET_NAME) {
  throw new Error('Missing AWS S3 variables');
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const expenseId = formData.get("expenseId")

    console.log('expense',expenseId)

    if (!file) {
      return NextResponse.json( {error: "File is required"}, {status: 400});
    }

    const fileName = `${expenseId}/${file.name}`

    const buffer = Buffer.from(await file.arrayBuffer()) // converts the file data into a format readable by S3.
    const storedReceiptUrl = await uploadFileToS3(buffer, fileName);

    return NextResponse.json({success: true, storedReceiptUrl});

  } catch (error) {
    return NextResponse.json({error: error});
  }
}