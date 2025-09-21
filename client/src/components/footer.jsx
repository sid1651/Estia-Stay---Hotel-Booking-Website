import React from "react";
import { assets } from "../assets/assets";


const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-sections">
        {/* Logo and About */}
        <div className="footer-about">
          <img
            src='/logo-no-bg.png'
            alt="logo"
            className="footer-logo"
          />
          <p>
            At Estia Stay, we believe every journey deserves a cozy home. Enjoy a warm, stress-free, and memorable experience with us — because comfort is our priority.
          </p>

          {/* Social Icons */}
          <div className="footer-socials">
            {/* Instagram */}
            <img src={assets.instagramIcon}/>
            <img src={assets.twitterIcon}/>
            <img src={assets.facebookIcon}/>
            <img src={assets.linkendinIcon}/>

          </div>
        </div>

        {/* Company */}
        <div>
          <p className="footer-title">COMPANY</p>
          <ul className="footer-links">
            <li><a href="#">About</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Partners</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <p className="footer-title">SUPPORT</p>
          <ul className="footer-links">
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Safety Information</a></li>
            <li><a href="#">Cancellation Options</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Accessibility</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-newsletter">
          <p className="footer-title">STAY UPDATED</p>
          <p className="footer-desc">
            Subscribe to our newsletter for inspiration and special offers.
          </p>
          <div className="footer-input-wrapper">
            <input type="text" placeholder="Your email" />
            <button>
              <svg
                className="icon-sm"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 12H5m14 0-4 4m4-4-4-4"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <hr className="footer-divider" />

      {/* Bottom Bar */}
      <div className="footer-bottom">
        
        <ul className="footer-bottom-links">
          <li><a href="#">Privacy</a></li>
          <li><a href="#">Terms</a></li>
          <li><a href="#">Sitemap</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
