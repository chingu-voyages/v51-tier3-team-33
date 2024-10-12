import { NextRequest, NextResponse } from "next/server";
import Group from "@/models/Group";
import dbConnect from "@/lib/dbConnect";

export const GET = async(): Promise<NextResponse> => {
  try {
    await dbConnect();
    const groups = await Group.find();
    return NextResponse.json({success: true, groups}, {status: 200});

  } catch (error) {
    return NextResponse.json({error: error})
  }
}

interface GroupBody {
  name: string;
  description: string;
  budget: number;
}

export const PUT = async(request: NextRequest, { params }: { params: { groupId: string;} }): Promise<NextResponse> => {
  try {
    await dbConnect();
    const body: GroupBody = await request.json();
    const { groupId } = params;

    const group = await Group.findByIdAndUpdate(groupId, {
      name: body.name,
      description: body.description,
      budget: body.budget,
    }, {new: true});


    return NextResponse.json({success: true, group}, {status: 201});

  } catch (error) {
    return NextResponse.json({error:error});
  }
}