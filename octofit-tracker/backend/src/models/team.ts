import mongoose, { Schema, Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  members: string[];
  captain: string;
  goal: string;
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true, unique: true },
  members: { type: [String], required: true },
  captain: { type: String, required: true },
  goal: { type: String, required: true },
});

export const Team = mongoose.model<ITeam>('Team', teamSchema);
