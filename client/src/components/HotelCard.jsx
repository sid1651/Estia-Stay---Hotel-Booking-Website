import React from 'react'
import { Link } from 'react-router'
import { assets } from '../assets/assets'

const HotelCard = ({ room, index }) => {
  return (
    <Link to={'/rooms/' + room._id} onClick={() => scrollTo(0, 0)} key={room._id} className="hotel-card">
      <img src={room.images[0]} alt='' className="hotel-img" />

      {index % 2 === 0 && <p className="best-seller">Best Seller</p>}

      <div className="hotel-info">
        <div className="hotel-header">
          <p className="hotel-name">{room.hotel.name}</p>
          <div className="hotel-rating">
            <img src={assets.starIconFilled} alt='star icon' />
            <span>4.5</span>
          </div>
        </div>

        <div className="hotel-location">
          <img src={assets.locationIcon} alt="location-icon" />
          <span>{room.hotel.address}</span>
        </div>

        <div className="hotel-footer">
          <p className="hotel-price"><span>${room.pricePerNight}</span>/night</p>
          <button className="book-btn">Book Now</button>
        </div>
      </div>
    </Link>
  )
}

export default HotelCard
