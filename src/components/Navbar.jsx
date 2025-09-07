import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Menu, X, ChevronDown, Sun, Moon, Zap, Users, BookOpen, Sparkles } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTheme } from '../context/ThemeContext'

// Custom hook for smooth scrolling with intersection observer
const useSmoothScroll = () => {
  const scrollToElement = useCallback((elementId, offset = 80) => {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  return scrollToElement;
};

// Custom hook for outside click detection
const useOutsideClick = (ref, callback) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [ref, callback]);
};

// Animation variants for framer-motion-like effects
const slideInVariants = {
  hidden: { opacity: 0, x: -30, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" }
  })
};

const ModernNavbar = () => {
  // State management
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  
  // Hooks
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const smoothScroll = useSmoothScroll();

  // Navigation configuration
  const navLinks = useMemo(() => [
    { href: "/#home", label: "Home", icon: <Sparkles className="w-4 h-4" /> },
    { href: "/about", label: "About", icon: <Users className="w-4 h-4" /> },
    { href: "/#services", label: "Services", icon: <Zap className="w-4 h-4" /> },
    { href: "/#testimonials", label: "Testimonials", icon: <BookOpen className="w-4 h-4" /> },
    { href: "/#faq", label: "FAQ", icon: <BookOpen className="w-4 h-4" /> },
    { href: "/contact", label: "Contact", icon: <Users className="w-4 h-4" /> },
  ], []);

  const dropdownItems = useMemo(() => [
    { 
      href: "/contributors", 
      label: "Contributors", 
      icon: "👥",
      description: "Meet our amazing team"
    },
    { 
      href: "/contributor-guide", 
      label: "Contributor Guide", 
      icon: "📖",
      description: "Learn how to contribute"
    },
    { 
      href: "/leaderboard", 
      label: "LeaderBoard", 
      icon: "🏆",
      description: "Check your rank"
    }
  ], []);

  // Get current active link
  const activeLink = useMemo(() => {
    const currentPath = location.pathname + location.hash;
    return currentPath === '/' ? '/#home' : currentPath;
  }, [location]);
  // Check if any Community child route is active
  const isCommunityActive = useMemo(() => {
    return dropdownItems.some(item => location.pathname.startsWith(item.href));
  }, [location, dropdownItems]);


  // Enhanced navigation handler
  const handleNavClick = useCallback((href) => {
    if (href.includes('#')) {
      const sectionId = href.split('#')[1];
      
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => smoothScroll(sectionId), 100);
      } else {
        smoothScroll(sectionId);
      }
    } else {
      navigate(href);
    }
    
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  }, [location.pathname, navigate, smoothScroll]);

  const handleDropdownItemClick = useCallback((href) => {
    navigate(href);
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
  }, [navigate]);

  // Scroll detection for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Outside click for dropdown
  useOutsideClick(dropdownRef, () => setIsDropdownOpen(false));

  // Scroll lock for mobile menu
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Keyboard navigation
  const handleKeyDown = useCallback((event, action) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  }, []);

  // Enhanced logo component
  const Logo = ({ className = "" }) => (
    <div className={`flex items-center gap-3 cursor-pointer group ${className}`}>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
        <div className="relative flex items-center gap-1">
          <div className="w-4 h-4 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full opacity-90 group-hover:opacity-100 transition-all duration-300 shadow-lg transform group-hover:scale-110 group-hover:rotate-180" />
          <div className="w-4 h-4 bg-gradient-to-br from-red-500 to-pink-600 rounded-full -ml-2 opacity-90 group-hover:opacity-100 transition-all duration-300 shadow-lg transform group-hover:scale-110 group-hover:-rotate-180" />
        </div>
      </div>
      <button
        onClick={() => handleNavClick("/#home")}
        className={`text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105 ${
          isDarkMode 
            ? "from-white via-blue-100 to-blue-300 group-hover:from-blue-300 group-hover:to-cyan-300" 
            : "from-gray-800 via-blue-800 to-blue-600 group-hover:from-blue-600 group-hover:to-blue-800"
        }`}
      >
        BizFlow
      </button>
    </div>
  );

  // Enhanced navigation link component
  const NavLink = ({ link, isMobile = false }) => {
    const isActive = activeLink === link.href;
    const isHovered = hoveredLink === link.href;

    return (
      <button
        onClick={() => handleNavClick(link.href)}
        onMouseEnter={() => !isMobile && setHoveredLink(link.href)}
        onMouseLeave={() => !isMobile && setHoveredLink(null)}
        className={`
          ${isMobile 
            ? `flex items-center gap-3 text-base font-semibold py-4 px-4 rounded-xl w-full text-left transform hover:scale-[1.02]` 
            : `flex items-center gap-2 text-sm xl:text-base font-semibold relative overflow-hidden group transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 px-3 py-2 rounded-lg`
          }
          ${isActive 
            ? isMobile
              ? isDarkMode ? "bg-blue-900/40 text-blue-400 border border-blue-700/50 shadow-lg shadow-blue-900/20" : "bg-blue-50 text-blue-600 border border-blue-200 shadow-lg shadow-blue-200/30"
              : "text-blue-600 shadow-lg shadow-blue-200/50" 
            : isDarkMode 
              ? isMobile ? "text-gray-300 hover:bg-gray-800/50 hover:text-blue-400" : "text-gray-300 hover:text-blue-400 hover:shadow-lg hover:shadow-blue-900/20"
              : isMobile ? "text-gray-700 hover:bg-gray-50 hover:text-blue-600" : "text-gray-600 hover:text-blue-600 hover:shadow-lg hover:shadow-blue-200/30"
          }
          transition-all duration-300
        `}
      >
        {isMobile && (
          <span className={`transition-all duration-300 ${isActive || isHovered ? "scale-110 rotate-12" : ""}`}>
            {link.icon}
          </span>
        )}
        <span className={`relative z-10 transition-all duration-300 ${!isMobile && "group-hover:drop-shadow-sm"}`}>
          {link.label}
        </span>
        
        {!isMobile && (
          <>
            {/* Enhanced underline effect */}
            <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 rounded-full transition-all duration-500 ease-out ${
              isActive || isHovered ? "w-full opacity-100" : "w-0 opacity-0"
            }`} />
            
            {/* Glowing background */}
            <div className={`absolute inset-0 rounded-lg bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-all duration-500 ${
              isDarkMode ? "from-blue-500/20 via-cyan-500/20 to-purple-500/20" : "from-blue-500/10 via-cyan-500/10 to-purple-500/10"
            }`} />
            
            {/* Border glow */}
            <div className={`absolute inset-0 rounded-lg border opacity-0 group-hover:opacity-30 transition-all duration-500 ${
              isDarkMode ? "border-blue-400/30" : "border-blue-500/20"
            }`} />
          </>
        )}
      </button>
    );
  };

  return (
    <>
      <nav
        role="navigation"
        aria-label="Main Navigation"
        className={`
          fixed top-0 inset-x-0 z-[9999] border-b backdrop-blur-xl transition-all duration-500
          ${isScrolled 
            ? isDarkMode
              ? "bg-gray-900/98 border-gray-700/60 shadow-2xl shadow-gray-900/30"
              : "bg-white/98 border-gray-100/60 shadow-xl shadow-gray-200/30"
            : isDarkMode
              ? "bg-gray-900/95 border-gray-700/50 shadow-2xl shadow-gray-900/20"
              : "bg-white/95 border-gray-100/50 shadow-xl shadow-gray-200/20"
          }
        `}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 xl:px-12 2xl:max-w-screen-xl lg:h-20">
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-6 xl:gap-8 2xl:gap-10 ml-10">
            {navLinks.map((link) => (
              <NavLink key={link.href} link={link} />
            ))}

            {/* Enhanced Dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                onKeyDown={(e) => handleKeyDown(e, () => setIsDropdownOpen(!isDropdownOpen))}
                className={`
                  flex items-center gap-2 text-sm xl:text-base font-semibold relative overflow-hidden group 
                  transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 px-3 py-2 rounded-lg
                  ${
                    isDarkMode
                      ? (isCommunityActive || isDropdownOpen
                          ? "text-blue-600"   // 🔹 active = blue
                          : "text-gray-300 hover:text-blue-400")
                      : (isCommunityActive || isDropdownOpen
                          ? "text-blue-600"   // 🔹 active = blue
                          : "text-gray-600 hover:text-blue-600")
                  }
                `}
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
              >
                <span className="relative z-10 transition-all duration-300 group-hover:drop-shadow-sm">
                  Community
                </span>

                {/* Arrow rotates only when dropdown is open */}
                <ChevronDown
                  className={`w-4 h-4 relative z-10 transition-all duration-500 group-hover:scale-110 ${
                    isDropdownOpen ? "rotate-180 text-blue-600" : "rotate-0"
                  }`}
                />

                {/* Underline effect */}
                <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 rounded-full transition-all duration-500 ease-out ${
                  (isDropdownOpen || isCommunityActive) ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                }`} />

                {/* Glowing background on hover */}
                <div className={`absolute inset-0 rounded-lg bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-all duration-500 ${
                  isDarkMode ? "from-blue-500/20 via-cyan-500/20 to-purple-500/20" : "from-blue-500/10 via-cyan-500/10 to-purple-500/10"
                }`} />

                {/* Border glow on hover */}
                <div className={`absolute inset-0 rounded-lg border opacity-0 group-hover:opacity-30 transition-all duration-500 ${
                  isDarkMode ? "border-blue-400/30" : "border-blue-500/20"
                }`} />
              </button>

              {/* Enhanced Dropdown Menu */}
              {isDropdownOpen && (
                <div className={`
                  absolute top-full right-0 mt-3 w-64 rounded-2xl border shadow-2xl backdrop-blur-xl overflow-hidden z-[60] 
                  transition-all duration-500 transform origin-top-right opacity-100 scale-100 translate-y-0
                  ${isDarkMode
                    ? "bg-gray-800/98 border-gray-600/40 shadow-gray-900/70"
                    : "bg-white/98 border-gray-200/40 shadow-gray-300/70"
                  }
                `}>
                  <div className="py-3">
                    {dropdownItems.map((item, index) => (
                      <button
                        key={item.href}
                        onClick={() => handleDropdownItemClick(item.href)}
                        className={`
                          flex items-start gap-4 px-5 py-4 text-sm font-medium transition-all duration-400 group w-full text-left 
                          transform hover:scale-105 hover:-translate-y-0.5 relative overflow-hidden
                          ${isDarkMode
                            ? "text-gray-300 hover:bg-gray-700/60 hover:text-blue-400 hover:shadow-lg hover:shadow-blue-900/20"
                            : "text-gray-700 hover:bg-gray-50/80 hover:text-blue-600 hover:shadow-lg hover:shadow-blue-200/30"
                          }
                        `}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <span className="text-lg group-hover:scale-125 group-hover:rotate-12 transition-all duration-400 relative z-10 mt-0.5">
                          {item.icon}
                        </span>
                        <div className="flex flex-col">
                          <span className="relative z-10 group-hover:drop-shadow-sm transition-all duration-300 font-semibold">
                            {item.label}
                          </span>
                          <span className={`text-xs mt-1 transition-all duration-300 ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}>
                            {item.description}
                          </span>
                        </div>
                        
                        {/* Enhanced hover effects */}
                        <div className={`absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-5 transition-all duration-400 ${
                          isDarkMode ? "from-blue-500/30 to-cyan-500/30" : "from-blue-500/20 to-cyan-500/20"
                        }`} />
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-all duration-400 transform scale-y-0 group-hover:scale-y-100" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Desktop CTA + Theme Toggle */}
          <div className="hidden xl:flex items-center gap-3 xl:gap-4">
            <button
            className={`
              relative overflow-hidden group min-w-[100px] xl:min-w-[130px] px-3 xl:px-5 py-2 xl:py-2.5 
              rounded-lg font-medium text-[10px] sm:text-xs xl:text-sm transition-all duration-300 transform hover:scale-105 hover:-translate-y-1
              ${isDarkMode
                ? "bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 text-white shadow-md shadow-blue-900/30 hover:shadow-lg hover:shadow-blue-900/40"
                : "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md shadow-blue-200/50 hover:shadow-lg hover:shadow-blue-300/60"
              }
            `}
          >
            <span className="relative z-10 flex items-center gap-1 xl:gap-2 whitespace-nowrap">
              <Sparkles className="w-4 h-4" />
              <Link to="/contact">Get in Touch</Link>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>


            <button
              onClick={toggleTheme}
              className={`
                w-10 h-10 xl:w-11 xl:h-11 flex items-center justify-center rounded-xl transition-all duration-300 
                group transform hover:scale-110 hover:rotate-12 relative overflow-hidden
                ${isDarkMode 
                  ? "bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-yellow-400 shadow-lg shadow-gray-800/50" 
                  : "bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 text-blue-600 shadow-lg shadow-blue-200/50"
                }
              `}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              <div className={`transition-transform duration-500 relative z-10 ${isDarkMode ? "rotate-0" : "rotate-180"}`}>
                {isDarkMode ? <Sun className="h-4 w-4 xl:h-5 xl:w-5" /> : <Moon className="h-4 w-4 xl:h-5 xl:w-5" />}
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`
              xl:hidden relative z-[10000] p-3 rounded-xl transition-all duration-300 transform hover:scale-105
              ${isDarkMode 
                ? "bg-gray-800/50 hover:bg-gray-700/50 text-white border border-gray-700/50" 
                : "bg-gray-50/50 hover:bg-gray-100/50 text-gray-700 border border-gray-200/50"
              }
            `}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            onKeyDown={(e) => handleKeyDown(e, () => setIsMenuOpen(!isMenuOpen))}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            <div className={`transition-transform duration-300 ${isMenuOpen ? "rotate-180" : "rotate-0"}`}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`
          fixed inset-0 bg-black/60 backdrop-blur-sm z-[9990] transition-all duration-500 lg:hidden
          ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
        onClick={() => setIsMenuOpen(false)}
      />
      
      {/* Mobile Menu Sidebar */}
      <div className={`
        fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] z-[9995] border-r shadow-2xl backdrop-blur-xl 
        overflow-hidden transition-all duration-500 transform lg:hidden
        ${isDarkMode ? "bg-gray-900/98 border-gray-700/50" : "bg-white/98 border-gray-200/50"}
        ${isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}
      `}>
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between p-6 border-b border-opacity-50">
          <Logo className="scale-90" />
          <button
            onClick={() => setIsMenuOpen(false)}
            className={`
              p-2 rounded-xl transition-all duration-300 transform hover:scale-110
              ${isDarkMode ? "bg-gray-800/50 hover:bg-gray-700/50 text-white" : "bg-gray-50/50 hover:bg-gray-100/50 text-gray-700"}
            `}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Mobile Menu Content */}
        <div className="p-6 space-y-2 overflow-y-auto h-full pb-32">
          {navLinks.map((link, index) => (
            <div
              key={link.href}
              style={{ 
                animationDelay: `${index * 100}ms`,
                animation: `slideInLeft 0.6s ease-out ${index * 100}ms both`
              }}
            >
              <NavLink link={link} isMobile />
            </div>
          ))}

          {/* Mobile Community Section */}
          <div
            className={`
              rounded-xl border transition-all duration-300 mt-6
              ${isDarkMode ? "border-gray-700/50 bg-gray-800/30" : "border-gray-200/50 bg-gray-50/30"}
            `}
            style={{ 
              animationDelay: `${navLinks.length * 100}ms`,
              animation: `slideInLeft 0.6s ease-out ${navLinks.length * 100}ms both`
            }}
          >
            <div className={`px-4 py-3 font-semibold text-sm border-b border-opacity-50 ${
              isDarkMode ? "text-gray-400 border-gray-700" : "text-gray-500 border-gray-200"
            }`}>
              Community
            </div>
            {dropdownItems.map((item, index) => (
              <button
                key={item.href}
                onClick={() => handleDropdownItemClick(item.href)}
                className={`
                  flex items-center gap-3 px-4 py-4 text-base font-medium transition-all duration-300 
                  w-full text-left transform hover:scale-[1.02]
                  ${isDarkMode
                    ? "text-gray-300 hover:bg-gray-700/50 hover:text-blue-400"
                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                  }
                  ${index === dropdownItems.length - 1 ? "rounded-b-xl" : ""}
                `}
              >
                <span className="text-lg">{item.icon}</span>
                <div className="flex flex-col">
                  <span>{item.label}</span>
                  <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                    {item.description}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Mobile CTA Button */}
          <div
            className="pt-6"
            style={{ 
              animationDelay: `${(navLinks.length + dropdownItems.length + 1) * 100}ms`,
              animation: `slideInLeft 0.6s ease-out ${(navLinks.length + dropdownItems.length + 1) * 100}ms both`
            }}
          >
            <button
              onClick={() => {
                setIsMenuOpen(false);
                smoothScroll('newsletter');
              }}
              className={`
                w-full px-6 py-4 rounded-xl text-base font-semibold transition-all duration-300 
                transform hover:scale-[1.02] flex items-center justify-center gap-2
                ${isDarkMode
                  ? "bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 text-white shadow-lg shadow-blue-900/30"
                  : "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-200/50"
                }
              `}
            >
              <Sparkles className="w-4 h-4" />
              Get in Touch
            </button>
          </div>

          {/* Theme Toggle */}
          <div
            className="pt-4"
            style={{ 
              animationDelay: `${(navLinks.length + dropdownItems.length + 2) * 100}ms`,
              animation: `slideInLeft 0.6s ease-out ${(navLinks.length + dropdownItems.length + 2) * 100}ms both`
            }}
          >
            <button
              onClick={toggleTheme}
              className={`
                w-full flex items-center justify-center gap-3 py-4 px-4 rounded-xl 
                transition-all duration-300 transform hover:scale-[1.02]
                ${isDarkMode 
                  ? "bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-yellow-400" 
                  : "bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 text-blue-600"
                }
              `}
            >
              <div className={`transition-transform duration-500 ${isDarkMode ? "rotate-0" : "rotate-180"}`}>
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </div>
              <span className="font-semibold">
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
      `}</style>
    </>
  );
};

export default ModernNavbar;