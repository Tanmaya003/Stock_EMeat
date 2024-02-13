import  express  from "express";
import { validUser } from "../utils/verifyUser.js";
import { addToCart, deleteCart, deleteCartData, getCartData, modifyCartData } from "../controllers/cart.Controller.js";
const router= express.Router();

router.post('/addToCart',validUser,addToCart)
router.get('/getData/:id',validUser,getCartData)
router.post('/modifyData/:id',validUser,modifyCartData)
router.delete('/deleteItem/:id',validUser,deleteCartData)
router.delete('/deleteCart/:id',validUser,deleteCart)

export default router;