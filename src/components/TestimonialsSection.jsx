import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    text: "This platform completely transformed how I manage my business. The intuitive interface and powerful features have streamlined my workflow beyond expectations.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    role: "CEO, TechStart"
  },
  {
    id: 2,
    name: "Michael Brown",
    text: "Fantastic service! Everything is smooth, and the support team is incredible. They respond quickly and solve problems with remarkable efficiency.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    role: "Product Manager"
  },
  {
    id: 3,
    name: "Emily Davis",
    text: "I love the simplicity and ease of use. It has saved me hours every week! The automation features are particularly impressive and well-designed.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    role: "Freelance Designer"
  },
  {
    id: 4,
    name: "James Wilson",
    text: "Great experience from start to finish. The animations and design are top-notch. Every interaction feels polished and thoughtfully crafted.",
    image: "https://randomuser.me/api/portraits/men/51.jpg",
    role: "Marketing Director"
  },
  {
    id: 5,
    name: "Olivia Martinez",
    text: "Dark mode support makes it so pleasant to use at night. The interface adapts beautifully and maintains perfect readability in any lighting condition.",
    image: "https://randomuser.me/api/portraits/women/24.jpg",
    role: "Software Engineer"
  },
  {
    id: 6,
    name: "David Chen",
    text: "The best platform I've used for project management. Clean, fast, and feature-rich without being overwhelming. Highly recommended for any team.",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
    role: "Team Lead"
  }
];

const TestimonialCard = ({ text, name, image, role, isDarkMode }) => {
  return (
    <div className={`flex-none w-[345px] sm:w-96 md:w-[460px] p-4 sm:p-6 md:p-8 h-auto min-h-[220px] sm:min-h-[240px] md:min-h-[260px] rounded-xl shadow-lg ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-800 to-gray-900 text-white border border-gray-700' 
        : 'bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-900 border border-blue-100'
    } flex flex-col justify-between relative transition-all duration-300 transform hover:scale-105 hover:shadow-xl mx-2 sm:mx-3`}>
      
      {/* Top accent bar */}
      <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-2 w-12 rounded-t-lg shadow-sm ${
        isDarkMode 
          ? 'bg-gradient-to-r from-blue-400 to-indigo-400' 
          : 'bg-gradient-to-r from-blue-500 to-indigo-500'
      }`} />
      
      {/* Quote icon */}
      <div className={`absolute top-3 right-3 ${
        isDarkMode ? 'text-gray-600' : 'text-blue-200'
      }`}>
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
        </svg>
      </div>
      
      {/* Testimonial text */}
      <p className={`mb-4 sm:mb-6 text-sm sm:text-base md:text-lg flex-grow leading-relaxed break-words font-medium pr-8 ${
        isDarkMode ? 'text-gray-300' : 'text-gray-700'
      }`}>
        {text}
      </p>
      
      {/* User info section */}
      <div className={`flex flex-col xs:flex-row items-center xs:items-center gap-3 xs:gap-4 mt-auto pt-4 border-t ${
        isDarkMode ? 'border-gray-700' : 'border-blue-100'
      }`}>
        <img
          src={image}
          alt={name}
          className={`h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-full border-4 flex-shrink-0 shadow-md object-cover ${
            isDarkMode ? 'border-gray-600' : 'border-white'
          }`}
          onError={(e) => {
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&size=100`;
          }}
        />
        <div className="text-center sm:text-left">
          <h5 className={`font-bold text-sm sm:text-base md:text-lg ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            {name}
          </h5>
          <p className={`text-xs sm:text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {role}
          </p>
        </div>
      </div>
    </div>
  );
};

const TestimonialSection = () => {
  const { isDarkMode } = useTheme();
  const [isPaused, setIsPaused] = useState(false);
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes scrollLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-100% / 3)); }
          }
          @media (max-width: 640px) {
            .scroll-container { animation-duration: 30s !important; }
          }
          @media (min-width: 641px) and (max-width: 1024px) {
            .scroll-container { animation-duration: 25s !important; }
          }
          @media (min-width: 1025px) {
            .scroll-container { animation-duration: 20s !important; }
          }
          .scroll-container:hover {
            animation-play-state: paused !important;
          }
        `
      }} />
      
      <div className={`w-full max-w-full mx-auto py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 transition-colors duration-300 bg-transparent`}>
        
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-medium mb-4">
            <span>✨</span>
            Testimonials
          </div>
          <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 sm:mb-4 ${
            isDarkMode 
              ? 'bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent' 
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'
          }`}>
            What Our Users Say
          </h2>
          <p className={`text-sm sm:text-base md:text-lg max-w-2xl mx-auto ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Trusted by developers and teams worldwide who love our platform
          </p>
        </div>
        
        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Left fade gradient */}
          <div className={`absolute -left-2 top-0 w-8 sm:w-16 md:w-24 h-full z-10 pointer-events-none ${
            isDarkMode 
              ? 'bg-gradient-to-r from-gray-900 to-transparent' 
              : 'bg-gradient-to-r from-white to-transparent'
          }`} />
          
          {/* Right fade gradient */}
          <div className={`absolute -right-2 top-0 w-8 sm:w-16 md:w-24 h-full z-10 pointer-events-none ${
            isDarkMode 
              ? 'bg-gradient-to-l from-gray-900 to-transparent' 
              : 'bg-gradient-to-l from-white to-transparent'
          }`} />
          
          <div className="overflow-hidden">
            <div
              className="flex scroll-container"
              style={{
                animation: "scrollLeft 20s linear infinite",
                animationPlayState: isPaused ? "paused" : "running",
                width: "max-content"
              }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {duplicatedTestimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={`${testimonial.id}-${index}`}
                  {...testimonial}
                  isDarkMode={isDarkMode}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom indicator */}
        <div className="flex justify-center mt-8">
          <div className={`flex gap-2 px-4 py-2 rounded-full ${
            isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
          }`}>
            {testimonials.slice(0, 3).map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  isDarkMode ? 'bg-gray-600' : 'bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TestimonialSection;