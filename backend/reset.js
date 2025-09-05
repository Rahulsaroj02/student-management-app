import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/user.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');

    // Option 1: delete all users
    await User.deleteMany({});
    console.log('All users deleted');

    // Option 2: drop the whole DB
    // await mongoose.connection.dropDatabase();
    // console.log('Entire database dropped');

    process.exit(0);
  })
  .catch((err) => {
    console.error('Error:', err);
    process.exit(1);
  });
