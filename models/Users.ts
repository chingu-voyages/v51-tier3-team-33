import mongoose, { Document, Schema } from 'mongoose';

export interface User extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
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
    required: true
  },

  password: {
    type: String,
    required: true
  },

  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  ]
});

const User = mongoose.model<User>("User", userSchema);

export default User;