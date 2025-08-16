import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import heroImage from "../assets/hero-image.png";
import { trackButtonClick, trackNewsletterSignup } from "../utils/analytics";

const Hero = () => {
  const [email, setEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleSend = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      alert("Please enter an email address.");
      return;
    }

    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    console.log("Email to send:", email);

    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
    setEmail("");
  };

  return (
    <section
      data-tour="hero"
      id="home"
      className="flex flex-col md:flex-row justify-between items-center px-4 sm:px-6 lg:px-8 pt-44 pb-16 container mx-auto"
    >
      {/* Left Column */}
      <div className="w-full md:w-1/2 space-y-6 pt-24 md:pt-0">
        <motion.div
          variants={fadeIn("right", 0.2)}
          initial="hidden"
          whileInView="show"
        >
          {/* Star badge */}
          <div className="flex  items-center gap-2 bg-gray-50 w-fit px-4 py-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer group">
            <span className="text-blue-600 group-hover:scale-110 transition-transform">
              ★
            </span>
            <span className="text-sm font-medium">Jump start your growth</span>
          </div>
        </motion.div>

        <motion.h1
          variants={textVariant(0.3)}
          initial="hidden"
          whileInView="show"
          className="text-4xl md:text-5xl lg:text-6xl  font-bold leading-tight"
        >
          We boost the growth for{" "}
          <span className="text-blue-600 relative inline-block">
            Startup to Fortune 500
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-200/60"></span>
          </span>{" "}
          Companies
          <span className="inline-block ml-2 animate-pulse">⏰</span>
        </motion.h1>
        <motion.p
          variants={fadeIn("up", 0.4)}
          initial="hidden"
          whileInView="show"
          className="text-gray-600 text-lg md:text-xl max-w-xl -mt-2"
        >
          Get the most accurate leads, sales people training and conversions,
          tools and more — all within the same one billing.
        </motion.p>

        <motion.div
          variants={fadeIn("up", 0.5)}
          initial="hidden"
          whileInView="show"
          className="flex gap-3 max-w-md relative -mt-1"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="flex-1 px-6 py-4 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100  transition-all text-gray-600"
          />
          <button
            onClick={() => {
              trackButtonClick("Hero Newsletter Button");
              trackNewsletterSignup("hero_section");
              handleSend();
            }}
            className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 cursor-pointer transition-all hover:shadow-lg hover:shadow-blue-100 active:scale-95"
          >
            →
          </button>
          {/* Popup Message */}
          <AnimatePresence>
            {showPopup && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg text-sm"
              >
                ✅ Email Sent!
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Right Column - Images */}
      <motion.div
        variants={fadeIn("left", 0.5)}
        initial="hidden"
        whileInView="show"
        className="w-full md:w-1/2 mt-16 md:mt-0 pl-0 md:pl-12"
      >
        <div className="relative">
          <img
            src={heroImage}
            alt="Team meeting"
            className="rounded-lg relative z-10 hover:scale-[1.02] transition-transform duration-300"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;

