import  express  from "express";
import { errorHandeller } from "../utils/error.js";
import ProductModel from '../models/product.model.js'
import User from "../models/user.model.js";

export const createProduct=async(req,res,next)=>{
    const data= req.body.image;
    const {name,image,description,category,countInStock,numReviews,rating,weightPriceData}=req.body;
    console.log(weightPriceData[0] +' and '+ weightPriceData[1])
    try {
        const newProduct = new ProductModel({name,image,description,category,countInStock,numReviews,rating,weightPriceData})
        await newProduct.save();
        res.status(201).json(newProduct)
    } catch (error) {
        next(errorHandeller(404,`Error in listing ${error.message}`))
    }
}
