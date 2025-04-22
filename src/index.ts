import express from "express";
import mongoose from "mongoose";
import userRoute from "./Routes/userRoute";

const app = express();
const port = 3001;

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/Ecommece")
  .then(() => console.log("Connected"))
  .catch((err) => console.log("Failed!", err));

app.use("/user", userRoute);

app.listen(port, () => {
  console.log(`Server is running at: https://localhost:${port}`);
});
