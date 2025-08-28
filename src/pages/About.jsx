import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, textVariant } from '../utils/motion';
import { useTheme } from '../context/ThemeContext';
import { FiUsers, FiTarget, FiHeart, FiZap, FiCode, FiGithub, FiMessageCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

// Core values data
const coreValues = [
  {
    icon: FiZap,
    title: 'Simplicity',
    description: 'We believe in clean, intuitive design that makes complex workflows feel effortless.'
  },
  {
    icon: FiTarget,
    title: 'Performance',
    description: 'Built with modern technologies to deliver fast, responsive user experiences.'
  },
  {
    icon: FiUsers,
    title: 'Community',
    description: 'Open-source at heart, driven by collaboration and shared knowledge.'
  },
  {
    icon: FiHeart,
    title: 'Innovation',
    description: 'Constantly evolving to meet the changing needs of modern businesses.'
  }
];

// Services data
const services = [
  {
    icon: FiTarget,
    title: 'Task Management',
    description: 'Organize and prioritize your tasks with intuitive drag-and-drop interfaces and smart categorization.'
  },
  {
    icon: FiZap,
    title: 'Performance Analytics',
    description: 'Track key metrics and KPIs with beautiful, interactive dashboards and real-time data visualization.'
  },
  {
    icon: FiUsers,
    title: 'Team Collaboration',
    description: 'Streamline team communication and project coordination with built-in collaboration tools.'
  },
  {
    icon: FiCode,
    title: 'Custom Workflows',
    description: 'Design and implement custom business processes that adapt to your unique organizational needs.'
  }
];

// Project owner data
const projectOwner = {
  name: 'Aditya Domle',
  role: 'Project Creator & Lead Developer',
  githubId: 'adityadomle',
  githubUrl: 'https://github.com/adityadomle',
  avatar: 'https://github.com/adityadomle.png',
  bio: 'Passionate full-stack developer and open-source enthusiast dedicated to creating innovative business solutions that make work more efficient and enjoyable.'
};

const AboutUs = () => {
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
          className="max-w-4xl mx-auto"
        >
          <div className={`flex items-center justify-center gap-2 w-fit px-4 py-2 rounded-full mx-auto mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-blue-50'}`}>
            <FiUsers className={`w-5 h-5 ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`} />
            <span className={`text-sm font-medium ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>About Us</span>
          </div>
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Meet the BizFlow Team
          </h1>
          <p className={`text-lg max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            We're a passionate group of developers, designers, and innovators dedicated to creating powerful, 
            intuitive business workflow solutions that help teams work smarter, not harder.
          </p>
        </motion.div>
      </motion.section>

      {/* Introduction Section */}
      <motion.section
        variants={fadeIn('up', 0.4)}
        initial="hidden"
        animate="show"
        className="section-container"
      >
        <div className="max-w-4xl mx-auto">
          <div className={`p-8 rounded-2xl ${isDarkMode ? 'bg-slate-800' : 'bg-white shadow-lg'}`}>
            <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              What is BizFlow?
            </h2>
            <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              BizFlow is a modern, React-based business workflow dashboard designed to help you manage tasks, 
              track metrics, and organize workflows with ease and style. Built with cutting-edge technologies 
              like React, TailwindCSS, and Framer Motion, BizFlow provides a seamless experience for everyone—from 
              business owners and freelancers to students and open-source contributors who want a clean and 
              efficient way to manage their work.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Mission Section */}
      <motion.section
        variants={fadeIn('up', 0.6)}
        initial="hidden"
        animate="show"
        className="section-container"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Our Mission
          </h2>
          <div className={`p-8 rounded-2xl ${isDarkMode ? 'bg-gradient-to-br from-blue-900/50 to-slate-800' : 'bg-gradient-to-br from-blue-50 to-white shadow-lg'}`}>
            <p className={`text-xl leading-relaxed ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              To make business workflows simpler, cleaner, and more enjoyable by providing intuitive tools 
              that empower teams to focus on what matters most—their core business objectives. We believe 
              that great software should feel effortless to use while being powerful enough to handle 
              complex business needs.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Our Services Section */}
      <motion.section
        variants={fadeIn('up', 0.8)}
        initial="hidden"
        animate="show"
        className="section-container"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-3xl font-bold text-center mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Our Services
          </h2>
          <p className={`text-lg text-center mb-12 max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            BizFlow provides a comprehensive suite of tools designed to streamline your business operations 
            and boost productivity across all aspects of your workflow management.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeIn('up', 0.2 * index)}
                className={`p-6 rounded-xl text-center ${isDarkMode ? 'bg-slate-800' : 'bg-white shadow-lg'}`}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${isDarkMode ? 'bg-blue-600' : 'bg-blue-100'}`}>
                  <service.icon className={`w-8 h-8 ${isDarkMode ? 'text-white' : 'text-blue-600'}`} />
                </div>
                <h3 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {service.title}
                </h3>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Core Values Section */}
      <motion.section
        variants={fadeIn('up', 1.0)}
        initial="hidden"
        animate="show"
        className="section-container"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-3xl font-bold text-center mb-12 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeIn('up', 0.2 * index)}
                className={`p-6 rounded-xl text-center ${isDarkMode ? 'bg-slate-800' : 'bg-white shadow-lg'}`}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${isDarkMode ? 'bg-blue-600' : 'bg-blue-100'}`}>
                  <value.icon className={`w-8 h-8 ${isDarkMode ? 'text-white' : 'text-blue-600'}`} />
                </div>
                <h3 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {value.title}
                </h3>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Project Owner Section */}
      <motion.section
        variants={fadeIn('up', 1.2)}
        initial="hidden"
        animate="show"
        className="section-container"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-3xl font-bold text-center mb-12 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Meet the Project Owner
          </h2>
          <div className={`p-8 rounded-2xl text-center ${isDarkMode ? 'bg-slate-800' : 'bg-white shadow-lg'}`}>
            <img
              src={projectOwner.avatar}
              alt={projectOwner.name}
              className="w-32 h-32 rounded-full mx-auto mb-6 object-cover ring-4 ring-blue-500/20"
            />
            <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {projectOwner.name}
            </h3>
            <p className={`text-lg font-medium mb-4 ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>
              {projectOwner.role}
            </p>
            <p className={`text-lg mb-6 max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {projectOwner.bio}
            </p>
            <a
              href={projectOwner.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 font-medium transition-all"
            >
              <FiGithub className="w-5 h-5" />
              @{projectOwner.githubId}
            </a>
          </div>
        </div>
      </motion.section>

      {/* Join Us CTA */}
      <motion.section
        variants={fadeIn('up', 1.4)}
        initial="hidden"
        animate="show"
        className="section-container"
      >
        <div className={`text-center p-8 rounded-2xl ${isDarkMode ? 'bg-gradient-to-br from-slate-800 to-slate-700' : 'bg-gradient-to-br from-blue-50 to-white shadow-lg'}`}>
          <h3 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Join Our Community
          </h3>
          <p className={`text-lg mb-8 max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            BizFlow is open-source and thrives on community contributions. Whether you're a developer, 
            designer, or just passionate about great software, there's a place for you in our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/bizflow"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 font-medium transition-all"
            >
              <FiGithub className="w-5 h-5" />
              View on GitHub
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium transition-all"
            >
              <FiMessageCircle className="w-5 h-5" />
              Get in Touch
            </Link>
            <a
              href="/contributor-guide"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${isDarkMode ? 'bg-slate-600 text-white hover:bg-slate-500' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
            >
              <FiCode className="w-5 h-5" />
              Contribute
            </a>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutUs;