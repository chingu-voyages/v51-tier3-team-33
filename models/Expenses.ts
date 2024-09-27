import mongoose, { Document, Schema } from 'mongoose';

export interface Expense extends Document {
  name: String,
  description: String,
  amount: Number,
  receipt_id: mongoose.Schema.Types.ObjectId;
  // category_id: mongoose.Schema.Types.ObjectId; - Will need to discuss in next meeting.
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
  }
});

const Expense = mongoose.model<Expense>("Expense", expenseSchema);

export default Expense;