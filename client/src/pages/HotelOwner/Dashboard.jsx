import React, { useEffect, useState } from 'react'
import { assets, dashboardDummyData } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext';

const Dashboard = () => {
    const {currency,user,getToken,toast,axios}=useAppContext()
    const [dashboardData,setDashboardData]=useState({
        bookings:[],
        totalBookings:0,
        totalRevenue:0,
    });

    const fetchDashboardData=async() =>{
        try{
const {data}=await axios.get('/api/bookings/hotel',{headers:{Authorization:`Bearer ${await getToken()}`}})
if(data.success){
    console.log(data.dashboardData)
    setDashboardData(data.dashboardData)
}else{
    toast.error(error.message)
}
        }catch(error){
toast.error(error.message)
        }
    }

    useEffect(()=>{
if(user){
    fetchDashboardData()
}
    },[user])
     return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>

      <div className="dashboard-stats">
        {/* Total Bookings */}
        <div className="stat-card">
            <img src={assets.totalBookingIcon} className="stat-icon" alt="Total Bookings"/>
            <div className="stat-info">
                <p className="stat-label">Total Bookings</p>
                <p className="stat-value">{dashboardData.totalBookings}</p>
            </div>
        </div>

        {/* Total Revenue */}
        <div className="stat-card">
            <img src={assets.totalRevenueIcon} className="stat-icon" alt="Total Revenue"/>
            <div className="stat-info">
                <p className="stat-label">Total Revenue</p>
                <p className="stat-value">{currency}{dashboardData.totalRevenu}</p>
            </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <h2 className="recent-title">Recent Bookings</h2>
      <div className="recent-bookings">
        <table className="bookings-table">
            <thead>
                <tr>
                    <th>User Name</th>
                    <th>Room Name</th>
                    <th>Total Amount</th>
                    <th>Payment Status</th>
                </tr>
            </thead>
            <tbody>
                {dashboardData.bookings.map((item,index)=>(
                    <tr  key={index}>
                        <td className='td-design'>{item.user.username}</td>
                        <td className='td-design'>{item.room.roomType}</td>
                        <td className='td-design'>{currency}{item.totalPrice}</td>
                        <td>
                            <button className={`payment-status ${item.isPaid ? 'paid' : 'pending'}`}>
                                {item.isPaid?'Completed':'Pending'}
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default Dashboard
