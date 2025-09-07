import { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import { useTheme } from "../context/ThemeContext";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiUser,
  FiMessageSquare,
  FiClock,
  FiLinkedin,
  FiTwitter,
  FiGithub,
  FiFacebook,
  FiArrowRight,
  FiStar,
} from "react-icons/fi";
import { trackButtonClick } from "../utils/analytics";

const Contact = () => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message should be at least 10 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Track form submission
      trackButtonClick("Contact Form Submit");

      console.log("Contact form submitted:", formData);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simulate successful submission
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setErrors({});
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(""), 5000);
    }
  };

  const contactInfo = [
    {
      icon: FiMail,
      title: "Email",
      details: "hello@bizflow.com",
      link: "mailto:hello@bizflow.com",
      description: "Send us an email anytime!",
      gradient: "from-purple-500 to-pink-500",
      color: "purple"
    },
    {
      icon: FiPhone,
      title: "Phone",
      details: "+1 (555) 123-4567",
      link: "tel:+15551234567",
      description: "Mon-Fri from 8am to 5pm",
      gradient: "from-blue-500 to-cyan-500",
      color: "blue"
    },
    {
      icon: FiMapPin,
      title: "Office",
      details: "Delhi, India",
      link: "https://maps.google.com",
      description: "Come say hello at our HQ",
      gradient: "from-green-500 to-emerald-500",
      color: "green"
    },
  ];

  const socialLinks = [
    { icon: FiLinkedin, link: 'https://www.linkedin.com/in/adityadomle', label: 'LinkedIn' },
    { icon: FiTwitter, link: 'https://x.com/domle_aditya?t=H6VQcFZZd5-RnvHv4FniEw&s=09', label: 'Twitter' },
    {icon:FiFacebook,label:'facebook'},
    { icon: FiGithub, link: 'https://github.com/adityadomle', label: 'GitHub' }

  ];

  return (
    <div className={`min-h-screen pt-20 relative overflow-hidden ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'}`}>
      {/* Enhanced Animated Background Elements for Glassmorphism */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 left-10 w-72 h-72 ${isDarkMode ? 'bg-blue-500/20' : 'bg-blue-400/30'} rounded-full blur-3xl animate-pulse`}></div>
        <div className={`absolute bottom-20 right-10 w-96 h-96 ${isDarkMode ? 'bg-purple-500/20' : 'bg-purple-400/30'} rounded-full blur-3xl animate-pulse delay-1000`}></div>
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 ${isDarkMode ? 'bg-cyan-500/15' : 'bg-cyan-400/25'} rounded-full blur-3xl animate-pulse delay-500`}></div>
        <div className={`absolute top-10 right-1/3 w-60 h-60 ${isDarkMode ? 'bg-pink-500/15' : 'bg-pink-400/25'} rounded-full blur-3xl animate-pulse delay-2000`}></div>
        <div className={`absolute bottom-1/3 left-1/4 w-48 h-48 ${isDarkMode ? 'bg-yellow-500/15' : 'bg-yellow-400/25'} rounded-full blur-3xl animate-pulse delay-1500`}></div>
      </div>

      {/* Hero Section with Glassmorphism */}
      <motion.section
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="section-container text-center relative z-10"
      >
        <motion.div variants={textVariant(0.3)} className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`inline-flex items-center gap-3 px-6 py-3 rounded-full mx-auto mb-8 backdrop-blur-md border ${
              isDarkMode 
                ? "bg-white/10 border-white/20 text-white shadow-2xl" 
                : "bg-white/60 border-white/80 text-gray-700 shadow-2xl"
            }`}
            style={{
              background: isDarkMode 
                ? 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
                : 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 100%)'
            }}
          >
            <motion.span 
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-2xl"
            >
              💬
            </motion.span>
            <span className="text-sm font-semibold tracking-wide uppercase">Get In Touch</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
          >
            Let's start a{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                conversation
              </span>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="absolute bottom-2 left-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-full"
              />
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`text-xl leading-relaxed max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
          >
            Have a project in mind? Want to partner with us? Or just want to say
            hello? We'd love to hear from you. Drop us a line and we'll get back
            to you as soon as possible.
          </motion.p>
        </motion.div>
      </motion.section>

      {/* Contact Info Cards with Enhanced Glassmorphism */}
      <motion.section
        variants={fadeIn("up", 0.4)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="section-container relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {contactInfo.map((info, index) => {
            const IconComponent = info.icon;
            return (
              <motion.a
                key={index}
                href={info.link}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeIn("up", 0.5 + index * 0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.03, 
                  y: -8,
                  boxShadow: isDarkMode ? "0 25px 50px rgba(0,0,0,0.4)" : "0 25px 50px rgba(0,0,0,0.2)"
                }}
                className={`group relative p-8 rounded-3xl transition-all duration-500 border backdrop-blur-lg ${
                  isDarkMode 
                    ? "bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/30" 
                    : "bg-white/40 border-white/60 hover:bg-white/60 hover:border-white/80 shadow-xl hover:shadow-2xl"
                }`}
                style={{
                  background: isDarkMode 
                    ? 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)'
                    : 'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 100%)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                }}
              >
                {/* Glassmorphism inner glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-16 h-16 bg-gradient-to-r ${info.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-2xl backdrop-blur-sm`}
                    style={{ backdropFilter: 'blur(10px)' }}
                  >
                    <IconComponent className="w-7 h-7 text-white drop-shadow-lg" />
                  </motion.div>
                  
                  <h3 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'} drop-shadow-sm`}>
                    {info.title}
                  </h3>
                  
                  <p className={`bg-gradient-to-r ${info.gradient} bg-clip-text text-transparent font-semibold text-lg mb-3 drop-shadow-sm`}>
                    {info.details}
                  </p>
                  
                  <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {info.description}
                  </p>
                  
                  <motion.div
                    className="flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    initial={{ x: -10 }}
                    whileHover={{ x: 0 }}
                  >
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                      Get in touch
                    </span>
                    <FiArrowRight className={`w-4 h-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`} />
                  </motion.div>
                </div>
                
                {/* Enhanced glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${info.gradient} opacity-0 group-hover:opacity-20 rounded-3xl transition-all duration-500 blur-xl`}></div>
              </motion.a>
            );
          })}
        </div>
      </motion.section>

      {/* Contact Form Section with Glassmorphism */}
      <motion.section
        variants={fadeIn("up", 0.6)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="section-container relative z-10"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form - Takes 2 columns with Enhanced Glassmorphism */}
            <motion.div
              id= "contact-info"
              variants={fadeIn("right", 0.7)}
              className={`lg:col-span-2 p-10 rounded-3xl backdrop-blur-xl border transition-all duration-500 ${
                isDarkMode 
                  ? "bg-white/5 border-white/20 shadow-2xl" 
                  : "bg-white/50 border-white/70 shadow-2xl"
              }`}
              style={{
                background: isDarkMode 
                  ? 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)'
                  : 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 100%)',
                backdropFilter: 'blur(25px)',
                WebkitBackdropFilter: 'blur(25px)',
              }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-xl">
                  <FiSend className="w-6 h-6 text-white drop-shadow-lg" />
                </div>
                <h2 className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"} drop-shadow-sm`}>
                  Send us a message
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className="space-y-2"
                  >
                    <label className={`flex items-center gap-2 text-sm font-semibold ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>
                      <FiUser className={`w-4 h-4 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-5 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 backdrop-blur-lg ${
                        errors.name
                          ? "border-red-500"
                          : isDarkMode
                          ? "border-white/20 focus:border-blue-400"
                          : "border-white/60 focus:border-blue-500"
                      } ${
                        isDarkMode
                          ? "bg-white/5 text-white placeholder-gray-400"
                          : "bg-white/40 text-gray-900 placeholder-gray-600"
                      }`}
                      style={{
                        background: isDarkMode 
                          ? 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)'
                          : 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.3) 100%)',
                        backdropFilter: 'blur(15px)',
                        WebkitBackdropFilter: 'blur(15px)',
                      }}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm flex items-center gap-1"
                      >
                        <span className="w-4 h-4 text-red-500">⚠</span>
                        {errors.name}
                      </motion.p>
                    )}
                  </motion.div>

                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className="space-y-2"
                  >
                    <label className={`flex items-center gap-2 text-sm font-semibold ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>
                      <FiMail className={`w-4 h-4 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-5 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 backdrop-blur-lg ${
                        errors.email
                          ? "border-red-500"
                          : isDarkMode
                          ? "border-white/20 focus:border-blue-400"
                          : "border-white/60 focus:border-blue-500"
                      } ${
                        isDarkMode
                          ? "bg-white/5 text-white placeholder-gray-400"
                          : "bg-white/40 text-gray-900 placeholder-gray-600"
                      }`}
                      style={{
                        background: isDarkMode 
                          ? 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)'
                          : 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.3) 100%)',
                        backdropFilter: 'blur(15px)',
                        WebkitBackdropFilter: 'blur(15px)',
                      }}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm flex items-center gap-1"
                      >
                        <span className="w-4 h-4 text-red-500">⚠</span>
                        {errors.email}
                      </motion.p>
                    )}
                  </motion.div>
                </div>

                <motion.div
                  whileFocus={{ scale: 1.01 }}
                  className="space-y-2"
                >
                  <label className={`flex items-center gap-2 text-sm font-semibold ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>
                    <FiMessageSquare className={`w-4 h-4 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-5 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 backdrop-blur-lg ${
                      errors.subject
                        ? "border-red-500"
                        : isDarkMode
                        ? "border-white/20 focus:border-blue-400"
                        : "border-white/60 focus:border-blue-500"
                    } ${
                      isDarkMode
                        ? "bg-white/5 text-white placeholder-gray-400"
                        : "bg-white/40 text-gray-900 placeholder-gray-600"
                    }`}
                    style={{
                      background: isDarkMode 
                        ? 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)'
                        : 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.3) 100%)',
                      backdropFilter: 'blur(15px)',
                      WebkitBackdropFilter: 'blur(15px)',
                    }}
                    placeholder="How can we help you?"
                  />
                  {errors.subject && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm flex items-center gap-1"
                    >
                      <span className="w-4 h-4 text-red-500">⚠</span>
                      {errors.subject}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div
                  whileFocus={{ scale: 1.01 }}
                  className="space-y-2"
                >
                  <label className={`flex items-center gap-2 text-sm font-semibold ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>
                    <FiMessageSquare className={`w-4 h-4 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className={`w-full px-5 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 resize-none backdrop-blur-lg ${
                      errors.message
                        ? "border-red-500"
                        : isDarkMode
                        ? "border-white/20 focus:border-blue-400"
                        : "border-white/60 focus:border-blue-500"
                    } ${
                      isDarkMode
                        ? "bg-white/5 text-white placeholder-gray-400"
                        : "bg-white/40 text-gray-900 placeholder-gray-600"
                    }`}
                    style={{
                      background: isDarkMode 
                        ? 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)'
                        : 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.3) 100%)',
                      backdropFilter: 'blur(15px)',
                      WebkitBackdropFilter: 'blur(15px)',
                    }}
                    placeholder="Tell us about your project or inquiry..."
                  />
                  {errors.message && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm flex items-center gap-1"
                    >
                      <span className="w-4 h-4 text-red-500">⚠</span>
                      {errors.message}
                    </motion.p>
                  )}
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-5 rounded-2xl font-semibold text-lg shadow-2xl transition-all duration-300 overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
                  style={{ backdropFilter: 'blur(10px)' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center gap-3">
                    {isSubmitting ? (
                      <>
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending your message...
                      </>
                    ) : (
                      <>
                        <FiSend className="w-5 h-5 drop-shadow-lg" />
                        Send Message
                      </>
                    )}
                  </div>
                </motion.button>

                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="p-6 backdrop-blur-lg border-2 border-green-300/60 rounded-2xl shadow-xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(34, 197, 94, 0.05) 100%)',
                      backdropFilter: 'blur(20px)',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white text-lg drop-shadow-sm">✓</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-800">Message sent successfully!</h4>
                        <p className="text-green-600 text-sm">We'll get back to you within 24 hours.</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="p-6 backdrop-blur-lg border-2 border-red-300/60 rounded-2xl shadow-xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(239, 68, 68, 0.05) 100%)',
                      backdropFilter: 'blur(20px)',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white text-lg drop-shadow-sm">⚠</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-red-800">Failed to send message</h4>
                        <p className="text-red-600 text-sm">Please try again or contact us directly.</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* Info Sidebar with Glassmorphism */}
            <motion.div 
              variants={fadeIn("left", 0.8)} 
              className="space-y-8"
            >
              {/* Why Choose BizFlow with Enhanced Glassmorphism */}
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className={`p-8 rounded-3xl backdrop-blur-xl border transition-all duration-500 ${
                  isDarkMode
                    ? "bg-white/5 border-white/20 shadow-2xl"
                    : "bg-white/40 border-white/60 shadow-xl"
                }`}
                style={{
                  background: isDarkMode 
                    ? 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)'
                    : 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(147, 51, 234, 0.1) 100%)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg backdrop-blur-sm">
                    <FiStar className="w-5 h-5 text-white drop-shadow-lg" />
                  </div>
                  <h3 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"} drop-shadow-sm`}>
                    Why choose BizFlow?
                  </h3>
                </div>
                
                <div className="space-y-4">
                  {[
                    { title: "Expert Team", desc: "Experienced professionals ready to help", icon: "🎯" },
                    { title: "Fast Response", desc: "We respond within 24 hours", icon: "⚡" },
                    { title: "Custom Solutions", desc: "Tailored to your specific needs", icon: "🎨" }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      className={`flex items-start gap-4 group p-4 rounded-2xl transition-all duration-300 ${
                        isDarkMode 
                          ? "hover:bg-white/5" 
                          : "hover:bg-white/30"
                      }`}
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg backdrop-blur-sm">
                        <span className="text-white text-sm drop-shadow-sm">{item.icon}</span>
                      </div>
                      <div>
                        <p className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                          {item.title}
                        </p>
                        <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Business Hours with Enhanced Glassmorphism */}
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className={`p-8 rounded-3xl backdrop-blur-xl border transition-all duration-500 ${
                  isDarkMode 
                    ? "bg-white/5 border-white/20 shadow-2xl" 
                    : "bg-white/40 border-white/60 shadow-xl"
                }`}
                style={{
                  background: isDarkMode 
                    ? 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)'
                    : 'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.4) 100%)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg backdrop-blur-sm">
                    <FiClock className="w-5 h-5 text-white drop-shadow-lg" />
                  </div>
                  <h3 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"} drop-shadow-sm`}>
                    Business Hours
                  </h3>
                </div>
                
                <div className="space-y-3">
                  {[
                    { day: "Monday - Friday", time: "8:00 AM - 6:00 PM" },
                    { day: "Saturday", time: "9:00 AM - 4:00 PM" },
                    { day: "Sunday", time: "Closed" }
                  ].map((schedule, index) => (
                    <motion.div 
                      key={index} 
                      whileHover={{ scale: 1.02, x: 5 }}
                      className={`flex justify-between items-center py-3 px-4 rounded-xl border-b transition-all duration-300 ${
                        isDarkMode 
                          ? "border-white/10 hover:bg-white/5" 
                          : "border-gray-200/30 hover:bg-white/30"
                      } last:border-b-0`}
                    >
                      <span className={isDarkMode ? "text-gray-300" : "text-gray-600"}>{schedule.day}</span>
                      <span className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}>{schedule.time}</span>
                    </motion.div>
                  ))}
                </div>
                
                <p className={`text-xs mt-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                  * All times are in Indian Standard Time (IST)
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Floating CTA Section with Enhanced Glassmorphism */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="section-container py-20 relative z-10"
      >
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          className={`relative overflow-hidden rounded-3xl p-12 text-center backdrop-blur-2xl border transition-all duration-500 ${
            isDarkMode
              ? "bg-white/5 border-white/20 shadow-2xl"
              : "bg-white/30 border-white/60 shadow-2xl"
          }`}
          style={{
            background: isDarkMode 
              ? 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)'
              : 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(59, 130, 246, 0.1) 100%)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
          }}
        >
          {/* Enhanced Background Pattern with Glassmorphism */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-3xl"></div>
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>
          
          {/* Floating orbs for enhanced glassmorphism effect */}
          <div className="absolute top-6 left-6 w-4 h-4 bg-blue-400/30 rounded-full blur-sm animate-pulse"></div>
          <div className="absolute top-12 right-8 w-6 h-6 bg-purple-400/30 rounded-full blur-sm animate-pulse delay-1000"></div>
          <div className="absolute bottom-8 left-12 w-5 h-5 bg-cyan-400/30 rounded-full blur-sm animate-pulse delay-500"></div>
          
          <div className="relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"} drop-shadow-lg`}
            >
              Ready to start your project?
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`text-lg mb-8 max-w-2xl mx-auto ${isDarkMode ? "text-gray-300" : "text-gray-600"} drop-shadow-sm`}
            >
              Join hundreds of satisfied clients who have transformed their business with BizFlow. 
              Let's discuss how we can help you achieve your goals.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.a
                href="mailto:hello@bizflow.com"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-2 backdrop-blur-sm"
                style={{ backdropFilter: 'blur(10px)' }}
              >
                <FiMail className="w-5 h-5 drop-shadow-sm" />
                Start a Conversation
              </motion.a>
              
              <motion.a
                href="tel:+15551234567"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-4 rounded-2xl font-semibold border-2 transition-all duration-300 flex items-center gap-2 backdrop-blur-lg shadow-xl ${
                  isDarkMode
                    ? "border-white/30 text-white hover:bg-white/10 hover:border-white/50"
                    : "border-white/60 text-gray-700 hover:bg-white/50 hover:border-white/80"
                }`}
                style={{
                  background: isDarkMode 
                    ? 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)'
                    : 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.3) 100%)',
                  backdropFilter: 'blur(15px)',
                  WebkitBackdropFilter: 'blur(15px)',
                }}
              >
                <FiPhone className="w-5 h-5" />
                Call Us Now
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default Contact;