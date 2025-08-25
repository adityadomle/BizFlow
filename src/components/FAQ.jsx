import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import { useTheme } from "../context/ThemeContext";

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
                  isDarkMode
                    ? "bg-white/5 border-white/10 hover:bg-blue-900/40 hover:shadow-lg hover:shadow-blue-500/30"
                    : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                }`}
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex justify-between items-center p-5">
                  <h3
                    className={`text-lg font-medium ${
                      isDarkMode ? "text-gray-100" : "text-gray-800"
                    }`}
                  >
                    {faq.question}
                  </h3>
                  <span
                    className={`ml-4 ${
                      isDarkMode ? "text-blue-400" : "text-gray-700"
                    }`}
                  >
                    {openIndex === index ? (
                      <FiMinus size={20} />
                    ) : (
                      <FiPlus size={20} />
                    )}
                  </span>
                </div>

                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <p
                        className={`px-5 pb-5 ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}