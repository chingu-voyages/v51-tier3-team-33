import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/Users";

export const GET = async(request: NextRequest, { params }: { params: { email: string}}) => { // it only checks if the user is in the db.
  try {
    await dbConnect();

    const { email } = params;

    if (!email) {
      return NextResponse.json({message: "Required email is missing"}, {status: 400})
    }

    const user = await User.findOne({email})

    if (!user) {
      return NextResponse.json({message: "No user associated with this email"}, {status: 404});
    }

    return NextResponse.json({message: "user is found", user}, {status: 200});

  } catch ( error ) {
    return NextResponse.json({error: error})
  }
}