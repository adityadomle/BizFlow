import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "What services does your platform offer?",
    a: "Web design, automation, ad creatives, infographics, and more.",
  },
  {
    q: "How can I track my business performance?",
    a: "Real-time dashboards, KPIs, and detailed analytics reports.",
  },
  {
    q: "What are your pricing plans?",
    a: "Flexible plans from basic to enterprise. Check Pricing section for details.",
  },
  {
    q: "How do I schedule a consultation?",
    a: "Easily book online by selecting your preferred date and time.",
  },
  {
    q: "Do you offer custom solutions?",
    a: "Yes! Tailored solutions are available. Contact us to discuss requirements.",
  },
  {
    q: "Is there a trial or demo available?",
    a: "Yes! You can request a free trial or schedule a live demo to explore our platform before committing.",
  },
];

// Predefined decorative bulbs
const bulbs = [
  { size: 60, x: "10%", y: "15%", color: "#F87171" },
  { size: 40, x: "70%", y: "10%", color: "#FBBF24" },
  { size: 50, x: "30%", y: "70%", color: "#60A5FA" },
  { size: 35, x: "80%", y: "60%", color: "#34D399" },
  { size: 45, x: "50%", y: "30%", color: "#A78BFA" },
];

export default function FAQ() {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => setOpenIndex(openIndex === index ? null : index);

  const bgGlass = isDarkMode
    ? "bg-gray-900/60 backdrop-blur-lg text-white border border-gray-700/50 shadow-xl"
    : "bg-white/60 backdrop-blur-lg text-gray-900 border border-gray-200/50 shadow-lg";

  return (
    <section
      className={`relative min-h-screen py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-500 `}
    >
      {/* Frosted Bulb Background */}
      {bulbs.map((b, i) => (
        <div
          key={i}
          className="absolute rounded-full z-0"
          style={{
            width: b.size * 1.5,
            height: b.size * 1.5,
            top: b.y,
            left: b.x,
            background: b.color,
            filter: "blur(40px)",
            opacity: 0.6,
            mixBlendMode: isDarkMode ? "screen" : "multiply",
          }}
        />
      ))}

      <div className="relative z-10 max-w-4xl mx-auto text-center mb-16">
        <h2
          className={`text-3xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r ${
            isDarkMode
              ? "from-white via-blue-300 to-white"
              : "from-blue-800 via-indigo-400 to-blue-800"
          }`}
        >
          Your Questions, Answered
        </h2>
        <p
          className={`${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          } text-lg`}
        >
          Explore our FAQ in an interactive and fun way. Click on a question to
          see the answer.
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto z-10">
        <div
          className={`absolute left-5 top-0 bottom-0 w-1 ${
            isDarkMode ? "bg-gray-700" : "bg-gray-300"
          } rounded-full`}
        ></div>

        {faqs.map((faq, i) => (
          <motion.div 
            key={i} 
            className="relative flex items-start mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            {/* Dot with smooth animation */}
            <motion.div
              className={`flex-shrink-0 w-10 h-10 rounded-full ${
                isDarkMode ? "bg-blue-500" : "bg-indigo-500"
              } flex items-center justify-center text-white font-bold z-10`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                backgroundColor: openIndex === i 
                  ? (isDarkMode ? "#10B981" : "#059669")
                  : (isDarkMode ? "#3B82F6" : "#6366F1"),
                boxShadow: openIndex === i
                  ? "0 0 20px rgba(16, 185, 129, 0.6)"
                  : "0 0 10px rgba(59, 130, 246, 0.3)"
              }}
              transition={{ duration: 0.3 }}
            >
              {i + 1}
            </motion.div>

            {/* Content Container */}
            <div className="ml-6 flex-1">
              {/* Question Card */}
              <motion.div
                onClick={() => toggle(i)}
                className={`p-5 rounded-2xl border transition-all duration-500 ${bgGlass} cursor-pointer group`}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: isDarkMode 
                    ? "0 20px 40px rgba(0,0,0,0.4)" 
                    : "0 20px 40px rgba(0,0,0,0.15)"
                }}
                whileTap={{ scale: 0.98 }}
                animate={{
                  borderColor: openIndex === i
                    ? (isDarkMode ? "#10B981" : "#059669")
                    : (isDarkMode ? "rgba(75, 85, 99, 0.5)" : "rgba(229, 231, 235, 0.5)")
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg pr-4">{faq.q}</h3>
                  
                  {/* Enhanced Icon Animation */}
                  <motion.div
                    className="flex-shrink-0"
                    animate={{ 
                      rotate: openIndex === i ? 45 : 0,
                      scale: openIndex === i ? 1.1 : 1
                    }}
                    transition={{ 
                      type: "spring",
                      stiffness: 200,
                      damping: 15
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {openIndex === i ? (
                        <Minus size={24} className="text-green-500" />
                      ) : (
                        <Plus size={24} className="text-blue-500" />
                      )}
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Answer Container with Smooth Accordion */}
              <AnimatePresence mode="wait">
                {openIndex === i && (
                  <motion.div
                    initial={{ 
                      opacity: 0, 
                      height: 0,
                      y: -10,
                      scale: 0.95
                    }}
                    animate={{ 
                      opacity: 1, 
                      height: "auto",
                      y: 0,
                      scale: 1
                    }}
                    exit={{ 
                      opacity: 0, 
                      height: 0,
                      y: -10,
                      scale: 0.95
                    }}
                    transition={{ 
                      duration: 0.5,
                      ease: [0.4, 0, 0.2, 1],
                      height: {
                        duration: 0.4
                      },
                      opacity: {
                        duration: 0.3,
                        delay: openIndex === i ? 0.1 : 0
                      }
                    }}
                    className="overflow-hidden"
                  >
                    <motion.div
                      className={`mt-4 p-4 rounded-xl ${
                        isDarkMode 
                          ? "bg-gray-800/60 backdrop-blur-sm border border-gray-700/30" 
                          : "bg-white/80 backdrop-blur-sm border border-gray-200/50"
                      } shadow-lg`}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -20, opacity: 0 }}
                      transition={{ 
                        duration: 0.4,
                        delay: 0.1,
                        ease: "easeOut"
                      }}
                    >
                      <motion.p
                        className={`${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        } leading-relaxed`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        {faq.a}
                      </motion.p>
                      
                      {/* Subtle bottom accent */}
                      <motion.div
                        className={`mt-3 h-0.5 rounded-full bg-gradient-to-r ${
                          isDarkMode 
                            ? "from-green-400 to-blue-500" 
                            : "from-green-500 to-blue-600"
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                      />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`max-w-4xl mx-auto mt-16 p-10 rounded-3xl flex flex-col sm:flex-row justify-between items-center gap-6 ${bgGlass}`}
      >
        <div>
          <h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500">
            Still have questions?
          </h3>
          <p
            className={`${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            } text-sm`}
          >
            Our team is ready to assist you. Reach out anytime!
          </p>
        </div>
        <div className="flex gap-4 flex-col sm:flex-row">
          <motion.button
            onClick={() => navigate("/contact")}
            className={`
              relative overflow-hidden px-6 py-3 rounded-xl font-semibold text-white 
              bg-gradient-to-r from-blue-600 to-blue-500
              backdrop-blur-md shadow-lg shadow-blue-500/30
              border border-blue-400/30
              transition-all duration-300 group
            `}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(59, 130, 246, 0.4)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Animated shine effect */}
            <span
              className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-50 
                   -translate-x-full group-hover:translate-x-0
                   transition-all duration-700 pointer-events-none rounded-xl"
            ></span>

            <span className="relative flex items-center gap-2">
              Contact Support
              <motion.svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ x: 0 }}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </motion.svg>
            </span>
          </motion.button>

          <motion.button
            onClick={() => navigate("/contact#contact-info")}
            className={`px-6 py-3 rounded-xl border font-semibold transition-all duration-300 ${
              isDarkMode
                ? "border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                : "border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
            whileHover={{ 
              scale: 1.05,
              borderColor: isDarkMode ? "#4B5563" : "#D1D5DB"
            }}
            whileTap={{ scale: 0.98 }}
          >
            Browse Help Center
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}