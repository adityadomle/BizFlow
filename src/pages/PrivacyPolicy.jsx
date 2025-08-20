import React from "react";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import { useTheme } from "../context/ThemeContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
  const { isDarkMode } = useTheme();

  const sections = [
    {
      title: "1. Information We Collect",
      content: `BizFlow collects information to provide you with the best workflow management experience:

      Account Information: Name, email address, and profile details when you create an account
      Workflow Data: Tasks, metrics, project information, and organizational data you input into BizFlow
      Usage Analytics: How you interact with BizFlow features to improve our dashboard performance
      Technical Data: IP address, browser type, and device information for security and optimization`
    },
    {
      title: "2. How We Use Your Information",
      content: `We use your information to enhance your BizFlow experience:

      • Provide and maintain your business workflow dashboard
      • Process and organize your tasks and metrics
      • Improve BizFlow's performance, style, and simplicity
      • Send important updates about your workflows and account
      • Provide customer support and respond to your inquiries
      • Ensure the security and integrity of your business data`
    },
    {
      title: "3. Data Storage and Security",
      content: `BizFlow takes your data security seriously:

      • All data is encrypted in transit and at rest using industry-standard protocols
      • We implement multi-layer security measures to protect your workflow information
      • Regular security audits ensure your business data remains safe
      • Your workflow data is stored on secure servers with redundant backups
      • We follow best practices for data protection and privacy compliance`
    },
    {
      title: "4. Data Sharing and Disclosure",
      content: `BizFlow respects your privacy and limits data sharing:

      • We do not sell, trade, or rent your personal information to third parties
      • Data may be shared with trusted service providers who help operate BizFlow
      • We may disclose information if required by law or to protect our rights
      • Anonymous, aggregated data may be used for research and improvement purposes
      • You control what workflow data you share within your organization`
    },
    {
      title: "5. Your Data Rights",
      content: `You have full control over your BizFlow data:

      • Access: View all personal data we have about you
      • Update: Modify your profile and workflow information at any time
      • Delete: Request deletion of your account and associated data
      • Export: Download your workflow data in standard formats
      • Portability: Transfer your data to other platforms if needed`
    },
    {
      title: "6. Cookies and Tracking",
      content: `BizFlow uses cookies to enhance your experience:

      • Essential cookies for login sessions and security
      • Performance cookies to optimize dashboard loading speed
      • Analytics cookies to understand how you use BizFlow features
      • You can control cookie preferences in your browser settings
      • Some features may not work properly if cookies are disabled`
    },
    {
      title: "7. Third-Party Integrations",
      content: `BizFlow may integrate with other business tools:

      • Integrations are clearly disclosed and require your consent
      • Third-party privacy policies apply to their respective services
      • You can disconnect integrations at any time through your settings
      • We carefully vet integration partners for security and privacy standards`
    },
    {
      title: "8. Data Retention",
      content: `We retain your data as long as your account is active:

      • Workflow data is kept for the duration of your account usage
      • Deleted data is permanently removed within 30 days
      • Some legal or security logs may be retained longer as required
      • You can request immediate data deletion by contacting support`
    },
    {
      title: "9. Changes to Privacy Policy",
      content: `We may update this privacy policy periodically:

      • Material changes will be communicated through BizFlow notifications
      • Continued use after changes indicates acceptance of new terms
      • You can always access the current version in your BizFlow settings
      • Previous versions are available upon request`
    },
    {
      title: "10. Contact Us",
      content: `Questions about privacy? We're here to help:

      • Contact us through the BizFlow support chat feature
      • Email our privacy team for detailed inquiries
      • Visit our Contact page for additional support options
      • We respond to privacy requests within 48 hours`
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
              Privacy Policy
            </h1>
            <p className={`text-lg md:text-xl max-w-3xl mx-auto mb-1 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}>
              Your privacy matters to us. Learn how BizFlow protects and manages your workflow data
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
                  This privacy policy is effective as of the date listed above and applies to all users of BizFlow.
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

export default PrivacyPolicy;
