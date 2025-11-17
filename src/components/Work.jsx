import React from "react";
import { motion } from "framer-motion";
import order from "../assets/order.svg";
import pickup from "../assets/pickup.svg";
import delivery from "../assets/delivery.svg";
import play from "../assets/play.svg";

// Step data for the roadmap
const roadmapSteps = [
  {
    title: "Place Your Order",
    description: "Select your games and rental period, then place your order.",
    icon: order,
  },
  {
    title: "Delivery",
    description: "We deliver the PlayStation and games to your doorstep.",
    icon: delivery,
  },
  {
    title: "Play Your Game",
    description: "Enjoy playing from the comfort of your home.",
    icon: play,
  },
  {
    title: "Pick Up",
    description: "We pick up the PlayStation and games when you're done.",
    icon: pickup,
  },
];

// Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const Work = () => {
  return (
    <div className="w-full py-16 px-4 text-white overflow-hidden mt-16">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ amount: 0.5 }} // Re-animates every time it's in view
        className="max-w-6xl mx-auto text-center"
      >
        <h2 className="text-[#e87d0e] text-3xl md:text-5xl font-bold mb-3">
          HOW IT WORKS
        </h2>
        <p className="text-sm md:text-lg max-w-2xl mx-auto">
          The simple 4-step process that brings the gaming experience to your doorstep.
        </p>
      </motion.div>

      {/* Roadmap Steps */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.3 }}
        variants={{
          visible: {
            transition: { staggerChildren: 0.15 },
          },
        }}
        className="max-w-6xl mx-auto mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10"
      >
        {roadmapSteps.map((step, i) => (
          <motion.div
            key={i}
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            className="flex flex-col items-center text-center px-4"
          >
            {/* Icon with hover effect */}
            <motion.div
              whileHover={{
                scale: 1.1,
                boxShadow: "0px 4px 12px (232, 125, 14, 0.3)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-full h-32 mb-4 flex items-center justify-center" // Fill the space
            >
              <img src={step.icon} alt={`${step.title} Icon`} className="w-full h-full object-contain" />
            </motion.div>

            <h3 className="text-white text-lg md:text-xl font-semibold mb-1">
              {step.title}
            </h3>
            <p className="text-white text-base opacity-80 leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Work;
