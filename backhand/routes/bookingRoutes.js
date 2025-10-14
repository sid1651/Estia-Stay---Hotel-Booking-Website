import express from "express"
import { checkAvailibilityAPI, createBooking, getHotelBookings, getUserBookings, stripePayment } from "../conttrolers/bookingController.js";
import { protect } from "../midelware/authMiddleware.js";


const bookingRouter=express.Router();

bookingRouter.post('/check-availability', checkAvailibilityAPI)

bookingRouter.post('/book',protect,createBooking)
bookingRouter.get('/user',protect,getUserBookings)
bookingRouter.get('/hotel',protect,getHotelBookings)

bookingRouter.post('/stripe_payment',protect,stripePayment)

export default bookingRouter