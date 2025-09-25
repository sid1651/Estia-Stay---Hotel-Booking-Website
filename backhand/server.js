import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js';
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from './conttrolers/clearkWebhooks.js';
dotenv.config();
const app=express()
app.use(cors())
connectDB()
app.use(clerkMiddleware())
app.use(express.json())
app.use("/api/clerk",clerkWebhooks)


app.get('/', (req,res)=>res.send("Api is working"))

const port=process.env.PORT||3000;

app.listen(port,()=>console.log('server running on port 3000'))