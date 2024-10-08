import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Expense from "@/models/Expenses";
import UserExpense from "@/models/UserExpense";
import Group from "@/models/Group";
import { MongoServerError } from 'mongodb';


interface ExpenseBody {
  name: string;
  description: string;
  amount: number;
  category: string
  receiptFile?: File
  //contributions will go here
}

export const POST = async(request:NextRequest, { params } : { params: { groupId: string } }): Promise<NextResponse> => {
  try {
    await dbConnect();

    const { groupId } = params;
    const formData = await request.formData();
    let receiptUrl: string | undefined;

    const body: ExpenseBody = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      amount: parseFloat(formData.get("amount") as string),
      category: formData.get("category") as string,
      receiptFile: formData.get("file") as File,
    };

    let expense = await Expense.create({
      name: body.name,
      description: body.description,
      amount: body.amount,
      category: body.category,
      group_id: groupId,
      receipt_url: receiptUrl // initially undefined.
    })

    if (body.receiptFile) {
      const receiptFormData = new FormData();
      receiptFormData.append("file", body.receiptFile);
      receiptFormData.append("expenseId", (expense._id) as string); // passing the expense id to the form to easily identify the expense the image will belong to in AWS S3

      const receiptRequest = await fetch(`${process.env.BASE_URL}/api/groups/s3-upload`,{
        method: "POST",
        body: receiptFormData
      });

      if (receiptRequest.ok) {
        const receiptData = await receiptRequest.json();
        receiptUrl = receiptData.storedReceiptUrl;

        const updatedExpense = await Expense.findByIdAndUpdate(expense._id, // add the receipt url to the newly created expense
          {receipt_url: receiptUrl}, {new: true}
        )

        if (updatedExpense) { // reassign the expense to be returned with the new expense that has the receipt url
          expense = updatedExpense;
        }
      } else {
        throw new Error('Failed to upload receipt');
      }
    }

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
    if (error instanceof MongoServerError && error.errorResponse.code == 11000) {
      return NextResponse.json({error: 'An expense with this info already exists', status: 409 });
    };
    return NextResponse.json({ error: error }, { status: 400 });
  }
};