import dbConnect from "@/lib/dbConnect";
import Expense from "@/models/Expenses";
import { NextRequest, NextResponse } from "next/server";

interface ExpenseBody {
  name: string;
  description: string;
  amount: number;
  category: string
  receiptFile?: File
  //contributions will go here
}

export const PUT = async (request: NextRequest, { params }: { params: { groupId: string, expenseId: string } }) => {
  try {
    await dbConnect();

    const { expenseId } = params;

    console.log(params);
    const formData = await request.formData();
    // let receiptUrl: string | undefined;

    const body: ExpenseBody = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      amount: parseFloat(formData.get("amount") as string),
      category: formData.get("category") as string,
      // receiptFile: formData.get("file") as File,
    };

    //need to handle case where receipt updates, and remains the same
  
    const updatedExpense = await Expense.findByIdAndUpdate(expenseId, {
      name: body.name,
      description: body.description,
      amount: body.amount,
      category: body.category
    }, {new:true});

    if (!updatedExpense) {
      return NextResponse.json({message: "Expense not found"}, {status: 404});
    }
  
    return NextResponse.json({message: "Expense succesfully updated", updatedExpense}, {status: 200});

  } catch(error) {
    return NextResponse.json({error: error})
  }
}