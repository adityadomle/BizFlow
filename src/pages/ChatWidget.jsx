import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-8 right-8">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg shadow-lg p-4 w-80 mb-4"
        >
          <h3 className="text-lg font-semibold mb-2">Quick Chat</h3>
          <p className="text-sm text-gray-600">
            Start a conversation with our support team. We are here to help!
          </p>
          {/* Add your chat interface here */}
        </motion.div>
      )}
      <button
        className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-blue-700 focus:outline-none"
        onClick={toggleChat}
      >
        Chat
      </button>
    </div>
  );
};

export default ChatWidget;

