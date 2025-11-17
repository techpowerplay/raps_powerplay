import React from "react";
import profile from "../assets/profile.png";
import timings from "../assets/timings.png";
import affordable from "../assets/affordable.png";
import delivery from "../assets/delivery.png";
import game from "../assets/game.png";
import { motion } from "framer-motion";

const usps = [
  {
    title: "Flexible Timings",
    description: "Rent when you want, return when done",
    icon: timings,
  },
  {
    title: "Affordable Rentals",
    description: "Play without burning your wallet",
    icon: affordable,
  },
  {
    title: "Delivery & Pickup",
    description: "We bring it to you and take it back",
    icon: delivery,
  },
  {
    title: "Wide Game Selection",
    description: "Your favorite titles, all in one place",
    icon: game,
  },
];

const Box = () => {
  return (
    <div className="w-screen relative left-1/2 -ml-[50vw] bg-[#1c140f] py-16 px-4 overflow-hidden">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ amount: 0.5 }} // 👈 re-animates every time it's in view
        className="max-w-6xl mx-auto text-center"
      >
        <h2 className="text-[#e87d0e] text-3xl md:text-5xl font-bold mb-3">
          Why choose RAPS?
        </h2>

        <p className="text-white text-sm md:text-lg max-w-2xl mx-auto text-center">
          Your go-to platform for hassle-free, on-demand PlayStation rentals.
        </p>
      </motion.div>

      {/* USP Cards */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.3 }} // 👈 re-animates on every scroll-in
        variants={{
          visible: {
            transition: { staggerChildren: 0.15 },
          },
        }}
        className="max-w-6xl mx-auto mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10"
      >
        {usps.map((usp, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: "easeOut" },
              },
            }}
            className="flex flex-col items-center text-center px-4"
          >
            {/* ICON with hover effect */}
            <motion.div
              whileHover={{
                scale: 1.1,
                boxShadow: "0px 4px 12px rgba(232, 125, 14, 0.3)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-16 h-16 mb-4 bg-[#ffebeb] rounded-full flex items-center justify-center"
            >
              <img src={usp.icon} alt={`${usp.title} Icon`} className="w-8 h-8" />
            </motion.div>

            <h3 className="text-white text-lg md:text-xl font-semibold mb-1">
              {usp.title}
            </h3>
            <p className="text-white text-base opacity-80 leading-relaxed">
              {usp.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Box;
