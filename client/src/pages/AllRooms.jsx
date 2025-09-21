import React, { useState } from 'react'
import { assets, facilityIcons, roomsDummyData } from '../assets/assets'
import { useNavigate } from 'react-router'
import StarRating from '../components/StarRating';

const AllRooms = () => {
  const navigate = useNavigate();
  const [openFilters,setOpenFilters]=useState(false);
  const CheckBox=({label,selected=false,onchange=()=>{}})=>{
    return(
    <label>
        <input type='checkbox' checked={selected} onChange={(e)=>onChange(e.target.checked,label)}/>
        <span>{label}</span>
    </label>
    )
  }


  const RadioButton=({label,selected=false,onchange=()=>{}})=>{
    return(
    <label>
        <input type='radio' name='sortOption'checked={selected} onChange={()=>onChange(label)}/>
        <span>{label}</span>
    </label>
    )
  }
  const roomTypes=[
    'Singel Bed',
    'Doubule Bed',
    'Luxury Room',
    'Family Suites',
  ]

  const priceRange=[
    '0 to 500',
    '500 to 1000',
    '1000 to 2000',
    '2000 to 3000',
  ]

  const sortOptions=[
    'Price Low to High',
    'Price High to Low',
    'Newest First'
  ]
  return (
    <div className="all-rooms-container">
  <div className="rooms-layout">
    
    {/* Filters Section */}
    <div className="filters-box">
      <div className="filters-header">
        <h2>Filters</h2>
        <span className="clear-filter">Clear</span>
      </div>

      <div className="filters-content">
        <p className="filter-title">Popular Filters</p>
        <p className="filter-title">Room Type</p>
        {roomTypes.map((room, index) => (
          <CheckBox key={index} label={room} />
        ))}

        <p className="filter-title">Price Range</p>
        {priceRange.map((range, index) => (
          <CheckBox key={index} label={`$${range}`} />
        ))}

        <p className="filter-title">Sort By</p>
        {sortOptions.map((option, index) => (
          <RadioButton key={index} label={option} />
        ))}
      </div>
    </div>

    {/* Rooms Section */}
    <div className="rooms-list">
      {roomsDummyData.map((room) => (
        <div className="room-card" key={room._id}>
          <div className="room-image-wrapper">
            <img
              src={room.images[0]}
              alt="hotel-img"
              onClick={() => {
                navigate(`/rooms/${room._id}`);
                scrollTo(0, 0);
              }}
            />
          </div>
          <div className="room-info">
            <p className="room-city">{room.hotel.city}</p>
            <p className="room-name">{room.hotel.name}</p>

            <div className="room-reviews">
              <StarRating />
              <p>200+ reviews</p>
            </div>

            <div className="room-address">
              <img src={assets.locationIcon} alt="location-icon" />
              <span>{room.hotel.address}</span>
            </div>

            <div className="amenities">
              {room.amenities.map((item, index) => (
                <div className="amenity" key={index}>
                  <img src={facilityIcons[item]} alt={item} />
                  <p>{item}</p>
                </div>
              ))}
            </div>

            <p className="aminities-p">${room.pricePerNight}</p>
            <p>/Day</p>
          </div>
        </div>
      ))}
    </div>

  </div>
</div>

  );
};

export default AllRooms;
