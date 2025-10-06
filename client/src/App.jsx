import React from 'react'
import NavBar from './components/Navbar'
import { Routes, useLocation,Route } from 'react-router'
import Home from './pages/Home'
import Footer from './components/footer'
import AllRooms from './pages/AllRooms'
import RoomDetails from './pages/RoomDetails'
import MyBookings from './pages/MyBookings'
import HotelReg from './components/HotelReg'
import Layout from './pages/HotelOwner/Layout'
import Dashboard from './pages/HotelOwner/Dashboard'
import Addroom from './pages/HotelOwner/Addroom'
import Listroom from './pages/HotelOwner/Listroom'
import {Toaster} from 'react-hot-toast'
import { useAppContext } from './context/AppContext'


const App = () => {
  const isOwnerPath=useLocation().pathname.includes('owner')
  const {showHotelReg}=useAppContext()
  return (
    <div>
      <Toaster/>
      {!isOwnerPath&&
      <NavBar/>}
      {false&&<HotelReg/>}
      {showHotelReg && <HotelReg/>}
      <div>
        <Routes>
          <Route  path='/'  element={<Home/>}/>
          <Route  path='/rooms'  element={<AllRooms/>}/>
          <Route  path='/rooms/:id'  element={<RoomDetails/>}/>
          <Route  path='/my-bookings'  element={<MyBookings/>}/>
          <Route path='/owner' element={<Layout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path='add-room' element={<Addroom/>}/>
          <Route path='list-room' element={<Listroom/>}/>
          </Route>
        </Routes>
      </div>
      
<Footer/>
    </div>
  )
}

export default App
