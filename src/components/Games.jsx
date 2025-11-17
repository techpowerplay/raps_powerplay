import React from "react";
import { motion } from "framer-motion";
import fifa from "../assets/fifa.avif"; // Replace with actual image
import gta from "../assets/gta.webp";
import cod from "../assets/cod.avif";
import wwe from "../assets/wwe.avif";
import games from "../assets/games.svg"; // Background image
import psplus from "../assets/psplus.svg"; // Background image
import g from "../assets/g.svg"; // Background image
import rocket from "../assets/rocket.svg"; // Background image


// Game data
const gamesData = [
    { id: 1, image: fifa },
    { id: 2, image: gta },
    { id: 3, image: cod },
    { id: 4, image: wwe },
];

// Animation Variants
const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const Games = () => {
    return (
        <div
            className="w-screen relative left-1/2 -ml-[50vw] py-16 px-4 overflow-hidden mt-16"
            style={{
                backgroundImage: `url(${games})`, // Apply the custom background image
                backgroundSize: "cover", // Ensure the image covers the entire div
                backgroundPosition: "center", // Center the background image
            }}
        >
            {/* Heading */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ amount: 0.5 }} // Re-animates every time it's in view
                className="max-w-6xl mx-auto text-center"
            >
                <h2 className="text-[#e87d0e] text-3xl md:text-5xl font-bold mb-3">
                    CURRENTLY TRENDING GAMES
                </h2>

                <p className="text-white text-sm md:text-lg max-w-2xl mx-auto text-center">
                    Explore the most popular games and join the action.
                </p>
            </motion.div>

            {/* Game Cards */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.3 }} // Re-animates on scroll-in
                variants={{
                    visible: {
                        transition: { staggerChildren: 0.15 },
                    },
                }}
                className="max-w-6xl mx-auto mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10"
            >
                {gamesData.map((game, i) => (
                    <motion.div
                        key={game.id}
                        variants={fadeIn} // Apply fade-in animation
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="relative bg-[#2e2e2e] rounded-lg shadow-lg"
                    >
                        {/* Game Image */}
                        <motion.img
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="w-full h-full object-cover rounded-lg"
                            src={game.image}
                            alt={`Game ${game.id}`}
                        />
                    </motion.div>
                ))}
            </motion.div>

            {/* Feature Highlights */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.3 }} // Re-animates on scroll-in
                variants={{
                    visible: {
                        transition: { staggerChildren: 0.15 },
                    },
                }}
                className="max-w-6xl mx-auto mt-14 flex flex-col sm:flex-row justify-between items-center gap-8 mb-0"
            >
                {/* PlayStation Plus Membership */}
                <motion.div
                    variants={fadeIn}
                    className="flex items-center space-x-2 text-white text-lg"
                >
                    <img src={psplus} alt="PlayStation Plus Icon" className="w-10 h-10" />
                    <span className="font-semibold">PlayStation Plus Membership</span>
                </motion.div>

                {/* New Favorite Games */}
                <motion.div
                    variants={fadeIn}
                    className="flex items-center space-x-2 text-white text-lg"
                >
                    <img src={rocket} alt="New Icon" className="w-10 h-10" />
                    <span className="font-semibold">Your New Favorite Games</span>
                </motion.div>

                {/* 99+ Games */}
                <motion.div
                    variants={fadeIn}
                    className="flex items-center space-x-2 text-white text-lg"
                >
                    <img src={g} alt="99+ Games Icon" className="w-10 h-10" />
                    <span className="font-semibold">99+ Games Available</span>
                </motion.div>
            </motion.div>

        </div>
    );
};

export default Games;
