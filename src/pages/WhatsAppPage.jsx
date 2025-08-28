import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Phone, MessageSquare } from 'lucide-react';

const WhatsAppPage = () => {
    const { isDarkMode } = useTheme();
    const whatsappNumber = "1234567890"; // Replace with your number without special characters
    const prefilledMessage = "Hello, I need some assistance.";

    const openWhatsAppChat = () => {
        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(prefilledMessage)}`;
        window.open(url, '_blank');
    };

    return (
        <div className={`min-h-screen flex flex-col items-center justify-center p-6 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
            <h1 className="text-4xl font-bold mb-4 flex items-center gap-2">
                <MessageSquare className="w-8 h-8" /> Chat with Us on WhatsApp
            </h1>
            <p className="mb-8 text-lg text-center max-w-xl">
                Click the button below to start a conversation on WhatsApp. Our support team is available to assist you with any questions or concerns.
            </p>
            <button
                onClick={openWhatsAppChat}
                className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
                <Phone className="w-6 h-6" />
                Start Chat
            </button>
        </div>
    );
};

export default WhatsAppPage;