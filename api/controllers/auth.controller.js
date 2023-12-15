import  express  from "express";
import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import  Jwt  from "jsonwebtoken";
import { errorHandeller } from "../utils/error.js";

export const signUpUser=async (req,res,next)=>{
    const {email,password,username}=req.body;
    const hasspassword = bcryptjs.hashSync(password,10);
    const newUser= new User({username,email,password:hasspassword})
    try {
        await newUser.save();
        res.status(201).json("user created successfully")
    } catch (error) {
        console.log(`1. ${error}`)
        errorHandeller(401,'1. error in signUp')
    }
}