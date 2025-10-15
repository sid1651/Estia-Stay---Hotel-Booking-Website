import stripe from "stripe";
import Booking from "../models/Booking.js";

export const stripeWebhooks = async (req, res) => {
    console.log("🔔 Webhook called");

    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
    console.log("🔑 Stripe instance created");

    const sig = req.headers['stripe-signature'];
    console.log("📝 Stripe signature received:", sig);

    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
        console.log("✅ Event constructed successfully:", event.type);
    } catch (error) {
        console.error("❌ Webhook Error:", error.message);
        res.status(400).send(`Webhook Error: ${error.message}`);
        return;
    }

    if (event.type === 'payment_intent.succeeded') {
        console.log("💰 Payment Intent succeeded");

        const paymentIntent = event.data.object;
        const paymentIntentId = paymentIntent.id;
        console.log("💳 Payment Intent ID:", paymentIntentId);

        try {
            const session = await stripeInstance.checkout.sessions.list({
                payment_intent: paymentIntentId
            });
            console.log("📄 Session fetched:", session.data);

            if (session.data.length === 0) {
                console.warn("⚠️ No session found for payment intent");
                res.status(404).send("No session found for this payment intent");
                return;
            }

            const { bookingId } = session.data[0].metadata;
            console.log("🆔 Booking ID from metadata:", bookingId);

            const updatedBooking = await Booking.findByIdAndUpdate(
                bookingId,
                { isPaid: true, paymentMethod: "stripe" },
                { new: true }
            );
            console.log("✅ Booking updated:", updatedBooking);

        } catch (err) {
            console.error("❌ Error fetching session or updating booking:", err);
            res.status(500).send("Internal Server Error");
            return;
        }
    } else {
        console.log("ℹ️ Event type not handled:", event.type);
    }

    res.json({ received: true });
};
