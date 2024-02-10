import mongoose from "mongoose";

const orderSchema= new mongoose.Schema({
    userId:{type:String , required:true},
    totalAmount:{type:Number},
    totalNum:{type:Number},
    paymentStatus:{type:Boolean},
    orderStatus:{type:String},
    items:[
        {
            productId:{type:String},
            name:{type:String},
            image:{type:String},
            quantity:{type:String},
            price:{type:Number},
            countNo:{type:Number},
        }
    ],
},{timestamps:true})

const CartDB= mongoose.model('Cart',cartSchema);
export default CartDB;