import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { Activity } from './models/activity';
import { Leaderboard } from './models/leaderboard';
import { Team } from './models/team';
import { User } from './models/user';
import { Workout } from './models/workout';
import connectDB from './config/database';

const app = express();
const PORT = process.env.PORT || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

app.use(cors());
app.use(express.json());
const sendCollection = async (
  res: express.Response,
  model: mongoose.Model<any>,
  collectionName: string,
) => {
  try {
    const items = await model.find({});
    res.json({ collection: collectionName, count: items.length, items });
  } catch (error) {
    res.status(500).json({ error: `Failed to load ${collectionName}` });
  }
};

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', apiUrl: API_BASE_URL });
});

app.get('/api/config', (_req, res) => {
  res.json({
    apiUrl: API_BASE_URL,
    port: PORT,
    database: 'octofit_db',
  });
});

app.get(['/api/users', '/api/users/'], async (_req, res) => {
  await sendCollection(res, User, 'users');
});

app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
  await sendCollection(res, Team, 'teams');
});

app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
  await sendCollection(res, Activity, 'activities');
});

app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
  await sendCollection(res, Leaderboard, 'leaderboard');
});

app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
  await sendCollection(res, Workout, 'workouts');
});

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`API base URL: ${API_BASE_URL}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
