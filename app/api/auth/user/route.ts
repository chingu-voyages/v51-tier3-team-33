import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/Users";

export const POST = async(request: NextRequest) => {
  try {
    await dbConnect();
    const body = await request.json();

    if (!body.email) {
      return NextResponse.json({message: "Email is missing"}, {status:400})
    }

    await User.create({
        firstName: body?.given_name,
        lastName: body?.family_name,
        email: body?.email,
        image: body?.picture
    })

    return NextResponse.json({message: "User successfully created"}, {status: 201});

  } catch ( error ) {
    return NextResponse.json({error: error})
  }
}