"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import { useTheme } from "../context/ThemeContext";
import {
  FiPlay,
  FiUsers,
  FiTarget,
  FiBarChart,
  FiCheckCircle,
  FiArrowRight,
  FiClock,
  FiTrendingUp,
  FiSettings,
} from "react-icons/fi";

const steps = [
  {
    id: 1,
    icon: FiPlay,
    title: "Get Started",
    description: "Sign up and set up your workspace in under 2 minutes",
    details: [
      "Create your free account",
      "Complete quick onboarding",
      "Invite your team members",
      "Choose your workflow template"
    ]
  },
  {
    id: 2,
    icon: FiTarget,
    title: "Create Tasks",
    description: "Add tasks, set priorities, and organize your projects",
    details: [
      "Create projects and tasks",
      "Set deadlines and priorities",
      "Assign team members",
      "Add descriptions and attachments"
    ]
  },
  {
    id: 3,
    icon: FiUsers,
    title: "Collaborate",
    description: "Work together seamlessly with real-time collaboration",
    details: [
      "Real-time updates and notifications",
      "Comment and discuss on tasks",
      "Share files and documents",
      "Track team progress"
    ]
  },
  {
    id: 4,
    icon: FiBarChart,
    title: "Track Progress",
    description: "Monitor performance with powerful analytics and reports",
    details: [
      "Visual progress tracking",
      "Performance analytics",
      "Custom reports and insights",
      "Export data and metrics"
    ]
  }
];

const features = [
  {
    icon: FiClock,
    title: "Time Tracking",
    description: "Track time spent on tasks automatically or manually to improve productivity."
  },
  {
    icon: FiTrendingUp,
    title: "Analytics Dashboard",
    description: "Get insights into team performance, project progress, and productivity metrics."
  },
  {
    icon: FiSettings,
    title: "Custom Workflows",
    description: "Create custom workflows that match your team's unique processes and requirements."
  },
  {
    icon: FiCheckCircle,
    title: "Task Management",
    description: "Organize tasks with priorities, due dates, tags, and custom fields for better organization."
  }
];

const HowItWorks = () => {
  const { isDarkMode } = useTheme();
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [bulbs, setBulbs] = useState([]);

  useEffect(() => {
    if (isDarkMode) {
      const colors = ["#F472B6", "#60A5FA", "#A78BFA", "#ff6f82ff", "#34D399"];
      const newBulbs = [];
      for (let i = 0; i < 15; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = `${50 + Math.random() * 100}px`;
        const top = `${Math.random() * 100}%`;
        const left = `${Math.random() * 100}%`;
        const delay = Math.random() * 4;
        newBulbs.push({ color, size, top, left, delay });
      }
      setBulbs(newBulbs);
    } else {
      setBulbs([]);
    }
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen relative overflow-hidden transition-all duration-300 ${
      isDarkMode ? "bg-gray-900" : "bg-gray-50"
    }`}>
      {/* Animated background bulbs for dark mode */}
      {isDarkMode && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          {bulbs.map((bulb, index) => (
            <motion.div
              key={index}
              className="absolute rounded-full filter blur-xl"
              style={{
                background: `radial-gradient(circle, ${bulb.color}20 0%, transparent 70%)`,
                width: bulb.size,
                height: bulb.size,
                top: bulb.top,
                left: bulb.left,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: bulb.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      {/* Background gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className={`absolute -top-28 -left-28 w-[500px] h-[500px] rounded-full blur-[80px] ${
            isDarkMode
              ? "bg-gradient-to-tr from-indigo-500/10 to-pink-500/10"
              : "bg-gradient-to-tr from-indigo-500/20 to-pink-500/20"
          }`}
        />
        <div
          className={`absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full blur-[100px] ${
            isDarkMode
              ? "bg-gradient-to-tr from-blue-500/10 to-purple-500/10"
              : "bg-gradient-to-tr from-blue-500/20 to-purple-500/20"
          }`}
        />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-20 pb-16 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              variants={textVariant()}
              initial="hidden"
              animate="show"
              className="mb-8"
            >
              <h1 className={`text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent ${
                isDarkMode
                  ? "from-white via-blue-100 to-blue-200"
                  : "from-gray-900 via-blue-600 to-purple-600"
              }`}>
                How BizFlow Works
              </h1>
              <p className={`text-lg md:text-xl max-w-3xl mx-auto ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}>
                Discover how BizFlow streamlines your workflow with powerful task management, 
                seamless collaboration, and insightful analytics in just four simple steps.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              variants={fadeIn("up", 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
            >
              {/* Steps Navigation */}
              <div className="space-y-6">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    variants={fadeIn("right", index * 0.1)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 ${
                      activeStep === step.id
                        ? isDarkMode
                          ? "bg-blue-500/10 border-blue-500/30 shadow-lg shadow-blue-500/10"
                          : "bg-blue-50 border-blue-200 shadow-lg shadow-blue-100"
                        : isDarkMode
                        ? "bg-gray-800/50 border-gray-700 hover:border-gray-600"
                        : "bg-white border-gray-200 hover:border-gray-300 shadow-sm"
                    }`}
                    onClick={() => setActiveStep(step.id)}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        activeStep === step.id
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                          : isDarkMode
                          ? "bg-gray-700 text-gray-300"
                          : "bg-gray-100 text-gray-600"
                      }`}>
                        <step.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-lg font-semibold mb-2 ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}>
                          Step {step.id}: {step.title}
                        </h3>
                        <p className={`text-sm ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}>
                          {step.description}
                        </p>
                      </div>
                      <FiArrowRight className={`w-5 h-5 transition-transform duration-300 ${
                        activeStep === step.id ? "transform rotate-90" : ""
                      } ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Step Details */}
              <div className="lg:sticky lg:top-24">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`p-8 rounded-2xl border ${
                    isDarkMode
                      ? "bg-gray-800/50 border-gray-700"
                      : "bg-white border-gray-200 shadow-lg"
                  }`}
                >
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                      {React.createElement(steps[activeStep - 1].icon, { 
                        className: "w-8 h-8 text-white" 
                      })}
                    </div>
                    <div>
                      <h3 className={`text-2xl font-bold ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}>
                        {steps[activeStep - 1].title}
                      </h3>
                      <p className={`${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}>
                        Step {activeStep} of {steps.length}
                      </p>
                    </div>
                  </div>

                  <p className={`text-lg mb-6 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}>
                    {steps[activeStep - 1].description}
                  </p>

                  <ul className="space-y-3">
                    {steps[activeStep - 1].details.map((detail, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <FiCheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className={`${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}>
                          {detail}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              variants={textVariant()}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}>
                Powerful Features
              </h2>
              <p className={`text-lg max-w-2xl mx-auto ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}>
                Explore the key features that make BizFlow the perfect solution for your business needs.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn("up", index * 0.1)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className={`p-8 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                    isDarkMode
                      ? "bg-gray-800/50 border-gray-700 hover:border-gray-600"
                      : "bg-white border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-lg"
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className={`text-xl font-semibold mb-3 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}>
                    {feature.title}
                  </h3>
                  <p className={`${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}>
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              variants={fadeIn("up", 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className={`p-8 md:p-12 rounded-3xl border ${
                isDarkMode
                  ? "bg-gradient-to-r from-gray-800/50 to-gray-700/50 border-gray-600"
                  : "bg-gradient-to-r from-blue-50 to-purple-50 border-gray-200"
              }`}
            >
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}>
                Ready to Get Started?
              </h2>
              <p className={`text-lg mb-8 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}>
                Join thousands of teams already using BizFlow to streamline their workflows and boost productivity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/#home"
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 font-semibold"
                >
                  Start Free Trial
                </a>
                <a
                  href="/#services"
                  className={`px-8 py-3 rounded-lg border transition-all duration-300 transform hover:scale-105 font-semibold ${
                    isDarkMode
                      ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  View Pricing
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HowItWorks;