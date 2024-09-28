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
    
    if ((error as any).errorResponse) {
      if ((error as any).errorResponse.code == 11000) {
        return NextResponse.json({error: 'An expense with this info already exists', status: 409 });
      };
    }
    return NextResponse.json({ error: error }, { status: 400 });
  }
};