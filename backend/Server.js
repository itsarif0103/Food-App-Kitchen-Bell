import express from "express";
import cors from "cors";
import { connectDB } from "./Config/db.js";
import foodRouter from "./Routes/FoodRoute.js";

// App Configuration
const app = express();
const PORT = 4000;

// Middleware
app.use(express.json());
app.use(cors());

//db connection
connectDB();

//API endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("Uploads"));

app.get("/", (req, res) => {
  res.status(200).send("Hello Backend");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
// Export the app for testing

//mongodb+srv://arifullahshaik0301:UIgobFmUZ1XRWtNb@cluster0.wsqr62m.mongodb.net/?
