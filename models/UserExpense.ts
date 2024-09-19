import mongoose, { Document, Schema } from 'mongoose';

export interface UserExpense extends Document {
  user_id: mongoose.Schema.Types.ObjectId;
  expense_id: mongoose.Schema.Types.ObjectId;
  contribution: Number,
}

const userExpenseSchema: Schema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },

  expense_id: {
    type: mongoose.Schema.Types.ObjectId,
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