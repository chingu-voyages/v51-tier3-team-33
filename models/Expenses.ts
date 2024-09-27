import mongoose, { Document, Schema } from 'mongoose';

export interface Expense extends Document {
  name: String,
  description: String,
  amount: Number,
  receipt_id: mongoose.Schema.Types.ObjectId;
  date: Date
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

  receipt: {
    type: mongoose.Schema.Types.ObjectId,
    required: false
  },

  amount: {
    type: Number,
    required: true,
    default: 0
  },

  date: {
    type: Date,
    default:Date.now
  }
});

const Expense = mongoose.models?.expense || mongoose.model<Expense>("Expense", expenseSchema);

export default Expense;