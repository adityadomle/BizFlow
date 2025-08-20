import { useState } from "react";
import { HiArrowRight } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address (e.g. user@gmail.com).");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/newsletter/subscribe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong. Try again.");
        return;
      }

      // ✅ success
      setError("");
      setShowPopup(true);
      setEmail("");

      setTimeout(() => setShowPopup(false), 3000);
    } catch (err) {
      console.error("Error subscribing:", err);
      setError("⚠ Failed to connect to server.");
    }
  };

  return (
    <section id="newsletter" className="section-container px-4 md:px-0">
      <motion.div
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView="show"
        className="bg-blue-600 rounded-2xl overflow-hidden"
      >
        <div className="relative md:px-16 px-6 py-16 md:py-24">
          {/* Background Gradient */}
          <motion.div
            variants={fadeIn("left", 0.4)}
            className="absolute top-0 right-0 w-1/2 h-full bg-blue-700 clip-path-slant hidden md:block"
          ></motion.div>

          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12">
            {/* Left Content */}
            <motion.div
              variants={fadeIn("right", 0.5)}
              className="text-white max-w-lg text-center md:text-left"
            >
              <motion.h2
                variants={textVariant(0.3)}
                className="text-2xl sm:text-3xl md:text-4xl font-medium mb-4"
              >
                Stay Updated with BizFlow
              </motion.h2>
              <motion.p
                variants={fadeIn("up", 0.6)}
                className="text-blue-100 text-sm sm:text-base"
              >
                Get the latest insights on business innovation, modern design
                trends, and technology solutions. Join our community of
                forward-thinking professionals.
              </motion.p>
            </motion.div>

            {/* Email Form */}
            <motion.div
              variants={fadeIn("left", 0.5)}
              className="w-full md:w-auto"
            >
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-4 sm:gap-0 relative"
              >
                <motion.input
                  variants={fadeIn("right", 0.7)}
                  type="email"
                  aria-label="Email address"
                  placeholder="Enter your business email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full sm:w-auto md:w-80 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-l-xl sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-500"
                  style={{ backgroundColor: "white" }}
                />
                <motion.button
                  type="submit"
                  variants={fadeIn("left", 0.7)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto cursor-pointer bg-blue-500 text-white transition-all duration-300 ease-in-out  px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-l-none sm:rounded-r-xl hover:bg-blue-400 hover:scale-105 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] flex items-center justify-center sm:justify-start gap-2"
                >
                  <span>Subscribe</span>
                  <HiArrowRight className="w-5 h-5" />
                </motion.button>

                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg text-sm max-w-xs text-center z-10"
                    >
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Success Message */}
                <AnimatePresence>
                  {showPopup && !error && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg text-sm max-w-xs text-center z-10"
                    >
                      ✅ Thank you for subscribing to BizFlow!
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <style>
        {`
          .clip-path-slant {
            clip-path: polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%);
          }
        `}
      </style>
    </section>
  );
};

export default NewsletterSection;
