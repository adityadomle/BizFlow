import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import heroImage from "../assets/hero-image.png";
import { trackButtonClick, trackNewsletterSignup } from "../utils/analytics";
import { useTheme } from "../context/ThemeContext";

const Hero = () => {
  const [email, setEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { isDarkMode } = useTheme();

  // Mouse tracking for subtle parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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

  // Animated text variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  const floatingVariants = {
    initial: { y: 0, rotate: 0 },
    animate: {
      y: [-10, 10, -10],
      rotate: [-1, 1, -1],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section
      data-tour="hero"
      id="home"
      className="relative flex flex-col md:flex-row justify-between items-center px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 md:pt-44 pb-16 container mx-auto overflow-hidden bg-transparent"
    >
      {/* Left Column */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full md:w-1/2 space-y-6 sm:space-y-8 md:space-y-12 pt-0 md:pt-0 relative z-10"
      >
        {/* Enhanced Star Badge */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative"
        >
          <div
            className={`flex items-center gap-3 w-fit px-6 py-3 rounded-full backdrop-blur-sm border transition-all cursor-pointer group relative overflow-hidden bg-transparent ${
              isDarkMode
                ? "hover:bg-gray-700/20 border-gray-700/30 hover:border-gray-600/40"
                : "hover:bg-gray-100/30 border-gray-200/30 hover:border-gray-300/40 shadow-sm hover:shadow-md"
            }`}
          >
            {/* Animated background gradient - made more subtle */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-purple-500/0 opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
            
            <motion.span
              className="text-blue-600 text-lg relative z-10"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              ⭐
            </motion.span>
            <span
              className={`text-xs font-semibold transition-colors relative z-10 ${
                isDarkMode ? "text-gray-200 group-hover:text-white" : "text-gray-700 group-hover:text-gray-800"
              }`}
            >
              Jump start your growth
            </span>
          </div>
        </motion.div>

        {/* Enhanced Heading */}
        <motion.div variants={itemVariants}>
          <h1
            className={`text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black leading-[0.9] transition-colors ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            We boost the{" "}
            <motion.span
              className="inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent relative"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              growth
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1, duration: 1, ease: "easeOut" }}
              />
            </motion.span>{" "}
            for{" "}
            <br />
            <motion.span
              className="relative inline-block"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Startup to Fortune 500
            </motion.span>{" "}
            <br />
            Companies
            <motion.span
              className="inline-block ml-2 text-xl md:text-2xl"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🚀
            </motion.span>
          </h1>
        </motion.div>

        {/* Enhanced Description */}
        <motion.p
          variants={itemVariants}
          className={`text-sm md:text-base lg:text-lg max-w-2xl leading-relaxed ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Get the most accurate leads,{" "}
          <motion.span
            className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            sales training
          </motion.span>{" "}
          and conversions, tools and more — all within the same billing.
        </motion.p>

        {/* Enhanced Email Form */}
        <motion.div
          variants={itemVariants}
          className="relative max-w-lg"
        >
          <div className="flex flex-col sm:flex-row gap-4 relative">
            <div className="relative flex-1 group">
              {/* Input glow effect - made more subtle */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 rounded-2xl blur-md opacity-0 group-focus-within:opacity-30 transition-opacity duration-500" />
              
              <motion.input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setIsTyping(e.target.value.length > 0);
                }}
                placeholder="Enter your email address"
                whileFocus={{ 
                  scale: 1.02,
                  y: -2
                }}
                className={`w-full px-6 py-4 border-2 rounded-2xl focus:outline-none transition-all duration-500 text-sm font-medium relative bg-transparent ${
                  isDarkMode
                    ? "border-gray-600/50 text-white placeholder-gray-400 focus:border-blue-400 focus:shadow-lg focus:shadow-blue-500/10"
                    : "border-gray-300/50 text-gray-700 placeholder-gray-500 focus:border-blue-400 shadow-sm focus:shadow-lg focus:shadow-blue-500/10"
                } hover:border-gray-400/60 focus:border-blue-400 focus:ring-2 focus:ring-blue-100/30`}
              />
              
              {/* Enhanced typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ scale: 0, opacity: 0, rotate: -180 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full shadow-lg"
                  />
                  <motion.span
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xs text-green-500 font-medium"
                  >
                    ✓
                  </motion.span>
                </motion.div>
              )}

              {/* Email format validation indicator */}
              {email && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2"
                >
                  <motion.span
                    className={`text-sm ${
                      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) 
                        ? 'text-green-500' 
                        : 'text-orange-400'
                    }`}
                    animate={{ 
                      scale: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? [1, 1.1, 1] : 1 
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '✓' : '@'}
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
                scale: 1.05,
                y: -3,
                boxShadow: "0 25px 50px rgba(59, 130, 246, 0.4)"
              }}
              whileTap={{ scale: 0.96, y: 0 }}
              disabled={!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)}
              className={`relative px-8 py-4 rounded-2xl font-bold text-sm transition-all duration-500 shadow-xl overflow-hidden group min-w-[120px] ${
                email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
                  ? 'bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 hover:from-blue-700 hover:via-purple-600 hover:to-blue-800 text-white cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {/* Enhanced button glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-r from-blue-400/0 via-white/30 to-purple-400/0 -translate-x-full transition-transform duration-1000 ${
                email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'group-hover:translate-x-full' : ''
              }`} />
              
              {/* Particle effects */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                      left: `${20 + i * 12}%`,
                      top: `${30 + (i % 2) * 40}%`
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                      y: [0, -10, -20]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.1
                    }}
                  />
                ))}
              </div>
              
              <span className="relative z-10 flex items-center justify-center gap-3">
                <motion.span
                  animate={email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? {
                    rotate: [0, 10, -10, 0]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'Send' : 'Enter Email'}
                </motion.span>
                
                {email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && (
                  <motion.span
                    className="text-lg"
                    animate={{ 
                      x: [0, 5, 0],
                      rotate: [0, 15, 0]
                    }}
                    transition={{ 
                      duration: 1.2, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    🚀
                  </motion.span>
                )}
              </span>

              {/* Ripple effect on click */}
              <motion.div
                className="absolute inset-0 bg-white/30 rounded-2xl"
                initial={{ scale: 0, opacity: 0 }}
                whileTap={{ scale: 2, opacity: [0.3, 0] }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>
          </div>

          {/* Enhanced Error/Success Messages */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.8 }}
                transition={{ type: "spring", damping: 20 }}
                className="absolute -bottom-16 left-0 bg-red-500 text-white px-6 py-3 rounded-xl shadow-2xl text-sm font-medium flex items-center gap-2 backdrop-blur-sm"
              >
                <span className="text-lg">⚠️</span>
                {error}
              </motion.div>
            )}
            
            {showPopup && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.8 }}
                transition={{ type: "spring", damping: 15 }}
                className="absolute -bottom-16 left-0 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl shadow-2xl text-sm font-medium flex items-center gap-2 backdrop-blur-sm"
              >
                <motion.span 
                  className="text-lg"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 0.5 }}
                >
                  ✅
                </motion.span>
                Email sent successfully!
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-6 pt-4 md:pt-8"
        >
          <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Trusted by
          </div>
          <div className="flex items-center gap-4">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + i * 0.1 }}
                className={`w-8 h-8 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-center text-xs font-bold`}
              >
                {i}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Enhanced Right Column - Images */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.8, type: "spring", damping: 20 }}
        className="w-full md:w-1/2 mt-8 sm:mt-12 md:mt-0 pl-0 md:pl-12 relative"
        style={{
          transform: `translate(${-mousePosition.x * 0.5}px, ${-mousePosition.y * 0.5}px)`
        }}
      >
        <div className="relative">
          <motion.img
            src={heroImage}
            alt="Team meeting"
            whileHover={{ 
              scale: 1.02
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="rounded-2xl relative z-10 shadow-2xl border border-white/20 backdrop-blur-sm"
          />
          
          {/* Floating elements around image */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg"
          >
            📈
          </motion.div>
          
          <motion.div
            animate={{
              y: [0, 15, 0],
              rotate: [0, -5, 0]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg"
          >
            💡
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;