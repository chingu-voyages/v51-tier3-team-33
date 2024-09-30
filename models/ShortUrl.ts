import mongoose, { Document, Schema } from 'mongoose';

export interface ShortUrl extends Document {
  shortUrl: string;
  actualUrl: string;
  user_id: mongoose.Schema.Types.ObjectId;
  expiration: number;
}

const userExpenseSchema: Schema = new Schema({
  shortUrl: {
    type: String,
    required: true
  },

  actualUrl: {
    type: String,
    required: true
  },

  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },

  expiration: {
    type: Number,
    required: true
  }
});

const ShortUrl = mongoose.model<ShortUrl>("UserExpense", userExpenseSchema);

export default ShortUrl;