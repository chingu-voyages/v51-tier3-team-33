import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IGroup extends Document {
  name: string;
  description: string;
  budget: number;
  admin_id: mongoose.Schema.Types.ObjectId;
  members: mongoose.Schema.Types.ObjectId[];
  expenses: mongoose.Schema.Types.ObjectId[];
}

const groupSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  budget: {
    type: Number,
    required: true,
    default: 0
  },
  admin_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  ],
  expenses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Expense",
      default: []
    }
  ]
});

const Group: Model<IGroup> = mongoose.models.Group || mongoose.model<IGroup>("Group", groupSchema);

export default Group;
