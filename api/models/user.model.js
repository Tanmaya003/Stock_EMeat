import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,  
    },
    avatar:{
        type:String,
        default:"https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg"
    },
    phone:{
        type:Number,
        required:true
    },
    usertype:{
        type:String,
        default:'user'
    }
},{timestamps: true})
//user type can be admin ,user ,employee
//to become employee this needs to be mailed to admin , admin will make a user to employee
const User= mongoose.model("User",userSchema);

export default User;