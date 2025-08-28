import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { ShieldCheck, Star, Building, Clock, UserCheck, Code, Phone, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Animation variants
const fadeIn = (direction, delay) => ({
  hidden: {
    y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
    opacity: 0,
    x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
  },
  show: {
    y: 0,
    x: 0,
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 0.8,
      delay: delay,
      ease: [0.25, 0.6, 0.3, 0.8],
    },
  },
});

const BusinessSupportPage = () => {
  const { isDarkMode } = useTheme();

  const supportTiers = [
    {
      icon: <ShieldCheck className="w-10 h-10 text-blue-500" />,
      title: 'Standard Support',
      description: 'Essential support for startups and small businesses to get started and grow.',
      features: ['Email & Chat Support', '24-hour Response Time', 'Access to Knowledge Base', 'Community Forum Access'],
      color: 'blue',
    },
    {
      icon: <Star className="w-10 h-10 text-yellow-500" />,
      title: 'Premium Support',
      description: 'Priority support for growing businesses that need faster responses and dedicated help.',
      features: ['All Standard Features', 'Priority Phone Support', '4-hour Response Time', 'Dedicated Account Manager'],
      color: 'yellow',
    },
    {
      icon: <Building className="w-10 h-10 text-purple-500" />,
      title: 'Enterprise Support',
      description: 'Comprehensive, white-glove support for large-scale organizations with complex needs.',
      features: ['All Premium Features', '24/7 Emergency Hotline', 'Custom Onboarding & Training', 'Quarterly Business Reviews'],
      color: 'purple',
    },
  ];

  const supportFeatures = [
    { icon: <Clock />, text: '24/7 Availability' },
    { icon: <UserCheck />, text: 'Dedicated Managers' },
    { icon: <Code />, text: 'Expert Technical Help' },
    { icon: <Phone />, text: 'Multi-channel Contact' },
  ];

  const tierColorClasses = {
    blue: 'text-blue-500',
    yellow: 'text-yellow-500',
    purple: 'text-purple-500',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen pt-28 pb-16 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={fadeIn('down', 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Business Support
          </h1>
          <p className={`max-w-3xl mx-auto text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Dedicated support to help your business thrive. We're here to ensure you get the most out of BizFlow, every step of the way.
          </p>
        </motion.div>

        {/* Support Tiers */}
        <motion.div
          variants={fadeIn('up', 0.4)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {supportTiers.map((tier, index) => (
            <motion.div
              key={index}
              variants={fadeIn('up', 0.5 + index * 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`p-8 rounded-2xl shadow-lg transition-all duration-300 ${
                isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
              }`}
            >
              <div className="mb-6">{tier.icon}</div>
              <h3 className="text-2xl font-bold mb-3">{tier.title}</h3>
              <p className={`mb-6 h-20 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{tier.description}</p>
              <ul className="space-y-3">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <ShieldCheck className={`w-5 h-5 flex-shrink-0 ${tierColorClasses[tier.color]}`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Overview */}
        <motion.div
          variants={fadeIn('up', 0.6)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-center mb-10">Our Commitment to You</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {supportFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeIn('up', 0.7 + index * 0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white shadow-md'}`}
              >
                <div className={`inline-block p-4 rounded-full mb-4 ${isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                  {React.cloneElement(feature.icon, { className: 'w-8 h-8 text-blue-500' })}
                </div>
                <h4 className="font-semibold">{feature.text}</h4>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeIn('up', 0.8)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className={`p-10 rounded-2xl text-center ${isDarkMode ? 'bg-gray-800' : 'bg-blue-600 text-white'}`}
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className={`max-w-2xl mx-auto mb-8 ${isDarkMode ? 'text-gray-300' : 'text-blue-100'}`}>
            Our team is on standby to help you choose the right support plan for your business. Contact us today to learn more.
          </p>
          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`group inline-flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                isDarkMode
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-white text-blue-600 hover:bg-gray-100'
              }`}
            >
              Contact Sales <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BusinessSupportPage;

