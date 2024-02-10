import express from 'express'
import { checkStatus, newPayment } from '../controllers/payment.controller';

const router=express.Router();

router.post('/start',newPayment)
router.post('/status',checkStatus)