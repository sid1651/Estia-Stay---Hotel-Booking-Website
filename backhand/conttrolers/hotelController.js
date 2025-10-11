


import Hotel from "../models/stay.js";
import User from "../models/user.js";

export const registerHotel=async(req,res)=>{
    try{
        const {name,address,contact,city}=req.body;
        console.log(req.body)
        const owner=req.auth.userId
        

        const hotel=await Hotel.findOne({owner})
        if(hotel){
            return res.json({success:false,message:"Hotel alredy registered"})
        }
        await Hotel.create({name,address,contact,city,owner});
        await User.findByIdAndUpdate(owner,{role:"hotelOwner"}
        )
        res.json({success:true,message:"Hotel Registered Successfully"})

    }catch(error){
res.json({success:false,message:error.message})
    }
}