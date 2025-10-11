import express from 'express';
import dotenv from 'dotenv'

import cors from 'cors'
import connectDB from './config/db.js';
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from './conttrolers/clearkWebhooks.js';
import userRouter from './routes/userRoutes.js';
import hotelRouter from './routes/hotelRoutes.js';
import connectCloudinary from './config/cloudinary.js';
import roomRouter from './routes/roomRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';
import transporter from './config/nodemailer.js';


dotenv.config();
const app=express()
app.use(cors())
connectDB()
connectCloudinary();


app.use("/api/clerk",clerkWebhooks) 
app.use(clerkMiddleware())
app.use(express.json())



app.get('/', (req,res)=>{res.send("Api is working");console.log("haha");console.log(process.env.CLERK_WEBHOOK_SECRET);
    console.log(process.env.CLERK_PUBLISHABLE_KEY);
    console.log(process.env.CLERK_SECRET_KEY);})
    app.use('/api/user',userRouter)
    app.use('/api/hotels',hotelRouter)
    app.use("/api/rooms",roomRouter)
    app.use("/api/bookings",bookingRouter)

const port=process.env.PORT||3000;

app.listen(port,()=>console.log('server running on port 3000'))