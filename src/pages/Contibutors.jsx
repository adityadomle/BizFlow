import React, { useEffect, useState } from "react";
import { fetchContributors } from "../../api/githubApi";
import { FaGithub, FaCode, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import GitHubStats from "./GitHubStats";
import Loader from "../components/Loader";

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
    return <Loader />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className={`max-w-md text-center p-8 rounded-2xl ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } shadow-xl`}>
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h3 className={`text-xl font-semibold mb-2 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}>
            Something went wrong
          </h3>
          <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            {error}
          </p>
        </div>
      </div>
    );
  }

  if (contributors.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className={`max-w-md text-center p-8 rounded-2xl ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } shadow-xl`}>
          <div className="text-6xl mb-4">👥</div>
          <h3 className={`text-xl font-semibold mb-2 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}>
            No Contributors Found
          </h3>
          <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            We couldn't find any contributors for this repository.
          </p>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`min-h-screen ${
        isDarkMode 
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" 
          : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
      }`}
    >
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 blur-3xl ${
            isDarkMode ? "bg-blue-500" : "bg-blue-300"
          } animate-pulse`}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Header */}
          <motion.div 
            variants={itemVariants}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                isDarkMode ? "bg-white/10" : "bg-black/5"
              }`}>
                <FaUsers className={`text-2xl ${
                  isDarkMode ? "text-blue-400" : "text-blue-600"
                }`} />
              </div>
              <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r ${
                isDarkMode 
                  ? "from-white via-blue-100 to-blue-200" 
                  : "from-gray-900 via-blue-900 to-blue-700"
              } bg-clip-text text-transparent`}>
                Our Contributors
              </h1>
            </div>
            
            <p className={`text-lg md:text-xl max-w-3xl mx-auto ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}>
              Meet the amazing developers who bring BizFlow to life with their code, ideas, and passion
            </p>

            {/* Stats summary */}
            <div className="mt-12 grid grid-cols-2 gap-6 max-w-md mx-auto">
              <div className={`p-4 rounded-2xl ${
                isDarkMode ? "bg-gray-800/50" : "bg-white/50"
              } backdrop-blur-sm border ${
                isDarkMode ? "border-gray-700/50" : "border-gray-200/50"
              }`}>
                <div className={`text-3xl font-bold ${
                  isDarkMode ? "text-blue-400" : "text-blue-600"
                }`}>
                  {contributors.length}
                </div>
                <div className={`text-sm font-medium ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}>
                  Contributors
                </div>
              </div>
              <div className={`p-4 rounded-2xl ${
                isDarkMode ? "bg-gray-800/50" : "bg-white/50"
              } backdrop-blur-sm border ${
                isDarkMode ? "border-gray-700/50" : "border-gray-200/50"
              }`}>
                <div className={`text-3xl font-bold ${
                  isDarkMode ? "text-green-400" : "text-green-600"
                }`}>
                  {contributors.reduce((sum, c) => sum + c.contributions, 0)}
                </div>
                <div className={`text-sm font-medium ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}>
                  Total Commits
                </div>
              </div>
            </div>
          </motion.div>

          {/* GitHub Stats */}
          <motion.div variants={itemVariants} className="mb-14">
            <GitHubStats />
          </motion.div>

          {/* Top 3 Contributors */}
          {contributors.length >= 3 && (
            <motion.div variants={itemVariants} className="mb-20">
              <div className="text-center mb-12">
                <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}>
                  🏆 Top Contributors
                </h2>
                <p className={`text-lg ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}>
                  Our most active contributors leading the way
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {contributors.slice(0, 3).map((contributor, idx) => (
                  <motion.div
                    key={`top-${contributor.login}`}
                    variants={itemVariants}
                    whileHover={{ 
                      y: -12,
                      transition: { type: "spring", stiffness: 300, damping: 20 }
                    }}
                    className="group relative"
                  >
                    {/* Ranking badge */}
                    <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 z-20 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      idx === 0 
                        ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-900"
                        : idx === 1
                        ? "bg-gradient-to-r from-gray-300 to-gray-500 text-gray-900"
                        : "bg-gradient-to-r from-amber-400 to-amber-600 text-amber-900"
                    }`}>
                      {idx + 1}
                    </div>

                    <a
                      href={contributor.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`GitHub profile of ${contributor.login}`}
                      className={`block relative p-8 rounded-3xl transition-all duration-300 ${
                        isDarkMode
                          ? "bg-gray-800/60 hover:bg-gray-800/80 border-2 border-gray-700/50 hover:border-gray-600/50"
                          : "bg-white/80 hover:bg-white border-2 border-gray-200/50 hover:border-gray-300/50"
                      } backdrop-blur-sm shadow-xl hover:shadow-2xl overflow-hidden ${
                        idx === 0 ? (isDarkMode ? "ring-2 ring-yellow-500/30" : "ring-2 ring-yellow-400/30") : ""
                      }`}
                    >
                      {/* Special glow for #1 */}
                      {idx === 0 && (
                        <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
                          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-yellow-400/20 to-orange-500/20"></div>
                        </div>
                      )}

                      {/* Content */}
                      <div className="relative z-10 text-center">
                        {/* Avatar - larger for top contributors */}
                        <div className="relative mx-auto w-24 h-24 mb-6">
                          <img
                            src={contributor.avatar_url}
                            alt={`${contributor.login}'s avatar`}
                            className={`w-full h-full rounded-2xl object-cover ring-4 ${
                              idx === 0 ? "ring-yellow-500/40" : "ring-white/20"
                            } group-hover:ring-blue-500/40 transition-all duration-300`}
                          />
                          <div className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-full ring-4 ring-white flex items-center justify-center ${
                            idx === 0 ? "bg-yellow-500" : idx === 1 ? "bg-gray-400" : "bg-amber-500"
                          }`}>
                            <FaGithub className="w-4 h-4 text-white" />
                          </div>
                        </div>

                        {/* Username */}
                        <h3 className={`text-xl font-bold mb-3 group-hover:${
                          isDarkMode ? "text-blue-400" : "text-blue-600"
                        } transition-colors duration-300 ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}>
                          @{contributor.login}
                        </h3>

                        {/* Contributions */}
                        <div className={`flex items-center justify-center gap-2 text-base mb-4 ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}>
                          <FaCode className="w-5 h-5" />
                          <span className="font-bold text-2xl">
                            {contributor.contributions.toLocaleString()}
                          </span>
                          <span>commits</span>
                        </div>

                        {/* Special badge for top contributors */}
                        <div className="mt-4">
                          <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold ${
                            idx === 0
                              ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
                              : idx === 1
                              ? isDarkMode 
                                ? "bg-gray-500/30 text-gray-300 border border-gray-500/50"
                                : "bg-gray-200 text-gray-800 border border-gray-300"
                              : isDarkMode 
                                ? "bg-amber-500/30 text-amber-300 border border-amber-500/50"
                                : "bg-amber-100 text-amber-800 border border-amber-300"
                          }`}>
                            {idx === 0 ? "🥇 Champion" :
                             idx === 1 ? "🥈 Runner-up" :
                             "🥉 Third Place"}
                          </span>
                        </div>
                      </div>

                      {/* Enhanced shine effect for winners */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                        <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent ${
                          idx === 0 ? "via-yellow-400/10" : "via-white/5"
                        } to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000`}></div>
                      </div>
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Other Contributors */}
          {contributors.length > 3 && (
            <motion.div variants={itemVariants}>
              <div className="text-center mb-12">
                <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}>
                  👥 All Contributors
                </h2>
                <p className={`text-lg ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}>
                  Every contribution makes a difference
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {contributors.slice(3).map((contributor, idx) => (
                  <motion.div
                    key={contributor.login}
                    variants={itemVariants}
                    whileHover={{ 
                      y: -8,
                      transition: { type: "spring", stiffness: 300, damping: 20 }
                    }}
                    className="group"
                  >
                    <a
                      href={contributor.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`GitHub profile of ${contributor.login}`}
                      className={`block relative p-6 rounded-3xl transition-all duration-300 ${
                        isDarkMode
                          ? "bg-gray-800/60 hover:bg-gray-800/80 border border-gray-700/50 hover:border-gray-600/50"
                          : "bg-white/80 hover:bg-white border border-gray-200/50 hover:border-gray-300/50"
                      } backdrop-blur-sm shadow-lg hover:shadow-xl overflow-hidden`}
                    >
                      {/* Hover glow effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className={`absolute inset-0 rounded-3xl ${
                          isDarkMode ? "bg-blue-500/5" : "bg-blue-500/5"
                        }`}></div>
                      </div>

                      {/* Content */}
                      <div className="relative z-10 text-center">
                        {/* Avatar */}
                        <div className="relative mx-auto w-20 h-20 mb-4">
                          <img
                            src={contributor.avatar_url}
                            alt={`${contributor.login}'s avatar`}
                            className="w-full h-full rounded-2xl object-cover ring-4 ring-white/20 group-hover:ring-blue-500/30 transition-all duration-300"
                          />
                          {/* Online indicator */}
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full ring-4 ring-white flex items-center justify-center">
                            <FaGithub className="w-3 h-3 text-white" />
                          </div>
                        </div>

                        {/* Username */}
                        <h3 className={`text-lg font-semibold mb-2 group-hover:${
                          isDarkMode ? "text-blue-400" : "text-blue-600"
                        } transition-colors duration-300 ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}>
                          @{contributor.login}
                        </h3>

                        {/* Contributions */}
                        <div className={`flex items-center justify-center gap-2 text-sm ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}>
                          <FaCode className="w-4 h-4" />
                          <span className="font-medium">
                            {contributor.contributions.toLocaleString()}
                          </span>
                          <span>commits</span>
                        </div>

                        {/* Contribution level badge */}
                        <div className="mt-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            contributor.contributions >= 100
                              ? isDarkMode 
                                ? "bg-gold-500/20 text-gold-400 border border-gold-500/30"
                                : "bg-yellow-100 text-yellow-800 border border-yellow-200"
                              : contributor.contributions >= 50
                              ? isDarkMode 
                                ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                : "bg-blue-100 text-blue-800 border border-blue-200"
                              : isDarkMode 
                                ? "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                                : "bg-gray-100 text-gray-800 border border-gray-200"
                          }`}>
                            {contributor.contributions >= 100 ? "🏆 Core" :
                             contributor.contributions >= 50 ? "⭐ Active" :
                             "👋 Contributor"}
                          </span>
                        </div>
                      </div>

                      {/* Shine effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      </div>
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Call to action */}
          <motion.div 
            variants={itemVariants}
            className="text-center mt-20"
          >
            <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-2xl ${
              isDarkMode ? "bg-gray-800/50 text-gray-300" : "bg-white/50 text-gray-600"
            } backdrop-blur-sm border ${
              isDarkMode ? "border-gray-700/50" : "border-gray-200/50"
            }`}>
              <span>Want to contribute?</span>
              <a 
                href="https://github.com/adityadomle/BizFlow" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`font-semibold hover:underline ${
                  isDarkMode ? "text-blue-400" : "text-blue-600"
                }`}
              >
                Join us on GitHub →
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contributors;