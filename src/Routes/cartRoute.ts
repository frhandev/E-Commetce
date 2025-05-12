import express, { Request } from "express";
import {
  addItemToCart,
  checkout,
  clearCart,
  deleteItemInCart,
  getActiveCartForUser,
  updateItemIoCart,
} from "../Services/cartServices";
import validateJWT from "../middleWares/validateJWT";

const router = express.Router();

interface ExtendRequest extends Request {
  user?: any;
}

router.get("/", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req.user._id;
    const cart = await getActiveCartForUser({ userId });
    res.status(200).send(cart);
  } catch {
    res.status(500).send("Somthing went wrong!");
  }
});

router.post("/items", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;
    const response = await addItemToCart({ userId, productId, quantity });
    res.status(response.statusCode).send(response.data);
  } catch {
    res.status(500).send("Somthing went wrong!");
  }
});

router.put("/items", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;
    const response = await updateItemIoCart({ userId, productId, quantity });
    res.status(response.statusCode).send(response.data);
  } catch {
    res.status(500).send("Somthing went wrong!");
  }
});

router.delete(
  "/items/:productId",
  validateJWT,
  async (req: ExtendRequest, res) => {
    try {
      const userId = req.user._id;
      const { productId } = req.params;
      const response = await deleteItemInCart({ userId, productId });
      res.status(response.statusCode).send(response.data);
    } catch {
      res.status(500).send("Somthing went wrong!");
    }
  }
);

router.delete("/", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;
    const response = await clearCart({ userId });
    res.status(response.statusCode).send(response.data);
  } catch {
    res.status(500).send("Somthing went wrong!");
  }
});

router.post("/checkout", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req.user._id;
    const { address } = req.body;
    const response = await checkout({ userId, address });
    res.status(response.statusCode).send(response.data);
  } catch {
    res.status(500).send("Somthing went wrong!");
  }
});

export default router;
