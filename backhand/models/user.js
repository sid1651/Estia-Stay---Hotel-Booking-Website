import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    _id: { type: String, required: true },   // ✅ use "required" not "require"
    username: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String, required: true },
    role: { type: String, enum: ['user', 'hotelOwner'], default: 'user' },
    recentSearchedCities: [{ type: String, required: true }],
}, { timestamps: true })  // ✅ "timestamps" not "timesstamps"

const User = mongoose.model('User', userSchema,);  
// last 'user' means it will use "user" collection in MongoDB

export default User;
