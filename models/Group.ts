import mongoose, { Document, Schema } from 'mongoose';

export interface Group extends Document {
  name: String;
  description: String;
  budget: Number;
  admin_id: mongoose.Schema.Types.ObjectId;
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
  }
});

const Group = mongoose.model<Group>("Group", groupSchema);

export default Group;