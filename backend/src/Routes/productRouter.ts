import express from "express";
import { getAllProducts } from "../Services/procuctServices";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = getAllProducts;
    res.status(200).send(products);
  } catch {
    res.status(500).send("Somthing went wrong!");
  }
});

export default router;
