import React, { useEffect, useState } from 'react'
import HotelCard from './HotelCard'
import Title from './Title'
import { useAppContext } from '../context/AppContext'

const RecommendedHotel = () => {
  const { rooms, searchedCities } = useAppContext()
  const [recommended, setRecommended] = useState([])

  const filterHotels = () => {
    if (!rooms.length) return

    if (searchedCities.length === 0) {
      setRecommended(rooms) // show all if nothing searched yet
      return
    }

    const filtered = rooms
      .slice()
      .filter(
        (room) =>
          room.hotel?.city &&
          searchedCities.some(
            (city) => city.toLowerCase() === room.hotel.city.toLowerCase()
          )
      )

    setRecommended(filtered)
  }

  useEffect(() => {
    filterHotels()
  }, [rooms, searchedCities])

  return (
    rooms.length > 0 && (
      <>
        <div className="Title">
          <Title
            Title="Recommended Hotels"
            subTitle="Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences."
          />
        </div>

        {recommended.slice(0, 6).map((room, index) => (
          <HotelCard key={room._id} room={room} index={index} />
        ))}

        <div className="btn-for-destination"></div>
      </>
    )
  )
}

export default RecommendedHotel
