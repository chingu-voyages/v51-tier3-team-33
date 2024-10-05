import dbConnect from "@/lib/dbConnect";
import User from "@/models/Users";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (request: NextRequest) => { // Handles the logic of adding friends to list of user and vice versa.
  try {
    await dbConnect(); 
    const body = await request.json();
    const { userId, friendId } = body; 
    
    const friend = await User.findById(friendId); // I can modify this to look for the friend by name or email if need be.
    const user = await User.findById(userId);
  
    if (!user) {
      return NextResponse.json({error: "User not found"}, {status: 404});
    }

    if (!friend) {
      return NextResponse.json({error: "Friend not found"}, {status: 404});
    }

    if (user.friends.includes(friendId)) {
      return NextResponse.json({ error: "Friend is already in the user's friends list" }, {status: 400});
    }

    if (friend.friends.includes(userId)) {
      return NextResponse.json({ error: "User is already in the friend's friends list" }, {status: 400});
    }

    user.friends.push(friendId);
    friend.friends.push(userId);

    await user.save();
    await friend.save();

    return NextResponse.json({message: "Friend succesfully added", user}, {status: 200}) 
  } catch (error) {
    NextResponse.json({error: error});
  }
}