import express from "express";
import dotenv from 'dotenv'
import Stripe from 'stripe'
dotenv.config();
import {showCheckoutSession} from '../controllers/payment.controller.js'

const router = express.Router();

router.post("/create-payment", async (req, res) => {
    const stripe=new Stripe("key")
    const {amount}=req.body

  
});
router.post("/create-checkout-session",showCheckoutSession);

export default router;
