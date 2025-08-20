import React from "react";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import { useTheme } from "../context/ThemeContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TermsOfService = () => {
  const { isDarkMode } = useTheme();

  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: `By accessing and using BizFlow, you accept and agree to be bound by the terms and provision of this agreement. BizFlow is a modern business workflow dashboard designed to help you manage tasks, track metrics, and organize workflows with ease.`
    },
    {
      title: "2. Use License",
      content: `Permission is granted to temporarily access BizFlow for personal and commercial use. This license shall automatically terminate if you violate any of these restrictions and may be terminated by us at any time. You may not:
      • Modify or copy the materials
      • Use the materials for any commercial purpose without consent
      • Attempt to decompile or reverse engineer any software
      • Remove any copyright or other proprietary notations`
    },
    {
      title: "3. User Accounts and Data",
      content: `When you create an account with BizFlow, you must provide accurate and complete information. You are responsible for safeguarding your account and all activities under your account. BizFlow stores your workflow data, tasks, and metrics securely to provide you with seamless user experiences.`
    },
    {
      title: "4. Service Availability",
      content: `BizFlow strives to maintain high availability and performance. However, we do not guarantee that the service will be uninterrupted or error-free. We reserve the right to modify, suspend, or discontinue any part of the service with reasonable notice.`
    },
    {
      title: "5. Privacy and Data Protection",
      content: `Your privacy is important to us. BizFlow collects and processes your data in accordance with our Privacy Policy. We implement appropriate security measures to protect your business workflow data and personal information.`
    },
    {
      title: "6. Intellectual Property",
      content: `BizFlow and all its original content, features, and functionality are owned by The Next Design and are protected by international copyright, trademark, and other intellectual property laws. The BizFlow interface, animations, and design elements are proprietary.`
    },
    {
      title: "7. Limitation of Liability",
      content: `BizFlow shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses resulting from your use of the service.`
    },
    {
      title: "8. Changes to Terms",
      content: `We reserve the right to modify these terms at any time. We will notify users of any material changes through the BizFlow interface or via email. Your continued use of BizFlow after changes constitutes acceptance of the new terms.`
    },
    {
      title: "9. Contact Information",
      content: `If you have any questions about these Terms of Service, please contact us through the BizFlow interface or visit our Contact page. We're here to help make your workflow experience as smooth as possible.`
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDarkMode ? "bg-gray-900" : "bg-white"
    }`}>
      <Navbar />
      
      {/* Hero Section - Minimal Gap */}
      <motion.section 
        initial="hidden"
        animate="show"
        className={`pt-24 pb-2 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}
      >
        <div className="section-container px-6">
          <motion.div 
            variants={textVariant()}
            className="text-center mb-4"
          >
            <motion.div
              variants={fadeIn("down", 0.2)}
              className="flex items-center justify-center gap-2 mb-3"
            >
              <div className="w-5 h-5 bg-blue-600 rounded-full shadow-md"></div>
              <div className="w-5 h-5 bg-red-500 rounded-full -ml-2 shadow-md"></div>
              <span className={`text-2xl font-bold ml-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                BizFlow
              </span>
            </motion.div>
            
            <h1 className={`text-4xl md:text-5xl font-bold mb-2 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}>
              Terms of Service
            </h1>
            <p className={`text-lg md:text-xl max-w-3xl mx-auto mb-1 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}>
              Please read these terms carefully before using BizFlow, your modern business workflow dashboard
            </p>
            <p className={`text-sm ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Content Section - No Gap */}
      <motion.section 
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        animate="show"
        className="pt-0 pb-8"
      >
        <div className="section-container px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              variants={fadeIn("up", 0.3)}
              className={`rounded-2xl shadow-lg p-6 md:p-8 ${
                isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
              }`}
            >
              <div className="space-y-6">
                {sections.map((section, index) => (
                  <motion.div
                    key={index}
                    variants={fadeIn("up", 0.1 * index)}
                    className="space-y-3"
                  >
                    <h2 className={`text-xl md:text-2xl font-bold ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}>
                      {section.title}
                    </h2>
                    <div className={`text-base leading-relaxed whitespace-pre-line ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                      {section.content}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Footer Note */}
              <motion.div
                variants={fadeIn("up", 0.5)}
                className={`mt-8 pt-6 border-t text-center ${
                  isDarkMode ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  These terms are effective as of the date listed above. By using BizFlow, you agree to these terms.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default TermsOfService;
