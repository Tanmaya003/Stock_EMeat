import express from "express";
import {  addWishlist, addaddress, deleteAddress, deleteWishlist, demoteUser, getWishlist, getWishlists, getaddress, promoteUser, searchUser, test, updateAddress, updateUser } from "../controllers/user.controllers.js";
import { validUser } from "../utils/verifyUser.js";


const router=express.Router();
router.get('/test', test)
router.post('/update/:id',validUser, updateUser)
router.post('/promote',validUser, promoteUser)
router.post('/demote',validUser, demoteUser)
router.post('/searchUser',validUser, searchUser)
router.post('/addAddress',validUser, addaddress)
router.get('/getAddress/:id',validUser, getaddress)
router.delete('/deleteAddress/:id',validUser, deleteAddress)
router.post('/updateAddress/:id',validUser, updateAddress)
router.post('/addWishlist',validUser, addWishlist)
router.get('/getWishlist',validUser, getWishlist)
router.delete('/deleteWishlist/:id',validUser, deleteWishlist)
router.get('/getWishlists/:id',validUser, getWishlists)

export default router;