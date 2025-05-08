import express from "express";
import mongoose from "mongoose";
import userRoute from "./Routes/userRoute";
import cartRoute from "./Routes/cartRoute";
import { seedInitialProducts } from "./Services/procuctServices";
import productRouter from "./Routes/productRouter";

const app = express();
const port = 3001;

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/Ecommece")
  .then(() => console.log("Connected"))
  .catch((err) => console.log("Failed!", err));

seedInitialProducts();

app.use("/user", userRoute);
app.use("/product", productRouter);
app.use("/cart", cartRoute);

app.listen(port, () => {
  console.log(`Server is running at: https://localhost:${port}`);
});
