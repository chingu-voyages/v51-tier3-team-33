import mongoose, { Document, Schema } from 'mongoose';

export interface Receipt extends Document { 
  image_url: String;
}

const receiptSchema: Schema = new Schema({
  image_url: {
    type: String,
    required: true
  }
});

const Receipt = mongoose.model<Receipt>("Receipt", receiptSchema);

export default Receipt;