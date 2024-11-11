import mongoose from "mongoose";

export const mongodbConnection = async () => {
      try {
            await mongoose.connect('mongodb+srv://bhook:1212@cluster0.frloj.mongodb.net/bhook', {});

            console.log("MongoDB connected successfully");
      } catch (error) {
            console.error("MongoDB connection error:", error.message);
      }
};
