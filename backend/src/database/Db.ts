import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {
      dbName: "Ecommerce",
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Failed to connect to MongoDB", error);
  }
};

export default connectToMongoDB;
