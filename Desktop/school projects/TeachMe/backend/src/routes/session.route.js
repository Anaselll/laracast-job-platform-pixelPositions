import express from 'express'
import { protectedRoute } from '../middleware/auth.middleware.js'
import { createSession, showSessions } from '../controllers/session.controller.js'
const router=express.Router()
router.post('/create',protectedRoute,createSession)
router.get("/", protectedRoute, showSessions);
export default router