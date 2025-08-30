import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import { useTheme } from "../context/ThemeContext";
import { FaCheckCircle } from "react-icons/fa";
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";

const Partner = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { isDarkMode } = useTheme();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form Submitted ✅", formData); // you can replace with API call
    setShowPopup(true);

    // reset form after submit
    setFormData({
      name: "",
      email: "",
      company: "",
      message: "",
    });

    setTimeout(() => setShowPopup(false), 3000); // hide popup after 3s
  };

  return (
    <motion.section
      variants={fadeIn("up", 0.2)}
      initial="hidden"
      animate="show"
      className="pt-32 max-w-7xl mx-auto px-4 pb-24"
    >
      {/* Background Gradient Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-20 blur-3xl -z-10" />

      <motion.h1
        variants={textVariant(0.3)}
        className="text-5xl font-extrabold text-center mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
      >
        Become a Partner
      </motion.h1>

      <motion.p
        variants={fadeIn("up", 0.4)}
        className={`text-lg text-center max-w-2xl mx-auto mb-12 
          ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
      >
        Join hands with us to grow together. Fill out the form below, and our
        team will reach out soon!
      </motion.p>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        variants={fadeIn("up", 0.5)}
        className={`backdrop-blur-xl rounded-2xl p-10 max-w-2xl mx-auto space-y-6
          ${
            isDarkMode
              ? "bg-white/5 text-white border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
              : "bg-gray-50/70 text-gray-900 border-transparent shadow-[0_0_30px_rgba(59,130,246,0.25)]"
          }`}
      >
        {/* Name */}
        <div>
          <label
            className={`block font-semibold mb-2 ${
              isDarkMode ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your full name"
            className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 
              ${
                isDarkMode
                  ? "border-white/20 bg-gray-900/40 text-white placeholder-gray-300 focus:ring-pink-400"
                  : "border-gray-300 bg-white/80 text-gray-800 placeholder-gray-500 focus:ring-pink-400"
              }`}
            required
          />
        </div>

        {/* Email */}
        <div>
          <label
            className={`block font-semibold mb-2 ${
              isDarkMode ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 
              ${
                isDarkMode
                  ? "border-white/20 bg-gray-900/40 text-white placeholder-gray-300 focus:ring-purple-400"
                  : "border-gray-300 bg-white/80 text-gray-800 placeholder-gray-500 focus:ring-purple-400"
              }`}
            required
          />
        </div>

        {/* Company */}
        <div>
          <label
            className={`block font-semibold mb-2 ${
              isDarkMode ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Company Name
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Your company name"
            className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 
              ${
                isDarkMode
                  ? "border-white/20 bg-gray-900/40 text-white placeholder-gray-300 focus:ring-blue-400"
                  : "border-gray-300 bg-white/80 text-gray-800 placeholder-gray-500 focus:ring-blue-400"
              }`}
          />
        </div>

        {/* Message */}
        <div>
          <label
            className={`block font-semibold mb-2 ${
              isDarkMode ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your partnership proposal"
            rows="4"
            className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 
              ${
                isDarkMode
                  ? "border-white/20 bg-gray-900/40 text-white placeholder-gray-300 focus:ring-indigo-400"
                  : "border-gray-300 bg-white/80 text-gray-800 placeholder-gray-500 focus:ring-indigo-400"
              }`}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl font-semibold text-lg 
          bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 
          text-white shadow-lg hover:opacity-90 transition-all"
        >
          Submit
        </button>
      </motion.form>
      {/* Contact Info Cards */}

      {/* Contact Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-5xl mx-auto">
        {/* Address Card */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
          className={`group rounded-2xl p-6 backdrop-blur-xl 
      flex flex-col items-center text-center cursor-pointer
      ${
        isDarkMode
          ? "bg-white/5 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] text-white"
          : "bg-gray-50/70 border border-gray-200 shadow-[0_0_30px_rgba(59,130,246,0.25)] text-gray-900"
      }`}
        >
          <motion.div
            whileHover={{ scale: 1.3, rotate: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex items-center justify-center w-12 h-12 rounded-full 
                 bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg mb-4
                 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.7)]"
          >
            <FaMapMarkerAlt className="text-white text-xl" />
          </motion.div>
          <h3 className="text-lg font-semibold mb-1">Our Address</h3>
          <p className="text-sm opacity-80 leading-relaxed">
            123 BizFlow Street <br /> Mumbai, India
          </p>
        </motion.div>

        {/* Email Card */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
          className={`group rounded-2xl p-6 backdrop-blur-xl 
      flex flex-col items-center text-center cursor-pointer
      ${
        isDarkMode
          ? "bg-white/5 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] text-white"
          : "bg-gray-50/70 border border-gray-200 shadow-[0_0_30px_rgba(139,92,246,0.25)] text-gray-900"
      }`}
        >
          <motion.div
            whileHover={{ scale: 1.3, rotate: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex items-center justify-center w-12 h-12 rounded-full 
                 bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg mb-4
                 group-hover:shadow-[0_0_20px_rgba(147,51,234,0.7)]"
          >
            <FaEnvelope className="text-white text-xl" />
          </motion.div>
          <h3 className="text-lg font-semibold mb-1">Email Us</h3>
          <p className="text-sm opacity-80 leading-relaxed">
            contact@bizflow.com
          </p>
        </motion.div>

        {/* Phone Card */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
          className={`group rounded-2xl p-6 backdrop-blur-xl 
      flex flex-col items-center text-center cursor-pointer
      ${
        isDarkMode
          ? "bg-white/5 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] text-white"
          : "bg-gray-50/70 border border-gray-200 shadow-[0_0_30px_rgba(236,72,153,0.25)] text-gray-900"
      }`}
        >
          <motion.div
            whileHover={{ scale: 1.3, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex items-center justify-center w-12 h-12 rounded-full 
                 bg-gradient-to-r from-pink-500 to-red-500 shadow-lg mb-4
                 group-hover:shadow-[0_0_20px_rgba(236,72,153,0.7)]"
          >
            <FaPhone className="text-white text-xl" />
          </motion.div>
          <h3 className="text-lg font-semibold mb-1">Call Us</h3>
          <p className="text-sm opacity-80 leading-relaxed">+91 98765 XXXXX</p>
        </motion.div>
      </div>

      {/* Success Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-[9999] flex items-center gap-2"
          >
            <FaCheckCircle className="text-white text-xl" />
            <span>Your request has been submitted!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default Partner;
