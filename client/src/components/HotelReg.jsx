import React from 'react'
import { assets, cities } from '../assets/assets'


const HotelReg = () => {
  return (
    <div className="hotelreg-overlay">
      <form className="hotelreg-modal">
        
        {/* Left Image */}
        <img 
          src={assets.regImage} 
          alt="hotel-register" 
          className="hotelreg-image"
        />

        {/* Right Content */}
        <div className="hotelreg-content">
          {/* Close Button */}
          <img 
            src={assets.closeIcon} 
            alt="close" 
            className="hotelreg-close"
          />

          {/* Heading */}
          <p className="hotelreg-heading">Register Your Hotel</p>

          {/* Form Fields */}
          <div className="hotelreg-formfields">

            <input 
              type="text" 
              placeholder="Hotel Name" 
              className="hotelreg-input"
              required
            />
            <input 
              type="number" 
              placeholder="Contact" 
              className="hotelreg-input"
            />

            <input 
              type="text" 
              placeholder="Address" 
              className="hotelreg-input"
            />


            <div>
                <label htmlFor="city"></label>
                <select id='city' required>
                    <option>Select City</option>
                    {cities.map((city)=>(
                        <option  key={city} value={city}>{city}</option>
                    ))}
                </select>
            </div>
            <button type="submit" className="hotelreg-button">
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default HotelReg
