import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI!;

if (!MONGO_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache;
}

global.mongoose = global.mongoose || { conn: null, promise: null };

const connectDB = async () => {
  if (global.mongoose.conn) {
    return global.mongoose.conn;
  }

  if (!global.mongoose.promise) {
    global.mongoose.promise = mongoose.connect(MONGO_URI, {
      bufferCommands: false,
    }).then((mongoose) => {
      return mongoose;
    });
  }

  global.mongoose.conn = await global.mongoose.promise;
  return global.mongoose.conn;
};

export default connectDB;
