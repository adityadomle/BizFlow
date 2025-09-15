import { useState, useEffect } from 'react'
import { ArrowRight, Mail, CheckCircle, AlertCircle, Sparkles, Zap } from 'lucide-react'
import { useTheme } from "../context/ThemeContext"

const NewsletterSection = () => {
  const { isDarkMode } = useTheme()
  const [email, setEmail] = useState('')
  const [showPopup, setShowPopup] = useState(false)
  const [error, setError] = useState('')
  const [registeredEmails, setRegisteredEmails] = useState([])
  const [isHovered, setIsHovered] = useState(false)
  const [particles, setParticles] = useState([])

  // Generate floating particles for background animation
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 4,
        duration: 3 + Math.random() * 2,
        size: 2 + Math.random() * 4
      }))
      setParticles(newParticles)
    }
    generateParticles()
  }, [])

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const handleSubmit = () => {
    if (!email.trim()) {
      setError('Please enter your email address.')
      return
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address (e.g. user@gmail.com).')
      return
    }

    if (registeredEmails.includes(email.toLowerCase())) {
      setError('⚠ This email is already registered.')
      return
    }

    setRegisteredEmails([...registeredEmails, email.toLowerCase()])
    setError('')
    console.log('Email submitted:', email)

    setShowPopup(true)
    setEmail('')

    setTimeout(() => setShowPopup(false), 4000)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <section id="newsletter" className={`relative py-20 px-4 md:px-8 overflow-hidden bg-transparent`}>
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Floating particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className={`absolute w-1 h-1 ${isDarkMode ? 'bg-white/30' : 'bg-gray-400/30'} rounded-full animate-pulse`}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
          />
        ))}
        
        {/* Geometric patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className={`absolute top-20 right-20 w-32 h-32 border ${isDarkMode ? 'border-white/20' : 'border-gray-400/20'} rotate-45 rounded-lg`}></div>
          <div className={`absolute bottom-32 left-16 w-24 h-24 border ${isDarkMode ? 'border-white/20' : 'border-gray-400/20'} rotate-12 rounded-full`}></div>
          <div className={`absolute top-1/2 right-32 w-16 h-16 border-2 ${isDarkMode ? 'border-white/20' : 'border-gray-400/20'} rotate-45`}></div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative max-w-6xl mx-auto">
        
        {/* Header Section - Separated */}
        <div className="text-center mb-16">
          {/* Icon and Badge */}
          <div className="flex items-center justify-center flex-col gap-6 mb-8">
            <div className="p-4 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl shadow-lg">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <div className="px-6 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-full backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <Sparkles className={`w-5 h-5 ${isDarkMode ? 'text-purple-300' : 'text-purple-400'}`} />
                <span className={`text-lg font-medium ${isDarkMode ? 'text-purple-200' : 'text-purple-600'}`}>Newsletter</span>
              </div>
            </div>
          </div>

          {/* Main Heading */}
          <h2 className={`text-4xl lg:text-6xl font-bold mb-8 bg-gradient-to-r ${isDarkMode ? 'from-white via-purple-200 to-pink-200' : 'from-gray-900 via-purple-600 to-pink-600'} bg-clip-text text-transparent leading-tight`}>
            Stay in the Loop
          </h2>
          
          {/* Subtitle */}
          <p className={`text-lg md:text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-10 leading-relaxed max-w-4xl mx-auto`}>
            Get exclusive updates, premium recipes, and be the first to know about our 
            <span className={`text-transparent bg-gradient-to-r ${isDarkMode ? 'from-purple-400 to-pink-400' : 'from-purple-600 to-pink-600'} bg-clip-text font-semibold`}> delicious offerings</span>
          </p>

          {/* Features list */}
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            {['🍕 Exclusive recipes', '⚡ Fast delivery', '🎯 Personalized offers'].map((feature, index) => (
              <div key={index} className={`flex items-center gap-2 px-6 py-3 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-gray-100/80 border-gray-200/50'} backdrop-blur-sm border rounded-full`}>
                <span className={`text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} font-medium`}>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Section - Separated and Centered */}
        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            <div className="relative">
              <div className="relative group">
                {/* Glowing border effect */}
                <div className="absolute -inset-1 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                
                {/* Email Form Container */}
                <div className={`relative ${isDarkMode ? 'bg-white/10 border-white/20' : 'bg-white/90 border-gray-200/50'} backdrop-blur-xl border rounded-2xl p-3 shadow-2xl`}>
                  <div className="flex flex-col sm:items-center sm:flex-row gap-3">
                    {/* Email Input Container */}
                    <div className="relative flex-1">
                      <div className="absolute left-6 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <Mail className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} opacity-60`} />
                      </div>
                      <input
                        type="email"
                        aria-label="Email address"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className={`w-full pl-14 pr-6 py-5 bg-transparent 
                          ${isDarkMode 
                            ? 'text-white placeholder:text-white/60' 
                            : 'text-gray-900 placeholder:text-gray-500'
                          } 
                          focus:outline-none 
                          text-lg
                          font-medium 
                          rounded-xl`}
                      />
                    </div>

                    {/* Subscribe Button */}
                    <button
                      type="button"
                      onClick={handleSubmit}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      className={`h-[60px] px-8 bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600
                        rounded-xl text-white text-lg font-semibold
                        flex items-center justify-center gap-3 whitespace-nowrap
                        transform transition-all duration-200 cursor-pointer 
                        ${isHovered ? 'scale-105 shadow-lg' : 'shadow-md'}
                        hover:shadow-purple-500/25`}
                    >
                      <Zap className="w-5 h-5" />
                      Subscribe Now
                      <ArrowRight className={`w-5 h-5 transition-transform duration-200 ${isHovered ? 'translate-x-1' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Error and Success Messages */}
              <div className="relative mt-6 min-h-[3rem]">
                {error && (
                  <div className="absolute inset-x-0 flex items-center justify-center gap-3 bg-red-500/90 backdrop-blur-sm text-white px-6 py-4 rounded-xl shadow-lg border border-red-400/50 animate-in slide-in-from-top-2 duration-300">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium text-base">{error}</span>
                  </div>
                )}

                {showPopup && !error && (
                  <div className="absolute inset-x-0 flex items-center justify-center gap-3 bg-emerald-500/90 backdrop-blur-sm text-white px-6 py-4 rounded-xl shadow-lg border border-emerald-400/50 animate-in slide-in-from-top-2 duration-300">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium text-base">🎉 Welcome to our community!</span>
                  </div>
                )}
              </div>

              {/* Trust Indicators */}
              <div className={`mt-8 flex items-center justify-center gap-8 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="font-medium">No spam, ever</span>
                </div>
                <div className={`w-px h-5 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-400'}`}></div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <span className="font-medium">Unsubscribe anytime</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewsletterSection