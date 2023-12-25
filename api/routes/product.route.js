import express from "express";

import { validUser } from "../utils/verifyUser.js";
import { createProduct } from "../controllers/product.controller.js";


const router=express.Router();

router.post('/create',validUser, createProduct)

export default router;