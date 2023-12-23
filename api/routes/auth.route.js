import express from "express";
import { signInUser, signUpUser, signoutUser } from "../controllers/auth.controller.js";

const router= express.Router();

router.post('/signup',signUpUser)
router.post('/signin',signInUser)
router.get('/signout',signoutUser)


export default router;
