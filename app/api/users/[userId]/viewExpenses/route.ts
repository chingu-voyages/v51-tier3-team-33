import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UserExpense from "@/models/UserExpense";
import User from "@/models/Users";

export const GET = async(request: NextRequest, { params }: { params: { userId: string } }): Promise<NextResponse> => {
  try {
    await dbConnect();
    const { userId } = params;

    console.log(params)

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({error: "No user found with that id"}, {status: 400})
    }

    const userExpenses = await UserExpense.find({user_id: userId});
    return NextResponse.json({success: true, userExpenses}, {status: 200});

  } catch (error) {
    return NextResponse.json({error: error})
  }
}
