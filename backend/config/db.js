
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({});

export const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URL)
    .then(() => {
      console.log("MongoDB Connected...");
    })
    .catch((err) =>
      console.log(err + "error occure while connecting to MongoDB")
    );
};

// module.exports= connectDB;
