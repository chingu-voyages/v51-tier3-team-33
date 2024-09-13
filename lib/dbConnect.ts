import mongoose from "mongoose";

const connection: {isConnected?: number} = {};

async function dbConnect() {
  if (connection.isConnected) { // If we are already connected, there is no need to do it all over again.
    return;
  }

  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not set.');
    }

    const db = await mongoose.connect(process.env.MONGODB_URI!); // Attempts to connect using URI in .env.local file.
    console.log("Mongodb connected")
    
  } catch(error) {
    console.log(error)
  }
}

export default dbConnect;