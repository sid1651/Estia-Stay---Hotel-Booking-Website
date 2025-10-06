import mongoose from "mongoose";

const bookingschema=new mongoose.Schema({
    user:{type:String,ref:"User",required:true},
    room:{type:String,ref:"User",required:true},
    hotel:{type:String,ref:"User",required:true},
    checkInDate:{type:Date,ref:"User",required:true},
    checkOutDate:{type:Date,ref:"User",required:true},
    totalPrice:{type:Number,required:true},
    guestes:{type:Number,required:true},
    status:{
        type:String,
        enum:["panding","confirmend","canceled"],
        default:"pending"
    },
    paymentMethod:{
        type:String,
        required:true,
        default:"pay at hotel"

    },
    isPaid:{type:Boolean,default:false}
},{timestamps:true})

const Booking=mongoose.model("Booking",bookingschema);

export default Booking