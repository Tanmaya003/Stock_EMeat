import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser'
import path from 'path';
import dotenv from 'dotenv';
import authrouter from './routes/auth.route.js'
import userRouter from './routes/user.route.js'
import productRouter from './routes/product.route.js'
import cartRouter from './routes/cart.route.js'
import paymentRoute from './routes/payment.route.js'
import orderRoute from './routes/order.route.js'
import cors from 'cors'
dotenv.config();
//creating dynamic directory name kjkj
const __dirname =path.resolve();


mongoose.connect(process.env.MONGO)
.then(()=>{console.log("connection successful")})
.catch((e)=>{console.log(e)})

const app=express();
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
//----OR--------------choose one in project below is the old one
// app.use(bodyParser.json()); // Parse JSON bodies
// app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.use(cookieParser());
app.use(cors());

app.listen(3000, ()=>{console.log('server is running on port 3000') })

app.use('/api/auth',authrouter)
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/payment',paymentRoute)
app.use('/api/order',orderRoute)


//below middleware is most important to catch the error
//By errorHandeller we set the customized error with status code, message and return a Error object
//when we pass the error object to next() , express will catch it 
//err : Represents the error object. It contains information about the error, such as a message, stack, and any additional properties you might attach to it.
// by using this below middleware we are sending the error status code and message as a json data ,and can easily get it in frontend

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });