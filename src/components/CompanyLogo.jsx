import React, { useState } from 'react';
import { useTheme } from "../context/ThemeContext";
import slack from '../assets/slack.png'
import amazon from '../assets/amazon.png'
import woocommerce from '../assets/woocommerce.png'
import meundies from '../assets/meundies.png'
import sitepoint from '../assets/sitepoint.png'

const CompanyLogo = () => {
  const logos = [slack, amazon, woocommerce, meundies, sitepoint];
  const [hoveredLogo, setHoveredLogo] = useState(null);
  const { isDarkMode } = useTheme();

  return (
    <section className={`w-full py-16 lg:py-20 overflow-hidden transition-colors duration-300 bg-transparent`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
          
          {/* Left Content Section */}
          <div className="lg:w-80 xl:w-96 flex-shrink-0">
            <div className="relative">
              {/* Decorative background */}
              <div className={`absolute -inset-4 rounded-2xl transform rotate-1 transition-colors duration-300 ${
                isDarkMode
                  ? "bg-gradient-to-r from-blue-400/20 to-blue-500/10"
                  : "bg-gradient-to-r from-blue-500/10 to-blue-600/5"
              }`}></div>
              
              {/* Main content card */}
              <div className={`relative rounded-xl shadow-lg p-6 lg:p-8 transition-all duration-300 hover:shadow-xl ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700 shadow-blue-400/20"
                  : "bg-white border-gray-100 shadow-blue-500/10"
              } border`}>
                <div className={`border-l-4 pl-6 transition-colors duration-300 ${
                  isDarkMode ? "border-blue-400" : "border-blue-500"
                }`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div 
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        isDarkMode ? "bg-blue-400" : "bg-blue-500"
                      } animate-pulse`}
                    />
                    <span className={`text-sm font-medium uppercase tracking-wider transition-colors duration-300 ${
                      isDarkMode ? "text-blue-400" : "text-blue-600"
                    }`}>
                      Trusted Partners
                    </span>
                  </div>
                  
                  <h3 
                    className={`text-xl lg:text-2xl xl:text-3xl font-bold leading-tight mb-2 transition-colors duration-300 ${
                      isDarkMode ? "text-gray-100" : "text-gray-800"
                    }`}
                  >
                    Proud partner at
                  </h3>
                  <p 
                    className={`text-lg lg:text-xl font-semibold mb-4 transition-colors duration-300 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Hubspot & Segment
                  </p>
                  
                  <div 
                    className={`flex items-center text-sm transition-colors duration-300 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    <svg className={`w-4 h-4 mr-2 transition-colors duration-300 ${
                      isDarkMode ? "text-green-400" : "text-green-500"
                    }`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Verified partnerships
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Logo Marquee Section */}
          <div className="flex-1 min-w-0">
            <div className="relative">
              {/* Gradient overlays for smooth edges */}
              <div className={`absolute left-0 top-0 bottom-0 w-8 lg:w-16 bg-gradient-to-r to-transparent z-20 pointer-events-none transition-colors duration-300 ${
                isDarkMode 
                  ? "from-gray-900" 
                  : "from-gray-50"
              }`}></div>
              <div className={`absolute right-0 top-0 bottom-0 w-8 lg:w-16 bg-gradient-to-l to-transparent z-20 pointer-events-none transition-colors duration-300 ${
                isDarkMode 
                  ? "from-gray-800" 
                  : "from-white"
              }`}></div>
              
              {/* Marquee container */}
              <div className="overflow-hidden py-4">
                <div 
                  className="flex animate-marquee hover:pause"
                  style={{
                    animation: 'marquee 25s linear infinite',
                  }}
                >
                  {/* First set of logos */}
                  {logos.map((logo, index) => (
                    <div
                      key={index}
                      className={`flex-shrink-0 mx-8 lg:mx-12 group cursor-pointer transition-transform duration-300 hover:scale-105 ${isDarkMode? "bg-slate-100":"bg-slate-100"}`}
                      onMouseEnter={() => setHoveredLogo(index)}
                      onMouseLeave={() => setHoveredLogo(null)}
                    >
                      <div className="relative">
                        <div 
                          className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                            hoveredLogo === index
                              ? isDarkMode
                                ? "bg-gradient-to-r from-blue-400/20 to-blue-500/10 scale-105"
                                : "bg-gradient-to-r from-blue-500/10 to-blue-600/5 scale-105"
                              : "bg-transparent"
                          }`}
                        />
                        <img
                          src={logo}
                          alt={`Company Logo ${index + 1}`}
                          className={`h-8 lg:h-10 w-32 lg:w-36 object-contain filter transition-all duration-300 p-2 ${
                            isDarkMode
                              ? "grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100"
                              : "grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100"
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                  
                  {/* Duplicate set for seamless loop */}
                  {logos.map((logo, index) => (
                    <div
                      key={`duplicate-${index}`}
                      className={`flex-shrink-0 mx-8 lg:mx-12 group cursor-pointer transition-transform duration-300 hover:scale-105 ${isDarkMode? "bg-slate-100":"bg-slate-100"}`}
                      onMouseEnter={() => setHoveredLogo(`dup-${index}`)}
                      onMouseLeave={() => setHoveredLogo(null)}
                    >
                      <div className="relative">
                        <div 
                          className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                            hoveredLogo === `dup-${index}`
                              ? isDarkMode
                                ? "bg-gradient-to-r from-blue-400/20 to-blue-500/10 scale-105"
                                : "bg-gradient-to-r from-blue-500/10 to-blue-600/5 scale-105"
                              : "bg-transparent"
                          }`}
                        />
                        <img
                          src={logo}
                          alt={`Company Logo ${index + 1}`}
                          className={`h-8 lg:h-10 w-32 lg:w-36 object-contain filter transition-all duration-300 p-2 ${
                            isDarkMode
                              ? "grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100"
                              : "grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100"
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Statistics or additional info */}
            <div 
              className={`flex justify-center lg:justify-start mt-6 space-x-6 text-sm transition-colors duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <div className="flex items-center group cursor-pointer">
                <div 
                  className={`w-2 h-2 rounded-full mr-2 transition-all duration-300 group-hover:scale-125 ${
                    isDarkMode ? "bg-green-500" : "bg-green-400"
                  }`}
                />
                <span className="group-hover:text-green-500 transition-colors duration-200">5+ Partners</span>
              </div>
              <div className="flex items-center group cursor-pointer">
                <div 
                  className={`w-2 h-2 rounded-full mr-2 transition-all duration-300 group-hover:scale-125 ${
                    isDarkMode ? "bg-blue-500" : "bg-blue-400"
                  }`}
                />
                <span className="group-hover:text-blue-500 transition-colors duration-200">Global Reach</span>
              </div>
              <div className="flex items-center group cursor-pointer">
                <div 
                  className={`w-2 h-2 rounded-full mr-2 transition-all duration-300 group-hover:scale-125 ${
                    isDarkMode ? "bg-purple-500" : "bg-purple-400"
                  }`}
                />
                <span className="group-hover:text-purple-500 transition-colors duration-200">Enterprise Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default CompanyLogo;