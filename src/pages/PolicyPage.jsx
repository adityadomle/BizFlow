import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Shield, CheckCircle, Gavel, BookOpen, Handshake, Lock } from 'lucide-react';

const fadeIn = (direction, delay) => ({
    hidden: {
        y: direction === 'up' ? 80 : direction === 'down' ? -80 : 0,
        opacity: 0,
        x: direction === 'left' ? 80 : direction === 'right' ? -80 : 0,
    },
    show: {
        y: 0,
        x: 0,
        opacity: 1,
        transition: {
            type: 'tween',
            duration: 1.2,
            delay: delay,
            ease: [0.25, 0.6, 0.3, 0.8],
        },
    },
});

const PolicyPage = () => {
    const { isDarkMode } = useTheme();

    const policySections = [
        {
            icon: <Shield className="w-6 h-6" />,
            title: "Commitment to Security",
            content: "We are dedicated to ensuring the security of your information and maintaining the integrity of our platform."
        },
        {
            icon: <CheckCircle className="w-6 h-6" />,
            title: "Fair Practices",
            content: "We adhere to fair and ethical business practices in all our dealings."
        },
        {
            icon: <Gavel className="w-6 h-6" />,
            title: "Compliance with Laws",
            content: "We comply with all applicable laws and regulations in the regions we operate."
        },
        {
            icon: <BookOpen className="w-6 h-6" />,
            title: "Transparency",
            content: "We are transparent in our policies and how we operate our business."
        },
        {
            icon: <Handshake className="w-6 h-6" />,
            title: "Respect for All",
            content: "We foster a culture of respect and inclusivity for all our users and employees."
        },
        {
            icon: <Lock className="w-6 h-6" />,
            title: "Data Protection",
            content: "We take measures to protect your personal data and ensure your privacy."
        }
    ];

    return (
        <motion.section className={`min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
            <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
                    Our Policy
                </h1>
                <h2 className="text-2xl font-semibold mb-4">Company Policy</h2>
                <p className="mb-4">
                    This is the placeholder for the company policy. The content for this page is currently being developed and will be available soon.
                </p>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
            >
                {policySections.map((section, index) => (
                    <motion.div
                        key={index}
                        variants={fadeIn('up', 0.3 + index * 0.1)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
                    >
                        <div className="flex items-center mb-2">
                            <span className="mr-2">{section.icon}</span>
                            <h3 className="text-lg font-semibold">{section.title}</h3>
                        </div>
                        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>{section.content}</p>
                    </motion.div>
                ))}
            </motion.div>
        </motion.section>
    );
};

export default PolicyPage;