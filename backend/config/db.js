import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);

    console.log("Database connected successfully");

    return connection;
  } catch (error) {
    console.error("Database connection failed:", error.message);

    throw error; // Important!
  }
};

export default connectDb;
