import transporter from "../config/nodemailer.js";
import Booking from "../models/Booking.js";
import Hotel from "../models/hotel.js";
import Room from "../models/Room.js";

const checkAvailability = async ({ checkInDate, checkOutDate, room }) => {
  try {
    const bookings = await Booking.find({
      room,
      // Find any booking that overlaps with given dates
      $or: [
        {
          checkInDate: { $lt: new Date(checkOutDate) },
          checkOutDate: { $gt: new Date(checkInDate) },
        },
      ],
    });

    // If no overlapping bookings, room is available
    const isAvailable = bookings.length === 0;
    return isAvailable;
  } catch (error) {
    console.log("Availability check error:", error.message);
    return false;
  }
};

export const checkAvailibilityAPI = async (req, res) => {
  try {
    const { room, checkInDate, checkOutDate } = req.body;
    const isAvailable = await checkAvailability({
      checkInDate,
      checkOutDate,
      room,
    });
    res.json({ success: true, isAvailable });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Make sure you also import your checkAvailability function if it's in another file

export const createBooking = async (req, res) => {
  try {
    const { room, checkInDate, checkOutDate, guests } = req.body;

    // 2. Check if the user ID is being correctly attached by your auth middleware
    const user = req.user._id; // Using 'req.auth.userId' based on our previous fixes

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Authentication error: User not found.",
      });
    }

    const isAvailable = await checkAvailability({
      checkInDate,
      checkOutDate,
      room,
    });

    if (!isAvailable) {
      return res.json({ success: false, message: "Room is not available" });
    }

    const roomData = await Room.findById(room).populate("hotel");
    let totalPrice = roomData.pricePerNight;

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const timeDiff = checkOut.getTime() - checkIn.getTime();
    const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
    totalPrice *= nights;

    const bookingPayload = {
      user,
      room,
      hotel: roomData.hotel._id,
      guests: +guests, // Using 'guests' to match the corrected schema
      checkInDate,
      checkOutDate,
      totalPrice,
    };

    // 6. This is the MOST IMPORTANT log. See exactly what is being sent to the database.
    console.log(
      "6. Final data object being sent to Booking.create():",
      bookingPayload
    );

    const booking = await Booking.create(bookingPayload);

    console.log("7. Booking successfully created in the database.");


    res.json({ success: true, message: "Booking created successfully" });
  } catch (error) {
    res.json({ success: false, message: "Failed to create booking" });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const user = req.user._id;
    const bookings = await Booking.find({ user })
      .populate("room hotel")
      .sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (error) {
    res.json({ success: false, message: "Failed to fetch bookings" });
  }
};

export const getHotelBookings = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ owner: req.auth.userId });
    if (!hotel) {
      return res.json({ success: true, message: "No hotel found" });
    }

    const bookings = await Booking.find({ hotel: hotel._id })
      .populate("room hotel user")
      .sort({ createdAt: -1 });

    const totalBookings = bookings.length;
    const totalRevenu = bookings.reduce(
      (acc, booking) => acc + booking.totalPrice,
      0
    );

    res.json({
      success: true,
      dashboardData: { totalBookings, totalRevenu, bookings },
    });
  } catch (error) {
    res.json({ success: false, message: "Failed to fetch bookings" });
  }
};
