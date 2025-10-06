import Booking from "../models/Booking.js"
import Hotel from "../models/hotel.js";
import Room from "../models/Room.js";


const checkAvailibility=async({CheckInDate,checkOutDate,room})=>{
try{
const bookings=await Booking.find({
    room,
    checkInDate:{$lte:checkOutDate},
    checkOutDate:{$lte:CheckInDate}
})
bookings.length===0;
return isAvailabel;
}catch(error){
console.log(error.message)
}
}

export const checkAvailibilityAPI=async(req ,res)=>{
    try{
const {room,checkInDate,checkOutDate}=req.body;
const isAvailabel=await checkAvailibility({checkInDate,checkOutDate,room})
res.json({success:true,isAvailabel})
    }catch(error){
res.json({success:false,message:error.message})
    }
}

export const createBooking=async(req ,res)=>{
    try{
const {room,checkInDate,checkOutDate,guests}=req.body;
const user=req.user._id


const isAvailabel=await checkAvailibility({
    checkInDate,
    checkOutDate,
    room
})

if(!isAvailabel){
    res.json({success:false,message:"room is not availabel"})
}

const roomData=await Room.findById(room).populate("hotel")
let totalPrice=roomData.pricePerNight;

const checkIn=new Date(checkInDate)
const checkOut=new Date(checkOutDate)
const timeDiff=checkOut.getTime()-checkIn.getTime()
const night=Math.ceil(timeDiff/(1000*3600*24))
totalPrice*=night;
const booking=await Booking.create({
    user,
    room,
    hotel:roomData.hotel._id,
    guests:+guests,
    checkInDate,
    checkOutDate,
    totalPrice,
})
res.json({success:true,message:"Booking created successfully"})
    }catch(error){
        console.log(error)
res.json({success:false,message:"failed to creat booking"})

    }
}


export const getUserBookings=async(req ,res)=>{
    try{
const user=req.user._id;
const bookings=(await Booking.find({user}).populate("room hotel")).toSorted({createdAt:-1})
res.json({success:true,bookings})
    }catch(error){
res.json({success:false,message:"Failed to fetch bookings"})
    }
}

export const getHotelBookings=async(req ,res)=>{
    try{
    const hotel=await Hotel.findOne({owner:req.auth.userId})
    if(!hotel){
        return res.json({success:true,message:"no hotel found"})
    }

    const bookings=await Booking.find({hotel:hotel._id}).poopulate("room hotel user").sort({createdat:-1});

    const totalBookings=bookings.length

    const totalRevenu=bookings.reduce((acc,booking)=>acc+booking.totalPrice,0)

    res.json({success:true,dashboardData:{totalBookings,totalRevenu,bookings}})
}catch(error){
    res.json({success:false,message:"failed to fetch bookings"})
}
}