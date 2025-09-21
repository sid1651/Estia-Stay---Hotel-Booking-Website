import React from 'react'
import { testimonials } from '../assets/assets'
import StarRating from './StarRating'

const Testimonyal = () => {
  return (
    <div className='testimonyal-container'>
        <h1 className='Testimonyal-h'>What Our Guest Say</h1>
      <p className='testimonyal-subtitle'>Discover why discerning travelers consitemtly
       choose Estia stay for there exclusive and luxurieous
        accomadation around the world</p>
       <div className="testimonials-wrapper">
  {testimonials.map((testimonial) => (
    <div key={testimonial.id} className="testimonial-card">
      <div className="testimonial-header">
        <img
          className="testimonial-avatar"
          src={testimonial.image}
          alt={testimonial.name}
        />
        <div>
          <p className="testimonial-name">{testimonial.name}</p>
          <p className="testimonial-address">{testimonial.address}</p>
        </div>
      </div>

      <div className="testimonial-rating">
        <StarRating/>
      </div>

      <p className="testimonial-review">"{testimonial.review}"</p>
    </div>
  ))}
</div>
 
    </div>
  )
}

export default Testimonyal
