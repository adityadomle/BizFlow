import React, { useState, useRef, useEffect } from 'react';

const QuickChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const handleSend = (e) => {
        e.preventDefault();
        if (input.trim()) {
            setMessages([...messages, { id: Date.now(), text: input }]);
            setInput('');
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="min-h-screen flex flex-col p-4 bg-gray-50 dark:bg-gray-900">
            <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">
                Quick Chat
            </h1>
            <div className="flex-1 overflow-y-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                {messages.map((message) => (
                    <div key={message.id} className="mb-2 p-2 bg-blue-100 dark:bg-blue-700 rounded">
                        <p className="text-gray-800 dark:text-gray-100">{message.text}</p>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSend} className="mt-4 flex">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 p-2 border border-gray-300 dark:border-gray-700 rounded-l-lg focus:outline-none"
                    placeholder="Type your message..."
                />
                <button
                    type="submit"
                    className="p-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default QuickChatPage;