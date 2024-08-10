import mongoose from "mongoose";

//Below type do not always return from database
type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Database already connected");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_DB_URI || "");
    console.log("DB", db);
    connection.isConnected = db.connections[0].readyState;
    console.log("DB Connected");
  } catch (error) {
    console.log("DB connect fail", error);
    process.exit(1);
  }
}
export default dbConnect;
