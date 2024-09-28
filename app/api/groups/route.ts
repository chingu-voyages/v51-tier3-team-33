import { NextRequest, NextResponse } from "next/server";
import Group from "@/models/Group";
import { ObjectId } from "mongoose";
import dbConnect from "@/lib/dbConnect";
import UserGroup from "@/models/UserGroup";

interface GroupBody {
  name: string,
  description: string,
  budget: number,
  user_id: ObjectId | string // its possibly just a string at this point
}

export const POST = async(request: NextRequest): Promise<NextResponse> => {
  try {
    await dbConnect();
    const body: GroupBody = await request.json();

    const group = await Group.create({
      name: body.name,
      description: body.description,
      budget: body.budget,
      admin_id: body.user_id
    });

    await UserGroup.create({ //this collection is used to store all the groups is affiliated with
      user_id: body.user_id,
      group_id: group._id,
      is_admin: body.user_id === String(group.admin_id)
    })

    return NextResponse.json({success: true, group}, {status: 201});

  } catch (error) {
    return NextResponse.json({error:error});
  }
}