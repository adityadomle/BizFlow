import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

// ✅ Full Testimonials Data
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
  const [paused, setPaused] = useState(false);
  const { isDarkMode } = useTheme();

  return (
    <section
      id="testimonials"
      className={`py-16 px-4 max-w-7xl mx-auto transition-colors duration-300 ${
        isDarkMode ? "bg-black text-gray-100" : "bg-white text-gray-900"
      }`}
    >
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
          className={`${isDarkMode ? "text-gray-400" : "text-gray-700"} max-w-2xl mx-auto text-lg`}
        >
          Real experiences from our customers who trust us to power their business.
        </motion.p>
      </motion.div>

      {/* Testimonials Scroller */}
      <motion.div
        variants={fadeIn("up", 0.5)}
        className={`relative py-2 transition-colors duration-300 ${
          isDarkMode ? "border-transparent" : "border-t border-b border-slate-100"
        }`}
      >
        <div className="overflow-hidden w-full">
          <div
            className={`flex animate-scroll space-x-6 ${paused ? "paused" : ""}`}
            onClick={() => setPaused((p) => !p)} // toggle pause on click/tap
          >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className="min-w-[280px] md:min-w-[350px] lg:min-w-[400px] flex-shrink-0"
              >
                <motion.div
                  variants={fadeIn("up", 0.3 * (index + 1))}
                  whileHover={{ scale: 1.05, y: -8 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className={`p-6 rounded-2xl transition-all duration-300 flex flex-col h-full group border
                    ${
                      isDarkMode
                        ? "bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950 border-gray-700 shadow-lg hover:shadow-2xl"
                        : "bg-gradient-to-br from-white via-slate-50 to-slate-100 border-slate-200 shadow-[0_6px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.10)]"
                    }`}
                >
                  {/* Avatar with ring effect */}
                  <div className="w-20 h-20 mx-auto mb-4 relative">
                    <motion.img
                      variants={fadeIn("up", 0.5 * (index + 1))}
                      src={testimonial.image}
                      alt={testimonial.name}
                      className={`w-full h-full object-cover rounded-full border-4 border-blue-500 shadow-md transition-all duration-300 group-hover:border-blue-400 ${
                        isDarkMode ? "ring-transparent" : "ring-2 ring-white"
                      }`}
                    />
                  </div>

                  {/* Stars */}
                  <motion.div
                    variants={fadeIn("up", 0.4 * (index + 1))}
                    className={`${isDarkMode ? "text-yellow-400" : "text-yellow-500"} flex justify-center mb-3`}
                  >
                    {[...Array(5)].map((_, starIndex) => (
                      <motion.span
                        key={starIndex}
                        variants={fadeIn("up", 0.1 * starIndex)}
                        className="text-xl drop-shadow-sm group-hover:scale-110 transition-transform"
                      >
                        ★
                      </motion.span>
                    ))}
                  </motion.div>

                  {/* Name */}
                  <motion.h3
                    variants={textVariant(0.3)}
                    className={`font-semibold text-xl mb-2 transition-colors ${
                      isDarkMode
                        ? "text-gray-100 group-hover:text-blue-500"
                        : "text-gray-900 group-hover:text-blue-600"
                    }`}
                  >
                    {testimonial.name}
                  </motion.h3>

                  {/* Text */}
                  <motion.p
                    variants={fadeIn("up", 0.6 * (index + 1))}
                    className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} leading-relaxed text-sm md:text-base italic`}
                  >
                    “{testimonial.text}”
                  </motion.p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default TestimonialsSection;
