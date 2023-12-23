import express from "express";
import {  demoteUser, promoteUser, searchUser, test, updateUser } from "../controllers/user.controllers.js";
import { validUser } from "../utils/verifyUser.js";


const router=express.Router();
router.get('/test', test)
router.post('/update/:id',validUser, updateUser)
router.post('/promote',validUser, promoteUser)
router.post('/demote',validUser, demoteUser)
router.post('/searchUser',validUser, searchUser)


export default router;