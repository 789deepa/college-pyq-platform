import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  console.error('Missing MONGO_URI in backend/.env');
  process.exit(1);
}

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('MongoDB connected!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Connection failed:', error.message);
    process.exit(1);
  });
