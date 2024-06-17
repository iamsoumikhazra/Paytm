import mongoose, { connect} from "mongoose";

import { config } from "../config/config.js";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected")
    })
    mongoose.connection.on("error", (err) => {
      console.log(`MongoDB connection error: ${err}`)
    })
    await connect(config.dbUrl);
    
  } catch (error) {
    console.error(`MongoDB connection error: ${error}`);
    process.exit(1);
  }
};

export default connectDB