import mongoose from 'mongoose';
import dbConts from '../constants/database';
import { DatabaseUriNotFoundException } from '../../exceptions/database-uri-not-found';

export const connectToDatabase = async () => {
  mongoose.Promise = global.Promise;
  try {
    if (!dbConts.DATABASE_ADDRESS) {
      throw new DatabaseUriNotFoundException(
        'missing environment variable [DATABASE_ADDRESS]'
      );
    }

    mongoose.set('strictQuery', true);
    const server = await mongoose.connect(`${dbConts.DATABASE_ADDRESS}`);

    console.log(
      `[MongoDB Connection] server.connection.name: ${server.connection.name}`
    );
  } catch (error) {
    console.error('Could not connect into MongoDB, error: ', error);
    process.exit();
  }
};
