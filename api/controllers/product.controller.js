import express from "express";
import { errorHandeller } from "../utils/error.js";
import ProductModel from "../models/product.model.js";
import User from "../models/user.model.js";

export const createProduct = async (req, res, next) => {
  const data = req.body.image;
  const {
    name,
    image,
    description,
    category,
    countInStock,
    numReviews,
    rating,
    weightPriceData,
  } = req.body;
  console.log(weightPriceData[0] + " and " + weightPriceData[1]);
  try {
    const newProduct = new ProductModel({
      name,
      image,
      description,
      category,
      countInStock,
      numReviews,
      rating,
      weightPriceData,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    next(errorHandeller(404, `Error in listing ${error.message}`));
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const data = await ProductModel.find();
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id);
    const data = await ProductModel.findById(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
export const getListProduct = async (req, res, next) => {
  try {
    const searchTerm = req.query.searchTerm || "";
    const type = req.query.type || "";
    const lowrange = req.query.lowrange || 0;
    const maxrange = req.query.maxrange || 2000;
    console.log(searchTerm, type, lowrange, maxrange);
    const listings = await ProductModel.find({
      name: { $regex: searchTerm, $options: "i" },
      category: { $regex: type, $options: "i" },
      weightPriceData: {
        $elemMatch: { price: { $gte: lowrange, $lte: maxrange } },
      },
    });
    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};

export const editProduct=async(req,res,next)=>{
  try {
    const productId= req.params.id;
    
    if(!productId){
      return next(errorHandeller(404,'request id not found'));
      
    }
    const updateProduct= await ProductModel.findByIdAndUpdate(productId,req.body,{new:true})
    res.status(200).json(updateProduct)
  } catch (error) {
   next(errorHandeller(401,`request not proceed ${error.message}`)) 
  }
}

export const deleteProduct=async(req,res,next)=>{
  try {
    const listing= await ProductModel.findById(req.params.id)
    if(!listing){
      return next(errorHandeller(401,'Product not found'))
    }

    await ProductModel.findByIdAndDelete(req.params.id);
    res.status(200).json('Product has been deleted')
  } catch (error) {
    next(errorHandeller(404,`request failed ${error.message}`))
  }
}