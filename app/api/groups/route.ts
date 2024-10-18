import { NextRequest, NextResponse } from "next/server";
import Group from "@/models/Group";
import { ObjectId } from "mongoose";
import dbConnect from "@/lib/dbConnect";
import UserGroup from "@/models/UserGroup";
import { nanoid } from 'nanoid';

export const GET = async(req: NextRequest): Promise<NextResponse> => {
  try {
    await dbConnect();
    //get group id grom request url

    const { searchParams } = new URL(req.url);
    const groupId = searchParams.get('id');

    //console.log('params', searchParams)
    if (groupId) {
      //find group by id
      const group = await Group.findById(groupId);
      if (group) {
        return NextResponse.json({ success: true, group });
      } else {
        return NextResponse.json({ success: false, message: 'Group not found' }, {status: 400})
      }
    } else {
      //if group Id not provided return all groups
      const groups = await Group.find();
      return NextResponse.json({ success: true, groups }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({error: error})
  }
}

interface GroupBody {
  name: string;
  description: string;
  budget: number;
  user_id: ObjectId | string;
  members?: (ObjectId | string)[];
}

export const POST = async(request: NextRequest): Promise<NextResponse> => {
  try {
    await dbConnect();
    const body: GroupBody = await request.json();
    let inviteLink = nanoid(7);
    
    const members = body.members? body.members : []
    
    const group = await Group.create({
      name: body.name,
      description: body.description,
      budget: body.budget,
      admin_id: body.user_id,
      members: [body.user_id, ...members],
      invite_link: inviteLink
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