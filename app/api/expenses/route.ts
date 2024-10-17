import dbConnect from "@/lib/dbConnect";
import Expense from "@/models/Expenses";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(request: NextRequest): Promise<NextResponse> => {
  try {
    await dbConnect();
    const expenses = await Expense.find();
    return NextResponse.json({success: true, expenses}, {status: 200});

  } catch (error) {
    return NextResponse.json({error: error})
  }
}