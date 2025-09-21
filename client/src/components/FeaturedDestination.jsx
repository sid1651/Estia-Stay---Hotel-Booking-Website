import React from 'react'
import { roomsDummyData } from '../assets/assets'
import HotelCard from './HotelCard'
import Title from './Title'
import { useNavigate } from 'react-router'

const FeaturedDestination = () => {
    const navigate=useNavigate();
  return (
    <>
    <div className='Title'><Title  Title='Featured Destination' subTitle='Discover our handpicked selection of exceptional properties around the world 
    ,offreing unparraleled luxury and unforgtabel experience' /></div>

      {roomsDummyData.slice(0,6).map((room,index)=>(
        
        <HotelCard key={room._id} room={room} index={index}/>

      ))}
      <div className='btn-for-destination'>
              <button className='show-desitnation-btn' onClick={()=>{navigate('/rooms')  ;  scrollto(0,0)}    }   >View All Destinatiom</button>

      </div>
    </>
  )
}

export default FeaturedDestination
