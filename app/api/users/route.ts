import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/Users";

export const GET = async(): Promise<NextResponse> => {
  try {
    await dbConnect();
    const users = await User.find();
    return NextResponse.json({success: true, users});

  } catch(error) {
    return NextResponse.json({error: error})
  }
}