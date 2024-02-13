import express from 'express';
import orderDB from '../models/orders.model.js'
import { errorHandeller } from "../utils/error.js";
export const uploadOrder=async (req,res,next)=>{
    // console.log(req.body.userId)
    const data=req.body
    // const data2={data}
    // console.log(data)

    try {
        const result = new orderDB(data)
        const results = await result.save();
        // console.log(results)
        res.status(201).json(results);
    } catch (error) {
        console.log(error)
    }
}

export const getOrders=async (req,res,next)=>{
    const id= req.params.id;
    console.log(id)
    try {
        if(!id){ return next(errorHandeller(404,"user ID not found in order controller"))}
        const result= await orderDB.find({userId:id});
        if(!result){
            return next(errorHandeller(404,"Orders not found"))
        }
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
    }
}

export const getDetails= async (req,res,next)=>{

}

