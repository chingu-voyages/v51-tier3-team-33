import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IUserExpense extends Document {
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

const UserExpense: Model<IUserExpense> = mongoose.models.UserExpense || mongoose.model<IUserExpense>("UserExpense", userExpenseSchema);

export default UserExpense;