import mongoose from "mongoose";

// const orderItemSchema = new mongoose.Schema({
//   productId:{type:String},
//             name:{type:String},
//             image:{type:String},
//             quantity:{type:String},
//             price:{type:Number},
//             countNo:{type:Number},
//             orderstatus:{type:String, default:"ordered"}
// });

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    totalAmount: { type: Number },
    totalNum: { type: Number },
    paymentStatus: { type: Boolean },
    items: [],
    address:{},
  },
  { timestamps: true }
);

const orderDB = mongoose.model("Order", orderSchema);
export default orderDB;
