import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://arifullahshaik0301:UIgobFmUZ1XRWtNb@cluster0.wsqr62m.mongodb.net/kitchen-bells"
    )
    .then(() => {
      console.log("MongoDB connected successfully");
    });
};
