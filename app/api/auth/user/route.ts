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

    const friends = await User.aggregate([{ $sample: { size: 5 } }]);

    const user = await User.create({
        firstName: body?.firstName,
        lastName: body?.lastName,
        email: body?.email,
        image: body?.image
    })

    for (const friend of friends) {
      await fetch(`${process.env.BASE_URL}/api/users/addFriend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId: user._id, friendId: friend._id })
      })
    }

    return NextResponse.json({message: "User successfully created", user}, {status: 201});

  } catch ( error ) {
    return NextResponse.json({error: error})
  }
}