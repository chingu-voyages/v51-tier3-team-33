import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Expense from "@/models/Expenses";
import UserExpense from "@/models/UserExpense";

interface ExpenseBody {
  name: string;
  description: string;
  amount: number;
  category: string
}

export const POST = async(request:NextRequest, { params } : { params: { groupId: string } }): Promise<any> => {
  try {
    await dbConnect();

    const { groupId } = params;
    const body: ExpenseBody = await request.json();

    const expense = await Expense.create({
      name: body.name,
      description: body.description,
      amount: body.amount,
      category: body.category,
      group_id: groupId
    })

    //may still need the user_id to verify that one creating the expense is the admin. - ask the group

    // need to get members of group and add UserExpense records for them
    return NextResponse.json({ message: 'Expense created successfully', expense }, { status: 201 });

  } catch(error) {

    if ((error as any).errorResponse) {
      if ((error as any).errorResponse.code == 11000) {
        return NextResponse.json({error: 'An expense with this info already exists', status: 409 });
      };
    }
    return NextResponse.json({ error: error }, { status: 400 });
  }
};