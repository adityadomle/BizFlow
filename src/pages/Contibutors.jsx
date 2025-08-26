import React, { useEffect, useState } from "react";
import { fetchContributors } from "../../api/githubApi";
import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const Contributors = () => {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    fetchContributors("adityadomle", "BizFlow")
      .then((data) => {
        setContributors(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl font-medium text-primary">
          Loading Contributors...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 font-medium">Error: {error}</div>
      </div>
    );
  }

  if (contributors.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className={`text-lg ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
          No contributors found.
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen py-20 px-4 sm:px-6 lg:px-8 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className={`text-4xl md:text-5xl font-bold mb-4 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Meet Our Contributors
          </motion.h1>
          <motion.p
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className={`text-lg ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            The talented developers behind BizFlow's success
          </motion.p>
        </div>

        {/* Contributor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {contributors.map((contributor, idx) => (
            <motion.div
              key={contributor.login}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <a
                href={contributor.html_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`GitHub profile of ${contributor.login}`}
                className={`block group ${
                  isDarkMode ? "hover:bg-gray-800" : "hover:bg-white"
                } rounded-xl p-6 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl ${
                  isDarkMode
                    ? "bg-gray-800/50 shadow-gray-900/50"
                    : "bg-white shadow-gray-200/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  {/* Avatar */}
                  <div className="relative">
                    <img
                      src={contributor.avatar_url}
                      alt={`${contributor.login}'s avatar`}
                      className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/20"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white"></span>
                  </div>

                  {/* Username and contributions */}
                  <div className="flex-1 min-w-0">
                    <h2
                      className={`text-lg font-semibold truncate group-hover:text-primary transition-colors ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {contributor.login}
                    </h2>
                    <div className="flex items-center mt-1 space-x-2">
                      <FaGithub
                        className={`w-4 h-4 ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {contributor.contributions} contributions
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Contributors;
