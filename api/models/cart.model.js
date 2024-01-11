import mongoose from "mongoose";

const cartSchema= new mongoose.Schema({
    userId:{type:String , required:true},
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