import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Expense from "@/models/Expenses";
import UserExpense from "@/models/UserExpense";
import Group from "@/models/Group";

interface Contributions { // have the key be the userid and value be the amount of the contribution?
  member_id: string;
  amount: number;
}

interface ExpenseBody {
  name: string;
  description: string;
  amount: number;
  category: string
  receiptFile?: File
  member_contributions: Contributions[];
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
      member_contributions: JSON.parse(formData.get("contributions") as string) //make sure everything excluding the value of the amount are in double quotes like this: { "member_id": "id", "amount": 50}
    };

    if (body.receiptFile) {
      const receiptFormData = new FormData();
      receiptFormData.append("file", body.receiptFile);

      const receiptRequest = await fetch(`${process.env.BASE_URL}/api/s3-upload`,{
        method: "POST",
        body: receiptFormData
      });

      if (receiptRequest.ok) {
        const receiptData = await receiptRequest.json();
        receiptUrl = receiptData.storedReceiptUrl;
      } else {
        throw new Error('Failed to upload receipt');
      }
    }

    const expense = await Expense.create({
      name: body.name,
      description: body.description,
      amount: body.amount,
      category: body.category,
      group_id: groupId,
      receipt_url: receiptUrl
    })

    const updatedGroup = await Group.findByIdAndUpdate(groupId,
      { $addToSet: {expenses: expense._id} }, // add to set prevent duplicates from being added.
      { new: true }) // returns the new verison of the document instead of the old one

    const hasMembers = updatedGroup?.members && updatedGroup.members.length > 0;
    const hasContributions = body.member_contributions.length > 0;
  
    if (hasMembers && hasContributions) {
      for (const contribution of body.member_contributions) {
        const userExpense = await UserExpense.create({
          user_id: contribution.member_id,
          expense_id: expense.id,
          contribution: contribution.amount
        })
  
        console.log(userExpense);
      }
    }

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