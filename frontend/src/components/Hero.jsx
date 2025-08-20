import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import heroImage from "../assets/hero-image.png";
import { trackButtonClick, trackNewsletterSignup } from "../utils/analytics";
import { useTheme } from "../context/ThemeContext";

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
          variants={fadeIn("right", 0.2)}
          initial="hidden"
          whileInView="show"
        >
          {/* Star badge */}
          <div
            className={`flex items-center gap-2 w-fit px-4 py-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer group ${
              isDarkMode
                ? "bg-gray-800 hover:bg-gray-700"
                : "bg-gray-50 hover:bg-gray-100"
            }`}
          >
            <span className="text-blue-600 group-hover:scale-110 transition-transform">
              ★
            </span>
            <span
              className={`text-sm font-medium transition-colors ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Jump start your growth
            </span>
          </div>
        </motion.div>

        <motion.h1
          variants={textVariant(0.3)}
          initial="hidden"
          whileInView="show"
          className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight transition-colors ${
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
          variants={fadeIn("up", 0.4)}
          initial="hidden"
          whileInView="show"
          className={`text-lg md:text-xl max-w-xl -mt-2 transition-colors ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Get the most accurate leads, sales people training and conversions,
          tools and more — all within the same one billing.
        </motion.p>

        <motion.div
          variants={fadeIn("up", 0.5)}
          initial="hidden"
          whileInView="show"
          className="flex flex-wrap gap-3 max-w-md relative -mt-1"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className={`flex-1 px-6 py-2 min-[440px]:py-4  border rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all ${
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
            className="bg-blue-600 text-white px-8 min-[440px]:py-4 py-2 rounded-xl hover:bg-blue-700 cursor-pointer transition-all hover:shadow-lg hover:shadow-blue-100 active:scale-95"
          >
            →
          </button>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
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
