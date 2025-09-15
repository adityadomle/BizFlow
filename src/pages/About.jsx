"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import { useTheme } from "../context/ThemeContext";
import {
  FiUsers,
  FiTarget,
  FiHeart,
  FiZap,
  FiCode,
  FiGithub,
  FiMessageCircle,
  FiEye,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const coreValues = [
  {
    icon: FiZap,
    title: "Simplicity",
    description:
      "We believe in clean, intuitive design that makes complex workflows feel effortless.",
  },
  {
    icon: FiTarget,
    title: "Performance",
    description:
      "Built with modern technologies to deliver fast, responsive user experiences.",
  },
  {
    icon: FiUsers,
    title: "Community",
    description:
      "Open-source at heart, driven by collaboration and shared knowledge.",
  },
  {
    icon: FiHeart,
    title: "Innovation",
    description:
      "Constantly evolving to meet the changing needs of modern businesses.",
  },
];

const services = [
  {
    icon: FiTarget,
    title: "Task Management",
    description:
      "Organize and prioritize your tasks with intuitive drag-and-drop interfaces and smart categorization.",
  },
  {
    icon: FiZap,
    title: "Performance Analytics",
    description:
      "Track key metrics and KPIs with beautiful, interactive dashboards and real-time data visualization.",
  },
  {
    icon: FiUsers,
    title: "Team Collaboration",
    description:
      "Streamline team communication and project coordination with built-in collaboration tools.",
  },
  {
    icon: FiCode,
    title: "Custom Workflows",
    description:
      "Design and implement custom business processes that adapt to your unique organizational needs.",
  },
];

const projectOwner = {
  name: "Aditya Domle",
  role: "Project Creator & Lead Developer",
  githubId: "adityadomle",
  githubUrl: "https://github.com/adityadomle",
  avatar: "https://github.com/adityadomle.png",
  bio: "Passionate full-stack developer and open-source enthusiast dedicated to creating innovative business solutions that make work more efficient and enjoyable.",
};

const AboutUs = () => {
  const { isDarkMode } = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [bulbs, setBulbs] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (isDarkMode) {
      const colors = ["#F472B6", "#60A5FA", "#A78BFA", "#ff6f82ff", "#34D399"];
      const newBulbs = [];
      for (let i = 0; i < 15; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = `${50 + Math.random() * 100}px`;
        const top = `${Math.random() * 100}%`;
        const left = `${Math.random() * 100}%`;
        const blur = `${20 + Math.random() * 20}px`;
        const opacity = 0.1 + Math.random() * 0.1;
        newBulbs.push({ color, size, top, left, blur, opacity });
      }
      setBulbs(newBulbs);
    }
  }, [isDarkMode]);

  return (
    <div
      className={`min-h-screen pt-24 pb-16 transition-colors duration-500 relative overflow-hidden
  ${
    isDarkMode
      ? "bg-gray-900 bg-opacity-70 backdrop-blur-xl"
      : "bg-gradient-to-br from-white via-purple-200 to-white"
  }`}
    >
      {isDarkMode &&
        bulbs.map((b, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              width: b.size,
              height: b.size,
              top: b.top,
              left: b.left,
              backgroundColor: b.color,
              filter: `blur(${b.blur})`,
              opacity: b.opacity,
            }}
          ></span>
        ))}

      {/* Header Section */}
      <motion.section
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        animate="show"
        className="section-container text-center"
      >
        <motion.div variants={textVariant(0.3)} className="max-w-4xl mx-auto">
          <h1
            className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mt-8 relative inline-block ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Meet the BizFlow Team
            {/* Underline */}
            <motion.span
              className={`absolute left-0 bottom-0 h-1 rounded-full ${
                isDarkMode ? "bg-blue-400" : "bg-blue-600"
              }`}
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, ease: "easeInOut" }}
            />
          </h1>

          <p
            className={`text-lg max-w-3xl mt-10 text-center mx-auto ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            We're a passionate group of developers, designers, and innovators
            dedicated to creating powerful, intuitive business workflow
            solutions.
          </p>
        </motion.div>
      </motion.section>

      {/* Introduction Section */}
      <motion.section
        variants={fadeIn("up", 0.4)}
        initial="hidden"
        animate="show"
        className="section-container"
      >
       
          <div
            className={`p-8 mt-20 rounded-3xl transition-all duration-500
        ${
          isDarkMode
            ? "bg-gray-700/20 backdrop-blur-md shadow-[0_0_2px_rgba(139,92,246,0.6)] animate-glow"
            : "bg-gray-100/60 shadow-[0_0_2px_rgba(236,72,153,0.5)] animate-glow"
        }`}
          >
            <h2
              className={`inline-block text-xl font-semibold px-6 py-3 rounded-full tracking-wide mb-4 transition-all transition-ease-in-out
          ${
            isDarkMode
              ? "bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_20px_rgba(139,92,246,0.8)] animate-glow"
              : "bg-gradient-to-r from-gray-200 text-black shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:shadow-[0_0_20px_rgba(236,72,153,0.7)] animate-glow"
          }`}
            >
              About BizFlow?
            </h2>

            <p
              className={`text-lg leading-relaxed ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
             <ul>
              <li>🔹BizFlow is a modern React-based business workflow dashboard designed to simplify and streamline organizational operations.</li>
              <li>🔹It enables teams to manage tasks efficiently, monitor key metrics, and organize workflows in a structured and user-friendly manner.</li>
              <li>🔹With real-time analytics and fully customizable dashboards, businesses can make informed decisions quickly and accurately.</li>
              <li>🔹The platform offers seamless integration with existing tools and systems, enhancing productivity across different business processes.</li>
              <li>🔹BizFlow includes intelligent task management and collaborative features, empowering teams to work together effectively.</li>
              <li>🔹Its fully responsive design ensures a smooth experience across all devices, making it accessible anytime, anywhere.</li>
             </ul>
             
            </p>
          </div>
       
      </motion.section>

      {/* Mission Section */}
      <motion.section
        variants={fadeIn("up", 0.6)}
        initial="hidden"
        animate="show"
        className="section-container"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-6 md:gap-10 items-start">
          {/* Left Side: Title (narrower) */}
          <motion.div
            variants={fadeIn("left", 0.4)}
            className="col-span-12 md:col-span-4 text-center md:text-left h-full flex items-center justify-center md:justify-start"
          >
            <h2
              className={`flex items-center gap-2 sm:gap-3 text-3xl sm:text-4xl md:text-5xl font-bold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              <FiTarget className="text-3xl sm:text-4xl md:text-5xl text-gradient-to-r from-primary-500 to-accent-500" />
              Our Mission
            </h2>
          </motion.div>

          {/* Right Side: Content Card (wider) */}
          <motion.div
            variants={fadeIn("right", 0.6)}
            className="col-span-12 md:col-span-8"
          >
            <div
              className={`p-4 sm:p-6 md:p-8 rounded-xl md:rounded-2xl transition-all duration-500 w-full max-w-full sm:max-w-3xl mx-auto
        ${
          isDarkMode
            ? "bg-white/10 backdrop-blur-md shadow-[0_0_10px_rgba(139,92,246,0.5)] hover:shadow-[0_0_20px_rgba(139,92,246,0.8)]"
            : "bg-gradient-to-br from-blue-50 to-purple-100 shadow-lg hover:shadow-2xl"
        }`}
            >
              <p
                className={`text-lg md:text-xl leading-relaxed break-words ${
                  isDarkMode ? "text-gray-200" : "text-gray-700"
                }`}
              >
               <ul>
                <li>🚀 Simplify & make business workflows enjoyable</li>
                <li>🛠️ Provide intuitive tools to focus on priorities</li>
                <li>📡 Empower with real-time insights</li>
                <li>🤝 Create a collaborative ecosystem</li>
                <li>📊 Support data-driven decisions</li>
               </ul>
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Vision Section */}
      <motion.section
        variants={fadeIn("up", 0.6)}
        initial="hidden"
        animate="show"
        className="section-container"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
          {/* Left Side: Content Card (wider) */}
          <motion.div
            variants={fadeIn("left", 0.6)}
            className="col-span-12 md:col-span-8 order-2 md:order-1"
          >
            <div
              className={`p-4 sm:p-6 md:p-8 rounded-xl md:rounded-2xl transition-all duration-500 w-full max-w-full sm:max-w-3xl mx-auto
        ${
          isDarkMode
            ? "bg-white/10 backdrop-blur-md shadow-[0_0_10px_rgba(139,92,246,0.5)] hover:shadow-[0_0_20px_rgba(139,92,246,0.8)]"
            : "bg-gradient-to-br from-blue-50 to-purple-100 shadow-lg hover:shadow-2xl"
        }`}
            >
              <p
                className={`text-lg md:text-xl leading-relaxed break-words ${
                  isDarkMode ? "text-gray-200" : "text-gray-700"
                }`}
              >
                <ul>
                  <li>📈 Empower businesses for long-term growth</li>
                  <li>⚡ Smart workflow automation</li>
                  <li>📊 Data-driven decision-making</li>
                  <li>💡 Innovative collaboration tools</li>
                  <li>🤝 Teams innovate freely & stay aligned</li>
                  <li>🌍 Build an ecosystem where innovation thrives</li>
                </ul>
              </p>
            </div>
          </motion.div>

          {/* Right Side: Title (narrower) */}
          <motion.div
            variants={fadeIn("right", 0.4)}
            className="col-span-12 md:col-span-4 text-center md:text-left order-1 md:order-2 h-full flex items-center justify-center md:justify-start"
          >
            <h2
              className={`flex items-center gap-2 sm:gap-3 text-3xl sm:text-4xl md:text-5xl font-bold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              <FiEye className="text-3xl sm:text-4xl md:text-5xl text-gradient-to-r from-primary-500 to-accent-500" />
              Our Vision
            </h2>
          </motion.div>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section
        variants={fadeIn("up", 0.8)}
        initial="hidden"
        animate="show"
        className="section-container"
      >
        <div className="max-w-6xl mx-auto">
          <h2
            className={`text-5xl font-bold text-center mb-6 mt-20 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Our Services
          </h2>
          <p
            className={`text-base max-w-3xl text-center mx-auto mb-10 ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Comprehensive suite of tools designed to streamline your business
            operations and boost productivity.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeIn("up", 0.2 * index)}
                className={`p-6 rounded-xl text-center border border-purple-900 shadow-[0_0_10px_rgba(139,92,246,0.3)] transition-all duration-500 transition- ease-in-out hover:shadow-[0_0_20px_rgba(139,92,246,0.6)] hover:border-purple-600
                ${
                  isDarkMode
                    ? "bg-white/10 backdrop-blur-md"
                    : "bg-white/70 shadow-lg"
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4
                  ${isDarkMode ? "bg-blue-600/30" : "bg-blue-100"}`}
                >
                  <service.icon
                    className={`w-8 h-8 ${
                      isDarkMode ? "text-white" : "text-blue-600"
                    }`}
                  />
                </div>
                <h3
                  className={`text-xl font-bold mb-3 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {service.title}
                </h3>
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Core Values Section */}
      <motion.section
        variants={fadeIn("up", 1.0)}
        initial="hidden"
        animate="show"
        className="section-container "
      >
        <div className="max-w-6xl mx-auto ">
          <h2
            className={`text-5xl font-bold text-center mt-10 mb-10 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Our Core Values
          </h2>
          <p
            className={`text-base max-w-3xl text-center mx-auto mb-10 ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Guiding principles that drive integrity, innovation, and teamwork
            forward.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeIn("up", 0.2 * index)}
                className={`p-6 rounded-xl text-center border border-purple-900 shadow-[0_0_10px_rgba(139,92,246,0.2)] transition-all duration-500 transition- ease-in-out hover:shadow-[0_0_20px_rgba(139,92,246,0.6)] hover:border-purple-600
                ${
                  isDarkMode
                    ? "bg-white/10 backdrop-blur-md"
                    : "bg-white/70 shadow-lg"
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4
                  ${isDarkMode ? "bg-blue-600/30" : "bg-blue-100"}`}
                >
                  <value.icon
                    className={`w-8 h-8 ${
                      isDarkMode ? "text-white" : "text-blue-600"
                    }`}
                  />
                </div>
                <h3
                  className={`text-xl font-bold mb-3 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {value.title}
                </h3>
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Project Owner Section */}
      <motion.section
        variants={fadeIn("up", 1.2)}
        initial="hidden"
        animate="show"
        className="section-container"
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center">
            <h2
              className={`inline-block px-8 py-3 text-3xl font-bold mb-12 rounded-full
      ${
        isDarkMode
          ? "bg-gray-700 text-white shadow-[0_0_10px_rgba(139,92,246,0.6)] hover:shadow-[0_0_20px_rgba(140,98,248,0.9)] hover:border-purple-600 transition:all ease-in-out"
          : "bg-white text-black shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_25px_rgba(140,98,248,0.8)] hover:border-purple-600 transition:all ease-in-out"
      }`}
            >
              Meet the Project Owner
            </h2>
          </div>

          <div
            className={`p-8 rounded-2xl text-center ${
              isDarkMode
                ? "bg-gray-800 shadow-[0_0_5px_rgba(139,92,246,0.6)]"
                : "bg-white/70 shadow-[0_0_20px_rgba(139,92,246,0.4)]"
            }`}
          >
            <img
              src={projectOwner.avatar}
              alt={projectOwner.name}
              className="w-32 h-32 rounded-full mx-auto mb-6 object-cover ring-4 ring-blue-500/20"
            />
            <h3
              className={`text-2xl font-bold mb-2 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {projectOwner.name}
            </h3>
            <p
              className={`text-lg font-medium mb-4 ${
                isDarkMode ? "text-blue-300" : "text-blue-600"
              }`}
            >
              {projectOwner.role}
            </p>
            <p
              className={`text-lg mb-6 max-w-2xl mx-auto ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {projectOwner.bio}
            </p>
            <a
              href={projectOwner.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 font-medium transition-all"
            >
              <FiGithub className="w-5 h-5" />@{projectOwner.githubId}
            </a>
          </div>
        </div>
      </motion.section>

      {/* Join Us CTA */}
      <motion.section
        variants={fadeIn("up", 1.4)}
        initial="hidden"
        animate="show"
        className="section-container"
      >
        <div
          className={`text-center p-8 rounded-2xl ${
            isDarkMode
              ? "bg-white/10 backdrop-blur-md"
              : "bg-gradient-to-br from-blue-50 to-purple-100 shadow-lg"
          }`}
        >
          <h3
            className={`text-3xl font-bold mb-4 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Join Our Community
          </h3>
          <p
            className={`text-lg mb-8 max-w-2xl mx-auto ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            BizFlow is open-source and thrives on community contributions.
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
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all
    bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500
    text-white shadow-[0_0_15px_rgba(236,72,153,0.5)] hover:shadow-[0_0_25px_rgba(236,72,153,0.8)]
    hover:scale-105"
            >
              <FiMessageCircle className="w-5 h-5" />
              Get in Touch
            </Link>

            <a
              href="/contributor-guide"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                isDarkMode
                  ? "bg-slate-600 text-white hover:bg-slate-500"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
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
