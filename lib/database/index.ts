import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  console.log("first line of db function");
  if (cached.conn) return cached.conn;
  console.log("second line");

  if(!MONGODB_URI) throw new Error('MONGODB_URI is missing');
  console.log("reached to the connecttodatabase");

  cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
    dbName: 'evently',
    bufferCommands: false,
  })
  console.log("passed the dbname attribute");

  cached.conn = await cached.promise;
  console.log("reached 2 line");
  console.log(cached.conn);
  console.log("reached the final part");
  return cached.conn;
}