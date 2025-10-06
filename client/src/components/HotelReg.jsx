import React from 'react'
import { assets, cities } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import { useState } from 'react'
import toast from 'react-hot-toast'


const HotelReg = () => {

  const {setShowHotelReg,axios,getToken,setIsOwner}=useAppContext()
  const [name,setName]=useState("")
  const [address,setAddress]=useState("")
  const [contact,setContact]=useState("")
  const [city,setCity]=useState("")

 const  onSubmitHandeler=async(event)=>{
    try{
      event.preventDefault();
      const {data}=await axios.post( `/api/hotels/`, {name,contact,address,city},{headers:{Authorization:`Bearer ${await getToken()}`}})
      if(data.success){
        toast.success(data.message)
        setIsOwner(true)
        setShowHotelReg(false)
      }else{
        toast.error(data.message)
      }
    }catch(error){
toast.error(error.message)
    }
  }
  return (
    <div onClick={()=>setShowHotelReg(false)} className="hotelreg-overlay">
      <form onSubmit={onSubmitHandeler} onClick={(e)=>e.stopPropagation()}className="hotelreg-modal">
        
        {/* Left Image */}
        <img 
          src={assets.regImage} 
          alt="hotel-register" 
          className="hotelreg-image"
        />

        {/* Right Content */}
        <div className="hotelreg-content">
          {/* Close Button */}
          <img 
            src={assets.closeIcon} 
            alt="close" 
            className="hotelreg-close"
            onClick={()=>setShowHotelReg(false)}
          />

          {/* Heading */}
          <p className="hotelreg-heading">Register Your Hotel</p>

          {/* Form Fields */}
          <div className="hotelreg-formfields">

            <input 
              type="text" 
              placeholder="Hotel Name" 
              className="hotelreg-input"
              required
              onChange={(e)=>setName(e.target.value)}
              value={name}
            />
            <input 
              type="number" 
              placeholder="Contact" 
              className="hotelreg-input"
              onChange={(e)=>setContact(e.target.value)}
              value={contact}
            />

            <input 
              type="text" 
              placeholder="Address" 
              className="hotelreg-input"
              onChange={(e)=>setAddress(e.target.value)}
              value={address}
            />


            <div>
                <label htmlFor="city"></label>
                <select id='city' required onChange={(e)=>setCity(e.target.value)} value={city}>
                    <option>Select City</option>
                    {cities.map((city)=>(
                        <option  key={city} value={city}>{city}</option>
                    ))}
                </select>
            </div>
            <button type="submit" className="hotelreg-button">
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default HotelReg
