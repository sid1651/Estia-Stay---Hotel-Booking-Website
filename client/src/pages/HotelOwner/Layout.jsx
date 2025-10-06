import React, { useEffect, useState } from 'react'
import Navbar from '../../components/HotelOwner/Navbar'
import Sidebar from '../../components/HotelOwner/Sidebar'
import { Outlet } from 'react-router'
import { useAppContext } from '../../context/AppContext'

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const {isOwner,navigate}=useAppContext()
  useEffect(()=>{
if(!isOwner){
  navigate('/')
}
  },[isOwner])

  return (
    <div className="layout-container">
      <Navbar />
      <div className="layout-body">
        {/* Sidebar */}
        <div className={`sidebar-wrapper ${isSidebarOpen ? "open" : ""}`}>
          <Sidebar />
        </div>

        {/* Toggle button (only visible on mobile) */}
        <button 
          className="sidebar-toggle" 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          ☰
        </button>

        {/* Content */}
        <div className="layout-content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout
