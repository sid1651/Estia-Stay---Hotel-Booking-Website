import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets, facilityIcons, roomCommonData,  } from "../assets/assets";
import StarRating from "../components/StarRating";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";


const RoomDetails = () => {
  const { id } = useParams();
  const {rooms,getToken,axios,navigate}=useAppContext()
  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [checkInDate,setCheckInDate]=useState(null);
  const [checkOutDate,setCheckOutDate]=useState(null);
  const [guest,setGuest]=useState(1);

  const [isAvailable,setIsAvailabel]=useState(false)
  
const checkAvailibility=async()=>{
  try{
if(checkInDate>=checkOutDate){
  toast.error('check in date shode be less than check out date')
  return
}
const {data}=await axios.post('/api/bookings/check-availability',{room:id,checkInDate,checkOutDate})
if (data.success){
  if(data.isAvailable){
    setIsAvailabel(true)
    toast.success('Room is availabel')
  }else{
    setIsAvailabel(false)
    toast.error('Room is not availabel')
  }
}else{
  toast.error(data.message)
}
  }catch(error){
toast.error(error.message)
  }
}


const onSubmitHandeler=async(e)=>{
try{
e.preventDefault();
if(!isAvailable){
  return checkAvailibility()
}else{
   const {data}=await axios.post('/api/bookings/book',{room:id,checkInDate,checkOutDate,guests: guest,paymentMethod:'pay at hotel'},{headers:{Authorization:`Bearer ${await getToken()}`}})
  if(data.success){
    toast.success(data.message)
    navigate('/my-booking')
    scrollTo(0,0)
  }else{
    toast.error(data.message)
  }
}
}catch(error){
  toast.error(error.message)
}
}
  useEffect(() => {
  const room = rooms.find(room => room._id === id);
  room && setRoom(room);
  room && setMainImage(room.images[0]);
}, [rooms]);


  if (!room) return <p className="loading">Loading Room...</p>;

  return (
    <div className="room-details-container">
      {/* Header */}
      <div className="room-header">
        <h1 className="room-title">
          {room.hotel.name} <span className="room-type">{room.roomType}</span>
        </h1>
        <p className="discount-tag">🔥 20% Off</p>
      </div>

      {/* Reviews */}
      <div className="room-reviews-section">
        <StarRating />
        <p className="reviews-count">200+ reviews</p>
      </div>

      {/* Address */}
      <div className="room-location">
        <img
          src={assets.locationIcon}
          alt="location-icon"
          className="location-icon"
        />
        <span className="room-address">{room.hotel.address}</span>
      </div>

      {/* Images */}
      <div className="room-images">
        <div className="main-image-wrapper">
          <img src={mainImage} alt="Room" className="main-image" />
        </div>
        <div className="thumbnail-gallery">
          {room.images.length > 1 &&
            room.images.map((image, index) => (
              <img
                src={image}
                key={index}
                alt="Room Thumbnail"
                className={`thumbnail ${
                  mainImage === image ? "active-thumb" : ""
                }`}
                onClick={() => setMainImage(image)}
              />
            ))}
        </div>
      </div>
<div className="room-extra-section">
  {/* Amenities + Price in one row */}
  <div className="amenities-price-row">
    <div className="amenities-list">
  {room.Amenities?.length > 0 ? (
    room.Amenities.map((item, index) => (
      <div className="amenity-pill" key={index}>
        <img src={facilityIcons[item]} alt={item} className="amenity-icon" />
        <span>{item}</span>
      </div>
    ))
  ) : (
    <p>No amenities listed.</p>
  )}
</div>

    <p className="room-price">${room.pricePerNight}/night</p>
  </div>
</div>

{/* Booking Form */}
<form onSubmit={onSubmitHandeler} className="booking-form">
  <div className="form-inline">
    <div className="form-group">
      <label htmlFor="checkInDate">Check-In</label>
      <input onChange={(e)=>setCheckInDate(e.target.value)} min={new Date().toISOString().split('T')[0]}    type="date" id="checkInDate" />
    </div>

    <div className="form-group">
      <label htmlFor="checkOutDate">Check-Out</label>
      <input onChange={(e)=>setCheckOutDate(e.target.value)} min={checkInDate}  disabled={!checkInDate} type="date" id="checkOutDate" />
    </div>

    <div className="form-group">
      <label htmlFor="guest">Guests</label>
      <input onChange={(e)=>setGuest(e.target.value)} value={guest} type="number" id="guest" placeholder="0" required />
    </div>

    <button type="submit" className="book-btn">{isAvailable?"Book Now":"Check Availability"}</button>
  </div>
</form>
      <div className="room-specs">
  {roomCommonData.map((spec, index) => (
    <div className="spec-item" key={index}>
      <img src={spec.icon} alt={spec.title} className="spec-icon" />
      <div className="spec-text">
        <p className="spec-title">{spec.title}</p>
        <p className="spec-description">{spec.description}</p>
      </div>
    </div>
  ))}
</div>

{/* Divider Line */}
<div className="spec-divider">
  <p className="divider-line">  Guests will be allocated on the ground floor according to availability. You get a 
  comfortable two-bedroom apartment that has a true city feeling. The price quoted 
  is for two guests; at the guest slot, please mark the number of guests to get the 
  exact price for groups. The guests will be allocated ground floor according to 
  availability. You get the comfortable two-bedroom apartment that has a true city feeling.</p>

  

</div>
<div className="host-section">
  <div className="host-info">
    <img src={room.hotel?.owner?.image} alt="Host" className="host-image" />
    <div className="host-details">
      <p className="hosted-by">Hosted by {room.hotel.name}</p>
      <div className="host-reviews">
        <StarRating />
        <p className="reviews-count">200+ reviews</p>
      </div>
    </div>
  </div>
<button className="contact-btn">Contact Now</button>
</div>




    </div >
  );
};

export default RoomDetails;
