import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn, textVariant } from '../utils/motion';
import { useTheme } from '../context/ThemeContext';
import { FiChevronDown, FiHelpCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'; // 👈 1. Import PropTypes

// Mock data for FAQs
const faqData = [
  {
    category: 'General',
    questions: [
      { q: 'What is BizFlow?', a: 'BizFlow is a modern, React-based business workflow dashboard designed to help you manage tasks, track metrics, and organize workflows with ease and style.' },
      { q: 'Who is BizFlow for?', a: 'BizFlow is designed for everyone—from business owners and freelancers to students and open-source contributors who want a clean and efficient way to manage their work.' },
      { q: 'Is BizFlow free to use?', a: 'Yes, BizFlow is an open-source project licensed under the MIT License. You can use, modify, and distribute it for free.' }
    ]
  },
  {
    category: 'Technical',
    questions: [
      { q: 'What is the tech stack used in BizFlow?', a: 'BizFlow is built with React (using Vite), styled with TailwindCSS, and animated with Framer Motion. The code is linted with ESLint.' },
      { q: 'How can I contribute to the project?', a: 'We welcome all contributions! Please read our CONTRIBUTING.md file in the repository for detailed instructions on how to fork the repo, create branches, and submit pull requests.' },
      { q: 'How do I set up the project locally?', a: 'To get started, clone the repository, run `npm install` to install dependencies, and then `npm run dev` to start the local development server.' }
    ]
  },
  {
    category: 'Billing',
    questions: [
      { q: 'How does pricing work?', a: 'The pricing section on our homepage is a demonstration. As an open-source project, BizFlow itself is free. The pricing page serves as a template for businesses that might adopt this codebase.' },
      { q: 'Can I customize the pricing plans?', a: 'Absolutely. The pricing logic is located in the `src/components/PricingSection.jsx` component and can be easily modified to fit your business needs.' }
    ]
  }
];

const AccordionItem = ({ q, a }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode } = useTheme();

  return (
    <div className={`border-b ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left py-5 px-1"
      >
        <span className={`font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>{q}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FiChevronDown className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className={`pb-5 px-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// 👇 2. Add prop types validation
AccordionItem.propTypes = {
  q: PropTypes.string.isRequired,
  a: PropTypes.string.isRequired
};

const Faqs = () => {
  const { isDarkMode } = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`min-h-screen pt-24 pb-16 transition-colors duration-300 ${isDarkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
      {/* Header Section */}
      <motion.section
        variants={fadeIn('up', 0.2)}
        initial="hidden"
        animate="show"
        className="section-container text-center"
      >
        <motion.div
          variants={textVariant(0.3)}
          className="max-w-3xl mx-auto"
        >
          <div className={`flex items-center justify-center gap-2 w-fit px-4 py-2 rounded-full mx-auto mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-blue-50'}`}>
            <FiHelpCircle className={`w-5 h-5 ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`} />
            <span className={`text-sm font-medium ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>FAQs</span>
          </div>
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Frequently Asked Questions
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Find answers to common questions about BizFlow, our technology, and how you can get involved.
          </p>
        </motion.div>
      </motion.section>

      {/* FAQ Accordion */}
      <motion.section
        variants={fadeIn('up', 0.4)}
        initial="hidden"
        animate="show"
        className="section-container"
      >
        <div className="max-w-3xl mx-auto">
          {faqData.map((category, index) => (
            <div key={index} className="mb-12">
              <h2 className={`text-2xl font-bold mb-6 border-l-4 pl-4 ${isDarkMode ? 'text-white border-blue-500' : 'text-gray-800 border-blue-600'}`}>
                {category.category}
              </h2>
              <div className="space-y-2">
                {category.questions.map((item, qIndex) => (
                  <AccordionItem key={qIndex} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.section>
      
      {/* Contact CTA */}
       <motion.section
        variants={fadeIn('up', 0.6)}
        initial="hidden"
        animate="show"
        className="section-container"
      >
         <div className={`text-center mt-8 p-8 rounded-2xl ${isDarkMode ? 'bg-slate-800' : 'bg-white shadow-lg'}`}>
            <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Still have questions?</h3>
            <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              If you can&apos;t find the answer you&apos;re looking for, please don&apos;t hesitate to reach out to us.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-medium transition-all"
            >
              Contact Us
            </Link>
          </div>
       </motion.section>
    </div>
  );
};

export default Faqs;