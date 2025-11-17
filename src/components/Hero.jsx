import React from 'react';
import { motion } from 'framer-motion';
import joystick from '../assets/astro4.png';
import { useNavigate } from 'react-router-dom';

const textVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 50 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 1, ease: 'easeOut' } },
};

const Hero = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo(0, 800); // Scrolls to the top of the page
  };

  return (
    <section className="w-full min-h-screen grid grid-cols-1 z-0 lg:grid-cols-2 relative mt-[-120px] sm:mt-[-160px] md:mt-[-160px]">
      {/* Left Section */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute top-0 left-0 w-full h-[170vh] sm:h-full object-cover -z-100"
      >
        <source src="/assets/video4.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <motion.div
        className="flex flex-col justify-center px-6 sm:px-1 md:px-12 pt-32 text-white space-y-6 z-10 lg:pl-0 lg:pr-1 relative lg:mx-12 xl:mx-20 2xl:mx-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="text-[#e87d0e] text-3xl sm:text-4xl font-bold" variants={textVariants}>
          RENT A PLAYSTATION
        </motion.p>

        <motion.h1 className="text-5xl sm:text-6xl font-extrabold" style={{ lineHeight: '4.5rem' }} variants={textVariants}>
          <span className="block">SKIP THE STORES,</span>
          <span className="block">PLAY LIKE IT'S YOURS!</span>
        </motion.h1>

        <motion.p className="text-sm sm:text-base text-white/80 max-w-xl" style={{ lineHeight: '1.75rem' }} variants={textVariants}>
          Rent a PlayStation with your favorite games from just 90 rupees. Affordable, convenient, and hassle-free.
        </motion.p>

        <motion.div variants={textVariants}>
          <button
            onClick={() => handleNavigation('/contact')}
            className="custom-button w-fit">
            Get more details
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        className="relative flex justify-center items-center px-0 sm:px-0 md:px-0 py-20"
        variants={imageVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.img
          src={joystick}
          alt="Joystick"
          className="w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] object-contain"
          animate={{
            y: [0, -20, 0, 20, 0],
            x: [0, 10, 0, -10, 0],
            rotate: [0, 2, 0, -2, 0]
          }}
          transition={{
            y: {
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            },
            x: {
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            },
            rotate: {
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }
          }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;