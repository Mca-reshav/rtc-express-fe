import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.log("MongoDB URI not found");
      return;
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error: any) {
    console.error("Failed to connect", error?.message);
    process.exit(1);
  }
};