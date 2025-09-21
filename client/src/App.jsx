import React from 'react'
import NavBar from './components/navbar'
import { Routes, useLocation,Route } from 'react-router'
import Home from './pages/home'
import Footer from './components/footer'
import AllRooms from './pages/AllRooms'
import RoomDetails from './pages/RoomDetails'


const App = () => {
  const isOwnerPath=useLocation().pathname.includes('owner')
  return (
    <div>
      {!isOwnerPath&&
      <NavBar/>}
      <div>
        <Routes>
          <Route  path='/'  element={<Home/>}/>
          <Route  path='/rooms'  element={<AllRooms/>}/>
          <Route  path='/rooms/:id'  element={<RoomDetails/>}/>
          
        </Routes>
      </div>
      
<Footer/>
    </div>
  )
}

export default App
