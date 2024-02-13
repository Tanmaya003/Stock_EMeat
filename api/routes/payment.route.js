import express from 'express'
import { checkStatus, newPayment } from '../controllers/payment.controller.js';

const router=express.Router();

router.post('/start',newPayment)
router.post('/status/:txnId',checkStatus)

export default router;