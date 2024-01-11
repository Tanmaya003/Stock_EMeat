import { errorHandeller } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import CartDB from "../models/cart.model.js";
export const addToCart = async (req, res, next) => {
  try {
    const { productId, name, image, quantity, price, userId, countNo } =
      req.body;
      const cartItem = {
        productId,
        name,
        image,
        quantity,
        price,
        countNo,
    };
    if (!req.body) {
      return next(errorHandeller(404, " req body not found"));
    }
    const detail = new CartDB({
      
      userId,
      items:[cartItem]
    });

    const result= await detail.save();
    res.status(201).json(result);
  } catch (error) {
    next(errorHandeller(404, "error in adding to cart"));
  }
};
