import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
const app=express()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
}))
app.use(express.json())
app.use(cookieParser());
import AuthRoutes from './routes/auth.route.js'
import OfferRoutes from './routes/offer.route.js'
import { connectDB } from './lib/db.js'
import CategoryRoutes from './routes/category.route.js'
import SessionRoute from './routes/session.route.js'
import paymentRoutes from './routes/payement.route.js'
app.use('/api/auth',AuthRoutes)
app.use("/api/offers", OfferRoutes);
app.use("/api/categories", CategoryRoutes);
app.use("/api/sessions", SessionRoute);
app.use("/api/payments", paymentRoutes);
app.listen(5000,()=>{
    console.log('server is running on port 5000')
    connectDB()
})