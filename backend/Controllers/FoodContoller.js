import { foodModel } from "../Models/FoodModel.js";
import fs from "fs";

//add food item

const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const { name, description, price, category } = req.body;
  const food = new foodModel({
    name: name,
    description: description,
    price: price,
    image: image_filename,
    category: category,
  });
  try {
    await food.save();
    res.status(200).json({
      message: "Food item added successfully",
      data: food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//all food items

const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.status(200).json({
      message: "Food items fetched successfully",
      data: foods,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//delete food item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findByIdAndDelete(req.body.id);
    if (!food) {
      return res.status(404).json({ message: "Food item not found" });
    }
    fs.unlinkSync(`Uploads/${food.image}`);
    res.status(200).json({
      message: "Food item deleted successfully",
      data: food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { addFood, listFood, removeFood };
