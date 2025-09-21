import React from "react";
import { assets } from "../assets/assets";


const Newsletter = () => {
  return (
    <div className="newsletter-holder">
    <div className="newsletter-container">
      <div className="newsletter-header">
        <h1>Stay Inspired</h1>
        <p>
          Join our newsletter and be the first to discover new updates,
          exclusive offers, and inspiration.
        </p>
      </div>

      <div className="newsletter-form">
        <input
          type="text"
          className="newsletter-input"
          placeholder="Enter your email"
        />
        <button className="newsletter-button">
          Subscribe
          
           <img src={assets.arrowIcon} alt='arrow-Icon'/>
        </button>
      </div>

      <p className="newsletter-footer">
        By subscribing, you agree to our Privacy Policy and consent to receive
        updates.
      </p>
    </div>
    </div>
  );
};

export default Newsletter;
