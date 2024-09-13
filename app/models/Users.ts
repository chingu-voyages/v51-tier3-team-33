import mongoose, { Document, Schema } from 'mongoose';

export interface User extends Document {
  name: string,
  email: string,
  password: string;
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
  }
});

const User = mongoose.model<User>("User", userSchema);

export default User;