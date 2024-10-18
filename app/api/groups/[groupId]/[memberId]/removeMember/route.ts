import { NextRequest, NextResponse } from "next/server";
import Group from "@/models/Group";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/Users";
import UserExpense from "@/models/UserExpense";
import UserGroup from "@/models/UserGroup";
import { ObjectId } from "mongoose";


export const DELETE = async (request: NextRequest, { params }: { params: { groupId: string, memberId: ObjectId} }) => {
  try {
    await dbConnect();

    const { groupId, memberId } = params;

    const userExists = await User.findById(memberId)

    if (!userExists) {
      return NextResponse.json({error: "No user with that id"}, {status: 404})
    }

    let group = await Group.findById(groupId);

    if (!group) {
      return NextResponse.json({error: "No group with that id"}, {status: 404})
    }

    const userInGroup = group.members.includes(memberId)

    if (!userInGroup) {
      return NextResponse.json({error: "The user is not in apart of this group"}, {status: 400})
    }

    group = await Group.findByIdAndUpdate(groupId, { //removes the id of the user from the members array.
      $pull: { members: memberId }
    }, { new: true })

    const userGroup = await UserGroup.findOneAndDelete({ group_id: groupId, user_id: memberId }); // deletes the UserGroup record.
    console.log("user group", userGroup)

    const expenses = await UserExpense.deleteMany({ // removes all user expenses record that is related to expenses in the current group.
      user_id: memberId,
      expense_id: { $in: group!.expenses }
    });

    console.log("expenses", expenses);

    return NextResponse.json({message: "Member successfully removed", group})
  } catch (error) {
    return NextResponse.json({error: error});
  }
}