"use client";

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { HiChevronUp } from "react-icons/hi";   // minimal + modern
import { useTheme } from "../context/ThemeContext";



export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { pathname } = useLocation();
    const { isDarkMode } = useTheme();


  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", toggleVisibility);

    // Clean up the event listener
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`fixed bottom-8 right-8 z-50 transition-all duration-500 ease-out ${
        isVisible
          ? "opacity-100 scale-100 translate-y-0"
          : "opacity-0 scale-75 translate-y-4 pointer-events-none"
      }`}
    >
      <button
        onClick={scrollToTop}
  //       className="
  //   h-14 w-14 rounded-full
  //   bg-white/20 backdrop-blur-lg border border-white/20
  //   shadow-lg shadow-pink-400/30
  //   hover:shadow-pink-400/50 hover:scale-110
  //   transition-transform duration-300 flex items-center justify-center
  //   text-white text-2xl
  //   group relative overflow-hidden
  // "

  className={`
  h-14 w-14 rounded-full
  backdrop-blur-lg border
  shadow-lg hover:scale-110
  transition-transform duration-300 flex items-center justify-center
  text-2xl group relative overflow-hidden
  ${
    isDarkMode
      ? "bg-white/10 border-white/10 text-white shadow-pink-400/30 hover:shadow-pink-400/50"
      // : "bg-black/10 border-black/10 text-black shadow-pink-300/30 hover:shadow-pink-300/50"
      : "bg-black/10 border-black/10 text-black shadow-pink-600/40 hover:shadow-pink-600/60"

    }
`}

        aria-label="Back to top"
      >
        {/* Animated gradient overlay */}
        <span className="absolute inset-0 bg-gradient-to-tr from-pink-400 via-purple-500 to-blue-400 opacity-20 group-hover:opacity-50 rounded-full transition-opacity duration-300"></span>

        {/* Icon stays on top */}
<HiChevronUp className="relative z-10 w-6 h-6" />
      </button>
    </div>
  );
}
