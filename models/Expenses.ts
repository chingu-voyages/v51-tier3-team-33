import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IExpense extends Document {
  name: String,
  description: String,
  amount: Number,
  receipt_id: mongoose.Schema.Types.ObjectId;
  date: Date,
  group_id: mongoose.Schema.Types.ObjectId;
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

  receipt_id: {
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
  },

  group_id: {
    type:mongoose.Schema.Types.ObjectId,
    required: true
  }

});

expenseSchema.index({ name: 1, description: 1, amount: 1, receipt_id: 1}, { unique: true }); //prevents duplicates entries

const Expense: Model<IExpense> = mongoose.models.Expense || mongoose.model<IExpense>("Expense", expenseSchema);

export default Expense;