import { errorHandeller } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import CartDB from "../models/cart.model.js";
import ProductModel from "../models/product.model.js";
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
    const existingCartItem = await CartDB.findOneAndUpdate(
      {
        userId: userId,
        "items.productId": productId,
        "items.quantity": quantity,
      },
      {
        $inc: { "items.$.countNo": countNo },
      },
      { new: true }
    );

    if (existingCartItem) {
      res.status(200).json(existingCartItem);
    } else {
      const detail = new CartDB({
        userId,
        items: [cartItem],
      });
      const result = await detail.save();
      res.status(201).json(result);
    }
  } catch (error) {
    next(errorHandeller(404, "error in adding to cart"));
  }
};

export const getCartData = async (req, res, next) => {
  try {
    // console.log(req.params.id);
    if (!req.params.id) return next(errorHandeller(401, "User ID not found"));
    const result = await CartDB.find({ userId: req.params.id });
    res.status(200).json(result);
  } catch (error) {
    next(errorHandeller(401, "error in finding Cart data"));
  }
};

export const modifyCartData = async (req, res, next) => {
  try {
    const { productId, quantity, countNo } = req.body;
    const userId = req.params.id;
    const availableProduct = await ProductModel.find({ _id: productId });
    //  console.log(availableProduct[0].weightPriceData[0])

    const availableCount = availableProduct[0].weightPriceData.find(
      (items) => items.weight === quantity
    ).countInStock;
    console.log(availableCount);
    if (countNo > availableCount) {
      return next(errorHandeller(401, "Not enough stock in store"));
    }

    const existingCartItem = await CartDB.findOneAndUpdate(
      {
        userId: userId,
        "items.productId": productId,
        "items.quantity": quantity,
      },
      {
        $set: { "items.$.countNo": countNo },
      },
      { new: true }
    );
    console.log("item updated");
    if (!existingCartItem) {
      return next(errorHandeller(404, "Resource not found"));
    }
    res.status(200).json(existingCartItem);
  } catch (error) {
    next(error);
  }
};

export const deleteCartData = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const existData = await CartDB.findById(req.params.id);
    if (!existData) return next(errorHandeller(404, "Resource not found"));

    const deleteData = await CartDB.findByIdAndDelete(req.params.id);
    res.status(200).json("item deleted");
  } catch (error) {
    next(errorHandeller(401, "Error in delete"));
  }
};

export const deleteCart = async (req, res, next) => {
  try {
    console.log(req.params.id);
    
    const existData = await CartDB.findOne({userId:req.params.id});
    if (!existData) return next(errorHandeller(404, "Resource not found"));
    console.log(existData)

    const deleteData = await CartDB.deleteMany({userId:req.params.id});
    if (!deleteData) {
      return next(errorHandeller(500, "Error deleting item"));
    }
    res.status(200).json({message:"Cart deleted"});
  } catch (error) {
    next(errorHandeller(401, "Error in delete"));
  }
};
