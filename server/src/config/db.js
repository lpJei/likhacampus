// Database entry point, must import
import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/likhacampus"); // Replace once set up to Atlas
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(`MongoDB connection error: ${error}`);
    process.exit(1);
  }
};

export default connect;
