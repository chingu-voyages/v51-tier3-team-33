import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  friends: mongoose.Schema.Types.ObjectId[];
}

const userSchema: Schema = new Schema({
  firstName: {
    type: String,
    required: true
  },

  lastName: {
    type: String,
    required: true
  },

  email: {
    type: String, 
    required: true,
    unique: true
  },

  image: {
    type: String,
  },

  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  ]
});

const User: Model<IUser> = mongoose.models?.User || mongoose.model<IUser>("User", userSchema);

export default User;