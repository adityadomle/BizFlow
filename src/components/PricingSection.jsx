import { useState } from 'react'
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";

const PricingSection = () => {
  const [productCount, setProductCount] = useState(1)
  
  // Calculate prices based on product count
  const starterPrice = Math.round(4000 * (productCount / 50))
  const businessPrice = Math.round(7500 * (productCount / 50))

  return (
    <motion.section 
      variants={fadeIn('up', 0.2)}
      initial="hidden"
      whileInView="show"
      className="py-20 px-4 bg-gray-50 "
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          variants={textVariant(0.3)}
          className="rounded-lg py-5 text-3xl md:text-4xl font-bold text-center mb-16"
        >
          Pricing
        </motion.h2>
        
        <motion.div 
          variants={fadeIn('up', 0.4)}
          className="grid md:grid-cols-2 gap-8 mb-12"
        >
          {/* Starter Plan */}
          <motion.div 
            variants={fadeIn('right', 0.5)}
            className="py-20 px-4 bg-gradient-to-r from-pink-200 to-blue-100 p-8 rounded-lg shadow-lg"
          >
            <motion.h3 
              variants={fadeIn('up', 0.6)}
              className="text-xl text-gray-600 mb-4"
            >
              Starter
            </motion.h3>
            <motion.p 
              variants={fadeIn('up', 0.7)}
              className="text-3xl font-bold mb-6"
            >
              ${starterPrice}/mo
            </motion.p>
          </motion.div>
          
          {/* Business Plan */}
          <motion.div 
            variants={fadeIn('left', 0.5)}
            className="py-20 px-4 bg-gradient-to-r from-pink-200 to-blue-100 p-8 rounded-lg shadow-lg"
          >
            <motion.h3 
              variants={fadeIn('up', 0.6)}
              className="text-xl text-gray-600 mb-4"
            >
              Business
            </motion.h3>
            <motion.p 
              variants={fadeIn('up', 0.7)}
              className="text-3xl font-bold mb-6"
            >
              ${businessPrice}/mo
            </motion.p>
          </motion.div>
        </motion.div>

        <motion.div 
          variants={fadeIn('up', 0.8)}
          className="max-w-xl mx-auto"
        >
          <motion.p 
            variants={fadeIn('up', 0.9)}
            className="text-center text-gray-600 mb-4"
          >
            {productCount} products
          </motion.p>
          
          <motion.div 
            variants={fadeIn('up', 1.0)}
            className="relative px-4"
          >
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm text-gray-600">1</span>
              <input 
                type="range" 
                min="1" 
                max="50" 
                value={productCount}
                onChange={(e) => setProductCount(parseInt(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-xs sm:text-sm text-gray-600">50</span>
            </div>
          </motion.div>

          <motion.div 
            variants={fadeIn('up', 1.1)}
            className="text-center mt-12"
          >
            <motion.p 
              variants={fadeIn('up', 1.2)}
              className="text-xl text-gray-600 mb-4"
            >
              Ready to get started?
            </motion.p>
            <motion.button 
              variants={fadeIn('up', 1.3)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-pink-200 text-white px-6 py-3 rounded-lg transition-all duration-300 ease-in-out hover:bg-pink-300 hover:scale-105 hover:shadow-[0_0_15px_#f9a8d4] cursor-pointer"
            >
              Get Started
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>  
  )
}

export default PricingSection 