import User from "../models/user.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
  // LOG: Announce that the webhook endpoint was hit.
  console.log("--- Clerk Webhook Endpoint Hit ---");

  try {
    
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    console.log(process.env.CLERK_WEBHOOK_SECRET)

    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };
    
    // LOG: Show the headers being used for verification.
    console.log("Using headers for verification:", headers);
    
    const bodyForVerification = JSON.stringify(req.body);
    
    // LOG: Show the exact string that is being verified.
    console.log("Attempting to verify body string:", bodyForVerification);

    // Verify webhook
    await wh.verify(bodyForVerification, headers);
    // This existing log is good.
    console.log("✅ Verified webhook");

    const { data, type } = req.body;
    
    // LOG: Announce the type of event and show the data payload.
    console.log(`Received event type: '${type}'`);
    console.log("Event data:", data);

    switch (type) {
      case "user.created": {
        console.log("Entering 'user.created' block...");
        const userData = {
          _id: data.id,
          email: data.email_addresses?.[0]?.email_address || "",
          username: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          image: data.image_url || "",
        };
        // LOG: Show the exact data before the database call.
        console.log("Data to be created in DB:", userData);
        await User.create(userData);
        // This existing log is good.
        console.log("👤 User created in DB");
        break;
      }

      case "user.updated": {
        console.log("Entering 'user.updated' block...");
        const userData = {
          email: data.email_addresses?.[0]?.email_address || "",
          username: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          image: data.image_url || "",
        };
        // LOG: Show the exact data before the database call.
        console.log(`Data for updating user ${data.id}:`, userData);
        await User.findByIdAndUpdate(data.id, userData);
        // This existing log is good.
        console.log("🔄 User updated in DB");
        break;
      }

      case "user.deleted": {
        console.log("Entering 'user.deleted' block...");
        // LOG: Confirm the ID of the user being deleted.
        console.log(`Deleting user with ID: ${data.id}`);
        await User.findByIdAndDelete(data.id);
        // This existing log is good.
        console.log("🗑️ User deleted from DB");
        break;
      }

      default:
        // This existing log is good.
        console.log(`⚠️ Unhandled event: ${type}`);
        break;
    }

    res.json({ success: true, message: "Webhook received" });
  } catch (error) {
    // LOG: Log the full error object for more details, not just the message.
    console.error("❌ Webhook error object:", error);
    res.status(400).json({ success: false, error: error.message });
  }
};

export default clerkWebhooks;