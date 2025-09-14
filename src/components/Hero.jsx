import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import heroImage from "../assets/hero-image.png";
import { trackButtonClick, trackNewsletterSignup } from "../utils/analytics";
import { useTheme } from "../context/ThemeContext";

// --- Self-contained Typing Animation Component ---
// This component replaces the 'react-typed' library.
const TypingAnimation = ({ phrases, className }) => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");

  const TYPING_SPEED = 50;
  const DELETING_SPEED = 30;
  const DELAY_AFTER_TYPING = 1000;

  useEffect(() => {
    const handleTyping = () => {
      const currentPhrase = phrases[phraseIndex];
      const updatedText = isDeleting
        ? currentPhrase.substring(0, text.length - 1)
        : currentPhrase.substring(0, text.length + 1);

      setText(updatedText);

      if (!isDeleting && updatedText === currentPhrase) {
        setTimeout(() => setIsDeleting(true), DELAY_AFTER_TYPING);
      } else if (isDeleting && updatedText === "") {
        setIsDeleting(false);
        setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
      }
    };

    const timeout = setTimeout(
      handleTyping,
      isDeleting ? DELETING_SPEED : TYPING_SPEED
    );
    return () => clearTimeout(timeout);
  }, [text, isDeleting, phraseIndex, phrases]);

  return (
    <span className={className}>
      {text}
      <span className="typing-cursor"></span>
    </span>
  );
};

const Hero = () => {
  const [email, setEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { isDarkMode } = useTheme();
  const emailSectionRef = useRef(null);

  // focus:ring-2 focus:ring-offset-2
  const handleJumpClick = () => {
    if (emailSectionRef.current) {
      // scroll into view
      emailSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      emailSectionRef.current.classList.add(
        "ring-2",
        "ring-purple-500",
        "ring-offset-2",
        "rounded-2xl"
      );
      // add highlight effect
      emailSectionRef.current.classList.add("highlight");
      setTimeout(() => {
        emailSectionRef.current.classList.remove(
          "ring-2",
          "ring-purple-500",
          "ring-offset-2",
          "highlight",
          "rounded-2xl"
        );
      }, 1500); // remove highlight after 1.5seconds
    }
  };
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX /window.innerWidth - 0.5) * 20,
        y: (e.clientY /window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSend = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setError("Please enter an email address.");
      setTimeout(() => setError(""), 3000);
      return;
    }

    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      setTimeout(() => setError(""), 3000);
      return;
    }

    setError("");
    console.log("Email to send:", email);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 4000);
    setEmail("");
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const phrasesForTyping = useMemo(
    () => [
      "Startups 🚀",
      "Agencies 💼",
      "Creators 🎨",
      "Enterprises 🏢",
      "Freelancers 🌍",
      "Innovators 💡",
    ],
    []
  );

  return (
    <>
      <style>{`
        .typing-cursor {
          display: inline-block;
          width: 3px;
          height: 1em;
          background-color: ${isDarkMode ? "#a78bfa" : "#8b5cf6"};
          animation: blink 1s infinite;
          margin-left: 8px;
          vertical-align: middle;
          border-radius: 2px;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .typing-animation {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        }
      `}</style>
      <section
        id="home"
        className="relative flex flex-col md:flex-row justify-between items-center px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 md:pt-44 pb-16 container mx-auto overflow-hidden bg-transparent"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          className="w-full md:w-1/2 space-y-6 sm:space-y-8 md:space-y-12 relative z-10"
        >
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <div
              className={`flex items-center gap-3 w-fit px-6 py-3 rounded-full backdrop-blur-sm border transition-all cursor-pointer group relative overflow-hidden ${
                isDarkMode
                  ? "hover:bg-gray-700/20 border-gray-700/30 hover:border-gray-600/40"
                  : "hover:bg-gray-100/30 border-gray-200/30 hover:border-gray-300/40 shadow-sm hover:shadow-md"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-purple-500/0 opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
              <motion.span
                className="text-blue-600 text-lg relative z-10"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                ⭐
              </motion.span>
              <span
                onClick={handleJumpClick}
                className={`cursor-pointer text-xs font-semibold relative z-10 ${
                  isDarkMode ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Jump start your growth
              </span>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h1
              className={`text-4xl lg:text-5xl font-black leading-tight ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              We boost the{" "}
              <motion.span className="inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                growth
              </motion.span>{" "}
              for <br />
              <TypingAnimation
                phrases={phrasesForTyping}
                className={`font-bold typing-animation ${
                  isDarkMode ? "text-purple-400" : "text-purple-600"
                }`}
              />
            </h1>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className={`text-base max-w-xl ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Get the most accurate leads,{" "}
            <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              sales training
            </span>{" "}
            and conversions, tools and more — all within the same billing.
          </motion.p>

          {/* Corrected Email Input and Button */}
          <motion.div variants={itemVariants} className="relative max-w-lg">
            <div className="flex flex-col sm:flex-row gap-4 relative">
              <div
                ref={emailSectionRef}
                className="transition-all duration-500 relative flex-1 group"
              >
                <motion.input
                  type="email"
                  placeholder="abc@gmail.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setIsTyping(e.target.value.length > 0);
                  }}
                  // placeholder="Enter your email address"
                  whileFocus={{ scale: 1.02, y: -2 }}
                  className={`w-full px-6 py-4 border-2 rounded-2xl text-sm font-medium bg-transparent transition-all duration-500 ${
                    isDarkMode
                      ? "border-gray-600/50 text-white placeholder-gray-400"
                      : "border-gray-300/50 text-gray-700 placeholder-gray-500"
                  }`}
                />
                {email && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2"
                  >
                    <motion.span
                      className={`text-sm ${
                        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
                          ? "text-green-500"
                          : "text-orange-400"
                      }`}
                      animate={{
                        scale: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
                          ? [1, 1.1, 1]
                          : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "✓" : "@"}
                    </motion.span>
                  </motion.div>
                )}
              </div>

              <motion.button
                onClick={() => {
                  trackButtonClick("Hero Newsletter Button");
                  trackNewsletterSignup("hero_section");
                  handleSend();
                }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 20px 40px rgba(99, 102, 241, 0.45)",
                }}
                whileTap={{ scale: 0.95 }}
                disabled={!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)}
                className={`relative px-8 py-4 rounded-2xl font-semibold text-sm transition-all duration-400 shadow-lg group min-w-[140px] overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
                    ? "bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white "
                    : "bg-gray-300 text-gray-700 cursor-not-allowed"
                }`}
              >
                {email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
                  ? "Send 🚀"
                  : "Enter Email"}
              </motion.button>
            </div>

            {/* Success and Error Messages */}
            <AnimatePresence>

              {email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-red-500 text-sm mt-1"
                >
                  ⚠️ Please enter a valid email address.
                </motion.p>
              )}

              {showPopup && (
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.8 }}
                  className="absolute -bottom-16 left-0 bg-green-500 text-white px-6 py-3 rounded-xl text-sm"
                >
                  ✅ Email sent successfully!
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Right image column is unchanged */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            type: "spring",
            damping: 20,
          }}
          className="w-full md:w-1/2 mt-8 md:mt-0 pl-0 md:pl-12 relative"
          style={{
            transform: `translate(${-mousePosition.x * 0.5}px, ${
              -mousePosition.y * 0.5
            }px)`,
          }}
        >
          <div className="relative">
            {/* Glassmorphism colored boxes with full opacity */}
            <motion.div
              className={`absolute top-4 right-5/12 w-20 h-20 rounded-2xl backdrop-blur-sm border ${
                isDarkMode
                  ? "bg-gradient-to-br from-blue-500 to-cyan-400 border-blue-300/30"
                  : "bg-gradient-to-br from-blue-400 to-cyan-300 border-blue-200/50"
              }`}
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.6, duration: 0.6, type: "spring" }}
              whileHover={{ scale: 1.05, rotate: 5 }}
              style={{
                transform: `translate(${mousePosition.x * 0.3}px, ${
                  mousePosition.y * 0.3
                }px)`,
              }}
            />

            <motion.div
              className={`absolute -bottom-3 -left-3 w-20 h-20 rounded-2xl backdrop-blur-sm border ${
                isDarkMode
                  ? "bg-gradient-to-tr from-green-500 to-emerald-400 border-green-300/30"
                  : "bg-gradient-to-tr from-green-400 to-emerald-300 border-green-200/50"
              }`}
              initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.8, duration: 0.6, type: "spring" }}
              whileHover={{ scale: 1.05, rotate: -5 }}
              style={{
                transform: `translate(${-mousePosition.x * 0.2}px, ${
                  -mousePosition.y * 0.2
                }px)`,
              }}
            />

            <motion.img
              src={heroImage}
              alt="Team meeting"
              className="rounded-2xl shadow-2xl border border-white/20 relative z-10 backdrop-blur-3xl"
              whileHover={{ scale: 1.02 }}
            />
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Hero;
