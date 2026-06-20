import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit_db';

const connectDB = async () => {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB database: octofit_db');
};

export default connectDB;
