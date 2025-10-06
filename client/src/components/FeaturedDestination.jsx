import React from 'react'
import HotelCard from './HotelCard'
import Title from './Title'
import { useNavigate } from 'react-router'
import { useAppContext } from '../context/AppContext'

const FeaturedDestination = () => {
  const {rooms,navigate}=useAppContext()
  return rooms.length>0&&(
    <>
    <div className='Title'><Title  Title='Featured Destination' subTitle='Discover our handpicked selection of exceptional properties around the world 
    ,offreing unparraleled luxury and unforgtabel experience' /></div>

      {rooms.slice(0,6).map((room,index)=>(
        
        <HotelCard key={room._id} room={room} index={index}/>

      ))}
      <div className='btn-for-destination'>
              <button className='show-desitnation-btn' onClick={()=>{navigate('/rooms')  ;  scrollto(0,0)}    }   >View All Destinatiom</button>

      </div>
    </>
  )
}

export default FeaturedDestination
