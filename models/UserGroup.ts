import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IUserGroup extends Document { 
  user_id: mongoose.Schema.Types.ObjectId;
  group_id: mongoose.Schema.Types.ObjectId;
  is_admin: Boolean;
}

const userGroupSchema: Schema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },

  group_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },

  is_admin: {
    type: Boolean,
    required: true,
    default: false
  }
});

const UserGroup: Model<IUserGroup> = mongoose.models?.UserGroup || mongoose.model<IUserGroup>("UserGroup", userGroupSchema);

export default UserGroup;