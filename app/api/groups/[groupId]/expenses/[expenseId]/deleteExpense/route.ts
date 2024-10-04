import dbConnect from "@/lib/dbConnect";
import Expense from "@/models/Expenses";
// import { NextRequest, NextResponse } from "next/server";

// export const PUT = async (request: NextRequest, { params }: { params: { groupId: string; expenseId: string } }) => {

//   try {
//     await dbConnect();

//     const {groupId, expenseId} = params;
//     const body = await request.json();
  
//     const updatedExpense = Expense.findByIdAndUpdate(expenseId, {
//       name: body.name,
//       description: body.description,
//       amount: body.amount,
//       category: body.category
//     }, {new:true});

//     if (!updatedExpense) {
//       return NextResponse.json({message: "Expense not found"}, {status: 404});
//     }
  
//     return NextResponse.json({message: "Expense succesfully updated", updatedExpense}, {status: 200});

//   } catch(error) {
//     return NextResponse.json({error: error})
//   }
// } - Ignore this for now