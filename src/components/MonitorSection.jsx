import { motion, useScroll, useTransform } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import 'swiper/css';
import 'swiper/css/navigation';
import { toast } from "react-toastify";
import { useRef, useState, useEffect } from "react";

const MobileCarouselDemo = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Performance Analytics",
      subtitle: "Real-time Insights",
      gradient: "linear-gradient(135deg, #3b82f6, #4f46e5)",
      icon: "📊",
      stats: "94% faster loading"
    },
    {
      id: 2,
      title: "User Experience",
      subtitle: "Seamless Navigation",
      gradient: "linear-gradient(135deg, #10b981, #059669)",
      icon: "🎯",
      stats: "99.8% uptime"
    },
    {
      id: 3,
      title: "Mobile Optimized",
      subtitle: "Touch Interactions",
      gradient: "linear-gradient(135deg, #8b5cf6, #ec4899)",
      icon: "📱",
      stats: "50ms response time"
    },
    {
      id: 4,
      title: "Smart Monitoring",
      subtitle: "AI-Powered Insights",
      gradient: "linear-gradient(135deg, #f97316, #ef4444)",
      icon: "🤖",
      stats: "24/7 monitoring"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isDragging, slides.length]);

  const handleDragStart = (e) => {
    setIsDragging(true);
    setDragStart(e.clientX || e.touches[0].clientX);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const currentX = e.clientX || e.touches[0].clientX;
    const diff = currentX - dragStart;
    setDragOffset(diff);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    
    if (Math.abs(dragOffset) > 50) {
      if (dragOffset > 0 && currentSlide > 0) {
        setCurrentSlide(currentSlide - 1);
      } else if (dragOffset < 0 && currentSlide < slides.length - 1) {
        setCurrentSlide(currentSlide + 1);
      }
    }
    
    setIsDragging(false);
    setDragOffset(0);
  };

  return (
    <div className="relative h-full bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-900">Mobile Carousel</h3>
        <p className="text-sm text-gray-500">Swipe to navigate</p>
      </div>

      {/* Carousel Container */}
      <div 
        className="relative h-64 overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        <motion.div
          className="flex h-full"
          style={{
            x: isDragging ? dragOffset : 0,
          }}
          animate={{
            x: isDragging ? dragOffset : -currentSlide * 100 + "%"
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
        >
          {slides.map((slide, index) => (
            <motion.div
              key={slide.id}
              className="min-w-full h-full flex flex-col justify-center items-center p-6"
              style={{
                background: slide.gradient
              }}
              animate={{
                scale: index === currentSlide ? 1 : 0.9,
                opacity: index === currentSlide ? 1 : 0.7
              }}
            >
              <motion.div
                className="text-4xl mb-4"
                animate={{
                  rotate: index === currentSlide ? [0, 10, -10, 0] : 0,
                  scale: index === currentSlide ? [1, 1.1, 1] : 1
                }}
                transition={{
                  duration: 2,
                  repeat: index === currentSlide ? Infinity : 0,
                  repeatType: "reverse"
                }}
              >
                {slide.icon}
              </motion.div>
              <h4 className="text-xl font-bold text-white mb-2 text-center">
                {slide.title}
              </h4>
              <p className="text-white/80 text-sm text-center mb-3">
                {slide.subtitle}
              </p>
              <motion.div
                className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2"
                animate={{
                  scale: index === currentSlide ? [1, 1.05, 1] : 1
                }}
                transition={{
                  duration: 1.5,
                  repeat: index === currentSlide ? Infinity : 0,
                  repeatType: "reverse"
                }}
              >
                <span className="text-white font-semibold text-sm">
                  {slide.stats}
                </span>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide 
                ? "bg-blue-500 w-6" 
                : "bg-gray-300"
            }`}
            onClick={() => setCurrentSlide(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>

      {/* Touch hint animation */}
      <motion.div
        className="absolute bottom-16 right-4 flex items-center gap-2 text-xs text-gray-400"
        animate={{ x: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span>Swipe</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </motion.div>
    </div>
  );
};

const MonitorSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.1]);

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0, rotateY: -15 },
    visible: {
      scale: 1,
      opacity: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        delay: 0.3
      }
    }
  };

  const buttonHover = {
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  };

  const iconVariants = {
    hover: {
      x: 8,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  // handle upcoming feature
  const handleUpcomingFeature = () => {
    try {
      // successful redirection
    } 
    catch (error) {
      // error
    }
    finally{
      toast.info("🛠️ Our team is working on this amazing feature! Stay tuned.", {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }

  return (
    <motion.section 
      ref={sectionRef}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="relative max-w-7xl mx-auto px-4 py-20 md:py-32 overflow-hidden"
    >
      <motion.div 
        style={{ y, opacity }}
        className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20"
      >
        {/* Left side - Content */}
        <motion.div 
          variants={itemVariants}
          className="w-full lg:w-1/2 space-y-8"
        >
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <motion.span 
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-emerald-500 to-blue-500"
            />
            <span className="text-emerald-500 font-bold text-sm tracking-wider uppercase relative">
              MONITOR
            </span>
          </motion.div>

          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight"
          >
            Introducing{" "}
            <motion.span
              initial={{ backgroundPosition: "0% 50%" }}
              animate={{ backgroundPosition: "100% 50%" }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-[length:200%_200%]"
            >
              best mobile
            </motion.span>{" "}
            carousels
          </motion.h2>

          <motion.p 
            variants={itemVariants}
            className="text-gray-500 text-lg leading-relaxed max-w-md"
          >
            Experience seamless navigation with our cutting-edge mobile carousel system. 
            Designed for performance, built for the future.
          </motion.p>

          <motion.div
            variants={itemVariants}
            whileHover={buttonHover}
            className="inline-block"
          >
            <motion.button
              onClick={handleUpcomingFeature}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-emerald-500 text-white font-semibold rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <div className="relative flex items-center gap-3">
                <span>Learn more about monitoring</span>
                <motion.svg 
                  variants={iconVariants}
                  whileHover="hover"
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M17 8l4 4m0 0l-4 4m4-4H3" 
                  />
                </motion.svg>
              </div>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right side - Interactive Mobile Carousel Demo */}
        <motion.div 
          variants={imageVariants}
          style={{ scale }}
          className="w-full lg:w-1/2 relative"
        >
          {/* Floating elements */}
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-2xl opacity-20 blur-sm"
          />
          <motion.div
            animate={{ 
              y: [0, 15, 0],
              rotate: [0, -3, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl opacity-25 blur-sm"
          />

          {/* Mobile Device Frame */}
          <motion.div 
            whileHover={{ 
              scale: 1.02,
              rotateY: 5,
              transition: { duration: 0.3 }
            }}
            className="relative mx-auto max-w-sm"
          >
            {/* Phone Frame */}
            <div className="relative bg-gray-900 rounded-3xl p-2 shadow-2xl border border-gray-800">
              {/* Screen */}
              <div className="bg-white rounded-2xl overflow-hidden h-96 relative">
                {/* Status Bar */}
                <div className="flex justify-between items-center px-6 py-2 bg-gray-50 text-xs text-gray-600">
                  <span>9:41</span>
                  <div className="flex gap-1">
                    <div className="w-4 h-2 bg-green-500 rounded-sm"></div>
                    <div className="w-4 h-2 bg-green-500 rounded-sm"></div>
                    <div className="w-4 h-2 bg-green-500 rounded-sm"></div>
                  </div>
                </div>

                {/* Interactive Carousel Demo */}
                <MobileCarouselDemo />
              </div>
              
              {/* Home Indicator */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-700 rounded-full"></div>
            </div>
          </motion.div>

          {/* Decorative dots */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-emerald-400 rounded-full opacity-60"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 left-0 transform -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full opacity-40"
          />
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

export default MonitorSection;