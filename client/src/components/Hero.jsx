import React from 'react'
import { assets, cities } from '../assets/assets'

const Hero = () => {
  return (
    <div className='hero'>
  <h1>Find Your Perfect Stay</h1>
  <p>Discover luxury hotels, cozy stays, and unforgettable experiences – all in one place.</p>
  <p>Best prices guaranteed with exclusive offers.</p>
  <p>24/7 customer support to help you anytime.</p>
  <form class="search-form">
  <div>
    <div class="label-row">
      <img src ={assets.calenderIcon}/>
      <label for="destinationInput">Destination</label>
    </div>
    <input list="destinations" id="destinationInput" type="text" placeholder="Type here" required />
    <datalist id='destination'>
    {cities.map((city,index)=>(
        <option value={city} key={index}></option>
    ))}
    </datalist>
  </div>

  <div>
    <div class="label-row">
      <img src={assets.calenderIcon}/>
      <label for="checkIn">Check in</label>
    </div>
    <input id="checkIn" type="date" />
  </div>

  <div>
    <div class="label-row">
      <img src={assets.calenderIcon}/>
      <label for="checkOut">Check out</label>
    </div>
    <input id="checkOut" type="date" />
  </div>

  <div class="guests">
    <label for="guests">Guests</label>
    <input min="1" max="4" id="guests" type="number" placeholder="0" />
  </div>

  <button type="submit">
    <img src={assets.searchIcon}/>
    <span>Search</span>
  </button>
</form>

</div>


  )
}

export default Hero
