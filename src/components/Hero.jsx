import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import heroImage from "../assets/hero-image.png";
import { trackButtonClick, trackNewsletterSignup } from "../utils/analytics";
import { useTheme } from "../context/ThemeContext";

// Subtle animation variants
const subtleFadeIn = (direction = "up", delay = 0) => ({
  hidden: {
    opacity: 0,
    y: direction === "up" ? 20 : direction === "down" ? -20 : 0,
    x: direction === "left" ? 20 : direction === "right" ? -20 : 0,
  },
  show: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: "easeOut",
    },
  },
});

const subtleTextVariant = (delay = 0) => ({
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay,
      ease: "easeOut",
    },
  },
});

const Hero = () => {
  const [email, setEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState("");
  const { isDarkMode } = useTheme();

  const handleSend = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setError("Please enter an email address.");
      setTimeout(() => setError(""), 2000);
      return;
    }

    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      setTimeout(() => setError(""), 2000);
      return;
    }

    setError("");

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
          variants={subtleFadeIn("right", 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Star badge */}
          <div
            className={`flex items-center gap-2 w-fit px-4 py-2 rounded-full hover:bg-gray-100 transition-all duration-300 cursor-pointer group ${
              isDarkMode
                ? "bg-gray-800 hover:bg-gray-700"
                : "bg-gray-50 hover:bg-gray-100"
            }`}
          >
            <span className="text-blue-600 group-hover:scale-105 transition-transform duration-300">
              ★
            </span>
            <span
              className={`text-sm font-medium transition-colors duration-300 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Jump start your growth
            </span>
          </div>
        </motion.div>

        <motion.h1
          variants={subtleTextVariant(0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight transition-colors duration-300 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
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
          variants={subtleFadeIn("up", 0.3)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className={`text-lg md:text-xl max-w-xl -mt-2 transition-colors duration-300 ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Get the most accurate leads, sales people training and conversions,
          tools and more — all within the same one billing.
        </motion.p>

        <motion.div
          variants={subtleFadeIn("up", 0.4)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-wrap gap-3 max-w-md relative -mt-1"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className={`flex-1 px-6 py-2 min-[440px]:py-4 border rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all duration-300 ${
              isDarkMode
                ? "border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:ring-blue-900"
                : "border-gray-200 bg-white text-gray-600 placeholder-gray-500 focus:ring-blue-100"
            }`}
          />
          <button
            onClick={() => {
              trackButtonClick("Hero Newsletter Button");
              trackNewsletterSignup("hero_section");
              handleSend();
            }}
            className="bg-blue-600 text-white px-8 min-[440px]:py-4 py-2 rounded-xl
             transition-transform duration-300 ease-out
             hover:bg-blue-700 hover:translate-y-0.5 active:scale-95
             shadow-md hover:shadow-lg
             focus:outline-none focus:ring-0 focus:ring-offset-0"
>
            →
          </button>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -5, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg text-sm"
              >
                ⚠️ Invalid mail
              </motion.div>
            )}
          </AnimatePresence>

          {/* Popup Message */}
          <AnimatePresence>
            {showPopup && (
              <motion.div
                initial={{ opacity: 0, y: -5, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -5, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
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
        variants={subtleFadeIn("left", 0.5)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="w-full md:w-1/2 mt-16 md:mt-0 pl-0 md:pl-12"
      >
        <div className="relative">
          <img
            src={heroImage}
            alt="Team meeting"
            className="rounded-lg relative z-10 hover:scale-[1.02] transition-transform duration-500 ease-out"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;