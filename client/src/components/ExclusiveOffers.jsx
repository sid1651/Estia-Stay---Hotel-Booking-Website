import React from 'react'
import { assets, exclusiveOffers } from '../assets/assets'
import Title from './Title'

const ExclusiveOffers = () => {
  return (
    <div className='exclusive-main-container'>
      <div className='exclusive-mini-container'>
        <h1 className="exclusive-title">Exclusive Offers</h1>
        
        <button>View All Offers
            <img src={assets.arrowIcon} alt='arrow-icon' className='exclusive-offer-button'/>
        </button>
      </div>
      <p className="exclusive-subtitle">
          Take advantage of our limited-time offers and special packages to enhance your stay 
          and create unforgettable memories.
        </p>
        <div className="exclusive-cards-container">
  {exclusiveOffers.map((item) => (
    <div className="exclusive-card" key={item._id} style={{ backgroundImage: `url(${item.image})` }}>
      <div className="exclusive-card-content">
        <div className='exclusive-offer-off'>
            <p className="exclusive-card-discount">{item.priceOff}% OFF</p>
        </div>
        

        <h3 className="exclusive-card-title">{item.title}</h3>
        {/* <p className="exclusive-card-description">{item.description}</p> */}
        
      </div>
      <button className="exclusive-offer-btn">
        View Offers
        <img src={assets.arrowIcon} alt="arrow-icon" />
      </button>
    </div>
  ))}
</div>

    </div>
  )
}

export default ExclusiveOffers
