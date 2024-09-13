import mongoose, { Document, Schema } from 'mongoose';

export interface Expense extends Document {
  name: String,
  description: String,
  amount: Number,
  receipt_id: Number,
  category_id: Number
}

const expenseSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  // receipt: {    -- Receipt photo. Will come back to this later.
  //   type: String, 
  // },

  amount: {
    type: Number,
    required: true,
    default: 0
  }
});

const Expense = mongoose.model<Expense>("Expense", expenseSchema);

export default Expense;