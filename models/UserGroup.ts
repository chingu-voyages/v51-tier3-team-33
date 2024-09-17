import mongoose, { Document, Schema } from 'mongoose';

export interface UserGroup extends Document { 
  user_id: Number,
  group_id: Number,
  is_admin: Boolean
}

const userGroupSchema: Schema = new Schema({
  user_id: {
    type: Number,
    required: true
  },

  group_id: {
    type: Number,
    required: true
  },

  is_admin: {
    type: Boolean,
    required: true,
    default: false
  }
});

const UserGroup = mongoose.model<UserGroup>("UserGroup", userGroupSchema);

export default UserGroup;