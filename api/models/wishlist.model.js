import mongoose, { Mongoose } from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },

    name: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

const wishlistDB = mongoose.model("Wishlist", wishlistSchema);

export default wishlistDB;
