import React from 'react'
import Hero from '../components/Hero'
import FeaturedDestination from '../components/FeaturedDestination'
import ExclusiveOffers from '../components/ExclusiveOffers'
import Testimonyal from '../components/Testimonyal'
import Newsletter from '../components/NewsLetter'
import Footer from '../components/footer'
import RecommendedHotel from '../components/RecomendedHotel'

const home = () => {
  return (
    <div>
      <Hero/>
      <RecommendedHotel/>
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
