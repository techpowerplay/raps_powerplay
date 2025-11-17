import React from 'react';
import { motion } from 'framer-motion';
import backImage from '../assets/back.png';
import { useNavigate } from 'react-router-dom';

const memberOffers = [
  {
    title: 'Hourly Offer',
    pricing: [
      { label: 1, price: 89 },
      { label: 2, price: 149 },
      { label: 3, price: 204 },
      { label: 4, price: 239 },
    ],
    unit: '₹/hr',
  },
  {
    title: 'Daily Offer',
    pricing: [
      { label: 1, price: 750 },
      { label: 2, price: 1000 },
      { label: 3, price: 1250 },
      { label: 4, price: 1500 },
    ],
    unit: '₹/day',
  },
  {
    title: 'Weekly Offer',
    pricing: [
      { label: 1, price: 3000 },
      { label: 2, price: 3700 },
      { label: 3, price: 4000 },
      { label: 4, price: 4200 },
    ],
    unit: '₹/week',
  },
];

const nonMemberOffers = [
  {
    title: 'Hourly Offer',
    pricing: [
      { label: 1, price: 109 },
      { label: 2, price: 179 },
      { label: 3, price: 239 },
      { label: 4, price: 279 },
    ],
    unit: '₹/hr',
  },
  {
    title: 'Daily Offer',
    pricing: [
      { label: 1, price: 950 },
      { label: 2, price: 1490 },
      { label: 3, price: 1450 },
      { label: 4, price: 1700 },
    ],
    unit: '₹/day',
  },
  {
    title: 'Weekly Offer',
    pricing: [
      { label: 1, price: 3200 },
      { label: 2, price: 3900 },
      { label: 3, price: 4200 },
      { label: 4, price: 4500 },
    ],
    unit: '₹/week',
  },
];

const OfferCard = ({ offer }) => {
  const memberData = memberOffers.find(o => o.title === offer.title);
  const nonMemberData = nonMemberOffers.find(o => o.title === offer.title);

  const renderControllerIcons = (num) => {
    return Array.from({ length: num }, (_, i) => (
      <span key={i} className="mr-1 text-[#e87d0e]">🎮</span>
    ));
  };

  return (
    <motion.div
      className="relative rounded-xl shadow-xl border border-[#e2c08d] p-6 text-center min-h-[380px] transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      style={{
        backgroundImage: `url(${backImage})`, // Use the imported image here
        backgroundSize: 'cover', // Ensure the image covers the entire div
        backgroundPosition: 'center', // Centers the image within the div
        boxShadow: 'inset 0 4px 12px rgba(0, 0, 0, 0.8)', // Ensure the inset shadow is applied
      }}
      initial={{ opacity: 0, scale: 1 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Apply max-w-full to avoid the text from overflowing */}
      <h3 className="text-3xl md:text-4xl font-bold text-[#e87d0e] mb-6 truncate max-w-full">
        {offer.title}
      </h3>

      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4 text-[0.7rem] sm:text-[1rem] md:text-[1.125rem]">
          {/* Columns */}
          <div className="font-semibold text-[#1c140f] text-left pl-4 pr-2 border-r-2 border-[#1c140f] bg-[#f5c970] rounded-lg p-4 table-hover shadow-lg">
            No of Controllers
          </div>
          <div className="font-semibold text-[#1c140f] text-left pl-4 pr-2 border-r-2 border-[#1c140f] bg-[#f5c970] rounded-lg p-4 table-hover shadow-lg">
            Standard Pricing (<span className="font-rupee">₹</span>/{nonMemberData.unit.split('/')[1]})
          </div>
          <div className="relative font-semibold text-[#1c140f] text-left pl-4 pr-2 border-r-2 border-[#1c140f] bg-[#f5c970] rounded-lg p-4 table-hover shadow-lg">
            <span className="absolute top-0 right-0 bg-[#e87d0e] text-white text-[0.6rem] sm:text-[0.7rem] md:text-[0.7rem] font-bold py-0.5 px-2 transform rotate-45 origin-top-right -translate-y-1/3 translate-x-1/2 rounded-bl-xl">
              Membership
            </span>
            Member Pricing (<span className="font-rupee">₹</span>/{nonMemberData.unit.split('/')[1]})
          </div>

          {memberData.pricing.map((item, idx) => (
            <React.Fragment key={idx}>
              <motion.div
                className="p-2 text-left flex items-center bg-[#f9e1b2] rounded-lg min-h-full shadow-lg"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                {renderControllerIcons(item.label)}
              </motion.div>

              <motion.div
                className="p-2 flex items-center justify-center text-base md:text-xl font-semibold text-black bg-[#f9e1b2] rounded-lg min-h-full shadow-lg overflow-hidden text-ellipsis whitespace-nowrap"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <span className="font-rupee">₹</span>{nonMemberData.pricing[idx].price}
              </motion.div>

              <motion.div
                className="p-2 flex items-center justify-center text-base md:text-xl font-semibold text-black bg-[#f9e1b2] rounded-lg min-h-full shadow-lg overflow-hidden text-ellipsis whitespace-nowrap"
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <span className="font-rupee">₹</span>{item.price}
              </motion.div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Offer = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo(0, 800); // Scrolls to the top of the page
  };

  return (
    <motion.div
      className="w-screen relative left-1/2 -ml-[50vw] py-20 px-4 overflow-hidden mt-16"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ amount: 0.2, once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-[92rem] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ amount: 0.5 }}
          className="text-center mb-12 max-w-3xl mx-auto space-y-4">
          <h2 className="text-[#e87d0e] text-3xl md:text-5xl font-bold mb-3">
            SPECIAL OFFERS JUST FOR YOU!
          </h2>
          <p className="text-white text-sm md:text-lg max-w-2xl mx-auto text-center">
            Discover exclusive offers on PlayStation rentals for all.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8">
          {memberOffers.map((offer, i) => (
            <OfferCard key={i} offer={offer} />
          ))}
        </div>

        <motion.div variants={textVariants} className="mt-7 text-center">
          <button
            onClick={() => handleNavigation('/contact')}
            className="custom-button w-fit">
            Enquire Now
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Offer;
