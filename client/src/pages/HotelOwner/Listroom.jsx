import React, { useState } from 'react'
import { roomsDummyData } from '../../assets/assets'

const Listroom = () => {
  const [rooms, setRooms] = useState(roomsDummyData)

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
                <td className="table-body-cell">{item.amenities.join(', ')}</td>
                <td className="table-body-cells">{item.pricePerNight}</td>
                <td className="table-body-cell">
                  <label className="checkbox-label">
                    <input
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
