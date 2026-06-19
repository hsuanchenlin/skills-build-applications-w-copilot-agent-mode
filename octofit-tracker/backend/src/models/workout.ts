import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  type: string;
  duration: number;
  difficulty: string;
  recommendedFor: string[];
}

const workoutSchema = new Schema<IWorkout>({
  name: { type: String, required: true },
  type: { type: String, required: true },
  duration: { type: Number, required: true },
  difficulty: { type: String, required: true },
  recommendedFor: { type: [String], required: true },
});

export const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);
