import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import Group from "@/models/Group";
import UserGroup from "@/models/UserGroup";

export const POST = async(request: NextRequest, { params }: { params: { groupId: string} }): Promise<NextResponse> => {
  try {
    await dbConnect();

    const { groupId } = params;
    const { user_id } = await request.json();

    console.log(groupId);

    const group = await Group.findByIdAndUpdate(groupId,
      { $addToSet: {members: user_id} }, // add to set prevent duplicates from being added.
      { new: true }).populate("members"); // returns the new verison of the document instead of the old one.

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