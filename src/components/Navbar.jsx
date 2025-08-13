
import React, { useState, useEffect} from 'react'
import { HiMenu, HiX } from 'react-icons/hi'
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn} from "../utils/motion";




const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('#home')

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "#about", label: "About Us" },
    { href: "#services", label: "Our Services" },
    { href: "#testimonials", label: "Testimonials" },
  ]


  return (
    <motion.nav
      variants={fadeIn('down', 0.2)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
       className={`fixed top-0 left-0 right-0 z-50 border-b border-gray-100 shadow-sm
        ${isMenuOpen ? 'bg-transparent' : 'bg-white/90 backdrop-blur-sm'}
      `}
    >
      <div className="w-full flex justify-between items-center container mx-auto px-4 sm:px-6 lg:px-8 md:h-20 h-16">
        
        {/* Logo */}
        <motion.div 
          variants={fadeIn('right', 0.3)}
          className="flex items-center gap-3 cursor-pointer"
        >

          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="w-4 h-4 bg-blue-600 rounded-full opacity-75 hover:opacity-100 transition-opacity"
          ></motion.div>
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="w-4 h-4 bg-red-500 rounded-full -ml-2 hover:opacity-75 transition-opacity"
          ></motion.div>
        </motion.div> 
        {/* Mobile Menu Button */}
        <motion.button 
          variants={fadeIn('left', 0.3)}
          className="md:hidden p-2"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <HiX className="h-6 w-6" />
          ) : (
            <HiMenu className="h-6 w-6" />
          )}
        </motion.button> 

        {/* Navigation Links - Desktop */}
        <motion.div 
          variants={fadeIn('down', 0.3)}
          className="hidden md:flex items-center gap-10"
        >
          {navLinks.map((link, index) => (
            <motion.a 
              key={index}
              variants={fadeIn('down', 0.1 * (index + 1))}
              href={link.href}
              onClick={() => setActiveLink(link.href)}

              className={`text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-blue-600 after:transition-all

                ${activeLink === link.href ? 'text-blue-600 after:w-full' : 'text-gray-600 hover:text-gray-900'}`}
            >
              {link.label}
            </motion.a>
            )
           )
          }
        </motion.div> 

           {/* CTA Button */}
          <motion.button 
            variants={fadeIn('left', 0.3)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 text-sm font-medium transition-all hover:shadow-lg hover:shadow-blue-100"
          >
          <a href="#newsletter">Get in touch</a>
          </motion.button>
      </div> 
           
         {/* Mobile Menu Overlay */}  
        <AnimatePresence>
        {isMenuOpen && (
        <motion.div 
        key="mobile-menu"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[999] bg-white flex flex-col items-center justify-start pt-8 space-y-8 md:hidden"
        style={{backgroundColor: "#fff"}}
        role="menu"
    >
      {/* Logo and Close Button Row */}
      <div className="w-full flex items-center justify-between px-6 mb-4">
        {/* Logo */}
         <div className="flex items-center gap-1">
           <div className="w-6 h-6 bg-blue-600 rounded-full opacity-75"></div>
           <div className="w-6 h-6 bg-red-500 rounded-full -ml-2"></div>
         </div>
        {/* Close Button */}
        <button
          aria-label="Close menu"
          onClick={() => setIsMenuOpen(false)}
          className="p-2"
        >
          <HiX className="h-7 w-7 text-gray-700" />
        </button>
      </div>
      {/* Nav Links */}
      <div className="flex flex-col items-center gap-6 w-full">
        {navLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            onClick={() => {
              setActiveLink(link.href);
              setIsMenuOpen(false);
            }}
            className={`text-lg font-semibold py-2 w-full text-center ${
              activeLink === link.href
                ? 'text-blue-600'
                : 'text-gray-700 hover:text-blue-700'
            }`}
            tabIndex={0}
            role="menuitem"
          >
            {link.label}
          </a>
        ))}
        <button
          className="w-60 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 text-base font-medium transition-all hover:shadow-lg hover:shadow-blue-100"
          onClick={() => setIsMenuOpen(false)}
        >
          <a href="#newsletter">Get in touch</a>
        </button>
      </div>
    </motion.div>
     )
    }
  </AnimatePresence>
  </motion.nav>
  )
}
  export default Navbar;

