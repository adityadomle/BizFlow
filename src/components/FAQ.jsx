// Mock AnimatePresence component
const AnimatePresence = ({ children, initial }) => children;
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

import { useTheme } from "../context/ThemeContext";

// Mock motion and theme utilities to preserve original structure
const motion = {
  div: ({ children, variants, className, onClick, ...props }) => (
    <div className={className} onClick={onClick} {...props}>{children}</div>
  ),
  h2: ({ children, variants, className }) => (
    <h2 className={className}>{children}</h2>
  )
};

const fadeIn = (direction, delay) => ({});
const textVariant = (delay) => ({});

const faqs = [
  {
    question: "What services does your platform offer?",
    answer:
      "Our platform offers web design, ad creatives, automation services, and infographics to help your business grow.",
  },
  {
    question: "How can I track my business performance?",
    answer:
      "Our analytics dashboard provides real-time insights, key performance indicators, and detailed reports.",
  },
  {
    question: "What are your pricing plans?",
    answer:
      "We offer flexible pricing plans from basic to enterprise levels. Check our Pricing section for details.",
  },
  {
    question: "How do I schedule a consultation?",
    answer:
      "You can easily schedule a consultation through our online booking system by selecting your date and time.",
  },
  {
    question: "Do you offer custom solutions?",
    answer:
      "Yes, we specialize in tailored solutions for businesses. Contact our team to discuss your requirements.",
  },
];

export default function FAQ() {
  const { isDarkMode } = useTheme();  
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (

    <section
      id="faq"
      className={`py-20 transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-950 via-blue-950 to-gray-900 text-white"
          : "bg-white text-gray-900"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeIn("up", 0.3)} className="max-w-3xl mx-auto">
          <motion.h2
            variants={textVariant(0.2)}
            className="text-3xl md:text-4xl font-bold text-center mt-8 mb-8 text-white" ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Frequently Asked Questions
          </motion.h2>

          <div className="space-y-5">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={fadeIn("up", 0.1 * (index + 1))}
                className={`rounded-xl border cursor-pointer transition-all duration-300 backdrop-blur-md ${

    <div className="min-h-screen bg-transparent">
      <section
        id="faq"
        className="py-20 bg-transparent transition-colors duration-300"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeIn("up", 0.3)} className="max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-16">
              <div 
                className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-6 transition-all duration-500 backdrop-blur-md ${
                  isDarkMode
                    ? "bg-blue-500/20 text-blue-300 border border-blue-400/30"
                    : "bg-blue-100/80 text-blue-700 border border-blue-200/60"
                }`}
              >
                FAQ Section
              </div>
              
              <motion.h2
                variants={textVariant(0.2)}
                className={`text-4xl md:text-5xl font-bold mb-4 transition-all duration-500 ${
                  isDarkMode 
                    ? "text-white" 
                    : "text-gray-900"
                } bg-gradient-to-r ${
                  isDarkMode
                    ? "from-white via-blue-100 to-white"
                    : "from-gray-900 via-blue-900 to-gray-900"
                } bg-clip-text text-transparent`}
              >
                Frequently Asked Questions
              </motion.h2>
              
              <p className={`text-lg max-w-2xl mx-auto transition-colors duration-500 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}>
                Find answers to common questions about our services and platform
              </p>
            </div>

            {/* FAQ Items */}
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn("up", 0.1 * (index + 1))}
                  className={`group rounded-2xl border cursor-pointer transition-all duration-500 ease-out backdrop-blur-md transform-gpu hover:scale-[1.01]
                    ${openIndex === index 
                      ? (isDarkMode 
                          ? "bg-gradient-to-br from-gray-800 to-gray-900 text-white border border-gray-700 shadow-2xl shadow-gray-900/50 scale-[1.02]" 
                          : "bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-900 border border-blue-100 shadow-2xl shadow-indigo-500/15 scale-[1.02]")
                      : (isDarkMode
                          ? "bg-gradient-to-br from-gray-800/80 to-gray-900/80 text-white border border-gray-700/50 hover:from-gray-800 hover:to-gray-900 hover:border-gray-700 hover:shadow-xl hover:shadow-gray-900/40"
                          : "bg-gradient-to-br from-blue-50/80 to-indigo-50/80 text-gray-900 border border-blue-100/50 hover:from-blue-50 hover:to-indigo-50 hover:border-blue-100 hover:shadow-xl hover:shadow-indigo-500/10")
                    }
                  `}
                  onClick={() => toggleFAQ(index)}
                >
                  <div className="flex justify-between items-center p-6">
                    <h3
                      className={`text-lg font-semibold pr-4 transition-all duration-300 ${
                        isDarkMode 
                          ? "text-white group-hover:text-gray-200" 
                          : "text-gray-900 group-hover:text-gray-700"
                      }`}
                    >
                      {faq.question}
                    </h3>
                    
                    <div 
                      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform ${
                        openIndex === index 
                          ? "rotate-180 scale-110" 
                          : "group-hover:scale-110 group-hover:rotate-12 group-hover:-translate-y-0.5"
                      } ${
                        isDarkMode
                          ? (openIndex === index 
                              ? "bg-gray-600 text-white shadow-lg shadow-gray-900/30" 
                              : "bg-gray-700 text-gray-300 group-hover:bg-gray-600 group-hover:text-white group-hover:shadow-md group-hover:shadow-gray-900/20")
                          : (openIndex === index 
                              ? "bg-indigo-100 text-indigo-700 shadow-lg shadow-indigo-500/20" 
                              : "bg-blue-100 text-blue-700 group-hover:bg-indigo-100 group-hover:text-indigo-700 group-hover:shadow-md group-hover:shadow-indigo-500/10")
                      }`}
                    >
                      {openIndex === index ? (
                        <Minus size={18} className="transition-all duration-300" />
                      ) : (
                        <Plus size={18} className="transition-all duration-300" />
                      )}
                    </div>
                  </div>

                  {/* Smooth animated content */}
                  <div
                    className={`overflow-hidden border-t transition-all duration-500 ease-in-out ${
                      isDarkMode ? "border-gray-700" : "border-blue-100"
                    }`}
                    style={{
                      maxHeight: openIndex === index ? "500px" : "0px",
                      opacity: openIndex === index ? 1 : 0,
                      transform: `translateY(${openIndex === index ? "0" : "-10px"})`,
                      transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
                    }}
                  >
                    <div className="px-6 pb-6">
                      <p
                        className={`pt-4 text-base leading-relaxed transition-all duration-300 ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                        style={{
                          transform: `translateY(${openIndex === index ? "0" : "-5px"})`,
                          transition: "transform 0.4s ease-out 0.1s"
                        }}
                      >
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Enhanced Bottom CTA Section */}
            <div className="text-center mt-20">
              <div className={`relative mx-auto max-w-lg p-8 rounded-3xl backdrop-blur-xl border transition-all duration-500 ${
                isDarkMode
                  ? "bg-gradient-to-br from-gray-800/60 to-gray-900/60 border-gray-700/50 shadow-2xl shadow-gray-900/30"
                  : "bg-gradient-to-br from-white/60 to-blue-50/60 border-blue-200/50 shadow-2xl shadow-blue-500/10"
              }`}>
                {/* Decorative background elements */}
                <div className={`absolute -top-2 -right-2 w-20 h-20 rounded-full blur-2xl opacity-30 ${
                  isDarkMode ? "bg-blue-500" : "bg-blue-400"
                }`}></div>
                <div className={`absolute -bottom-2 -left-2 w-16 h-16 rounded-full blur-xl opacity-20 ${
                  isDarkMode ? "bg-purple-500" : "bg-indigo-400"
                }`}></div>

                <div className="relative z-10">
                  <h3 className={`text-2xl font-bold mb-3 transition-colors duration-500 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}>
                    Still have questions?
                  </h3>
                  <p className={`mb-8 text-base leading-relaxed transition-colors duration-500 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}>
                    Our support team is ready to help you with any inquiries or concerns you might have.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button 
                      className={`group relative px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 backdrop-blur-md overflow-hidden ${
                        isDarkMode
                          ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-500 hover:to-blue-400 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50 border border-blue-400/30"
                          : "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 border border-blue-300/30"
                      }`}
                      onClick={()=>navigate('/contact')}
                    >
                      {/* Animated background shine effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
                      </div>
                      <span className="relative z-10 flex items-center gap-2">
                        Contact Support
                        <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </button>

                    <button 
                      className={`group px-6 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 backdrop-blur-md border-2 ${
                        isDarkMode
                          ? "border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white hover:bg-gray-800/50"
                          : "border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-800 hover:bg-white/50"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        Browse Help Center
                        <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                    </button>
                  </div>

                  {/* Contact info */}
                  <div className={`mt-6 pt-6 border-t flex flex-col sm:flex-row justify-center items-center gap-6 text-sm ${
                    isDarkMode ? "border-gray-700 text-gray-400" : "border-gray-200 text-gray-500"
                  }`}>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      support@yourcompany.com
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Response within 24 hours
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}