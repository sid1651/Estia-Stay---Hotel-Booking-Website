import User from "../models/user.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
  try {
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    // Verify webhook
    await wh.verify(JSON.stringify(req.body), headers);
    console.log("✅ Verified webhook");

    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses?.[0]?.email_address || "",
          username: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          image: data.image_url || "",
        };
        await User.create(userData);
        console.log("👤 User created in DB");
        break;
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses?.[0]?.email_address || "",
          username: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          image: data.image_url || "",
        };
        await User.findByIdAndUpdate(data.id, userData);
        console.log("🔄 User updated in DB");
        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        console.log("🗑️ User deleted from DB");
        break;
      }

      default:
        console.log(`⚠️ Unhandled event: ${type}`);
        break;
    }

    res.json({ success: true, message: "Webhook received" });
  } catch (error) {
    console.error("❌ Webhook error:", error.message);
    res.status(400).json({ success: false, error: error.message });
  }
};

export default clerkWebhooks;
