import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/Users";

export const GET = async(req: NextRequest): Promise<NextResponse> => {
  try {
    await dbConnect();

    //get the user id from the request url

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('id');

    if (userId) {
      //find a user by id
      const user = await User.findById(userId);
      if (user) {
        return NextResponse.json({ success: true, user });
      } else {
        return NextResponse.json({ success: false, message: 'User not found' }, {status: 404});
      }
    } else {
      //if not user id provided, return all users
      const users = await User.find();
      return NextResponse.json({ success: true, users });
    }
    
  } catch(error) {
    return NextResponse.json({success: false, error}, {status: 500})
  }
}