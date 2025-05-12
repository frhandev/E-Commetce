import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRoute from "./Routes/userRoute";
import cartRoute from "./Routes/cartRoute";
import { seedInitialProducts } from "./Services/procuctServices";
import productRouter from "./Routes/productRouter";

dotenv.config();

const app = express();
const port = 3001;

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => console.log("Connected"))
  .catch((err) => console.log("Failed!", err));

seedInitialProducts();

app.use("/user", userRoute);
app.use("/product", productRouter);
app.use("/cart", cartRoute);

app.listen(port, () => {
  console.log(`Server is running at: https://localhost:${port}`);
});
