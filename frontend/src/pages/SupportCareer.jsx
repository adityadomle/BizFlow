import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, textVariant } from '../utils/motion';
import { useTheme } from '../context/ThemeContext';
import { FiMapPin, FiBriefcase, FiArrowRight } from 'react-icons/fi';
import { trackButtonClick } from '../utils/analytics';

// Mock data for job openings
const jobOpenings = [
  {
    title: 'Senior Frontend Developer',
    location: 'Remote',
    type: 'Full-time',
    department: 'Engineering',
    description: 'Join our team to build and enhance the user interface of BizFlow, creating a seamless and visually appealing experience for our users.'
  },
  {
    title: 'Product Manager',
    location: 'Delhi, India',
    type: 'Full-time',
    department: 'Product',
    description: 'Lead the product vision and strategy for our core features, working closely with engineering and design teams to deliver value.'
  },
  {
    title: 'UX/UI Designer',
    location: 'Remote',
    type: 'Contract',
    department: 'Design',
    description: 'Craft intuitive and beautiful user interfaces. You will be responsible for the entire design process, from wireframes to final visual design.'
  },
  {
    title: 'DevOps Engineer',
    location: 'Delhi, India',
    type: 'Full-time',
    department: 'Engineering',
    description: 'Manage and improve our CI/CD pipelines, ensure system reliability, and scale our infrastructure to support a growing user base.'
  }
];

const SupportCareer = () => {
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
            <span className="text-blue-600">💼</span>
            <span className={`text-sm font-medium ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>Work With Us</span>
          </div>
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Join Our Team and Shape the Future
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            We are looking for passionate, innovative, and driven individuals to join our mission. Explore our open positions and find where you fit in.
          </p>
        </motion.div>
      </motion.section>

      {/* Job Listings */}
      <motion.section
        variants={fadeIn('up', 0.4)}
        initial="hidden"
        animate="show"
        className="section-container"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-3xl font-bold text-center mb-12 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Current Openings</h2>
          <div className="space-y-6">
            {jobOpenings.map((job, index) => (
              <motion.div
                key={index}
                variants={fadeIn('up', 0.5 + index * 0.1)}
                initial="hidden"
                animate="show"
                whileHover={{ scale: 1.02, y: -5 }}
                className={`p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border group cursor-pointer ${isDarkMode ? 'bg-slate-800 border-slate-700 hover:border-blue-500' : 'bg-white border-gray-100 hover:border-blue-200'}`}
              >
                <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                  <div>
                    <span className={`text-sm font-semibold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>{job.department}</span>
                    <h3 className={`text-xl font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{job.title}</h3>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <span className={`flex items-center gap-1.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <FiMapPin /> {job.location}
                      </span>
                      <span className={`flex items-center gap-1.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <FiBriefcase /> {job.type}
                      </span>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => trackButtonClick(`Apply Now - ${job.title}`)}
                    className="mt-4 sm:mt-0 flex items-center justify-center gap-2 bg-blue-500 text-white px-5 py-2.5 rounded-lg hover:bg-blue-600 transition-colors font-medium transform group-hover:scale-105"
                  >
                    Apply Now <FiArrowRight />
                  </motion.button>
                </div>
                <p className={`mt-4 pt-4 border-t text-sm ${isDarkMode ? 'border-slate-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
                  {job.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className={`text-center mt-16 p-8 rounded-2xl ${isDarkMode ? 'bg-slate-800' : 'bg-blue-50'}`}>
            <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Don&apos;t see a fit?</h3>
            <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              We&apos;re always looking for talented people. Send us your resume and we&apos;ll keep you in mind for future roles.
            </p>
            <motion.a
              href="mailto:careers@bizflow.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-medium transition-all"
            >
              Submit Your Resume
            </motion.a>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default SupportCareer;