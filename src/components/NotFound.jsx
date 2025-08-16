import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 mt-16"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-gradient-to-r from-blue-100 via-indigo-100 to-pink-100 rounded-2xl p-8 shadow-lg"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-blue-600 mb-4">404</h1>
        <p className="text-lg md:text-xl text-gray-700 mb-6">Oops! The page you are looking for does not exist or has been moved.</p>
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 font-medium transition-all shadow-md"
        >
          Go to Home
        </Link>
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="mt-8 text-gray-500"
      >
        If you reached here from a broken link, please let us know so we can fix it!
      </motion.p>
    </motion.section>
  );
};

export default NotFound;
