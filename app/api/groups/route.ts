import { NextRequest, NextResponse } from "next/server";
import Group from "@/models/Group";
import { ObjectId } from "mongoose";
import dbConnect from "@/lib/dbConnect";

interface GroupBody {
  name: string,
  description: string,
  budget: number,
  user_id: ObjectId // its possibly just a string at this point
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

    return NextResponse.json({success: true, group}, {status: 201});

  } catch (error) {
    return NextResponse.json({erro:error});
  }
}