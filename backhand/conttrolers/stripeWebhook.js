import stripe from "stripe";
import Booking from "../models/Booking.js";

export const stripeWebhooks = async (req, res) => {
    console.log("🔔 Stripe webhook called");

    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
    console.log("🔑 Stripe instance created");

    const sig = req.headers['stripe-signature'];
    console.log("📝 Stripe signature received:", sig);

    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
        console.log("✅ Event constructed successfully:", event.type);
    } catch (error) {
        console.error("❌ Webhook error:", error.message);
        res.status(400).send(`Webhook Error: ${error.message}`);
        return;
    }

    if (event.type === 'payment_intent.succeeded') {
        console.log("💰 Payment intent succeeded");

        const paymentintent = event.data.object;
        const paymmentIntentId = paymentintent.id;
        console.log("💳 Payment Intent ID:", paymmentIntentId);

        try {
            const session = await stripeInstance.checkout.sessions.list({
                payment_intent: paymmentIntentId
            });
            console.log("📄 Session fetched:", session.data);

            const { bookingId } = session.data[0].metadata;
            console.log("🆔 Booking ID from metadata:", bookingId);

            const updatedBooking = await Booking.findByIdAndUpdate(
                bookingId,
                { isPaid: true, paymentMethod: "stripe" }
            );
            console.log("✅ Booking updated:", updatedBooking);

        } catch (err) {
            console.error("❌ Error fetching session or updating booking:", err);
        }

    } else {
        console.log("ℹ️ Unhandled event type:", event.type);
    }

    res.json({ received: true });
};
