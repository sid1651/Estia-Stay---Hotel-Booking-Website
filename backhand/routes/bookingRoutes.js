import express from "express"
import { checkAvailibilityAPI, createBooking, getHotelBookings, getUserBookings } from "../conttrolers/bookingController.js";
import { protect } from "../midelware/authMiddleware.js";


const bookingRouter=express.Router();

bookingRouter.post('/check-availability', checkAvailibilityAPI)

bookingRouter.post('/book',protect,createBooking)
bookingRouter.get('/user',protect,getUserBookings)
bookingRouter.get('/hotel',protect,getHotelBookings)

export default bookingRouter