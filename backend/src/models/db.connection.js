import mongoose, { connect} from "mongoose";

import { config } from "../config/config.js";

const connectDB = async () => {
  try {

    await connect(config.dbUrl).then(() => {
      console.log("MongoDB connected");
    }).catch((error) => {
      console.error(`MongoDB connection error: ${error}`);
      process.exit(1);
    });
    
  } catch (error) {
    console.error(`MongoDB connection error: ${error}`);
    process.exit(1);
  }
};

export default connectDB