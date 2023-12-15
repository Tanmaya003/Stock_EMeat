import { errorHandeller } from "./error.js";
import { Jwt } from "jsonwebtoken";

export const validUser=(req,res,next)=>{
    const token= req.cookies.Access_token;

    if(!token) return next(errorHandeller(404, 'Unauthorized user'))

    Jwt.verify(token,process.env.JWT_SECRET,(error,user)=>{
        if(error) next(errorHandeller(404,'forbidden'));
        req.user=user;
        next();
    })
    
}