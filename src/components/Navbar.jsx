import React, { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";
import { trackButtonClick } from "../utils/analytics";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/#about", label: "About Us" },
    { href: "/#services", label: "Our Services" },
    { href: "/#testimonials", label: "Testimonials" },
    { href: "/analytics", label: "Analytics" },
    { href: "/contact", label: "Contact" },
  ];

  // Scroll spy logic
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const options = { threshold: 0.6 };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(`#${entry.target.id}`);
        }
      });
    }, options);

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <motion.nav
      variants={fadeIn("down", 0.2)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100 shadow-sm"
    >
      <div className="w-full flex justify-between items-center container mx-auto px-4 sm:px-6 lg:px-8 md:h-20 h-16">
        {/* Logo */}
        <motion.div
          variants={fadeIn("right", 0.3)}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="flex items-center gap-1">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-4 h-4 bg-blue-600 rounded-full opacity-75 hover:opacity-100 transition-opacity"
            ></motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-4 h-4 bg-red-500 rounded-full -ml-2 hover:opacity-75 transition-opacity"
            ></motion.div>
          </div>
          <motion.span
            whileHover={{ scale: 1.02 }}
            className="text-4xl font-bold text-gray-800 hover:text-blue-600 transition-colors"
          >
            BizFlow
          </motion.span>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button
          variants={fadeIn("left", 0.3)}
          className="md:hidden p-2 cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
        </motion.button>

        {/* Navigation Links - Desktop */}
        <motion.div
          variants={fadeIn("down", 0.3)}
          className="hidden md:flex items-center gap-10"
        >
          {navLinks.map((link, index) =>
            link.href.includes("/#") ? (
              <HashLink
                key={index}
                smooth
                to={link.href}
                onClick={() => setActiveLink(link.href)}
                className={`text-base sm:text-xl md:text-xl lg:text-xl xl:text-base font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-blue-600 after:transition-all ${
                  activeLink === link.href
                    ? "text-blue-600 after:w-full"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {link.label}
              </HashLink>
            ) : (
              <Link
                key={index}
                to={link.href}
                onClick={() => setActiveLink(link.href)}
                className={` text-base sm:text-xl md:text-xl lg:text-xl xl:text-base font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-blue-600 after:transition-all ${
                  window.location.pathname === link.href
                    ? "text-blue-600 after:w-full"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </motion.div>

        {/* CTA Button */}
        <motion.button
          variants={fadeIn("left", 0.3)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => trackButtonClick("Navbar CTA Button")}
          className="hidden md:block bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 text-base font-medium transition-all hover:shadow-lg hover:shadow-blue-100"
        >
          <a href="#newsletter">Get in touch</a>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          variants={fadeIn("down", 0.2)}
          initial="hidden"
          animate="show"
          className="md:hidden bg-white border-t border-gray-100 py-4"
        >
          <motion.div variants={fadeIn("down", 0.3)} className="container mx-auto px-4 space-y-6">
            {navLinks.map((link, index) =>
              link.href.includes("/#") ? (
                <HashLink
                  key={index}
                  smooth
                  to={link.href}
                  onClick={() => {
                    setActiveLink(link.href);
                    setIsMenuOpen(false);
                  }}
                  className={`block text-base sm:text-lg md:text-lg lg:text-lg xl:text-xl font-medium py-2 cursor-pointer ${
                    activeLink === link.href ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {link.label}
                </HashLink>
              ) : (
                <Link
                  key={index}
                  to={link.href}
                  onClick={() => {
                    setActiveLink(link.href);
                    setIsMenuOpen(false);
                  }}
                  className={`block text-base sm:text-lg md:text-lg lg:text-lg xl:text-base font-medium py-2 cursor-pointer ${
                    window.location.pathname === link.href
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
            <motion.button
              variants={fadeIn("up", 0.4)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => trackButtonClick("Mobile Navbar CTA Button")}
              className="w-full bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 text-sm font-medium transition-all hover:shadow-lg hover:shadow-blue-100"
            >
              <a href="#newsletter">Get in touch</a>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
