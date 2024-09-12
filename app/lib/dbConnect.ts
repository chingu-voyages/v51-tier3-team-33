import mongoose from "mongoose";

const connection: {isConnected?: number} = {};

async function dbConnect() {
  if (connection.isConnected) { // If we are already connected, there is no need to do it all over again.
    return;
  }

  const db = await mongoose.connect(process.env.MONGODB_URI!); // Attempts to connect using URI in .env.local file/

  connection.isConnected = db.connections[0].readyState; // Tells us if we are connected or not.
}

export default dbConnect;