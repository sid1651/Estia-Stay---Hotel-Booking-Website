import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const MyBookings = () => {
  const { axios, getToken, user } = useAppContext();
  const [bookings, setBookings] = useState([]);

  const fetchUserBookings = async () => {
    try {
      const { data } = await axios.get("/api/bookings/user", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      console.log(data);
      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserBookings();
    }
  }, [user]);

  return (
    <div className="my-bookings-container">
      <header className="bookings-header">
        <h1>MY Bookings</h1>
        <p>
          Easily manage your past, current, and upcoming bookings and hotel
          reservations in one place.
        </p>
      </header>

      <div className="bookings-table">
        {/* Table Header */}
        <div className="bookings-table-header">
          <div>Hotels</div>
          <div>Date & Timings</div>
          <div>Payment</div>
        </div>

        {/* Booking Rows */}
        {bookings.map((booking) => {
          const checkIn = new Date(booking.checkInDate).toLocaleDateString();
          const checkOut = new Date(booking.checkOutDate).toLocaleDateString();
          const isPaidText = booking.isPaid ? "Paid" : "Not Paid";

          return (
            <div className="booking-row" key={booking._id}>
              {/* Hotel & Room Info */}
              <div className="booking-hotel">
                <img src={booking.room?.images[0]} alt={booking.hotel?.name} />
                <div className="hotel-info">
                  <p className="hotel-name">Hotel {booking.hotel?.name}</p>
                  <span className="room-type">
                    ({booking.room?.roomType} Bed)
                  </span>
                  <div className="hotel-extra">
                    <div className="booking-address">
                      <img src={assets.locationIcon} alt="location" />
                      <span>{booking.hotel?.address}</span>
                    </div>
                    <div className="booking-guests">
                      <img src={assets.guestsIcon} alt="guests" />
                      <span>Guest: {booking.guests}</span>
                    </div>
                    <p className="total-amout">Total ${booking.totalPrice}</p>
                  </div>
                </div>
              </div>

              {/* Date & Timings */}
              <div className="booking-dates">
                <p>Check-in: {checkIn}</p>
                <p>Check-out: {checkOut}</p>
              </div>

              {/* Payment Status */}
              <div
                className={`booking-payment ${
                  booking.isPaid ? "payment-paid" : "payment-unpaid"
                }`}
              >
                <p>{booking.isPaid ? "Paid" : "Not Paid"}</p>

                {!booking.isPaid?<button className="pay-button">Pay now</button>:"Alredy paid"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyBookings;
