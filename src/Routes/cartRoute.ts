import express, { Request } from "express";
import { addItemToCart, getActiveCartForUser } from "../Services/cartServices";
import validateJWT from "../middleWares/validateJWT";

const router = express.Router();

interface ExtendRequest extends Request {
  user?: any;
}

router.get("/", validateJWT, async (req: ExtendRequest, res) => {
  const userId = req.user._id;
  const cart = await getActiveCartForUser({ userId });
  res.status(200).send(cart);
});

router.post("/items", validateJWT, async (req: ExtendRequest, res) => {
  const userId = req.user._id;
  const { productId, quantity } = req.body;
  const response = await addItemToCart({ userId, productId, quantity });
  res.status(response.statusCode).send(response.data);
});

export default router;
