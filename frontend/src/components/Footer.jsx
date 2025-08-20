import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import { useTheme } from "../context/ThemeContext";

const Footer = () => {
  const { isDarkMode } = useTheme();

  const footerLinks = {
    company: [
      { name: "About", href: "/#about" },
      { name: "Terms of Use", href: "/terms-of-use" },
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "How it Works", href: "/#SCHEDULE" },
      { name: "Contact Us", href: "/contact" },
    ],
    getHelp: [
      { name: "Support Career", href: "/support-career" },
      { name: "24h Service", href: "/#services" },
      { name: "Quick Chat", href: "/quick-chat" },
    ],
    support: [
      { name: "FAQs", href: "/faqs" },
      { name: "Policy", href: "/policy" },
      { name: "Business", href: "/business-support" },
    ],
    contact: [
      { name: "WhatsApp", href: "/contact/whatsapp" },
      { name: "Support 24", href: "/contact/support-24" },
    ],
  };

  return (
    <motion.footer
      variants={fadeIn("up", 0.2)}
      initial="hidden"
      whileInView="show"
      className={`transition-colors duration-500 border-t ${
        isDarkMode ? "bg-gray-900 border-gray-700" : "bg-gray-50 border-gray-200"
      }`}
    >
      <div className="section-container py-12 px-6 md:px-12">
        <motion.div
          variants={fadeIn("up", 0.3)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12"
        >
          {/* Brand Column */}
          <motion.div
            variants={fadeIn("right", 0.4)}
            className="lg:col-span-4 flex flex-col justify-between"
          >
            {/* Logo + Branding */}
            <motion.div
              variants={fadeIn("down", 0.5)}
              className="flex items-center gap-2 mb-6"
            >
              <div className="w-5 h-5 bg-blue-600 rounded-full shadow-md"></div>
              <div className="w-5 h-5 bg-red-500 rounded-full -ml-2 shadow-md"></div>
              <span
                className={`text-2xl font-bold ml-2 tracking-wide ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                The Next Design
              </span>
            </motion.div>

            {/* Brand Description */}
            <motion.p
              variants={fadeIn("up", 0.6)}
              className={`mb-6 text-base leading-relaxed ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Empowering businesses with elegant, modern design and seamless user
              experiences. Where creativity meets technology.
            </motion.p>

            {/* Social Icons */}
            <motion.div
              variants={fadeIn("up", 0.7)}
              className="flex gap-4 mt-4"
            >
              {[
                {
                  href: "https://github.com/adityadomle",
                  icon: <FaGithub className="w-5 h-5" />,
                  hover: "hover:bg-neutral-900 hover:text-white",
                },
                {
                  href: "#",
                  icon: <FaFacebookF className="w-5 h-5" />,
                  hover: "hover:bg-blue-600 hover:text-white",
                },
                {
                  href: "https://x.com/domleaditya",
                  icon: <FaTwitter className="w-5 h-5" />,
                  hover: "hover:bg-sky-500 hover:text-white",
                },
                {
                  href: "https://www.linkedin.com/in/adityadomle?",
                  icon: <FaLinkedinIn className="w-5 h-5" />,
                  hover: "hover:bg-blue-700 hover:text-white",
                },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-colors focus:outline-none focus:ring-2 ${
                    isDarkMode
                      ? `bg-gray-800 text-gray-300 ${social.hover}`
                      : `bg-gray-200 text-gray-700 ${social.hover}`
                  }`}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Links Columns */}
          <motion.div
            variants={fadeIn("left", 0.4)}
            className="lg:col-span-8"
          >
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {Object.entries(footerLinks).map(([category, links], idx) => (
                <motion.div
                  key={category}
                  variants={fadeIn("up", 0.3 * (idx + 1))}
                >
                  <motion.h3
                    variants={textVariant(0.2)}
                    className={`text-lg font-semibold mb-4 capitalize ${
                      isDarkMode ? "text-gray-100" : "text-gray-900"
                    }`}
                  >
                    {category}
                  </motion.h3>
                  <motion.ul
                    variants={fadeIn("up", 0.4)}
                    className="space-y-3"
                  >
                    {links.map((link) => (
                      <motion.li
                        key={`${category}-${link.name}`}
                        variants={fadeIn("up", 0.2)}
                      >
                        <motion.a
                          whileHover={{ x: 6 }}
                          href={link.href}
                          className={`text-sm md:text-base transition-colors relative group ${
                            isDarkMode
                              ? "text-gray-400 hover:text-white"
                              : "text-gray-600 hover:text-gray-900"
                          }`}
                        >
                          {link.name}
                          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                        </motion.a>
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          variants={fadeIn("up", 0.5)}
          className="mt-12 pt-6 border-t text-center text-sm md:text-base transition-colors duration-300"
        >
          <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
            © {new Date().getFullYear()} The Next Design. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
