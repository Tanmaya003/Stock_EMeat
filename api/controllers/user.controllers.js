
import User from "../models/user.model.js";
import { errorHandeller } from "../utils/error.js";
import bcryptjs from 'bcryptjs'

export const test=(req,res)=>{
    res.json({"message":'hi'})
}
export const updateUser=async(req,res,next)=>{
    console.log(req.body)
    if(req.body.password2 !== req.body.password3) return next(errorHandeller(404,'Password mismatch'))
    if(req.user.id !== req.params.id) return next(errorHandeller(401,'You can update your own account'));
    try {
        if(req.body.password){
            req.body.password= bcryptjs.hashSync(req.body.password,10)
        }
        const update= await User.findByIdAndUpdate(req.params.id , {
            $set:{
                username:req.body.username,
                email:req.body.email,
                avatar:req.body.avatar,
                password:req.body.password3
            }
        },{new:true})
        const {password , ...rest}= update._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error)
    }
}

export const promoteUser=async(req,res,next)=>{
    
    try {
        console.log(" sent data is "+req.body)
        const userid=req.body._id;

        const update= await User.findByIdAndUpdate(userid , {
            $set:{
                usertype:'employee'
            }
        },{new:true})
        res.status(200).json({ message: 'Promoted successfully' });
    } catch (error) {
        next(errorHandeller(404,error))
    }
} 

export const demoteUser=async(req,res,next)=>{
    
    try {
        console.log(" sent data is "+req.body)
        const userid=req.body._id;

        const update= await User.findByIdAndUpdate(userid , {
            $set:{
                usertype:'user'
            }
        },{new:true})
        res.status(200).json({ message: 'Demoted successfully' });
    } catch (error) {
        next(errorHandeller(404,error))
    }
}
export const searchUser=async(req,res,next)=>{
    try {
        const email=req.body.email;
        console.log(email)
        const updateduser= await User.findOne({email:email})
        const {password:pass, ...rest}= updateduser._doc
        res.status(200).json(rest)
    } catch (error) {
        next(errorHandeller(404,error))
    }
} 