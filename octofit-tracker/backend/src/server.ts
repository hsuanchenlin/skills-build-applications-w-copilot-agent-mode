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

const seedIfEmpty = async () => {
  const counts = await Promise.all([
    User.countDocuments(),
    Team.countDocuments(),
    Activity.countDocuments(),
    Leaderboard.countDocuments(),
    Workout.countDocuments(),
  ]);

  const hasData = counts.some((count) => count > 0);

  if (hasData) {
    return;
  }

  await Promise.all([
    User.insertMany([
      {
        username: 'alex_runner',
        email: 'alex@example.com',
        password: 'hashedpassword1',
        age: 29,
        height: 180,
        weight: 78,
        fitnessGoal: 'Improve endurance',
      },
      {
        username: 'jamie_fit',
        email: 'jamie@example.com',
        password: 'hashedpassword2',
        age: 32,
        height: 165,
        weight: 60,
        fitnessGoal: 'Build strength',
      },
      {
        username: 'taylor_power',
        email: 'taylor@example.com',
        password: 'hashedpassword3',
        age: 27,
        height: 172,
        weight: 68,
        fitnessGoal: 'Lose weight',
      },
    ]),
    Team.insertMany([
      {
        name: 'Trail Blazers',
        members: ['alex_runner', 'jamie_fit', 'taylor_power'],
        captain: 'alex_runner',
        goal: 'Complete 5 weekend hikes',
      },
      {
        name: 'Power Squad',
        members: ['jamie_fit', 'taylor_power'],
        captain: 'jamie_fit',
        goal: 'Hit weekly strength goals',
      },
    ]),
    Activity.insertMany([
      {
        username: 'alex_runner',
        type: 'Running',
        duration: 45,
        calories: 420,
        date: '2026-06-18',
      },
      {
        username: 'jamie_fit',
        type: 'Weight Training',
        duration: 60,
        calories: 350,
        date: '2026-06-18',
      },
      {
        username: 'taylor_power',
        type: 'Cycling',
        duration: 30,
        calories: 240,
        date: '2026-06-19',
      },
    ]),
    Leaderboard.insertMany([
      { username: 'alex_runner', score: 980, rank: 1 },
      { username: 'jamie_fit', score: 940, rank: 2 },
      { username: 'taylor_power', score: 900, rank: 3 },
    ]),
    Workout.insertMany([
      {
        name: 'Morning HIIT',
        type: 'Cardio',
        duration: 20,
        difficulty: 'Intermediate',
        recommendedFor: ['alex_runner', 'taylor_power'],
      },
      {
        name: 'Core Strength',
        type: 'Strength',
        duration: 30,
        difficulty: 'Beginner',
        recommendedFor: ['jamie_fit'],
      },
      {
        name: 'Endurance Ride',
        type: 'Cycling',
        duration: 40,
        difficulty: 'Advanced',
        recommendedFor: ['alex_runner', 'taylor_power'],
      },
    ]),
  ]);

  console.log('Seeded sample data for all collections');
};

const startServer = async () => {
  try {
    await connectDB();
    await seedIfEmpty();

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
