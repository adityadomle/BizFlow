import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, textVariant } from '../utils/motion';
import { CheckIcon } from '@heroicons/react/24/solid'; // Adjust import if needed
import { toast } from 'react-toastify';

const PricingCard = ({ name, price, features, animation }) => (
  <motion.div
    variants={animation}
    className="rounded-lg bg-gradient-to-r from-pink-200 to-blue-100 p-8 shadow-lg"
  >
    <h3 className="text-xl  text-gray-900 mb-4">{name}</h3>
    <p className="text-3xl text-black font-bold mb-6">${price}/mo</p>
    <ul className="list-disc list-inside pl-5 text-gray-700 space-y-2 mb-6">
      {features.map((feat) => (
        <li key={feat} className="flex items-start">
          <CheckIcon className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0" />
          {feat}
        </li>
      ))}
    </ul>
    {/* Add CTA button if needed */}
  </motion.div>
);

const PricingSection = () => {
  const [productCount, setProductCount] = useState(1);
  const starterPrice = Math.round(4000 * (productCount / 50));
  const businessPrice = Math.round(7500 * (productCount / 50));

  // handle Start button
  const handleStartButton = () => {
    try {
      // implement functionality
    } 
    catch (error) {
      // throw error
      toast.error("Something went wrong!")
    }
    finally{
      toast.info("⚒️ This feature is coming soon ! Stay tuned for updates.")
    }
  }

  const plans = [
    {
      name: 'Starter',
      price: starterPrice,
      features: ['Up to 10 users', 'Email support', 'Basic analytics'],
      animation: fadeIn('right', 0.5),
    },
    {
      name: 'Business',
      price: businessPrice,
      features: ['Unlimited users', 'Priority support', 'Advanced analytics'],
      animation: fadeIn('left', 0.5),
    },
  ];

  return (
    <motion.section
      variants={fadeIn('up', 0.2)}
      initial="hidden"
      whileInView="show"
      className="py-20 px-4 bg-gray-50"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          variants={textVariant(0.3)}
          className="rounded-lg py-5 text-3xl md:text-4xl font-bold text-center mb-16"
        >
          Pricing
        </motion.h2>

        <motion.div variants={fadeIn('up', 0.4)} className="grid md:grid-cols-2 gap-8 mb-12">
          {plans.map((plan) => (
            <PricingCard
              key={plan.name}
              {...plan}
            />
          ))}
        </motion.div>

        {/* Slider and CTA sections below */}
        <motion.div variants={fadeIn('up', 0.8)} className="max-w-xl mx-auto">
          <motion.p variants={fadeIn('up', 0.9)} className="text-center text-gray-600 mb-4">
            {productCount} product{productCount > 1 ? 's' : ''}
          </motion.p>
          <motion.div variants={fadeIn('up', 1.0)} className="relative px-4">
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm text-gray-600">1</span>
              <input
                type="range"
                min="1"
                max="50"
                step="1"
                value={productCount}
                onChange={(e) => setProductCount(parseInt(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-xs sm:text-sm text-gray-600">50</span>
            </div>
          </motion.div>
          <motion.div variants={fadeIn('up', 1.1)} className="text-center mt-12">
            <motion.p variants={fadeIn('up', 1.2)} className="text-xl text-gray-600 mb-4">
              Ready to get started?
            </motion.p>
            <motion.button
              variants={fadeIn('up', 1.3)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-pink-200 text-gray-900 px-6 py-3 rounded-lg transition duration-300 hover:bg-pink-300 hover:shadow-lg cursor-pointer"
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
