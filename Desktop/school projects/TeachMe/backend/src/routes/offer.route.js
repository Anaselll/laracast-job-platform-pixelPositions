import express from 'express'
import {
  createOffer,
  showOffers,
  
} from "../controllers/offer.controller.js";
import { protectedRoute } from '../middleware/auth.middleware.js'
const router=express.Router()
router.post('/create',protectedRoute,createOffer)
router.get("/:offer_type/category/:category_type", showOffers);
export default router