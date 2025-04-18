import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI environment variable is not defined in .env.local');
  throw new Error('Please define the MONGODB_URI environment variable in .env.local');
}

// Extend NodeJS.Global to include mongoose
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  };
}

let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

async function dbConnect(): Promise<Mongoose> {
  console.log('--> [dbConnect] Initiating MongoDB connection process...');

  if (cached.conn) {
    console.log('--> [dbConnect] Reusing cached database connection.');
    return cached.conn;
  }

  if (!cached.promise) {
    console.log('--> [dbConnect] No cached connection. Creating a new connection...');
    try {
      cached.promise = mongoose.connect(MONGODB_URI, {
        bufferCommands: false,
      }).then((mongooseInstance) => {
        console.log('✅ MongoDB connection established successfully.');
        return mongooseInstance;
      });
    } catch (error) {
      console.error('❌ [dbConnect] Initial connection attempt failed:', error);
      throw error;
    }
  }

  try {
    cached.conn = await cached.promise;
    console.log('--> [dbConnect] Connection promise resolved successfully.');
  } catch (error) {
    console.error('❌ [dbConnect] Error resolving connection promise:', error);
    throw error;
  }

  return cached.conn;
}

export default dbConnect;
