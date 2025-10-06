import Hotel from "../models/hotel.js";
import {v2 as cloudinary} from "cloudinary";
import Room from "../models/Room.js";



export const createRoom=async(req ,res)=>{
try{
const {roomType,pricePerNight,amenities}=req.body;
console.log("📦 Received Body:", req.body);
console.log("📎 Received Files:", req.files);
console.log("📎 Received Files:", );

const hotel=await Hotel.findOne({owner:req.auth.userId})


if(!hotel)return res.json({success:false,message:"no hotel found"})

    const uplodeImages=req.files.map(async(file)=>{
       const responce= await cloudinary.uploader.upload(file.path)
       return responce.secure_url
    })
    const images=await Promise.all(uplodeImages)
console.log("✅ Raw amenities:", JSON.parse(amenities));
console.log("✅ Type:", typeof JSON.parse(amenities));
console.log("✅ Type:",Array.isArray(JSON.parse(amenities)));






    await Room.create({
        hotel:hotel._id,
        roomType,
        pricePerNight:+pricePerNight,
        Amenities:JSON.parse(amenities),
        
        images,
    })
    res.json({success:true,message:"room created successfully"})
}catch(error){
    res.json({success:false,message:error.message})

}
}


export const getRooms=async(req ,res)=>{
    try{
const rooms= await Room.find({isAvailable:true}).populate({
    path:'hotel',
    populate:{
        path:'owner',
        select:'images'
    }
}).sort({createdAt:-1})
res.json({success:true,rooms})
    }catch(error){
res.json({success:false,message:error.message})
    }
}


export const getOwnerRooms=async(req ,res)=>{
    try{
const hotelData=await Hotel.findOne({owner:req.auth.userId})

const rooms=await Room.find({hotel:hotelData._id.toString()}).populate("hotel");
console.log("Rooms being sent to frontend:", JSON.stringify(rooms, null, 2));
res.json({success:true,rooms})
    }catch(error){
res.json({success:false,message:error.message})
    }
}


export const toggleroomAvailablity=async(req ,res)=>{
    try{
const {roomId}=req.body;
const roomData=await Room.findById(roomId)
roomData.isAvailable=!roomData.isAvailable
await roomData.save()
res.json({success:true,message:"room availibility updated"})
    }catch(error){
res.json({success:false,message:error.message})
    }
}