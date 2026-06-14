import mongoose from "mongoose";
import { ENV } from "./global.config";

mongoose.set("strictQuery", true);

mongoose.connection.on("connected", () => {
  console.log("MongoDB connection established");
});

mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB connection disconnected");
});

mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

const MONGO_URI = ENV.MONGO_URI || "";

export const connectDatabase = async (): Promise<void> => {
  try {
    if (!MONGO_URI) {
      throw new Error("Missing MONGO_URI or MONGODB_URI environment variable");
    }

    await mongoose.connect(MONGO_URI);
    console.log("Database connected");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  await mongoose.connection.close();
};
