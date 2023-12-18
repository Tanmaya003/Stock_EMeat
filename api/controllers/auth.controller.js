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

export const signInUser= async(req,res,next)=>{
    const {email,password}= req.body;
    try {
        const validUser = await User.findOne({email})
        if(!validUser) {
            return errorHandeller(401,'EMail address not found')
        } 
        const hashedPass= bcryptjs.compareSync(password,validUser.password)
        if(!hashedPass){
            return errorHandeller(401,"Invalid User details")
        }
        const token= Jwt.sign({id:validUser._id},process.env.JWT_SECRET)
        const {password:pass, ...rest}= validUser._doc
        res.cookies('Access_token',token,{httpOnly:true}).status(200).json(rest)
    } catch (error) {
        console.log(error)
    }
}