import React from "react";
import { motion } from "framer-motion";
import { HiSun, HiMoon } from "react-icons/hi";
import { useTheme } from "../context/ThemeContext";

const FloatingThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className={`fixed bottom-24 right-8 z-50 h-12 w-12 rounded-full transition-all duration-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center border-2 shadow-lg ${
        isDarkMode 
          ? "bg-gray-800 hover:bg-gray-700 text-yellow-400 hover:text-yellow-300 border-yellow-400 hover:border-yellow-300 shadow-yellow-400/50 hover:shadow-yellow-300/60 focus:ring-yellow-500" 
          : "bg-blue-100 hover:bg-blue-200 text-blue-600 hover:text-blue-700 border-blue-400 hover:border-blue-300 shadow-blue-400/50 hover:shadow-blue-300/60 focus:ring-blue-500"
      }`}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.3 }}
    >
      {isDarkMode ? (
        <HiSun className="h-6 w-6" />
      ) : (
        <HiMoon className="h-6 w-6" />
      )}
    </motion.button>
  );
};

export default FloatingThemeToggle;
