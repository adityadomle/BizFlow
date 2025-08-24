import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import { useTheme } from "../context/ThemeContext";

const faqs = [
  {
    question: "What services does your platform offer?",
    answer:
      "Our platform offers a comprehensive suite of business solutions including web design, ad creatives, automation services, and infographics to help your business grow and succeed in the digital space.",
  },
  {
    question: "How can I track my business performance?",
    answer:
      "Our analytics dashboard provides real-time insights into your business metrics. You can track key performance indicators, monitor user engagement, and generate detailed reports to make data-driven decisions.",
  },
  {
    question: "What are your pricing plans?",
    answer:
      "We offer flexible pricing plans to suit businesses of all sizes. Our plans range from basic to enterprise levels, with options for monthly or annual billing. Visit our Pricing section for detailed information.",
  },
  {
    question: "How do I schedule a consultation?",
    answer:
      "You can easily schedule a consultation through our online booking system. Simply select your preferred date and time, and one of our experts will get in touch with you.",
  },
  {
    question: "Do you offer custom solutions for businesses?",
    answer:
      "Yes, we specialize in creating tailored solutions to meet your specific business needs. Contact our team to discuss your requirements and we'll develop a customized package for you.",
  },
  {
    question: "What makes your ad creatives effective?",
    answer:
      "Our ad creatives are designed by a team of experts who combine market research, compelling copy, and eye-catching visuals to create high-converting advertisements that deliver results.",
  },
  {
    question: "How does your automation service work?",
    answer:
      "Our automation solutions streamline your business processes, saving you time and resources. We analyze your workflow and implement automated systems to increase efficiency and reduce manual tasks.",
  },
  {
    question: "Can I see examples of your previous work?",
    answer:
      "Absolutely! Check out our portfolio section to see case studies and examples of our successful projects across various industries.",
  },
  {
    question: "What support do you offer after implementation?",
    answer:
      "We provide comprehensive post-implementation support including training, documentation, and ongoing maintenance to ensure your business continues to run smoothly.",
  },
  {
    question: "How do I get started with your services?",
    answer:
      "Getting started is easy! Simply contact us through our website or give us a call. Our team will guide you through the process and help you choose the best solutions for your business needs.",
  },
];

export default function FAQ() {
  const { isDarkMode } = useTheme();
  const [openIndex, setOpenIndex] = useState(0); // First item open by default

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className={`py-20 w-full transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 to-blue-900 text-white"
          : "bg-white text-gray-900"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeIn("up", 0.3)} className="max-w-4xl mx-auto">
          <motion.h2
            variants={textVariant(0.2)}
            className={`text-3xl md:text-4xl font-bold text-center mb-12 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Frequently Asked Questions
          </motion.h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={fadeIn("up", 0.1 * (index + 1))}
                className={`${
                  isDarkMode
                    ? "bg-white/5 border-white/10 text-white"
                    : "bg-gray-100 border-gray-200 text-gray-900"
                } max-w-4xl mx-auto cursor-pointer rounded-2xl p-6 hover:shadow-lg transition-all duration-300`}
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{faq.question}</h3>
                  <span className="flex-shrink-0 ml-4">
                    {openIndex === index ? (
                      <FiMinus size={20} />
                    ) : (
                      <FiPlus size={20} />
                    )}
                  </span>
                </div>
                <motion.div
                  id={`faq-${index}`}
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? "mt-4" : "h-0"
                  }`}
                  initial={false}
                  animate={{
                    opacity: openIndex === index ? 1 : 0,
                    height: openIndex === index ? "auto" : 0,
                  }}
                >
                  <p
                    className={`${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {faq.answer}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>

    // <section
    //   id="faq"
    //   className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 w-full"
    // >
    //   <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    //     <motion.div variants={fadeIn("up", 0.3)} className="max-w-4xl mx-auto">
    //       <motion.h2
    //         variants={textVariant(0.2)}
    //         className="text-3xl md:text-4xl font-bold text-center mb-12 text-white"
    //       >
    //         Frequently Asked Questions
    //       </motion.h2>
    //       <div className="space-y-6">
    //         {faqs.map((faq, index) => (
    //           <motion.div
    //             key={index}
    //             variants={fadeIn("up", 0.1 * (index + 1))}
    //             className="bg-white/5 backdrop-blur-sm border border-white/10 max-w-4xl mx-auto cursor-pointer rounded-2xl p-6 hover:shadow-lg hover:shadow-blue-900/30 transition-all duration-300 transform hover:scale-[1.02] hover:z-10"
    //             onClick={() => toggleFAQ(index)}
    //           >
    //             <div className="flex justify-between items-center">
    //               <h3 className="text-lg font-semibold text-white">
    //                 {faq.question}
    //               </h3>
    //               <span className="text-white flex-shrink-0 ml-4">
    //                 {openIndex === index ? (
    //                   <FiMinus size={20} />
    //                 ) : (
    //                   <FiPlus size={20} />
    //                 )}
    //               </span>
    //             </div>
    //             <motion.div
    //               id={`faq-${index}`}
    //               className={`overflow-hidden transition-all duration-300 ${
    //                 openIndex === index ? "mt-4" : "h-0"
    //               }`}
    //               initial={false}
    //               animate={{
    //                 opacity: openIndex === index ? 1 : 0,
    //                 height: openIndex === index ? "auto" : 0,
    //               }}
    //             >
    //               <p className="text-gray-300">{faq.answer}</p>
    //             </motion.div>
    //           </motion.div>
    //         ))}
    //       </div>
    //     </motion.div>
    //   </div>
    // </section>
  );
}
