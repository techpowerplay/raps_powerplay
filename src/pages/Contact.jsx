import React, { useState } from 'react';
import { motion } from "framer-motion";
import phone from '../assets/phone.svg';
import email from '../assets/email.svg';
import instagram from '../assets/instagram.svg';
import location from '../assets/location.svg';
import customBackground from "../assets/rectangle.png";
import { SlideRight, SlideLeft } from "../utility/animation";
import { toast, ToastContainer } from 'react-toastify'; // Correct import 
import axios from "axios";


const Contact = () => {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    rentalDuration: '',
    deliveryDate: '',
    membershipStatus: '',
    interestInMembership: '',
    location: '',
    howHeard: '',
    additionalComments: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   

    // Save form data to Firestore
    try {
       //  Save to local Excel via backend
    await axios.post("http://localhost:5050/enquiry", formData);
     console.log("🚀 Enquiry Form Submitted!");

      // Show success toast
      toast.success("Form submitted successfully!", {
        autoClose: 5000,  // You can customize the duration
      });

      // Clear form fields after submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        rentalDuration: '',
        deliveryDate: '',
        membershipStatus: '',
        interestInMembership: '',
        location: '',
        howHeard: '',
        additionalComments: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);

      // Show error toast
      toast.error("Error submitting the form, please try again.", {
        autoClose: 5000,
      });
    }
  };
  return (
    <div className="w-full px-4 text-white">
       

      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }} // Start with low opacity and slightly higher position
        whileInView={{ opacity: 1, y: 0 }} // Fade in and move to normal position (down to up)
        transition={{ duration: 1, delay: 0.2 }} // Smooth transition
        viewport={{ once: true }} // Animate only the first time the element comes into view
        className="text-2xl text-center pt-8"
      >
        <h2 className="text-[#e87d0e] text-3xl md:text-5xl font-bold mb-3">
          GET IN TOUCH WITH US
        </h2>
        <p className="text-white text-sm md:text-lg max-w-2xl mx-auto text-center">
          We're here to answer your queries and offer the best PlayStation rentals.
        </p>
      </motion.div>

      {/* Contact Information and Google Map Section */}
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">

        {/* Google Map */}
        <motion.div
          variants={SlideRight(0.5)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className='w-full md:max-w-[480px]'
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241316.5950574475!2d72.8789412!3d19.08255545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1743314688324!5m2!1sen!2sin"
            width="100%" height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          variants={SlideLeft(0.5)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ lineHeight: "1.8" }}
          className='flex flex-col justify-center items-start gap-6'
        >
          <p className='font-semibold text-3xl text-[#e87d0e]'>Contact Information</p>

          {/* Contact Details with Custom Icons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-8">
            {/* Phone */}
            <a
              href="https://wa.me/+919321732794"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white no-underline hover:text-[#e87d0e] bg-transparent border-none transition-all duration-300 ease-in-out cursor-pointer"
            >
              <div className="flex items-center space-x-2 text-sm sm:text-base">
                <img src={phone} alt="Phone Icon" className="w-6 h-6" />
                <span>+91 93217 32794</span>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:support@rapspowerplay.com"
              className="text-white no-underline hover:text-[#e87d0e] bg-transparent border-none transition-all duration-300 ease-in-out cursor-pointer"
            >
              <div className="flex items-center space-x-2 text-sm sm:text-base">
                <img src={email} alt="Email Icon" className="w-6 h-6" />
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
                <img src={instagram} alt="Instagram Icon" className="w-6 h-6" />
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
                <img src={location} alt="Location Icon" className="w-6 h-6" />
                <span>Mumbai, Maharashtra</span>
              </div>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Contact Form */}
      <div
        className="w-screen relative left-1/2 -ml-[50vw] py-20 px-5 md:px-96 overflow-hidden mt-16"
        style={{
          backgroundImage: `url(${customBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
          className="text-3xl font-bold mb-6 text-center text-white"
        >
          ENQUIRY FORM
        </motion.h3>

        <motion.form
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
          onSubmit={handleSubmit} className="flex flex-col space-y-6">
          {/* Name Inputs */}
          <div className="flex gap-6 flex-col md:flex-row">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-4 bg-transparent border-2 border-solid border-gray-400 rounded-lg text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#e87d0e] focus:border-[#e87d0e] transition-all duration-300 font-poppins font-semibold"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-4 bg-transparent border-2 border-solid border-gray-400 rounded-lg text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#e87d0e] focus:border-[#e87d0e] transition-all duration-300 font-poppins font-semibold"
              required
            />
          </div>

          <div className="flex gap-6 flex-col md:flex-row">
            {/* Email Input */}
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full md:w-2/3 p-4 bg-transparent border-2 border-solid border-gray-400 rounded-lg text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#e87d0e] focus:border-[#e87d0e] transition-all duration-300 font-poppins font-semibold"
              required
            />

            {/* Phone Number Input */}
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full md:w-1/3 p-4 bg-transparent border-2 border-solid border-gray-400 rounded-lg text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#e87d0e] focus:border-[#e87d0e] transition-all duration-300 font-poppins font-semibold"
              required
            />
          </div>

          {/* Rental Duration (Select Input) */}
          <p className="text-white font-semibold mb-2">Select Rental Duration</p>
          <div className="flex flex-col sm:flex-row gap-6">
            <label className="flex items-center space-x-2 text-white">
              <input
                type="radio"
                name="rentalDuration"
                value="Hourly"
                checked={formData.rentalDuration === "Hourly"}
                onChange={handleChange}
                className="form-radio text-[#e87d0e] focus:ring-[#e87d0e] border-[#e87d0e]"
                required
              />
              <span>Hourly</span>
            </label>

            <label className="flex items-center space-x-2 text-white">
              <input
                type="radio"
                name="rentalDuration"
                value="Weekly"
                checked={formData.rentalDuration === "Weekly"}
                onChange={handleChange}
                className="form-radio text-[#e87d0e] focus:ring-[#e87d0e] border-[#e87d0e]"
                required
              />
              <span>Weekly</span>
            </label>

            <label className="flex items-center space-x-2 text-white">
              <input
                type="radio"
                name="rentalDuration"
                value="Monthly"
                checked={formData.rentalDuration === "Monthly"}
                onChange={handleChange}
                className="form-radio text-[#e87d0e] focus:ring-[#e87d0e] border-[#e87d0e]"
                required
              />
              <span>Monthly</span>
            </label>
          </div>

          {/* Preferred Delivery Date and Time */}
          <p className="text-white font-semibold mb-2">When do you need the PlayStation?</p>
          <div className="flex gap-4">
            <input
              type="date"
              name="deliveryDate"
              value={formData.deliveryDate}
              onChange={handleChange}
              className="w-full p-4 bg-transparent border-2 border-solid border-gray-400 rounded-lg text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#e87d0e] focus:border-[#e87d0e] transition-all duration-300"
              required
            />
          </div>

          {/* Membership Status - Are you a member? */}
          <p className="text-white font-semibold mb-2">Are you a member of RAPS?</p>
          <div className="flex flex-col sm:flex-row gap-6">
            <label className="flex items-center space-x-2 text-white">
              <input
                type="radio"
                name="membershipStatus"
                value="Yes"
                checked={formData.membershipStatus === "Yes"}
                onChange={handleChange}
                className="form-radio text-[#e87d0e] focus:ring-[#e87d0e] border-[#e87d0e]"
                required
              />
              <span>Yes</span>
            </label>

            <label className="flex items-center space-x-2 text-white">
              <input
                type="radio"
                name="membershipStatus"
                value="No"
                checked={formData.membershipStatus === "No"}
                onChange={handleChange}
                className="form-radio text-[#e87d0e] focus:ring-[#e87d0e] border-[#e87d0e]"
                required
              />
              <span>No</span>
            </label>
          </div>

          {/* Interest in Membership */}
          <div className="mt-6">
            <p className="text-white font-semibold mb-6"> If not, would you like to become one?</p>
            <div className="flex flex-col sm:flex-row gap-6">
              <label className="flex items-center space-x-2 text-white">
                <input
                  type="radio"
                  name="interestInMembership"
                  value="Yes"
                  checked={formData.interestInMembership === "Yes"}
                  onChange={handleChange}
                  className="form-radio text-[#e87d0e] focus:ring-[#e87d0e] border-[#e87d0e]"
                />
                <span>Yes, I am interested</span>
              </label>

              <label className="flex items-center space-x-2 text-white">
                <input
                  type="radio"
                  name="interestInMembership"
                  value="No"
                  checked={formData.interestInMembership === "No"}
                  onChange={handleChange}
                  className="form-radio text-[#e87d0e] focus:ring-[#e87d0e] border-[#e87d0e]"
                />
                <span>No, thank you</span>
              </label>
            </div>
          </div>

          <div className="flex gap-6 flex-col md:flex-row">
            {/* Location (Optional) */}
            <input
              type="text"
              name="location"
              placeholder="Your Location (City/Area)"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-4 bg-transparent border-2 border-solid border-gray-400 rounded-lg text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#e87d0e] focus:border-[#e87d0e] transition-all duration-300 font-poppins font-semibold"
              required
            />

            {/* How did you hear about us? */}
            <select
              name="howHeard"
              value={formData.howHeard}
              onChange={handleChange}
              className="w-full p-4 bg-transparent border-2 border-solid border-gray-400 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#e87d0e] focus:border-[#e87d0e] transition-all duration-300 font-poppins font-semibold"
              required
            >
              <option value="" className="text-black">How did you hear about us?</option>
              <option value="word_of_mouth" className="text-black">Word of Mouth</option>
              <option value="social_media" className="text-black">Social Media</option>
              <option value="google_search" className="text-black">Google Search</option>
              <option value="other" className="text-black">Other</option>
            </select>
          </div>

          {/* Additional Comments/Questions (Optional) */}
          <textarea
            name="additionalComments"
            value={formData.additionalComments}
            onChange={handleChange}
            placeholder="Any additional comments or questions?"
            className="w-full p-4 bg-transparent border-2 border-solid border-gray-400 rounded-lg text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#e87d0e] focus:border-[#e87d0e] transition-all duration-300 font-semibold"
            rows="5"
          />

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="custom-button w-fit py-4 bg-[#e87d0e] text-white font-bold rounded-lg transition-all duration-300 ease-in-out hover:bg-[#d68000]"
            >
              Get in touch
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default Contact;
