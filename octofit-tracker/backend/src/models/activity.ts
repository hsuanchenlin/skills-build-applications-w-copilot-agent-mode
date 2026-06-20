import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  username: string;
  type: string;
  duration: number;
  calories: number;
  date: string;
}

const activitySchema = new Schema<IActivity>({
  username: { type: String, required: true },
  type: { type: String, required: true },
  duration: { type: Number, required: true },
  calories: { type: Number, required: true },
  date: { type: String, required: true },
});

export const Activity = mongoose.model<IActivity>('Activity', activitySchema);
