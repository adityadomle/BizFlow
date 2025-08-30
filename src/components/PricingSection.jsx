import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { CheckCircleIcon, SparklesIcon } from "@heroicons/react/24/solid";
import { useTheme } from '../context/ThemeContext'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Mock motion components for demo
const motion = {
  div: ({ children, className, ...props }) => <div className={className} {...props}>{children}</div>,
  section: ({ children, className, ...props }) => <section className={className} {...props}>{children}</section>,
  h2: ({ children, className, ...props }) => <h2 className={className} {...props}>{children}</h2>,
  p: ({ children, className, ...props }) => <p className={className} {...props}>{children}</p>,
  li: ({ children, className, ...props }) => <li className={className} {...props}>{children}</li>,
  span: ({ children, className, ...props }) => <span className={className} {...props}>{children}</span>
};

// Mock animations
const fadeIn = () => ({});
const textVariant = () => ({});

// Mock toast for demo
const toast = {
  info: (message) => alert(message)
};

// Helper function to calculate price based on product count
const calculatePrice = (basePrice, productCount) =>
  Math.round(basePrice * (productCount / 50));

// Color codes for Pricing Plans heading and description (restored)
const headingColors = {
  dark: {
    heading: "text-blue-300",
    subheading: "text-gray-300",
    accent: "bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent",
  },
  light: {
    heading: "text-blue-700",
    subheading: "text-gray-500",
    accent: "bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent",
  },
};

// Glassmorphism Background Component
const GlassmorphismBackground = ({ isDarkMode }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Main glassmorphism shapes */}
    <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-30 animate-pulse
      ${isDarkMode 
        ? "bg-gradient-to-br from-blue-500/20 via-cyan-400/15 to-purple-500/20" 
        : "bg-gradient-to-br from-blue-400/25 via-cyan-300/20 to-purple-400/25"
      }`} 
      style={{ animationDuration: '4s' }}
    />
    
    <div className={`absolute top-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-25 animate-pulse
      ${isDarkMode 
        ? "bg-gradient-to-tl from-purple-500/20 via-pink-400/15 to-blue-500/20" 
        : "bg-gradient-to-tl from-purple-400/25 via-pink-300/20 to-blue-400/25"
      }`}
      style={{ animationDuration: '6s', animationDelay: '1s' }}
    />
    
    <div className={`absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full blur-3xl opacity-20 animate-pulse
      ${isDarkMode 
        ? "bg-gradient-to-tr from-cyan-500/20 via-blue-400/15 to-indigo-500/20" 
        : "bg-gradient-to-tr from-cyan-400/25 via-blue-300/20 to-indigo-400/25"
      }`}
      style={{ animationDuration: '5s', animationDelay: '2s' }}
    />

    {/* Floating glass panels */}
    <div className={`absolute top-1/2 left-1/6 w-64 h-48 rotate-12 rounded-3xl backdrop-blur-sm opacity-10 border
      ${isDarkMode 
        ? "bg-white/5 border-white/10" 
        : "bg-white/20 border-white/30"
      }`}
      style={{ 
        transform: 'rotate(12deg) translateY(-50%)',
        animation: 'float 8s ease-in-out infinite'
      }}
    />
    
    <div className={`absolute bottom-1/3 right-1/6 w-56 h-40 -rotate-6 rounded-3xl backdrop-blur-sm opacity-10 border
      ${isDarkMode 
        ? "bg-white/5 border-white/10" 
        : "bg-white/20 border-white/30"
      }`}
      style={{ 
        transform: 'rotate(-6deg)',
        animation: 'float 10s ease-in-out infinite reverse'
      }}
    />

    {/* Subtle grid pattern */}
    <div className={`absolute inset-0 opacity-5 ${isDarkMode ? 'opacity-5' : 'opacity-10'}`}
      style={{
        backgroundImage: `linear-gradient(${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} 1px, transparent 1px),
                         linear-gradient(90deg, ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }}
    />

    {/* Animated particles */}
    {Array.from({ length: 8 }).map((_, i) => (
      <div
        key={i}
        className={`absolute w-2 h-2 rounded-full opacity-30 ${isDarkMode ? 'bg-white/20' : 'bg-black/20'}`}
        style={{
          left: `${15 + (i * 12)}%`,
          top: `${20 + (i * 8)}%`,
          animation: `particle-float ${3 + (i * 0.5)}s ease-in-out infinite`,
          animationDelay: `${i * 0.2}s`
        }}
      />
    ))}

    {/* CSS animations */}
    <style jsx>{`
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(12deg); }
        50% { transform: translateY(-20px) rotate(15deg); }
      }
      
      @keyframes particle-float {
        0%, 100% { transform: translateY(0px) scale(1); opacity: 0.3; }
        50% { transform: translateY(-30px) scale(1.2); opacity: 0.6; }
      }
    `}</style>
  </div>
);

const PricingCard = ({ name, price, features, animation, isDarkMode }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          scrub:true
        },
      }
    );
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative group overflow-hidden rounded-3xl p-8 flex flex-col gap-6 items-start will-change-transform
        ${
          isDarkMode
            ? "bg-black/20 backdrop-blur-xl text-white border border-white/8"
            : "bg-white/20 backdrop-blur-xl text-gray-900 border border-white/30"
        }
        shadow-2xl shadow-black/10
        transition-all duration-300 ease-out
        ${
          isDarkMode
            ? "hover:bg-black/30 hover:shadow-2xl hover:shadow-purple-900/40 hover:border-white/15"
            : "hover:bg-white/10 hover:shadow-2xl hover:shadow-purple-500/20"
        }
        hover:-translate-y-2 hover:scale-[1.02]
        before:absolute before:inset-0 before:rounded-3xl before:p-[1px]
        before:bg-gradient-to-br before:from-white/20 before:via-white/10 before:to-transparent
        before:mask-composite:exclude before:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]`}
    >
      {/* Floating particles effect */}
      <div className="absolute top-4 right-4 opacity-0 transition-all duration-300 ease-out group-hover:opacity-100">
        <SparklesIcon className={`w-6 h-6 ${isDarkMode ? "text-purple-400" : "text-purple-600"} animate-pulse`} />
      </div>

      <div className="relative z-10 w-full">
        {/* Plan name badge */}
        <span
          className={`inline-flex items-center text-sm font-medium px-4 py-2 rounded-full mb-6 transition-all duration-300 ease-out backdrop-blur-xl
            ${
              isDarkMode
                ? "bg-black/15 border border-white/10 text-blue-200 shadow-lg shadow-black/30 group-hover:bg-black/25 group-hover:border-white/20"
                : "bg-white/[0.25] border border-white/30 text-blue-700 shadow-md shadow-blue-500/10"
            }
            group-hover:scale-105 group-hover:shadow-lg`}
        >
          {name}
        </span>

        {/* Price display */}
        <div className="mb-8">
          <div className={`flex items-baseline gap-2 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
            <span className={`text-4xl font-bold bg-gradient-to-r ${isDarkMode ? "from-blue-400 to-cyan-400" : "from-blue-600 to-cyan-600"} bg-clip-text text-transparent`}>
              ${price}
            </span>
            <span className={`text-lg font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              /month
            </span>
          </div>
          <p className={`text-sm mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
            Billed monthly
          </p>
        </div>

        {/* Features list */}
        <div className="mb-8 flex-grow">
          <h4 className={`text-sm font-semibold mb-4 uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            What's included
          </h4>
          <ul className="space-y-3">
            {features.map((feat, index) => (
              <motion.li
                key={feat}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ 
                  delay: index * 0.08, 
                  duration: 0.4, 
                  ease: "easeOut" 
                }}
                className="flex items-start gap-3"
              >
                <CheckCircleIcon
                  className={`w-5 h-5 mt-0.5 flex-shrink-0 transition-colors duration-200 ${
                    isDarkMode ? "text-blue-400 group-hover:text-blue-300" : "text-blue-600 group-hover:text-blue-500"
                  }`}
                  aria-hidden="true"
                />
                <span className={`text-sm leading-relaxed transition-colors duration-200 ${
                  isDarkMode ? "text-gray-300 group-hover:text-gray-200" : "text-gray-700 group-hover:text-gray-600"
                }`}>
                  {feat}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <button
          className={`w-full py-3 px-6 rounded-xl font-semibold relative overflow-hidden transition-all duration-300 ease-out backdrop-blur-xl
            ${
              isDarkMode
                ? "bg-black/15 hover:bg-black/25 text-white border border-white/10 shadow-lg shadow-black/30 hover:border-white/20"
                : "bg-white/[0.20] hover:bg-white/[0.30] text-gray-800 border border-white/25 shadow-md shadow-blue-500/10"
            }
            hover:scale-[1.02] hover:shadow-xl active:scale-98 transform
            before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-r 
            ${isDarkMode 
              ? "before:from-blue-500/[0.12] before:to-cyan-500/[0.12]" 
              : "before:from-blue-500/[0.10] before:to-cyan-500/[0.10]"
            } before:opacity-0 before:transition-all before:duration-300
            hover:before:opacity-100 cursor-pointer`}
          onClick={() =>
            toast.info("⚒️ This feature is coming soon! Stay tuned for updates.")
          }
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            Choose Plan
            <motion.span
              initial={{ x: 0 }}
              whileHover={{ x: 2 }}
              transition={{ duration: 0.2 }}
            >
              →
            </motion.span>
          </span>
        </button>
      </div>
    </div>
  );
};

PricingCard.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  features: PropTypes.arrayOf(PropTypes.string).isRequired,
  animation: PropTypes.object.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

const PricingSectionHeader = () => {
  const { isDarkMode } = useTheme();
  const headerRef = useRef(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          scrub: 1,
        },
      }
    );
  }, []);

  return (
    <div ref={headerRef} className="text-center mb-10">
      <h2
        className={`text-3xl sm:text-4xl font-bold mb-3 ${
          isDarkMode ? headingColors.dark.heading : headingColors.light.heading
        }`}
      >
        <span
          className={`${
            isDarkMode ? headingColors.dark.accent : headingColors.light.accent
          }`}
        >
          Pricing Plans
        </span>
      </h2>
      <p
        className={`text-lg max-w-xl mx-auto ${
          isDarkMode
            ? headingColors.dark.subheading
            : headingColors.light.subheading
        }`}
      >
        Choose the perfect plan for your needs. Upgrade or downgrade at any time.
      </p>
    </div>
  );
};

const PricingSection = () => {
  const { isDarkMode } = useTheme();
  const [productCount] = useState(1);
  const starterPrice = calculatePrice(4000, productCount);
  const businessPrice = calculatePrice(7500, productCount);

  const plans = [
    {
      name: "Starter",
      price: starterPrice,
      features: [
        "Up to 10 users",
        "Email support",
        "Basic analytics dashboard",
        "Access to community forum",
        "Standard security features",
        "Weekly performance reports",
      ],
      animation: fadeIn("right", 0.5),
    },
    {
      name: "Business",
      price: businessPrice,
      features: [
        "Unlimited users",
        "Priority email & chat support",
        "Advanced analytics & custom reports",
        "Team collaboration tools",
        "Multiple project workspaces",
        "Daily performance insights",
      ],
      animation: fadeIn("left", 0.5),
    },
  ];

  return (
    <div className="min-h-screen">
      <motion.section
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className={`relative py-20 px-4 overflow-hidden transition-colors duration-300`}
      >
        {/* Enhanced Glassmorphism Background */}
        <GlassmorphismBackground isDarkMode={isDarkMode} />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section header */}
          <PricingSectionHeader />

          {/* Pricing cards */}
          <motion.div
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px", amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut", staggerChildren: 0.2 }}
            className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto relative z-20"
          >
            {plans.map((plan) => (
              <PricingCard key={plan.name} {...plan} isDarkMode={isDarkMode} />
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            variants={fadeIn("up", 0.6)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mt-16"
          >
            <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
              All plans include a 14-day free trial. No credit card required.
            </p>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default PricingSection;