import express from 'express';
import { getDetails, getOrders, uploadOrder } from '../controllers/order.controller.js';

const router=express.Router();

router.post('/upload',uploadOrder)
router.get('/showOrders/:id',getOrders)
router.get('/details/:id',getDetails)

export default router;