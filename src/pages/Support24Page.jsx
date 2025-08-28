import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const Support24Page = () => {
    const { isDarkMode } = useTheme();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic (e.g., API call)
        console.log('Submitted data:', formData);
        setSubmitted(true);
    };

    return (
        <div className={`min-h-screen py-16 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8">24/7 Support</h1>
                <div className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
                    <p className="mb-2">Phone: <a href="tel:+1234567890" className="underline">+1 (234) 567-890</a></p>
                    <p className="mb-2">Email: <a href="mailto:support@example.com" className="underline">support@example.com</a></p>
                    <p className="mb-2">Live Chat: Available 24/7 via our website</p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>
                    {submitted ? (
                        <p className="text-green-500">Thank you for reaching out! We will get back to you shortly.</p>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block mb-2 font-medium">Name</label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block mb-2 font-medium">Email</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="message" className="block mb-2 font-medium">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="4"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                            >
                                Submit
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Support24Page;