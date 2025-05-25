import mongoose, { mongo } from "mongoose";

//create a schema
const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

//create a model
export const foodModel =
  mongoose.models.food || mongoose.model("Food", foodSchema);
