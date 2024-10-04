import dbConnect from "@/lib/dbConnect";
import Expense from "@/models/Expenses";
import Group from "@/models/Group";
import { NextRequest, NextResponse } from "next/server";
import UserExpense from "@/models/UserExpense";

export const DELETE = async (request: NextRequest, { params }: { params: { groupId: string; expenseId: string } }) => {
  try {
    await dbConnect();

    const {groupId, expenseId} = params;

    const expenseExists = await Expense.findById(expenseId);

    if (!expenseExists) {
      return NextResponse.json({error: "Expense not found"}, {status: 404});
    }

    const group = await Group.findByIdAndUpdate(groupId, {
      $pull: {expenses: expenseId}}, {new: true}); //remove the expense id from the array of expenses.
    
    if (!group) {
      return NextResponse.json({error: "Group not found"}, {status: 404});
    }

    if (group?.members && group.members.length > 0) { // delete all user expenses associated with the expense
      for (const memberId of group.members) {
        const userExpense = await UserExpense.findOneAndDelete({
          user_id: memberId,
          expense_id: expenseId,
        })
        
        if (!userExpense) {
          return NextResponse.json({error: "User expense not found", memberId, expenseId}, {status: 404});
        }
        console.log(userExpense);
      }
    }

    const expenseToDelete = await Expense.findByIdAndDelete(expenseId); // lastly delete the expense

    if (!expenseToDelete) {
      return NextResponse.json({message: "Expense not found"}, {status: 404});
    }
  
    return NextResponse.json({message: "Expense succesfully deleted"}, {status: 200});

  } catch(error) {
    return NextResponse.json({error: error})
  }
} 

// still need to delete from AWS