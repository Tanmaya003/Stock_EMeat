import express from "express";

import { validUser } from "../utils/verifyUser.js";
import { createProduct, deleteProduct, editProduct, getListProduct, getProduct, getProducts } from "../controllers/product.controller.js";


const router=express.Router();

router.post('/create',validUser, createProduct)
router.get('/getProducts', getProducts)
router.get('/get/:id', getProduct)
router.get('/list', getListProduct)
router.post('/edit/:id',validUser, editProduct)
router.delete('/delete/:id',validUser, deleteProduct)

export default router;