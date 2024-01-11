import AddressModel from "../models/address.model.js";
import User from "../models/user.model.js";
import wishlistDB from "../models/wishlist.model.js";
import { errorHandeller } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const test = (req, res) => {
  res.json({ message: "hi" });
};
export const updateUser = async (req, res, next) => {
  console.log(req.body);
  if (req.body.password2 !== req.body.password3)
    return next(errorHandeller(404, "Password mismatch"));
  if (req.user.id !== req.params.id)
    return next(errorHandeller(401, "You can update your own account"));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const update = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          avatar: req.body.avatar,
          password: req.body.password3,
        },
      },
      { new: true }
    );
    const { password, ...rest } = update._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const promoteUser = async (req, res, next) => {
  try {
    console.log(" sent data is " + req.body);
    const userid = req.body._id;

    const update = await User.findByIdAndUpdate(
      userid,
      {
        $set: {
          usertype: "employee",
        },
      },
      { new: true }
    );
    res.status(200).json({ message: "Promoted successfully" });
  } catch (error) {
    next(errorHandeller(404, error));
  }
};

export const demoteUser = async (req, res, next) => {
  try {
    console.log(" sent data is " + req.body);
    const userid = req.body._id;

    const update = await User.findByIdAndUpdate(
      userid,
      {
        $set: {
          usertype: "user",
        },
      },
      { new: true }
    );
    res.status(200).json({ message: "Demoted successfully" });
  } catch (error) {
    next(errorHandeller(404, error));
  }
};
export const searchUser = async (req, res, next) => {
  try {
    const email = req.body.email;
    console.log(email);
    const updateduser = await User.findOne({ email: email });
    const { password: pass, ...rest } = updateduser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(errorHandeller(404, error));
  }
};

export const addaddress = async (req, res, next) => {
  try {
    console.log(req.body);
    const {
      housename,
      country,
      state,
      district,
      pin,
      city,
      village,
      phone,
      details,
      userId,
    } = req.body;
    if (!req.body) {
      return next(errorHandeller(404, "Data has not been sent"));
    }
    const newaddress = new AddressModel({
      housename,
      country,
      state,
      district,
      pin,
      city,
      village,
      phone,
      details,
      userId,
    });
    const address = await newaddress.save();
    res.status(200).json(address);
  } catch (error) {
    next(errorHandeller(401, "error encountered"));
  }
};

export const getaddress = async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  try {
    const data = await AddressModel.find({ userId: id });
    res.status(200).json(data);
  } catch (error) {
    next(errorHandeller(404, "error encountered"));
  }
};

export const deleteAddress = async (req, res, next) => {
  try {
    const listing = await AddressModel.findById(req.params.id);
    if (!listing) {
      console.log("not found");
      return next(errorHandeller(401, "address not found"));
    }
    await AddressModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Address has been removed");
  } catch (error) {
    next(errorHandeller(404, "Error encountered at delete part"));
  }
};

export const updateAddress = async (req, res, next) => {
  try {
    if (!req.params.id) {
      return next(errorHandeller(401, "request Id not found"));
    }
    const updateAdd = await AddressModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          housename: req.body.housename,
          country: req.body.country,
          state: req.body.state,
          district: req.body.district,
          pin: req.body.pin,
          city: req.body.city,
          village: req.body.village,
          phone: req.body.phone,
          details: req.body.details,
          userId: req.body.userId,
        },
      },
      { new: true }
    );
    res.status(200).json(updateAdd);
  } catch (error) {
    next(errorHandeller(404, "error in updaing address"));
  }
};

export const addWishlist = async (req, res, next) => {
  const { name, image, productId, userId } = req.body;
  console.log(name)
  try {
    if (!req.body) {
        return next(errorHandeller(404, "Data has not been sent"));
      }
    const wishlist = new wishlistDB({
      name,
      image,
      productId,
      userId,
    });
    const result= await wishlist.save();
    res.status(200).json(result)
  } catch (error) {
    next(errorHandeller(error));
  }
};

export const getWishlist=async(req,res)=>{
    console.log(req.query.user)
    try {
        const result=await wishlistDB.find({userId:req.query.user , productId:req.query.product})
        res.status(200).json(result)
    } catch (error) {
        next(errorHandeller(401,'Error in finding one wishlist'))
    }
}

export const deleteWishlist=async(req,res,next)=>{
    console.log(`wishlist is ${req.params.id}`)
    try {
        const wish = await wishlistDB.findById(req.params.id);
    if (!wish) {
      console.log("not found");
      return next(errorHandeller(401, "wish not found"));
    }
    await wishlistDB.findByIdAndDelete(req.params.id);
    res.status(200).json("wishlist has been removed");
    } catch (error) {
        next(errorHandeller(401,'Error in finding one wishlist'))
    }
}

export const getWishlists=async(req,res,next)=>{
    try {
        const id= req.params.id;
        if(!id){ return next(errorHandeller(401,'No user id available'))}
        const results= await wishlistDB.find({userId:id});
        res.status(200).json(results)
    } catch (error) {
        next(errorHandeller(401,'error in finding wishlists'))
    }
}