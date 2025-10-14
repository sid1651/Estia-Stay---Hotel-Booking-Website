import stripe from "stripe";
import Booking from "../models/Booking.js";
export const stripeWebhooks=async(req,res)=>{
    const stripeInstance=new stripe(process.env.STRIPE_SECRET_KEY);
    const sig=req.headers['stripe-signature'];
    let event;

    try{
        event = stripeInstance.webhooks.constructEvent(req.body,sig,process.env.STRIPE_WEBHOOK_SECRET)
    }catch(error){
        res.status(400).send(`webhook Error:${error.message}`)
    }

    if(event.type==='payment_intent.succeeded'){
        const paymentintent=event.data.object;
        const paymmentIntentId=paymentintent.id  
    const session=await stripeInstance.checkout.sessions.list({
        payment_intent:paymmentIntentId
    });
    const {bookingId}=session.data[0].metadata;
    await Booking.findByIdAndUpdate(bookingId,{isPaid:true,paymentMethod:"stripe"})
    }else{
        console.log(event.type,"not working")
    }
    res.json({received:true})
}
