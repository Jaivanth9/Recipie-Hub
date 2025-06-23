import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  const url = process.env.MONGODB_URI;
  if (!url) {
    console.error("❌ MONGODB_URI not defined in .env");
    process.exit(1);
  }

  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
