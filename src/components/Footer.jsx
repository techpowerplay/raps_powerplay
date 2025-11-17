import React from 'react';
import logo from "../assets/logo.png";
import phone from "../assets/phone.svg"; // Custom phone icon
import email from "../assets/email.svg"; // Custom email icon
import instagram from "../assets/instagram.svg"; // Custom Instagram icon
import location from "../assets/location.svg"; // Custom location icon
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo(0, 0); // Scrolls to the top of the page
  };

  return (
    <div className="bg-black text-white pt-8 pb-7">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-8">
          {/* Logo and Description */}
          <div>
            <img
              src={logo}
              alt="Logo"
              className="h-8 sm:h-12 w-auto object-contain drop-shadow-md"
            />
            <p className="text-sm sm:text-base mb-4 mt-4 text-justify">
              RAPS offers affordable PlayStation rentals with flexible plans for all gamers. Enjoy the latest consoles and games at home without the long-term commitment. Convenient delivery and pickup make gaming easy and accessible.
            </p>
          </div>

          {/* About Us */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-white">Navigation</h3>
            <ul className="list-none space-y-1">
              <li>
                <button
                  onClick={() => handleNavigation('/')}
                  className="text-sm sm:text-base text-white no-underline hover:text-[#e87d0e] bg-transparent border-none transition-all duration-300 ease-in-out cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('/about')}
                  className="text-sm sm:text-base text-white no-underline hover:text-[#e87d0e] bg-transparent border-none transition-all duration-300 ease-in-out cursor-pointer"
                >
                  About us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('/contact')}
                  className="text-sm sm:text-base text-white no-underline hover:text-[#e87d0e] bg-transparent border-none transition-all duration-300 ease-in-out cursor-pointer"
                >
                  Contact us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('/terms')}
                  className="text-sm sm:text-base text-white no-underline hover:text-[#e87d0e] bg-transparent border-none transition-all duration-300 ease-in-out cursor-pointer"
                >
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
            {/* Contact Details with Custom Icons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-1">
              {/* Phone */}
              <a
                href="https://wa.me/+919321732794"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white no-underline hover:text-[#e87d0e] bg-transparent border-none transition-all duration-300 ease-in-out cursor-pointer"
              >
                <div className="flex items-center space-x-2 text-sm sm:text-base">
                  <img src={phone} alt="Phone Icon" className="w-4 h-4" />
                  <span>+91 93217 32794</span>
                </div>
              </a>

              {/* Gmail */}
              <a
                href="mailto:support@rapspowerplay.com"
                className="text-white no-underline hover:text-[#e87d0e] bg-transparent border-none transition-all duration-300 ease-in-out cursor-pointer"
              >
                <div className="flex items-center space-x-2 text-sm sm:text-base">
                  <img src={email} alt="Email Icon" className="w-4 h-4" />
                  <span>support@rapspowerplay.com</span>
                </div>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/raps.powerplay/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white no-underline hover:text-[#e87d0e] bg-transparent border-none transition-all duration-300 ease-in-out cursor-pointer"
              >
                <div className="flex items-center space-x-2 text-sm sm:text-base">
                  <img src={instagram} alt="Instagram Icon" className="w-4 h-4" />
                  <span>@raps.powerplay</span>
                </div>
              </a>

              {/* Location */}
              <a
                href="https://maps.app.goo.gl/yBfK1rQcYKXyD6Qt5"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white no-underline hover:text-[#e87d0e] bg-transparent border-none transition-all duration-300 ease-in-out cursor-pointer"
              >
                <div className="flex items-center space-x-2 text-sm sm:text-base">
                  <img src={location} alt="Location Icon" className="w-4 h-4" />
                  <span>Mumbai, Maharashtra</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* White Separator Line with Inline CSS */}
      <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.5)', marginTop: '32px', marginBottom: '25px' }}></div>

      {/* Copyright */}
      <div className="text-center text-sm">
        <p>Copyright © {new Date().getFullYear()} RAPS Powerplay. All rights reserved.</p>

      </div>
    </div>
  );
};

export default Footer;
