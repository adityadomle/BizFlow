import { useState } from 'react'
import { HiArrowRight } from 'react-icons/hi'

const NewsletterSection = () => {
  const [email, setEmail] = useState('')
  const [showPopup, setShowPopup] = useState(false)
  const [error, setError] = useState('')
  const [registeredEmails, setRegisteredEmails] = useState([]) // store registered emails

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!email.trim()) {
      setError('Please enter your email address.')
      return
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address (e.g. user@gmail.com).')
      return
    }

    // Check if email already exists
    if (registeredEmails.includes(email.toLowerCase())) {
      setError('⚠ This email is already registered.')
      return
    }

    // If new email, add it
    setRegisteredEmails([...registeredEmails, email.toLowerCase()])
    setError('')
    console.log('Email submitted:', email)

    setShowPopup(true)
    setEmail('')

    setTimeout(() => setShowPopup(false), 3000)
  }

  return (
    <section id="newsletter" className="section-container px-4 md:px-0">
      <div className="bg-blue-600 rounded-2xl overflow-hidden">
        <div className="relative md:px-16 px-6 py-16 md:py-24">
          {/* Background Gradient */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-700 clip-path-slant hidden md:block"></div>

          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12">
            {/* Left Content */}
            <div className="text-white max-w-lg text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium mb-4">
                Subscribe newsletter
              </h2>
              <p className="text-blue-100 text-sm sm:text-base">
                Best cooks and best delivery guys all at your service. Hot tasty food
              </p>
            </div>

            {/* Email Form */}
            <div className="w-full md:w-auto">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-4 sm:gap-0 relative"
              >
                <input
                  type="email"
                  aria-label="Email address"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full sm:w-auto md:w-80 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-l-xl sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-500 transition-all duration-300"
                  style={{ backgroundColor: 'white', color: '#333' }}
                />

                <button
                  type="submit"
                  className="w-full sm:w-auto cursor-pointer bg-emerald-400 text-white transition-all duration-300 ease-in-out px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-l-none sm:rounded-r-xl hover:bg-emerald-300 hover:scale-105 hover:shadow-[0_0_15px_#a7f3d0] flex items-center justify-center sm:justify-start gap-2 group"
                >
                  <span>Discover</span>
                  <HiArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                {/* Error Message */}
                {error && (
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg transition-opacity duration-300 ${
                      error ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    {error}
                  </div>
                )}

                {/* Success Message */}
                {showPopup && !error && (
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg transition-opacity duration-300 ${
                      showPopup ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    ✅ Thank you for Subscribing!
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          .clip-path-slant {
            clip-path: polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%);
          }
        `}
      </style>
    </section>
  )
}

export default NewsletterSection