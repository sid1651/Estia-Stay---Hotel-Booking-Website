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


const App = () => {
  const isOwnerPath=useLocation().pathname.includes('owner')
  return (
    <div>
      {!isOwnerPath&&
      <NavBar/>}
      {false&&<HotelReg/>}
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
