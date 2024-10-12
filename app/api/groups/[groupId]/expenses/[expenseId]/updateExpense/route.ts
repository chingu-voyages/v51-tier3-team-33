import dbConnect from "@/lib/dbConnect";
import Expense from "@/models/Expenses";
import { NextRequest, NextResponse } from "next/server";
import { deleteFromS3 } from "@/app/api/groups/s3-upload/route";
import UserExpense from "@/models/UserExpense";

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
  is_paid: boolean
}

export const PUT = async (request: NextRequest, { params }: { params: { groupId: string, expenseId: string } }) => {
  try {
    await dbConnect();

    const { expenseId } = params;

    const formData = await request.formData();
    let receiptUrl: string | undefined;

    const body: ExpenseBody = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      amount: parseFloat(formData.get("amount") as string),
      category: formData.get("category") as string,
      receiptFile: formData.get("file") as File,
      member_contributions: JSON.parse(formData.get("contributions") as string), //make sure everything excluding the value of the amount are in double quotes like this: { "member_id": "id", "amount": 50}
      is_paid: (formData.get("is_paid") as string).toLowerCase() === "true" ? true : false
    };

    console.log(formData);

    if (body.receiptFile) {
      const existingExpense = await Expense.findById(expenseId);

      if (existingExpense && existingExpense.receipt_url) { // if the expense has an existing receipt image, delete it
        const url = existingExpense.receipt_url;
        const baseUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/`;
        const fileName = url.replace(baseUrl, "");
        await deleteFromS3(fileName);
      }

      const receiptFormData = new FormData(); // and start brand new with whatever the newest image is.
      receiptFormData.append("file", body.receiptFile);
      receiptFormData.append("expenseId", expenseId);
    

      const receiptRequest = await fetch(`${process.env.BASE_URL}/api/groups/s3-upload`,{
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
  
    const updatedExpense = await Expense.findByIdAndUpdate(expenseId, {
      name: body.name,
      description: body.description,
      amount: body.amount,
      category: body.category,
      receipt_url: receiptUrl, // If this has not been set up, it will be undefined.
      is_paid: body.is_paid
    }, {new:true});

    if (!updatedExpense) {
      return NextResponse.json({message: "Expense not found"}, {status: 404});
    }

    console.log(body.member_contributions)

    for (const contribution of body.member_contributions) {
      const existingUserExpense = await UserExpense.findOne({
        user_id: contribution.member_id,
        expense_id: expenseId,
      });

      if (existingUserExpense) {
        existingUserExpense.contribution = contribution.amount;
        await existingUserExpense.save();
        console.log(existingUserExpense)
      }
    }
  
    return NextResponse.json({message: "Expense succesfully updated", updatedExpense}, {status: 200});

  } catch(error) {
    return NextResponse.json({error: error})
  }
}