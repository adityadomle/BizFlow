import React from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { fadeIn, textVariant } from "../utils/motion";
import { useTheme } from "../context/ThemeContext";

// Variants for staggered animation
const containerVariants = {
  hidden: { opacity: 0 },
  show: { 
    opacity: 1, 
    transition: { staggerChildren: 0.2 } 
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

const FeaturesSection = () => {
  const { isDarkMode } = useTheme();

  const features = [
    { icon: "🔍", title: "Find out what you need", description: "We present you a proposal and discuss nitty-gritty like", bg: "#F1EFFD" },
    { icon: "⚙️", title: "Work out the details", description: "Communication protocols apart from engagement models", bg: "#FFE7E7" },
    { icon: "🚀", title: "We get to work fast", description: "Protocols apart from engage models, pricing billing", bg: "#FFF3E4" }
  ];

  return (
    <motion.section
      variants={fadeIn('up', 0.2)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.2 }}
      className={`max-w-7xl mx-auto px-4 py-16 transition-colors duration-500 ${
        isDarkMode ? "text-gray-100" : "text-gray-900"
      }`}
    >
      {/* Header */}
      <motion.div 
        variants={fadeIn('up', 0.3)} 
        viewport={{ once: false, amount: 0.2 }}
        className="text-center mb-12"
      >
        <motion.h2
          variants={textVariant(0.2)}
          className={`text-3xl font-bold mb-4 ${
            isDarkMode ? "text-gray-100" : "text-gray-900"
          }`}
        >
          How can we help your business?
        </motion.h2>
        <motion.p
          variants={fadeIn('up', 0.4)}
          className={`${isDarkMode ? "text-gray-300/80" : "text-gray-600"}`}
        >
          When you resell Besnik, you build trust and increase
        </motion.p>
      </motion.div>

      {/* Features */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            whileHover={{ y: -6, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={`flex flex-col items-center p-6 rounded-xl shadow-sm hover:shadow-lg transition-[background,box-shadow,border,color,transform] duration-300 border ${
              isDarkMode
                ? "bg-slate-800/70 border-slate-700 backdrop-blur-[1px]"
                : "bg-white border-gray-100"
            }`}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.25 }}
              viewport={{ once: false }}
              className="w-24 h-24 rounded-full mb-6 flex items-center justify-center transition-transform duration-300 hover:scale-110"
              style={{ backgroundColor: feature.bg }}
              aria-hidden="true"
            >
              <span className="text-3xl">{feature.icon}</span>
            </motion.div>

            <h3
              className={`text-2xl font-medium mb-3 text-center ${
                isDarkMode ? "text-gray-100" : "text-gray-900"
              }`}
            >
              {feature.title}
            </h3>

            <p
              className={`text-center ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Call to Action */}
      <motion.div 
        variants={fadeIn('up', 0.7)} 
        viewport={{ once: false, amount: 0.2 }}
        className="text-center mt-12"
      >
        <Link
          to="/partner"
          className={`inline-block cursor-pointer px-8 py-3 rounded-full font-medium transition-all duration-300 ease-in-out relative
            focus:outline-none focus-visible:ring-2 ${
              isDarkMode
                ? "bg-blue-500 text-white hover:bg-blue-400 focus-visible:ring-blue-300"
                : "bg-gray-900 text-white hover:brightness-110 focus-visible:ring-gray-300"
            }`}
        >
          <motion.div
            variants={fadeIn('up', 0.8)}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="relative"
          >
            Become a Partner
            <div
              className={`absolute -z-10 w-full h-full rounded-full blur-xl top-0 left-0 opacity-30 ${
                isDarkMode ? "bg-blue-400/40" : "bg-gray-400/40"
              }`}
            />
          </motion.div>
        </Link>
      </motion.div>
    </motion.section>
  );
};

export default FeaturesSection;
