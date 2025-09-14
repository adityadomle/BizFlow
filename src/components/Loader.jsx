import React, { useEffect, useState } from 'react'
import { useTheme } from '../context/ThemeContext'

const Loader = ({ 
  size = "medium", 
  color = "blue", 
  centered = true, 
  text = "Loading...", 
  fullscreen = false 
}) => {
  const { isDarkMode } = useTheme();
  const [particles, setParticles] = useState([]);

  // Generate random particles
  
  useEffect(() => {
    const particleCount = 8;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      delay: i * 0.15,
      angle: (i * (360 / particleCount)) % 360,
    }));
    setParticles(newParticles);
  }, []);

  // Size classes
  const sizeClasses = {
    small: { main: "w-8 h-8", orbit: "w-16 h-16", particles: "w-1 h-1" },
    medium: { main: "w-12 h-12", orbit: "w-20 h-20", particles: "w-1.5 h-1.5" },
    large: { main: "w-16 h-16", orbit: "w-28 h-28", particles: "w-2 h-2" },
  };

  // Color system with dark/light theme support
  const colorSystem = {
    blue: {
      primary: isDarkMode ? "#3b82f6" : "#2563eb",
      secondary: isDarkMode ? "#1d4ed8" : "#1e40af", 
      accent: isDarkMode ? "#60a5fa" : "#3b82f6",
      glow: isDarkMode ? "rgba(59, 130, 246, 0.4)" : "rgba(37, 99, 235, 0.3)",
      particles: isDarkMode ? "#93c5fd" : "#60a5fa",
    },
    purple: {
      primary: isDarkMode ? "#8b5cf6" : "#7c3aed",
      secondary: isDarkMode ? "#7c3aed" : "#6d28d9",
      accent: isDarkMode ? "#a78bfa" : "#8b5cf6",
      glow: isDarkMode ? "rgba(139, 92, 246, 0.4)" : "rgba(124, 58, 237, 0.3)",
      particles: isDarkMode ? "#c4b5fd" : "#a78bfa",
    },
    green: {
      primary: isDarkMode ? "#10b981" : "#059669",
      secondary: isDarkMode ? "#047857" : "#065f46",
      accent: isDarkMode ? "#34d399" : "#10b981",
      glow: isDarkMode ? "rgba(16, 185, 129, 0.4)" : "rgba(5, 150, 105, 0.3)",
      particles: isDarkMode ? "#6ee7b7" : "#34d399",
    },
  };

  const currentColors = colorSystem[color] || colorSystem.blue;
  const currentSize = sizeClasses[size] || sizeClasses.medium;

  const containerClasses = centered
    ? "flex flex-col items-center justify-center"
    : "inline-flex flex-col items-center";

  return (
    <div
      role="status"
      className={`${containerClasses} min-h-screen ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
      style={{
        background: fullscreen 
          ? isDarkMode
            ? `radial-gradient(circle at center, #1a1a2e 0%, #16213e 50%, #0f0f1a 100%)`
            : `radial-gradient(circle at center, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)`
          : isDarkMode
            ? 'linear-gradient(135deg, #1f2937 0%, #111827 100%)'
            : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
      }}
    >
      {/* Main loader container */}
      <div className="relative loader-container">
        
        {/* Outer rotating rings */}
        <div className={`absolute ${currentSize.orbit} -inset-4 loader-ring-outer`}>
          <div className={`w-full h-full border-2 border-dashed rounded-full ${isDarkMode ? 'opacity-40' : 'opacity-30'}`}
               style={{ borderColor: currentColors.primary }} />
        </div>
        
        <div className={`absolute ${currentSize.orbit} -inset-2 loader-ring-middle`}>
          <div className={`w-full h-full border border-dotted rounded-full ${isDarkMode ? 'opacity-60' : 'opacity-50'}`}
               style={{ borderColor: currentColors.accent }} />
        </div>

        {/* Particle orbit system */}
        <div className={`absolute ${currentSize.orbit} -inset-4`}>
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute w-full h-full loader-particle-orbit"
              style={{ 
                animationDelay: `${particle.delay}s`,
                transform: `rotate(${particle.angle}deg)`
              }}
            >
              <div 
                className={`${currentSize.particles} rounded-full loader-particle`}
                style={{ 
                  background: `linear-gradient(45deg, ${currentColors.particles}, ${currentColors.accent})`,
                  boxShadow: `0 0 8px ${currentColors.glow}`
                }}
              />
            </div>
          ))}
        </div>

        {/* Main spinner */}
        <div className={`relative ${currentSize.main} loader-morph`}>
          {/* Background glow */}
          <div 
            className={`absolute inset-0 rounded-full loader-glow ${isDarkMode ? 'blur-lg' : 'blur-md'}`}
            style={{ 
              background: `radial-gradient(circle, ${currentColors.glow} 0%, transparent 70%)`,
            }}
          />
          
          {/* Main geometric spinner */}
          <svg
            className={`${currentSize.main} loader-spin-main relative z-10`}
            viewBox="0 0 100 100"
            fill="none"
          >
            <defs>
              <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={currentColors.primary} />
                <stop offset="50%" stopColor={currentColors.accent} />
                <stop offset="100%" stopColor={currentColors.secondary} />
              </linearGradient>
            </defs>
            
            {/* Animated geometric paths */}
            <path
              d="M50,15 L75,35 L75,65 L50,85 L25,65 L25,35 Z"
              fill={`url(#gradient-${color})`}
              className="loader-morph-path"
            />
            
            {/* Inner elements */}
            <circle cx="50" cy="50" r="12" fill="none" 
                   stroke={currentColors.accent} 
                   strokeWidth={isDarkMode ? "2.5" : "2"}
                   className="loader-inner-circle" />
            <circle cx="50" cy="50" r="6" fill={currentColors.particles} 
                   className="loader-center-dot" />
          </svg>
          
          {/* Energy waves */}
          <div className="absolute inset-0">
            <div className="loader-wave-1 absolute inset-0 rounded-full" 
                 style={{ 
                   background: `radial-gradient(circle, ${currentColors.glow} 0%, transparent 60%)` 
                 }} />
            <div className="loader-wave-2 absolute inset-0 rounded-full" 
                 style={{ 
                   background: `radial-gradient(circle, ${currentColors.glow} 0%, transparent 60%)` 
                 }} />
          </div>
        </div>
      </div>

      {/* Loading text */}
      {text && (
        <div className="mt-8 text-center">
          <div className="relative mb-4">
            <span className={`${isDarkMode ? 'text-2xl' : 'text-xl'} font-semibold loader-text-main`}
                  style={{ 
                    background: `linear-gradient(45deg, ${currentColors.primary}, ${currentColors.accent})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: isDarkMode ? 'drop-shadow(0 0 8px rgba(255,255,255,0.1))' : 'none'
                  }}>
              {text}
            </span>
          </div>
          
          {/* Progress bars */}
          <div className="flex space-x-1 justify-center">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} 
                   className={`w-1 ${isDarkMode ? 'h-5' : 'h-4'} rounded-full loader-progress-bar`}
                   style={{ 
                     backgroundColor: currentColors.primary,
                     animationDelay: `${i * 0.1}s`,
                     boxShadow: isDarkMode ? `0 0 6px ${currentColors.glow}` : 'none'
                   }} />
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        .loader-container {
          animation: float 3s ease-in-out infinite;
        }
        
        .loader-ring-outer {
          animation: spin-slow 4s linear infinite;
        }
        
        .loader-ring-middle {
          animation: spin-fast 2s linear infinite reverse;
        }
        
        .loader-particle-orbit {
          animation: orbit 2.5s linear infinite;
        }
        
        .loader-particle {
          position: absolute;
          top: -2px;
          right: -2px;
          animation: pulse-particle 1.5s ease-in-out infinite;
        }
        
        .loader-morph {
          animation: morph-scale 2s ease-in-out infinite;
        }
        
        .loader-glow {
          animation: glow-pulse 2s ease-in-out infinite;
        }
        
        .loader-spin-main {
          animation: spin-wobble 3s ease-in-out infinite;
        }
        
        .loader-inner-circle {
          animation: spin-fast 1.5s linear infinite;
          transform-origin: center;
        }
        
        .loader-center-dot {
          animation: pulse-center 1s ease-in-out infinite;
        }
        
        .loader-wave-1 {
          animation: wave-expand 2s ease-out infinite;
          opacity: 0;
        }
        
        .loader-wave-2 {
          animation: wave-expand 2s ease-out infinite 0.5s;
          opacity: 0;
        }
        
        .loader-text-main {
          animation: text-glow 2s ease-in-out infinite;
        }
        
        .loader-progress-bar {
          animation: progress-bounce 1.2s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-fast {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        
        @keyframes orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse-particle {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.3); opacity: 1; }
        }
        
        @keyframes morph-scale {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.1) rotate(180deg); }
        }
        
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.3); }
        }
        
        @keyframes spin-wobble {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(90deg) scale(1.05); }
          50% { transform: rotate(180deg); }
          75% { transform: rotate(270deg) scale(0.95); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes pulse-center {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.8; }
        }
        
        @keyframes wave-expand {
          0% { transform: scale(0.5); opacity: 0.8; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        
        @keyframes text-glow {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.2); }
        }
        
        @keyframes progress-bounce {
          0%, 100% { transform: scaleY(0.4); opacity: 0.6; }
          50% { transform: scaleY(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Loader;