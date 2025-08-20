import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import { useTheme } from "../context/ThemeContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const QuickChat = () => {
  const { isDarkMode } = useTheme();
  const [messages, setMessages] = useState([
    { 
      from: "bot", 
      text: "Hello! Welcome to BizFlow support. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  
  // Updated refs for better scroll control
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  // Enhanced scroll to bottom function
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  // Updated useEffect to prevent page scroll
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Prevent input focus from scrolling page
  const handleInputFocus = (e) => {
    // Use preventScroll to avoid page jumping
    setTimeout(() => {
      e.target.focus({ preventScroll: true });
    }, 10);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = {
      from: "user",
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsTyping(true);
    setError(null);

    try {
      const conversationMessages = messages
        .slice(-5)
        .map(msg => ({
          role: msg.from === "user" ? "user" : "assistant",
          content: msg.text
        }));
      
      conversationMessages.push({
        role: "user",
        content: currentInput
      });

      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: conversationMessages
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get response');
      }

      const data = await response.json();
      
      const botMessage = {
        from: "bot",
        text: data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);

    } catch (err) {
      console.error('Chat error:', err);
      setError(err.message);
      
      const errorMessage = {
        from: "bot",
        text: "Sorry, I'm experiencing technical difficulties. Please try again in a moment.",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDarkMode ? "bg-gray-900" : "bg-white"
    }`}>
      <Navbar />
      
      {/* Hero Section */}
      <motion.section 
        initial="hidden"
        animate="show"
        className={`py-20 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}
      >
        <div className="section-container">
          <motion.div 
            variants={textVariant()}
            className="text-center mb-12"
          >
            <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}>
              BizFlow Support Chat
            </h1>
            <p className={`text-lg md:text-xl ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}>
              Get instant help with your workflow dashboard
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Chat Section */}
      <motion.section 
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        animate="show"
        className="py-16"
      >
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              variants={fadeIn("up", 0.3)}
              className={`rounded-2xl shadow-2xl overflow-hidden ${
                isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
              }`}
            >
              {/* Chat Header */}
              <div className={`p-6 border-b ${
                isDarkMode ? "border-gray-700 bg-gray-750" : "border-gray-200 bg-gray-50"
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <h3 className={`font-semibold ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}>
                      BizFlow Assistant
                    </h3>
                    <span className={`text-sm ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}>
                      Online
                    </span>
                  </div>
                  
                  {error && (
                    <div className="text-red-500 text-sm">
                      Connection issue
                    </div>
                  )}
                </div>
              </div>

              {/* Messages Container - Fixed Height with Internal Scroll */}
              <div 
                ref={chatContainerRef}
                className={`h-96 md:h-[500px] overflow-y-auto p-6 space-y-4 scroll-smooth ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                }`}
                style={{ 
                  scrollBehavior: 'smooth',
                  overscrollBehavior: 'contain' // Prevent parent scroll
                }}
              >
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.from === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-xs md:max-w-md px-4 py-3 rounded-2xl ${
                      message.from === "user"
                        ? "bg-blue-600 text-white rounded-br-sm"
                        : isDarkMode
                          ? "bg-gray-700 text-gray-100 rounded-bl-sm"
                          : "bg-gray-100 text-gray-900 rounded-bl-sm"
                    }`}>
                      <p className="text-sm md:text-base whitespace-pre-wrap">{message.text}</p>
                      <p className={`text-xs mt-1 opacity-70 ${
                        message.from === "user" ? "text-blue-100" : isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </motion.div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className={`px-4 py-3 rounded-2xl rounded-bl-sm ${
                      isDarkMode ? "bg-gray-700" : "bg-gray-100"
                    }`}>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Form */}
              <div className={`p-6 border-t ${
                isDarkMode ? "border-gray-700 bg-gray-750" : "border-gray-200 bg-gray-50"
              }`}>
                <form onSubmit={handleSend} className="flex gap-3">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onFocus={handleInputFocus}
                    placeholder="Ask about BizFlow features, workflow tips, or anything else..."
                    className={`flex-1 px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                      isDarkMode 
                        ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400" 
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                    }`}
                    disabled={isTyping}
                    maxLength={500}
                    style={{ transformOrigin: 'center' }} // Prevents zoom on mobile
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={!input.trim() || isTyping}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {isTyping ? 'Sending...' : 'Send'}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default QuickChat;
