
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { fadeIn, textVariant } from "../utils/motion";

// Variants for staggered animation
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } }
};

const FeaturesSection = () => {
  const features = [
    {
      icon: "🔍",
      title: "Find out what you need",
      description: "We present you a proposal and discuss nitty-gritty like",
      bg: "#F1EFFD"
    },
    {
      icon: "⚙️",
      title: "Work out the details",
      description: "Communication protocols apart from engagement models",
      bg: "#FFE7E7"
    },
    {
      icon: "🚀",
      title: "We get to work fast",
      description: "Protocols apart from engage models, pricing billing",
      bg: "#FFF3E4"
    }
  ];

  return (
    <motion.section
      variants={fadeIn('up', 0.2)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="max-w-7xl mx-auto px-4 py-16"
    >
      {/* Header */}
      <motion.div
        variants={fadeIn('up', 0.3)}
        className="text-center mb-12"
      >
        <motion.h2
          variants={textVariant(0.2)}
          className="text-3xl font-bold mb-4 transition-colors duration-300 text-heading-color"
        >
          How can we help your business?
        </motion.h2>
        <motion.p
          variants={fadeIn('up', 0.4)}
          className="text-text-color transition-colors duration-300"
        >
          When you resell Besnik, you build trust and increase
        </motion.p>
      </motion.div>

      {/* Features */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="flex flex-col items-center p-6 card rounded-xl shadow-sm hover:shadow-lg transition-shadow card-bg card-border"
          >
            <div
              className="w-24 h-24 rounded-full mb-6 flex items-center justify-center transition-transform duration-300 hover:scale-110 bg-card-background"
              aria-hidden="true"
            >
              <span className="text-3xl">{feature.icon}</span>
            </div>
            <h3 className="text-2xl font-medium mb-3 transition-colors duration-300 text-heading-color">{feature.title}</h3>
            <p className="text-text-color text-center transition-colors duration-300">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Call to Action */}
      <motion.div 
        variants={fadeIn('up', 0.7)}
        className="text-center mt-12"
      >
        <Link 
    to="/partner" 
    className="inline-block bg-accent-color text-white cursor-pointer px-8 py-3 rounded-full font-medium transition-all duration-300 ease-in-out hover:bg-accent-color/80 hover:scale-105 hover:shadow-[0_0_15px_var(--accent-color-shadow)] relative"
  >
    <motion.div
      variants={fadeIn('up', 0.8)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative"
    >
      Become a Partner
      <div className="absolute -z-10 w-full h-full rounded-full bg-accent-color/30 blur-xl top-0 left-0"></div>
    </motion.div>
  </Link>
          to="/partner" 
          className="inline-block bg-orange-200 text-gray-800 cursor-pointer px-8 py-3 rounded-full font-medium transition-all duration-300 ease-in-out hover:bg-orange-300 hover:scale-105 hover:shadow-[0_0_15px_#fed7aa] relative"
        >
          <motion.div
            variants={fadeIn('up', 0.8)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            Become a Partner
            <div className="absolute -z-10 w-full h-full rounded-full blur-xl top-0 left-0"></div>
          </motion.div>
        </Link>
      </motion.div>
    </motion.section>
  );
};

export default FeaturesSection;
