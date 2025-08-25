import { useState } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { fadeIn, textVariant } from '../utils/motion';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { toast } from 'react-toastify';

// Helper function to calculate price based on product count
const calculatePrice = (basePrice, productCount) =>
  Math.round(basePrice * (productCount / 50));

const PricingCard = ({ name, price, features, animation }) => (
  <motion.div
    variants={animation}
    className="bg-gradient-to-bl to-[#1c182c] from-[#1b1836] shadow-lg rounded-2xl px-5 justify-center py-5 flex flex-col gap-3 items-start"
  >
    <span className="text-md text-purple-200 bg-gray-950 px-3 py-1 rounded-full border-1 border-purple-800 mb-4">
      {name}
    </span>
    <p className="text-2xl text-indigo-200 font-semibold mb-6">
      <span>Price: </span>${price}/month
    </p>
    <ul className="list-disc list-inside pl-5 text-gray-400 text-md space-y-2 mb-6">
      {features.map((feat) => (
        <li key={feat} className="flex items-start">
          <CheckCircleIcon
            className="w-4 h-7 text-purple-400 mr-2 flex-shrink-0"
            aria-hidden="true"
          />
          {feat}
        </li>
      ))}
    </ul>
    <button className="bg-purple-900 px-5 py-2 rounded-full hover:scale-x-105 hover:cursor-pointer transition-all duration-500">
      Choose Plan
    </button>
  </motion.div>
);


PricingCard.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  features: PropTypes.arrayOf(PropTypes.string).isRequired,
  animation: PropTypes.object.isRequired,
};

const PricingSection = () => {
  const [productCount, setProductCount] = useState(1);
  const starterPrice = calculatePrice(4000, productCount);
  const businessPrice = calculatePrice(7500, productCount);

  // Handle Start button click
  const handleStartButton = () => {
    try {
      // Implement future functionality
    } catch (error) {
      toast.error('Something went wrong!');
    } finally {
      toast.info('⚒️ This feature is coming soon! Stay tuned for updates.');
    }
  };

  const plans = [
    {
      name: 'Starter',
      price: starterPrice,
      features: [
        'Up to 10 users',
        'Email support',
        'Basic analytics dashboard',
        'Access to community forum',
        'Standard security features',
        'Weekly performance reports',
      ],
      animation: fadeIn('right', 0.5),
    },
    {
      name: 'Business',
      price: businessPrice,
      features: [
        'Unlimited users',
        'Priority email & chat support',
        'Advanced analytics & custom reports',
        'Team collaboration tools',
        'Multiple project workspaces',
        'Daily performance insights',
      ],
      animation: fadeIn('left', 0.5),
    },
  ];

  return (
    <motion.section
      variants={fadeIn('up', 0.2)}
      initial="hidden"
      whileInView="show"
      className="py-15 px-4 bg-pink-500 dark:bg-gray-900 dark:text-white transition duration-300"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          variants={textVariant(0.3)}
          className="rounded-lg py-5 text-3xl md:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-pink-500 to-purple-700 bg-[length:200%_200%] animate-gradient-x text-center mb-16"
        >
          Pricing
        </motion.h2>

        <motion.div
          variants={fadeIn('up', 0.4)}
          className="grid md:grid-cols-2 gap-8 mb-12"
        >
          {plans.map((plan) => (
            <PricingCard key={plan.name} {...plan} />
          ))}
        </motion.div>

        {/* Slider and CTA sections below */}
        <motion.div
          variants={fadeIn('up', 0.8)}
          className="max-w-xl mx-auto"
        >
          <motion.div
            variants={fadeIn('up', 1.1)}
            className="text-center mt-16"
          >
            <motion.p
              variants={fadeIn('up', 1.2)}
              className="text-3xl text-gray-600 dark:text-gray-300 mb-4"
            >
              Ready to get started?
            </motion.p>
            <motion.button
              variants={fadeIn('up', 1.3)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full px-6 md:px-6.5 py-2.5 md:py-3 font-medium bg-purple-900 text-gray-200 transition-all duration-300 ease-in-out hover:bg-purple-800 hover:shadow-[0_0_15px_#581c87] focus:outline-none focus:ring-0"
              onClick={handleStartButton}
            >
              Get Started
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default PricingSection;
