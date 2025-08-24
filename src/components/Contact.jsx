import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, textVariant } from '../utils/motion';
import { useTheme } from '../context/ThemeContext';
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiSend, 
  FiUser, 
  FiMessageSquare, 
  FiClock, 
  FiLinkedin, 
  FiFacebook, 
  FiGithub 
} from 'react-icons/fi';
import { FaXTwitter } from 'react-icons/fa6';
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
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Please enter a valid email address";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    else if (formData.message.trim().length < 10) newErrors.message = "Message should be at least 10 characters long";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      trackButtonClick("Contact Form Submit");
      console.log("Contact form submitted:", formData);
      await new Promise(resolve => setTimeout(resolve, 1500));
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
    { icon: FiMail, title: "Email", details: "hello@bizflow.com", link: "mailto:hello@bizflow.com", description: "Send us an email anytime!" },
    { icon: FiPhone, title: "Phone", details: "+1 (555) 123-4567", link: "tel:+15551234567", description: "Mon-Fri from 8am to 5pm" },
    { icon: FiMapPin, title: "Office", details: "Delhi, India", link: "https://maps.google.com", description: "Come say hello at our HQ" },
  ];

  const socialLinks = [
    { icon: FiLinkedin, link: "https://linkedin.com/company/bizflow", label: "LinkedIn", hover: "hover:bg-blue-700 hover:text-white" },
    { icon: FaXTwitter, link: "https://twitter.com/bizflow", label: "X", hover: "hover:bg-sky-500 hover:text-white" },
    { icon: FiFacebook, link: "https://facebook.com/bizflow", label: "Facebook", hover: "hover:bg-blue-600 hover:text-white" },
    { icon: FiGithub, link: "https://github.com/bizflow", label: "GitHub", hover: "hover:bg-neutral-900 hover:text-white" },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      {/* ... keep your existing motion sections and form JSX ... */}
      {/* Contact Info Cards, Contact Form, Sidebar with social links */}
    </div>
  );
};

export default Contact;
