// Seed the octofit_db database with test data
import mongoose from 'mongoose';
import { Activity } from '../models/activity';
import { Leaderboard } from '../models/leaderboard';
import { Team } from '../models/team';
import { User } from '../models/user';
import { Workout } from '../models/workout';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit_db';

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB for seeding');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
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
    ]);

    await Team.insertMany([
      {
        name: 'Trail Blazers',
        members: users.map((user) => user.username),
        captain: users[0].username,
        goal: 'Complete 5 weekend hikes',
      },
      {
        name: 'Power Squad',
        members: [users[1].username, users[2].username],
        captain: users[1].username,
        goal: 'Hit weekly strength goals',
      },
    ]);

    await Activity.insertMany([
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
    ]);

    await Leaderboard.insertMany([
      { username: 'alex_runner', score: 980, rank: 1 },
      { username: 'jamie_fit', score: 940, rank: 2 },
      { username: 'taylor_power', score: 900, rank: 3 },
    ]);

    await Workout.insertMany([
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
    ]);

    console.log('Seeded database with sample data');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
  }
};

seedData();
