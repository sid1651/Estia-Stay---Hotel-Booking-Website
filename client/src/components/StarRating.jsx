import React from 'react';
import { assets } from '../assets/assets';

const StarRating = ({ rating = 4 }) => {
  return (
    <div className="flex gap-1"> {/* flex for horizontal layout, gap for spacing */}
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <img
            key={index} // Add key to prevent React warning
            src={rating > index ? assets.starIconFilled : assets.starIconOutlined}
            alt="star-icon"
            className="w-5 h-5" // optional, adjust size
          />
        ))}
    </div>
  );
};

export default StarRating;
