import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Expense from "@/models/Expenses";

interface ExpenseBody {
  name: string;
  description: string;
  amount: number;
}

export const POST = async(request:NextRequest): Promise<any> => {
  try {
    await dbConnect();
    const body: ExpenseBody = await request.json();

    const expense = await Expense.create({
      name: body.name,
      description: body.description,
      amount: body.amount 
    })

    return NextResponse.json({ message: 'Expense created successfully', expense }, { status: 201 });

  } catch(error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
};