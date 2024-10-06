import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/Users";

interface ProfileBody {
  firstName: string;
  lastName: string;
  email: string;
  image: string | undefined;
}
export const POST = async(request: NextRequest) => {
  try {
    await dbConnect();
    const body: ProfileBody = await request.json();

    if (!body.email) {
      return NextResponse.json({message: "Email is missing"}, {status:400});
    }

    const user = await User.create({
        firstName: body?.firstName,
        lastName: body?.lastName,
        email: body?.email,
        image: body?.image
    })

    return NextResponse.json({message: "User successfully created", user}, {status: 201});

  } catch ( error ) {
    return NextResponse.json({error: error})
  }
}