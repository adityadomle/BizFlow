import React from 'react';
import { motion } from 'framer-motion';
import { Scale, FileText, AlertTriangle, Users, Shield, Clock, CheckCircle, XCircle, Info } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';



// Animation variants matching your existing components
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
    transition: { staggerChildren: 0.15 } 
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { duration: 0.7, ease: "easeOut" } 
  }
};

const TermsOfUsePage = () => {
  const { isDarkMode } = useTheme()

  const termsData = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Acceptance of Terms",
      content: "By accessing and using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use. If you do not agree to these terms, please discontinue use of our services immediately.",
      highlight: "Agreement Required",
      color: "blue"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "User Responsibilities",
      content: "Users are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account. You agree to notify us immediately of any unauthorized use of your account.",
      highlight: "Account Security",
      color: "green"
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Prohibited Activities",
      content: "You may not use our services for any unlawful purpose or in any way that could damage, disable, overburden, or impair our services. Violation of these restrictions may result in termination of your access.",
      highlight: "Important Restrictions",
      color: "red"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Intellectual Property",
      content: "All content, features, and functionality on our platform are owned by us and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.",
      highlight: "Protected Content",
      color: "purple"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Service Availability",
      content: "We strive to maintain service availability but do not guarantee uninterrupted access. We reserve the right to modify, suspend, or discontinue services with or without notice.",
      highlight: "No Guarantee",
      color: "orange"
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: "Limitation of Liability",
      content: "To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services.",
      highlight: "Legal Disclaimer",
      color: "indigo"
    }
  ];

  const quickFacts = [
    { icon: <CheckCircle className="w-5 h-5 text-green-500" />, text: "Free to use for personal purposes" },
    { icon: <XCircle className="w-5 h-5 text-red-500" />, text: "Commercial use requires license" },
    { icon: <Info className="w-5 h-5 text-blue-500" />, text: "Terms updated quarterly" },
    { icon: <Shield className="w-5 h-5 text-purple-500" />, text: "Data protection compliant" }
  ];

  const getColorClasses = (color, isDark) => {
    const colors = {
      blue: isDark ? "bg-blue-900/30 border-blue-700/50 text-blue-300" : "bg-blue-50 border-blue-200 text-blue-700",
      green: isDark ? "bg-green-900/30 border-green-700/50 text-green-300" : "bg-green-50 border-green-200 text-green-700",
      red: isDark ? "bg-red-900/30 border-red-700/50 text-red-300" : "bg-red-50 border-red-200 text-red-700",
      purple: isDark ? "bg-purple-900/30 border-purple-700/50 text-purple-300" : "bg-purple-50 border-purple-200 text-purple-700",
      orange: isDark ? "bg-orange-900/30 border-orange-700/50 text-orange-300" : "bg-orange-50 border-orange-200 text-orange-700",
      indigo: isDark ? "bg-indigo-900/30 border-indigo-700/50 text-indigo-300" : "bg-indigo-50 border-indigo-200 text-indigo-700"
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDarkMode ? "bg-gray-900" : "bg-gray-50"
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Floating Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={`absolute top-20 right-10 w-32 h-32 rounded-full blur-xl opacity-20 ${
              isDarkMode ? "bg-blue-500" : "bg-blue-300"
            }`}
          />
          <motion.div
            animate={{ 
              y: [0, 15, 0],
              rotate: [0, -3, 0]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className={`absolute bottom-32 left-10 w-24 h-24 rounded-full blur-xl opacity-15 ${
              isDarkMode ? "bg-purple-500" : "bg-purple-300"
            }`}
          />
        </div>

        {/* Header Section */}
        <motion.div
          variants={fadeIn('up', 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          className="text-center mb-16 pt-16 relative"
        >
          {/* Animated Legal Badge */}
          <motion.div
            variants={fadeIn('down', 0.1)}
            initial="hidden"
            whileInView="show"
            whileHover={{ scale: 1.05, rotate: 2 }}
            className={`inline-flex items-center gap-3 px-6 py-3 rounded-full mb-8 transition-all duration-300 cursor-pointer ${
              isDarkMode
                ? "bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-indigo-700/50 shadow-lg shadow-indigo-900/20"
                : "bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 shadow-lg shadow-indigo-100/50"
            }`}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <Scale className={`w-6 h-6 ${isDarkMode ? "text-indigo-400" : "text-indigo-600"}`} />
            </motion.div>
            <span className={`font-semibold ${
              isDarkMode ? "text-indigo-300" : "text-indigo-700"
            }`}>
              Legal Document
            </span>
            <div className={`w-2 h-2 rounded-full animate-pulse ${
              isDarkMode ? "bg-indigo-400" : "bg-indigo-600"
            }`} />
          </motion.div>

          <motion.h1
            variants={textVariant(0.3)}
            initial="hidden"
            whileInView="show"
            className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 transition-colors ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Terms of{" "}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Use
              </span>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600 origin-left"
              />
            </span>
          </motion.h1>

          <motion.p
            variants={fadeIn('up', 0.4)}
            initial="hidden"
            whileInView="show"
            className={`text-lg md:text-xl max-w-3xl mx-auto mb-8 transition-colors ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Please read these terms carefully before using our services. 
            These terms govern your use of our platform and establish the legal framework for our relationship.
          </motion.p>

          {/* Quick Facts Bar */}
          <motion.div
            variants={fadeIn('up', 0.5)}
            initial="hidden"
            whileInView="show"
            className={`inline-flex flex-wrap items-center justify-center gap-6 p-4 rounded-2xl border backdrop-blur-sm ${
              isDarkMode 
                ? "bg-gray-800/50 border-gray-700" 
                : "bg-white/70 border-gray-200"
            }`}
          >
            {quickFacts.map((fact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-center gap-2"
              >
                {fact.icon}
                <span className={`text-sm font-medium ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}>
                  {fact.text}
                </span>
              </motion.div>
            ))}
          </motion.div>

       
        </motion.div>

        {/* Terms Sections */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.1 }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {termsData.map((term, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.2 }}
                whileHover={{ y: -8, scale: 1.01 }}
                className={`group p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 border backdrop-blur-sm ${
                  isDarkMode
                    ? "bg-gray-800/70 border-gray-700 hover:bg-gray-800/90"
                    : "bg-white/80 border-gray-100 hover:bg-white"
                }`}
              >
                {/* Header with Icon and Highlight Badge */}
                <div className="flex items-start justify-between mb-6">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: false }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`p-4 rounded-2xl transition-all duration-300 ${
                      isDarkMode 
                        ? "bg-gray-700 group-hover:bg-gray-600" 
                        : "bg-gray-50 group-hover:bg-gray-100"
                    }`}
                  >
                    <span className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                      {term.icon}
                    </span>
                  </motion.div>
                  
                  <motion.span
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${getColorClasses(term.color, isDarkMode)}`}
                  >
                    {term.highlight}
                  </motion.span>
                </div>

                <motion.h3
                  variants={textVariant(0.1)}
                  className={`text-2xl font-bold mb-4 transition-colors group-hover:text-blue-600 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {term.title}
                </motion.h3>

                <motion.p
                  variants={fadeIn('up', 0.2)}
                  className={`text-lg leading-relaxed transition-colors ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {term.content}
                </motion.p>

                {/* Animated bottom border */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                  className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-6 origin-left opacity-60"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Acceptance and Contact Section */}
        <motion.div
          variants={fadeIn('up', 0.7)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          className="max-w-4xl mx-auto mt-20"
        >
          {/* Acceptance Box */}
          <div className={`p-8 rounded-3xl mb-8 border-2 border-dashed transition-all duration-300 ${
            isDarkMode
              ? "bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-700/50"
              : "bg-gradient-to-br from-blue-50 to-purple-50 border-blue-300/50"
          }`}>
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="text-center"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                isDarkMode ? "bg-green-800/50" : "bg-green-100"
              }`}>
                <CheckCircle className={`w-8 h-8 ${isDarkMode ? "text-green-400" : "text-green-600"}`} />
              </div>
              <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                By Using Our Service, You Agree
              </h3>
              <p className={`text-lg ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                Continued use of our platform constitutes acceptance of these terms. 
                We recommend bookmarking this page for future reference.
              </p>
            </motion.div>
          </div>

          {/* Contact Section */}
          <motion.div
            variants={fadeIn('up', 0.8)}
            className={`text-center p-8 rounded-3xl transition-all duration-300 ${
              isDarkMode
                ? "bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-gray-700"
                : "bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200"
            }`}
          >
            <motion.h2
              variants={textVariant(0.2)}
              className={`text-3xl font-bold mb-4 transition-colors ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Questions About These Terms?
            </motion.h2>
            <motion.p
              variants={fadeIn('up', 0.3)}
              className={`text-lg mb-8 max-w-2xl mx-auto transition-colors ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Our legal team is here to help clarify any aspects of these terms. 
              Don't hesitate to reach out if you need assistance understanding your rights and obligations.
            </motion.p>
            <motion.div
              variants={fadeIn('up', 0.4)}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* Contact Legal Team Button */}
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }} // slower spring
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-medium hover:bg-blue-700 hover:shadow-lg"
              >
                Contact Legal Team
              </motion.button>

              {/* Download PDF Button */}
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }} // slower spring
                className={`px-8 py-4 rounded-xl font-medium border-2 ${
                  isDarkMode
                    ? "border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-800 hover:shadow-lg"
                    : "border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 hover:shadow-lg"
                }`}
              >
                Download PDF
              </motion.button>
            </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfUsePage;