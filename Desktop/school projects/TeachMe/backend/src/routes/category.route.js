import express from 'express'
import { createOffer } from '../controllers/offer.controller.js'
import { protectedRoute } from '../middleware/auth.middleware.js'
import { showCategories } from '../controllers/category.controller.js'
import { showTags } from "../controllers/category.controller.js";
const router=express.Router()
router.get('/',showCategories)
router.get("/:category/tags", showTags);
export default router