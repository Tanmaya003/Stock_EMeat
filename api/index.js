import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import path from 'path';
import dotenv from 'dotenv';
import authrouter from './routes/auth.route.js'
import userRouter from './routes/user.route.js'
dotenv.config();
//creating dynamic directory name kjkj
const __dirname =path.resolve();

mongoose.connect(process.env.MONGO)
.then(()=>{console.log("connection successful")})
.catch((e)=>{console.log(e)})

const app=express();
app.use(express.json());
app.use(cookieParser());
app.listen(3000, ()=>{console.log('server is running on port 3000') })

app.use('/api/auth',authrouter)
app.use('/api/user',userRouter)
