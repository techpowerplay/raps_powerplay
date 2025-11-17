import React, { useState } from "react";
import Slider from "react-slick";
import { TestimonialsData } from "../mockData/data";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testimonials = () => {
    const [hoveredCard, setHoveredCard] = useState(null);

    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3, // ✅ ADD THIS
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "linear",
        pauseOnHover: true,
        pauseOnFocus: true,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 640, settings: { slidesToShow: 1 } },
        ],
    };

    return (
        <div className="w-screen relative left-1/2 -ml-[50vw] bg-[#1c140f] py-20 px-4 overflow-hidden mt-16">
            {/* Heading */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ amount: 0.5, once: false }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-center mb-12 max-w-3xl mx-auto space-y-4"
            >
                <h2 className="text-[#e87d0e] text-3xl md:text-5xl font-bold mb-3">
                    HEAR FROM OUR GAMERS
                </h2>
                <p className="text-white text-sm md:text-lg max-w-2xl mx-auto text-center">
                    Hear directly from players who’ve used RAPS for their PlayStation fix.
                </p>
            </motion.div>

            {/* Slider */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.5, once: false }}
                variants={{
                    visible: {
                        transition: { staggerChildren: 0.1 },
                    },
                }}
            >
                <Slider {...settings}>
                    {TestimonialsData.map((data) => (
                        <div key={data.id} className="px-4 py-2 overflow-hidden">
                            <motion.div
                                onMouseEnter={() => setHoveredCard(data.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: {
                                        opacity: 1,
                                        transition: { duration: 0.5, ease: "easeOut" },
                                    },
                                }}
                                whileHover={{ scale: 1.03 }}
                                style={{
                                    border: `2px solid ${hoveredCard === data.id ? "#e87d0e" : "#ffffff"
                                        }`,
                                    boxSizing: "border-box",
                                }}
                                className="flex flex-col gap-4 p-6 rounded-xl bg-[#0f0901] transition-all duration-300 shadow-sm hover:shadow-lg h-full"
                            >
                                {/* Top Row */}
                                <div className="flex justify-between items-center">
                                    {/* Left: Image + Name */}
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={data.img}
                                            alt={data.name}
                                            className="rounded-full w-16 h-16 object-cover border-2 border-[#e87d0e]"
                                        />
                                        <div>
                                            <p className="text-lg font-semibold text-white">{data.name}</p>
                                            <p className="text-sm text-[#aaaaaa]">{data.position}</p>
                                        </div>
                                    </div>

                                    {/* Right: Rating */}
                                    <div className="flex items-center gap-1 text-white font-medium text-base">
                                        {data.rating}
                                        <FaStar className="text-[#e87d0e]" />
                                    </div>
                                </div>

                                {/* Review Text */}
                                <div className="py-2 text-white opacity-90">
                                    <p className="text-base md:text-lg italic leading-relaxed">{data.text}</p>
                                </div>

                            </motion.div>
                        </div>
                    ))}
                </Slider>
            </motion.div>
        </div>
    );
};

export default Testimonials;
