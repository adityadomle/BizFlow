import React,{useEffect, useState} from "react";
import { motion,  AnimatePresence } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";


const Partner = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000); // hide after 3s
  };

  return (
    <motion.section
      variants={fadeIn("up", 0.2)}
      initial="hidden"
      animate="show"
      className="pt-32 max-w-7xl mx-auto px-4 pb-24"
    >
      <motion.h1
        variants={textVariant(0.3)}
        className="text-4xl font-bold text-center mb-4"
      >
        Become a Partner
      </motion.h1>

      <motion.p
        variants={fadeIn("up", 0.4)}
        className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-10"
      >
        Join hands with us to grow together. Fill out the form below, and our team will reach out soon!
      </motion.p>
      <motion.form
        onSubmit={handleSubmit}
        variants={fadeIn("up", 0.5)}
        className="bg-white shadow-lg rounded-lg p-8 max-w-xl mx-auto space-y-6"
      >
        <div>
          <label className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            type="text"
            placeholder="Your full name"
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Company Name</label>
          <input
            type="text"
            placeholder="Your company name"
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Message</label>
          <textarea
            placeholder="Tell us about your partnership proposal"
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
            rows="4"
          />
        </div>
         {/* Popup Above Submit Button */}
        <AnimatePresence>
          {showPopup && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg text-center"
            >
              ✅ Message Sent!
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Submit
        </motion.button>
      </motion.form>

      <motion.div
        variants={fadeIn("up", 0.6)}
        className="mt-16 text-center"
      >
        <h2 className="text-2xl font-bold mb-4">How to Reach Us</h2>
        <p className="text-gray-600">📍 123 BizFlow Street, Mumbai, India</p>
        <p className="text-gray-600">📧 contact@bizflow.com</p>
        <p className="text-gray-600">📞 +91 98765 XXXXX</p>
      </motion.div>
    </motion.section>
  );
};

export default Partner;