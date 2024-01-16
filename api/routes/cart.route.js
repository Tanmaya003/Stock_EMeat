import  express  from "express";
import { validUser } from "../utils/verifyUser.js";
import { addToCart, deleteCartData, getCartData, modifyCartData } from "../controllers/cart.Controller.js";
const router= express.Router();

router.post('/addToCart',validUser,addToCart)
router.get('/getData/:id',validUser,getCartData)
router.post('/modifyData/:id',validUser,modifyCartData)
router.delete('/deleteItem/:id',validUser,deleteCartData)

export default router;