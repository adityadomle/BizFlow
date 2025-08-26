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

      // Log the submission details for testing
      // console.log(`
      //   📧 Contact Form Submission:
      //   ===========================
      //   Name: ${formData.name}
      //   Email: ${formData.email}
      //   Subject: ${formData.subject}
      //   Message: ${formData.message}
      //   Timestamp: ${new Date().toLocaleString()}
      //   ===========================
      // `);
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
    },
    {
      icon: FiPhone,
      title: "Phone",
      details: "+1 (555) 123-4567",
      link: "tel:+15551234567",
      description: "Mon-Fri from 8am to 5pm",
    },
    {
      icon: FiMapPin,
      title: "Office",
      details: "Delhi, India",
      link: "https://maps.google.com",
      description: "Come say hello at our HQ",
    },
  ];


 const socialLinks = [
  { icon: FiLinkedin, link: "https://linkedin.com/company/bizflow", label: "LinkedIn", hover: "hover:bg-blue-700 hover:text-white" },
  { icon: FiTwitter, link: "https://twitter.com/bizflow", label: "Twitter", hover: "hover:bg-sky-500 hover:text-white" },
  { icon: FiFacebook, link: "https://facebook.com/bizflow", label: "Facebook", hover: "hover:bg-blue-600 hover:text-white" },
  { icon: FiGithub, link: "https://github.com/bizflow", label: "GitHub", hover: "hover:bg-neutral-900 hover:text-white" },
];


  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <motion.section
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="section-container text-center"
      >
        <motion.div variants={textVariant(0.3)} className="max-w-3xl mx-auto">
          <div
            className={`flex items-center justify-center gap-2 w-fit px-4 py-2 rounded-full mx-auto mb-6 ${
              isDarkMode ? "bg-slate-800" : "bg-blue-50"
            }`}
          >
            <span className={isDarkMode ? "text-white" : "text-blue-600"}>💬</span>
            <span className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-blue-700"}`}>
              Get In Touch
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Let&apos;s start a{" "}
            <span className="text-blue-600 relative inline-block">
              conversation
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-200/60"></span>
            </span>
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have a project in mind? Want to partner with us? Or just want to say
            hello? We&apos;d love to hear from you. Drop us a line and we&apos;ll get back
            to you as soon as possible.
          </p>
        </motion.div>
      </motion.section>

      {/* Contact Info Cards */}
      <motion.section
        variants={fadeIn("up", 0.4)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="section-container"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contactInfo.map((info, index) => {
            const IconComponent = info.icon;
            return (
              <motion.a
                key={index}
                href={info.link}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeIn("up", 0.5 + index * 0.1)}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 group"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                  <IconComponent className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{info.title}</h3>
                <p className="text-blue-600 font-medium mb-2">{info.details}</p>
                <p className="text-gray-600 text-sm">{info.description}</p>
              </motion.a>
            );
          })}
        </div>
      </motion.section>

      {/* Contact Form */}
      <motion.section
        variants={fadeIn("up", 0.6)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="section-container"
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              variants={fadeIn("right", 0.7)}
              className={`p-8 rounded-2xl shadow-lg ${
                isDarkMode ? "bg-slate-800 border border-slate-700" : "bg-white"
              }`}
            >
              <h2
                className={`text-2xl font-bold mb-6 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Send us a message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        isDarkMode ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      <FiUser
                        className={`inline w-4 h-4 mr-2 ${
                          isDarkMode ? "text-blue-400" : "text-gray-700"
                        }`}
                      />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        errors.name
                          ? "border-red-500"
                          : isDarkMode
                          ? "border-slate-600"
                          : "border-gray-300"
                      } ${
                        isDarkMode
                          ? "bg-slate-700 text-white placeholder-gray-300"
                          : "bg-white text-gray-800 placeholder-gray-500"
                      }`}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        isDarkMode ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      <FiMail
                        className={`inline w-4 h-4 mr-2 ${
                          isDarkMode ? "text-blue-400" : "text-gray-700"
                        }`}
                      />
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        errors.email
                          ? "border-red-500"
                          : isDarkMode
                          ? "border-slate-600"
                          : "border-gray-300"
                      } ${
                        isDarkMode
                          ? "bg-slate-700 text-white placeholder-gray-300"
                          : "bg-white text-gray-800 placeholder-gray-500"
                      }`}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    <FiMessageSquare
                      className={`inline w-4 h-4 mr-2 ${
                        isDarkMode ? "text-blue-400" : "text-gray-700"
                      }`}
                    />
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.subject
                        ? "border-red-500"
                        : isDarkMode
                        ? "border-slate-600"
                        : "border-gray-300"
                    } ${
                      isDarkMode
                        ? "bg-slate-700 text-white placeholder-gray-300"
                        : "bg-white text-gray-800 placeholder-gray-500"
                    }`}
                    placeholder="How can we help you?"
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    <FiMessageSquare
                      className={`inline w-4 h-4 mr-2 ${
                        isDarkMode ? "text-blue-400" : "text-gray-700"
                      }`}
                    />
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none ${
                      errors.message
                        ? "border-red-500"
                        : isDarkMode
                        ? "border-slate-600"
                        : "border-gray-300"
                    } ${
                      isDarkMode
                        ? "bg-slate-700 text-white placeholder-gray-300"
                        : "bg-white text-gray-800 placeholder-gray-500"
                    }`}
                    placeholder="Tell us about your project or inquiry..."
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiSend className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>

                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-100 border border-green-200 rounded-lg text-green-700"
                  >
                    ✅ Message sent successfully! We&apos;ll get back to you soon.
                  </motion.div>
                )}

                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-100 border border-red-200 rounded-lg text-red-700"
                  >
                    ❌ Failed to send message. Please try again.
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* Info Sidebar */}
            <motion.div variants={fadeIn("left", 0.8)} className="space-y-8">
              <div
                className={`p-8 rounded-2xl ${
                  isDarkMode
                    ? "bg-slate-800 border border-slate-700"
                    : "bg-gradient-to-br from-blue-50 to-indigo-100"
                }`}
              >
                <h3
                  className={`text-xl font-semibold mb-4 ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  Why choose BizFlow?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <div>
                      <p
                        className={`font-medium ${
                          isDarkMode ? "text-white" : "text-gray-800"
                        }`}
                      >
                        Expert Team
                      </p>
                      <p
                        className={`text-sm ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        Experienced professionals ready to help
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <div>
                      <p
                        className={`font-medium ${
                          isDarkMode ? "text-white" : "text-gray-800"
                        }`}
                      >
                        Fast Response
                      </p>
                      <p
                        className={`text-sm ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        We respond within 24 hours
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <div>
                      <p
                        className={`font-medium ${
                          isDarkMode ? "text-white" : "text-gray-800"
                        }`}
                      >
                        Custom Solutions
                      </p>
                      <p
                        className={`text-sm ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        Tailored to your specific needs
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <FiClock className="w-5 h-5 text-blue-600" />
                  Business Hours
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="font-medium">8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-medium">9:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  * All times are in Indian Standard Time (IST)
                </p>
              </div>
                
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <motion.a
                        key={index}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -2 }}
                        className={`w-10 h-10 rounded-full flex items-center justify-center shadow-full border transition-colors 
                          ${isDarkMode 
                          ? `bg-gray-800 text-gray-300 border-gray-600 ${social.hover}` 
                          : `bg-gray-200 text-gray-700 border-gray-300 ${social.hover}`
                        }`}

                        aria-label={social.label}
                      >
                        <IconComponent className="w-5 h-5" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Contact;
