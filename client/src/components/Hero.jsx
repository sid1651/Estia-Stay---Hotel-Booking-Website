import React, { useState } from 'react'
import { assets, cities } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Hero = () => {
  const [destination, setDestination] = useState('')
  const { navigate, getToken, axios, setSearchedCities } = useAppContext()

  const onSearch = async (e) => {
    e.preventDefault()
    navigate(`/rooms?destination=${destination}`)

    await axios.post(
      '/api/user/store-recent-search',
      { recentSearchCity: destination },
      { headers: { Authorization: `Bearer ${await getToken()}` } }
    )

    setSearchedCities((prevSearchedCity) => {
      const updatedSearchedCities = [...prevSearchedCity, destination]
      if (updatedSearchedCities.length > 3) {
        updatedSearchedCities.shift()
      }
      return updatedSearchedCities
    })
  }

  return (
    <div className="hero">
      <h1>Find Your Perfect Stay</h1>
      <p>
        Discover luxury hotels, cozy stays, and unforgettable experiences – all
        in one place.
      </p>
      <p>Best prices guaranteed with exclusive offers.</p>
      <p>24/7 customer support to help you anytime.</p>

      <form onSubmit={onSearch} className="search-form">
        <div>
          <div className="label-row">
            <img src={assets.calenderIcon} alt="calendar-icon" />
            <label htmlFor="destinationInput">Destination</label>
          </div>

          {/* ✅ Fixed datalist linking */}
          <input
            onChange={(e) => setDestination(e.target.value)}
            value={destination}
            list="destinations" // ✅ ID should match datalist below
            id="destinationInput"
            type="text"
            placeholder="Type here"
            required
          />

          <datalist id="destinations"> {/* ✅ changed to plural & matched above */}
            {cities.map((city, index) => (
              <option value={city} key={index}></option>
            ))}
          </datalist>
        </div>

        <div>
          <div className="label-row">
            <img src={assets.calenderIcon} alt="calendar-icon" />
            <label htmlFor="checkIn">Check in</label>
          </div>
          <input id="checkIn" type="date" />
        </div>

        <div>
          <div className="label-row">
            <img src={assets.calenderIcon} alt="calendar-icon" />
            <label htmlFor="checkOut">Check out</label>
          </div>
          <input id="checkOut" type="date" />
        </div>

        <div className="guests">
          <label htmlFor="guests">Guests</label>
          <input min="1" max="4" id="guests" type="number" placeholder="0" />
        </div>

        <button type="submit">
          <img src={assets.searchIcon} alt="search-icon" />
          <span>Search</span>
        </button>
      </form>
    </div>
  )
}

export default Hero
