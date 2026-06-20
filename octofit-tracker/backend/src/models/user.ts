import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  age: number;
  height: number;
  weight: number;
  fitnessGoal: string;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  fitnessGoal: { type: String, required: true },
});

export const User = mongoose.model<IUser>('User', userSchema);
