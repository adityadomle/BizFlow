import React from 'react';
import { motion } from 'framer-motion';
import { Cookie, Settings, Eye, Database, Clock, Shield } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const fadeIn = (direction, delay) => ({
  hidden: {
    y: direction === 'up' ? 80 : direction === 'down' ? -80 : 0,
    opacity: 0,
    x: direction === 'left' ? 80 : direction === 'right' ? -80 : 0,
  },
  show: {
    y: 0,
    x: 0,
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 1.2,
      delay: delay,
      ease: [0.25, 0.6, 0.3, 0.8],
    },
  },
});

const textVariant = (delay) => ({
  hidden: {
    y: -50,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      duration: 1.25,
      delay: delay,
    },
  },
});

const containerVariants = {
  hidden: { opacity: 0 },
  show: { 
    opacity: 1, 
    transition: { staggerChildren: 0.1 } 
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

const CookiePolicyPage = () => {
  const { isDarkMode } = useTheme();

  const sections = [
    {
      icon: <Cookie className="w-6 h-6" />,
      title: "What Are Cookies",
      content: "Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences, analyzing site usage, and enabling certain functionality. Cookies cannot access your personal files or harm your device."
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Types of Cookies We Use",
      content: "We use essential cookies for basic website functionality, analytics cookies to understand how you use our site, preference cookies to remember your settings, and marketing cookies to show you relevant content. You can control which cookies you accept through your browser settings."
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "How We Use Cookies",
      content: "Essential cookies enable core functionality like security and accessibility. Analytics cookies help us improve our website by understanding user behavior. Preference cookies remember your choices like theme settings. Marketing cookies help us show you relevant content and measure campaign effectiveness."
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Managing Your Cookie Preferences",
      content: "You can control cookies through your browser settings. Most browsers allow you to block or delete cookies, but this may affect website functionality. You can also use our cookie preference center to customize which types of cookies you accept for a better browsing experience."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Cookie Duration",
      content: "Session cookies are temporary and expire when you close your browser. Persistent cookies remain on your device for a set period or until you delete them. We use both types to provide optimal functionality and remember your preferences across visits."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Third-Party Cookies",
      content: "Some cookies are set by third-party services we use, such as analytics providers or social media platforms. These cookies are governed by their respective privacy policies. We carefully select our partners and ensure they meet our privacy and security standards."
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDarkMode ? "bg-gray-900" : "bg-gray-50"
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Section */}
        <motion.div
          variants={fadeIn('up', 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          className="text-center mb-16 pt-16"
        >
          {/* Cookie Badge */}
          <motion.div
            variants={fadeIn('down', 0.1)}
            initial="hidden"
            whileInView="show"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 transition-colors ${
              isDarkMode
                ? "bg-orange-900/30 border border-orange-700/50"
                : "bg-orange-50 border border-orange-200"
            }`}
          >
            <Cookie className={`w-5 h-5 ${isDarkMode ? "text-orange-400" : "text-orange-600"}`} />
            <span className={`text-sm font-medium ${
              isDarkMode ? "text-orange-300" : "text-orange-700"
            }`}>
              Cookie Settings
            </span>
          </motion.div>

          <motion.h1
            variants={textVariant(0.3)}
            initial="hidden"
            whileInView="show"
            className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 transition-colors ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Cookie{" "}
            <span className="text-orange-600 relative inline-block">
              Policy
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-200/60"></span>
            </span>
          </motion.h1>

          <motion.p
            variants={fadeIn('up', 0.4)}
            initial="hidden"
            whileInView="show"
            className={`text-lg md:text-xl max-w-3xl mx-auto transition-colors ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            We use cookies to enhance your browsing experience and provide personalized content. 
            Learn about the types of cookies we use and how you can control them.
          </motion.p>

          <motion.div
            variants={fadeIn('up', 0.5)}
            initial="hidden"
            whileInView="show"
            className={`inline-block mt-6 px-4 py-2 rounded-lg text-sm ${
              isDarkMode 
                ? "bg-gray-800 text-gray-300 border border-gray-700" 
                : "bg-gray-100 text-gray-600 border border-gray-200"
            }`}
          >
            Last updated: August 2025
          </motion.div>
        </motion.div>

        {/* Content Sections */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.1 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          {sections.map((section, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.2 }}
              whileHover={{ y: -4, scale: 1.005 }}
              className={`p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border ${
                isDarkMode
                  ? "bg-gray-800/70 border-gray-700 backdrop-blur-sm"
                  : "bg-white border-gray-100"
              }`}
            >
              <div className="flex items-start gap-4">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: false }}
                  className={`p-3 rounded-xl transition-colors ${
                    isDarkMode 
                      ? "bg-orange-900/30 text-orange-400" 
                      : "bg-orange-50 text-orange-600"
                  }`}
                >
                  {section.icon}
                </motion.div>
                <div className="flex-1">
                  <motion.h3
                    variants={textVariant(0.1)}
                    className={`text-2xl font-semibold mb-4 transition-colors ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {section.title}
                  </motion.h3>
                  <motion.p
                    variants={fadeIn('up', 0.2)}
                    className={`text-lg leading-relaxed transition-colors ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {section.content}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Cookie Preferences Section */}
        <motion.div
          variants={fadeIn('up', 0.6)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          className={`max-w-4xl mx-auto mt-16 p-8 rounded-2xl text-center transition-all duration-300 ${
            isDarkMode
              ? "bg-gradient-to-r from-orange-900/20 to-red-900/20 border border-orange-800/30"
              : "bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200/50"
          }`}
        >
          <motion.h2
            variants={textVariant(0.2)}
            className={`text-3xl font-bold mb-4 transition-colors ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Manage Your Cookie Preferences
          </motion.h2>
          <motion.p
            variants={fadeIn('up', 0.3)}
            className={`text-lg mb-8 transition-colors ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            You have control over which cookies we use. Customize your preferences or 
            learn more about cookie management in your browser settings.
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            variants={fadeIn('up', 0.8)}
            whileHover={{ scale: 1.02, y: -2 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            className="bg-orange-600 text-white px-8 py-4 rounded-xl hover:bg-orange-700 font-medium"
          >
            Cookie Settings
          </motion.button>

          <motion.button
            variants={fadeIn('up', 0.8)}
            whileHover={{ scale: 1.02, y: -2 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            className={`px-8 py-4 rounded-xl transition-colors duration-300 hover:shadow-lg font-medium border-2 ${
              isDarkMode
                ? "border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500"
                : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
            }`}
          >
            Accept All Cookies
          </motion.button>

          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CookiePolicyPage;