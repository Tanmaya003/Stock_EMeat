import  express  from "express";
import { validUser } from "../utils/verifyUser.js";
import { addToCart } from "../controllers/cart.Controller.js";
const router= express.Router();

router.post('/addToCart',validUser,addToCart)

export default router;