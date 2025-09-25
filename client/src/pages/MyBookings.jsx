import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { userBookingsDummyData } from '../assets/assets'

const MyBookings = () => {
    const [bookings, setBookings] = useState(userBookingsDummyData)

    return (
        <div className="my-bookings-container">
            <header className="bookings-header">
                <h1>MY Bookings</h1>
                <p>Easily manage your past, current, and upcoming bookings and hotel reservations in one place.</p>
            </header>

            <div className="bookings-table">
                {/* Table Header */}
                <div className="bookings-table-header">
                    <div>Hotels</div>
                    <div>Date & Timings</div>
                    <div>Payment</div>
                </div>

                {/* Booking Rows */}
                {bookings.map((booking) => (
                    <div className="booking-row" key={booking._id}>

                        {/* Hotel Info + Address + Guests */}
                        <div className="booking-hotel">
                            <img src={booking.room.images[0]} alt={booking.hotel.name} />
                            <div className="hotel-info">
                                <p className="hotel-name">{booking.hotel.name}</p>
                                <span className="room-type">({booking.room.roomType})</span>
                                <div className="hotel-extra">
                                    <div className="booking-address">
                                        <img src={assets.locationIcon} alt="location" />
                                        <span>{booking.hotel.address}</span>
                                    </div>
                                    <div className="booking-guests">
                                        <img src={assets.guestsIcon} alt="guests" />
                                        <span>Guest: {booking.guests}</span>
                                    </div>
                                    <p className='total-amout'> Total ${booking.totalPrice}</p>
                                </div>
                            </div>
                        </div>

                        {/* Date & Timings */}
                        <div className="booking-date">
                            <div >
                                <p>Check-In</p>
                                <p className='p-booking'>{new Date(booking.checkInDate).toDateString()}</p>
                            </div>

                            <div>
                                <p>Check-Out</p>
                                <p className='p-booking'>{new Date(booking.checkOutDate).toDateString()}</p>
                            </div>
                        </div>

                        {/* Payment */}
                        <div className="booking-payment">
                            <div className={`payment-status ${booking.isPaid ? "paid" : "unpaid"}`}></div>
                            <p>{booking.isPaid ? "Paid" : "Unpaid"}</p>
                            {   !booking.isPaid&&( <button className='pay-now'>Pay Now</button>)
}
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyBookings
