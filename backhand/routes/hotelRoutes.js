import express from 'express'
import { protect } from '../midelware/authMiddleware.js';
import { registerHotel } from '../conttrolers/hotelController.js';

const hotelRouter=express.Router();

hotelRouter.post('/',protect,registerHotel)


export default hotelRouter