import express from "express";
import { getAllProducts } from "../Services/procuctServices";

const router = express.Router();

router.get("/", async (req, res) => {
  const products = getAllProducts;
  res.status(200).send(products);
});

export default router;
