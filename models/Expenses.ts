import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IExpense extends Document {
  name: String,
  description: String,
  amount: Number,
  category: String,
  receipt_id: String,
  date: Date,
  group_id: mongoose.Schema.Types.ObjectId;
  is_paid: boolean;
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

  receipt_url: {
    type: String,
    required: false
  },

  amount: {
    type: Number,
    required: true,
    default: 0
  },

  category: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default:Date.now
  },

  group_id: {
    type:mongoose.Schema.Types.ObjectId,
    required: true
  },

  is_paid: {
    type: Boolean,
    required: true
  }

});

expenseSchema.index({ name: 1, description: 1, amount: 1, receipt_id: 1, category: 1}, { unique: true }); //prevents duplicates entries

const Expense: Model<IExpense> = mongoose.models.Expense || mongoose.model<IExpense>("Expense", expenseSchema);

export default Expense;