import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/Users";

export const DELETE = async (request: NextRequest) => {
  try {
    await dbConnect();
    const body = await request.json();
    const {userId, friendId} = body;
  
    let user = await User.findById(userId)
    const friend = await User.findById(friendId);
 
    if (!user) {
      return NextResponse.json({error: "User not found"}, {status: 404});
    }
  
    if (!friend) {
      return NextResponse.json({error: "Friend not found"}, {status: 404});
    }

    const friendFirstName = friend.firstName;
    const friendLastName = friend.lastName;

    if (!user.friends.includes(friendId)) {// checks that the id of the friend is in the users friend list.
      return NextResponse.json({error: `${friendFirstName} is not listed in users friend list.`}, {status: 404});
    }

    user = await User.findByIdAndUpdate(userId, {$pull: {friends: friendId}}, {new: true});
    await friend.updateOne({$pull: {friends: userId}});
  
    return NextResponse.json({message: `${friendFirstName} ${friendLastName} has been successfully removed from friend list`, user}, {status: 200});
  } catch(error) {
    return NextResponse.json({error: error});
  }
}