import express from "express";
import {  test, updateUser } from "../controllers/user.controllers.js";
import { validUser } from "../utils/verifyUser.js";


const router=express.Router();
router.get('/test', test)
router.post('/update/:id',validUser, updateUser)

export default router;