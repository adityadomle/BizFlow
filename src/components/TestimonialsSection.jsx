//redessign this
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    text: "This platform completely transformed how I manage my business. Highly recommended!",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "Michael Brown",
    text: "Fantastic service! Everything is smooth, and the support team is incredible.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    name: "Emily Davis",
    text: "I love the simplicity and ease of use. It has saved me hours every week!",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 4,
    name: "James Wilson",
    text: "Great experience from start to finish. The animations and design are top-notch.",
    image: "https://randomuser.me/api/portraits/men/51.jpg",
  },
  {
    id: 5,
    name: "Olivia Martinez",
    text: "Dark mode support makes it so pleasant to use at night. Absolutely love it!",
    image: "https://randomuser.me/api/portraits/women/24.jpg",
  },
];

const TestimonialsSection = () => {
  const { isDarkMode } = useTheme();
  const scrollRef = useRef();
  const [hovered, setHovered] = useState(false);

  const baseSpeed = 0.7;
  const hoverSpeedFactor = 0.2;

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId;
    const step = () => {
      const speed = hovered ? baseSpeed * hoverSpeedFactor : baseSpeed;
      scrollContainer.scrollLeft += speed;
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      }
      animationFrameId = requestAnimationFrame(step);
    };
    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [hovered]);

  return (
    <section
      id="testimonials"
      className={`relative py-20 px-4 max-w-7xl mx-auto overflow-hidden transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 text-gray-100"
          : "bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 text-gray-900"
      }`}
    >
      {/* Parallax Background */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 opacity-20 animate-gradient-x"></div>

      {/* Header */}
      <motion.div variants={fadeIn("up", 0.3)} className="text-center mb-16">
        <motion.h2
          variants={textVariant(0.2)}
          className={`text-3xl md:text-5xl font-extrabold mb-4 ${
            isDarkMode ? "text-gray-100" : "text-gray-900"
          }`}
        >
          What Our Clients Say ✨
        </motion.h2>
        <motion.p
          variants={fadeIn("up", 0.4)}
          className={`max-w-2xl mx-auto text-lg ${
            isDarkMode ? "text-gray-400" : "text-gray-700"
          }`}
        >
          Real experiences from our customers who trust us to power their
          business.
        </motion.p>
      </motion.div>

      {/* Scrollable Testimonials */}
      <div className="relative">
        <div
          className={`absolute top-0 left-0 h-full w-16 z-10 pointer-events-none ${
            isDarkMode
              ? "bg-gradient-to-r from-gray-900"
              : "bg-gradient-to-r from-purple-50"
          }`}
        />
        <div
          className={`absolute top-0 right-0 h-full w-16 z-10 pointer-events-none ${
            isDarkMode
              ? "bg-gradient-to-l from-gray-900"
              : "bg-gradient-to-l from-purple-50"
          }`}
        />

        <div
          ref={scrollRef}
          className="flex space-x-6 overflow-x-hidden scrollbar-hide py-2 cursor-pointer"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <motion.div
              key={`${testimonial.id}-${index}`}
              variants={fadeIn("up", 0.2 * (index + 1))}
              whileHover={{ scale: 1.08, y: -6 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className={`relative flex-shrink-0 w-80 md:w-96 p-6 rounded-3xl flex flex-col items-center gap-4 overflow-hidden transition-all duration-500
                ${
                  isDarkMode
                    ? "bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950 border border-gray-700 shadow-xl hover:shadow-2xl"
                    : "bg-white shadow-lg border border-gray-200 hover:shadow-2xl"
                }`}
            >
              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl"></div>

              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-20 h-20 object-cover rounded-full border-4 border-blue-500 shadow-md z-10"
              />
              <h3
                className={`text-xl font-semibold z-10 ${
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                }`}
              >
                {testimonial.name}
              </h3>
              <div
                className={`flex space-x-1 z-10 ${
                  isDarkMode ? "text-yellow-400" : "text-yellow-500"
                }`}
              >
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-lg">
                    ★
                  </span>
                ))}
              </div>
              <p
                className={`text-center italic z-10 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                “{testimonial.text}”
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
