import dbConnect from "@/lib/dbConnect";
import User from "@/models/Users";
import { ObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

interface addFriendBody {
  userId: ObjectId;
  friendId?: ObjectId;
  friendEmail?: string;
}

export const POST = async (request: NextRequest) => { // Handles the logic of adding friends to list of user and vice versa.
  try {
    await dbConnect(); 
    const body: addFriendBody = await request.json();
    const { userId, friendId, friendEmail} = body; 
    
    const friend = await User.findOne({
      $or: [
        { _id: friendId },
        { email: friendEmail }, //case sensitive.
      ]
    });

    const user = await User.findById(userId);
  
    if (!user) {
      return NextResponse.json({error: "User not found"}, {status: 404});
    }

    if (!friend) {
      return NextResponse.json({error: "Friend not found"}, {status: 404});
    }

    if (user.friends.includes(friend.id)) {
      return NextResponse.json({ error: "Friend is already in the user's friends list" }, {status: 400});
    }

    if (friend.friends.includes(userId)) {
      return NextResponse.json({ error: "User is already in the friend's friends list" }, {status: 400});
    }

    user.friends.push(friend.id);
    friend.friends.push(userId);

    await user.save();
    await friend.save();

    return NextResponse.json({message: "Friend succesfully added", user}, {status: 200}) 
  } catch (error) {
    NextResponse.json({error: error});
  }
}