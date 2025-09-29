import User from "../models/user.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
  try {
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    console.log(process.env.CLERK_WEBHOOK_SECRET)
    console.log(process.env.CLERK_PUBLISHABLE_KEY)
    console.log(process.env.CLERK_SECRET_KEY)
    


    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    // Verify webhook
    await wh.verify(JSON.stringify(req.body), headers);

    console.log("Verrrrified!!!")

    // 👇 Add this log to see what Clerk is sending
    console.log("📩 Webhook payload:", JSON.stringify(req.body, null, 2));

    const { data, type } = req.body;

    const userData = {
      _id: data.id,
      email: data.email_addresses[0].email_address,
      username: `${data.first_name} ${data.last_name}`,
      image: data.image_url,
    };

    switch (type) {
      case "user.created":
        console.log("user created ")
        await User.create(userData);
        break;

      case "user.updated":
        await User.findByIdAndUpdate(data.id, userData);
        break;

      case "user.deleted":
        console.log("user deleted ")
        await User.findByIdAndDelete(data.id);
        break;

      default:
        break;
    }

    res.json({ success: true, message: "Webhook received" });
  } catch (error) {
    console.error("❌ Webhook error:", error.message);
    res.status(400).json({ success: false, error: error.message });
  }
};

export default clerkWebhooks;
