import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Expense from "@/models/Expenses";
import UserExpense from "@/models/UserExpense";
import Group from "@/models/Group";

interface ExpenseBody {
  name: string;
  description: string;
  amount: number;
  category: string
  //contributions will go here
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

    const updatedGroup = await Group.findByIdAndUpdate(groupId,
      { $addToSet: {expenses: expense._id} }, // add to set prevent duplicates from being added.
      { new: true }) // returns the new verison of the document instead of the old one

    if (updatedGroup?.members && updatedGroup.members.length > 0) {
      for (const memberId of updatedGroup.members) {
        const userExpense = await UserExpense.create({
          user_id: memberId,
          expense_id: expense.id,
          //contributions still need to be added
        })

        console.log(userExpense);
      }
    }
    //may still need the user_id to verify that one creating the expense is the admin. - ask the group

    return NextResponse.json({ message: 'Expense created successfully', expense, updatedGroup }, { status: 201 });

  } catch(error) {

    if ((error as any).errorResponse) {
      if ((error as any).errorResponse.code == 11000) {
        return NextResponse.json({error: 'An expense with this info already exists', status: 409 });
      };
    }
    return NextResponse.json({ error: error }, { status: 400 });
  }
};