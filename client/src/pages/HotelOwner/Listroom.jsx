import React, { useEffect, useState } from 'react'
import { roomsDummyData } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Listroom = () => {
  const [rooms, setRooms] = useState([])
  const {axios,getToken,user,currency}=useAppContext()

  //fetch rooms of the hotel owner

  const fetchRooms =async ()=>{
    try{
const {data}=await axios.get('/api/rooms/owner',{headers:{Authorization:`Bearer ${await getToken()}`}})
if (data.success){
  setRooms(data.rooms)
}else{
  toast.error(data.message)
}
    }catch(error){
      toast.error(error.message)
    }
  }

const togelAvailability=async(roomId)=>{
  const {data}=await axios.post('/api/rooms/toggel_availibility',{roomId},{headers:{Authorization:`Bearer ${await getToken()}`}})
  if(data.success){
    toast.success(data.message)
    fetchRooms()
  }else{
    toast.error(data.message)
  }
}

  useEffect(()=>{
if(user){
  fetchRooms()
}
  },[user])

  return (
    <div className="listroom-container">
      <h1 className="listroom-title">Room Listing</h1>
      <p className="listroom-subtitle">All Rooms</p>

      <div className="recent-bookings">
        <table className="bookings-table">
          <thead>
            <tr className="table-header-row">
              <th className="table-header-cell">Name</th>
              <th className="table-header-cell">Facility</th>
              <th className="table-header-cell">Price /Night</th>
              <th className="table-header-cell">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((item, index) => (
              <tr key={index} className="table-body-row">
                <td className="table-body-cell">{item.roomType}</td>
<td className="table-body-cell">{Array.isArray(item.Amenities) ? item.Amenities.join(', ') : ''}</td>
                <td className="table-body-cells">{item.pricePerNight}{currency}</td>
                <td className="table-body-cell">
                  <label className="checkbox-label">
                    <input
                    onChange={()=>togelAvailability(item._id)}
                      type="checkbox"
                      checked={item.isAvailable}
                      readOnly
                      className="checkbox-input"
                    />
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Listroom
