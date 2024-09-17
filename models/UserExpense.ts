import mongoose, { Document, Schema } from 'mongoose';

export interface UserExpense extends Document {
  user_id: Number,
  expense_id: Number,
  contribution: Number,
}

const userExpenseSchema: Schema = new Schema({
  user_id: {
    type: Number,
    required: true
  },

  expense_id: {
    type: Number,
    required: true
  },

  contribution: {
    type: Number,
    required: true,
    default: 0
  }
});

const UserExpense = mongoose.model<UserExpense>("UserExpense", userExpenseSchema);

export default UserExpense;