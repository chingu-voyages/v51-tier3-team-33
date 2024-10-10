import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import Group from "@/models/Group";
import UserGroup from "@/models/UserGroup";
import User from "@/models/Users";

export const POST = async(request: NextRequest, { params }: { params: {inviteLink: string} }): Promise<NextResponse> => {
  try {
    await dbConnect();

    const { inviteLink } = params;
    const { user_id } = await request.json();
    const user = await User.findById(user_id)

    if (!user) {
      return NextResponse.json({error: "There is no user with this id"}, {status: 404});
    }

    const group = await Group.findOneAndUpdate({invite_link: inviteLink},
      { $addToSet: {members: user_id} }, // add to set prevent duplicates from being added.
      { new: true }).populate("members"); // returns the new verison of the document instead of the old one.

    console.log(group)

    if (!group) {
      return NextResponse.json({error: "Group not found"}, {status: 404});
    };

    await UserGroup.create({ //this collection is used to store all the groups is affiliated with
      user_id: user_id,
      group_id: group._id,
      is_admin: user_id === String(group.admin_id)
    });

    return NextResponse.json({success: true, group}, {status: 201});
  } catch (error) {
    return NextResponse.json({error: error});
  }
}