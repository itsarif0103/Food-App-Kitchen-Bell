import express from "express";
import { addFood, listFood, removeFood } from "../Controllers/FoodContoller.js";
import multer from "multer";

const foodRouter = express.Router();

//Image upload configuration
const storage = multer.diskStorage({
  destination: "Uploads/",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB
  },
});

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);

export default foodRouter;
