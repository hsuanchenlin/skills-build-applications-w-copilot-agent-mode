import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboard extends Document {
  username: string;
  score: number;
  rank: number;
}

const leaderboardSchema = new Schema<ILeaderboard>({
  username: { type: String, required: true, unique: true },
  score: { type: Number, required: true },
  rank: { type: Number, required: true },
});

export const Leaderboard = mongoose.model<ILeaderboard>('Leaderboard', leaderboardSchema);
