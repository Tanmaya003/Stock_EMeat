import mongoose from "mongoose";

const addressSchema= new mongoose.Schema({
    userId:{type:String, required:true},
    housename:{type:String, required:true},
    country:{type:String, required:true,default:'India'},
    state:{type:String, required:true},
    district:{type:String, required:true},
    pin:{type:Number, required:true},
    city:{type:String, required:true},
    village:{type:String, required:true},
    phone:{type:Number, required:true},
    details:{type:String, required:true},
},{timestamps:true})

const AddressModel= mongoose.model('Address',addressSchema);
export default AddressModel;