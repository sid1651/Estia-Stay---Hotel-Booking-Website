import React from 'react'
import Hero from '../components/hero'
import FeaturedDestination from '../components/FeaturedDestination'
import ExclusiveOffers from '../components/ExclusiveOffers'
import Testimonyal from '../components/Testimonyal'
import Newsletter from '../components/NewsLetter'
import Footer from '../components/footer'

const home = () => {
  return (
    <div>
      <Hero/>
      <div className='hotel-show'>
        <FeaturedDestination/>
      </div>
      
        <ExclusiveOffers/>
      
      
        <Testimonyal/>
        <Newsletter/>
        
      
    </div>
  )
}

export default home
