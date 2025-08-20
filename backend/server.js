const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:5173'
  ]
}));
app.use(express.json({ limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Chat endpoint with Gemini
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ 
        error: 'Messages array is required' 
      });
    }

    // Get the model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Build conversation context
    let prompt = `You are a helpful support assistant for BizFlow - a modern, React-based business workflow dashboard designed for simplicity, performance, and style.

About BizFlow:
- BizFlow is a modern business workflow dashboard built with React + TailwindCSS and Framer Motion
- It offers a responsive, smooth, and visually appealing UI for managing tasks, tracking metrics, and organizing workflows
- Perfect for business owners, freelancers, and students who want to make work feel lighter, cleaner, and more enjoyable
-Key features include Streamlining Your Business with Smart Scheduling Solutions,Introducing best mobile carousels
- Key features include task management, metric tracking, workflow organization, and a beautiful user interface
- Built with cutting-edge technologies: React, TailwindCSS, Framer Motion for animations
- Focuses on simplicity, performance, and style to enhance productivity

Your role:
- Help users understand BizFlow's features and capabilities
- Answer questions about workflow management, task tracking, and dashboard functionality
- Provide information about the technology stack and design philosophy
- Assist with general inquiries about business productivity and workflow optimization
- Be professional, friendly, and enthusiastic about helping users succeed with BizFlow

Conversation history:
`;

    // Add conversation history
    messages.forEach(msg => {
      prompt += `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}\n`;
    });

    prompt += "\nAssistant:";

    // Generate response
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    res.json({ 
      response: text,
      usage: {
        prompt_tokens: prompt.length,
        completion_tokens: text.length,
        total_tokens: prompt.length + text.length
      }
    });

  } catch (error) {
    console.error('Gemini API Error:', error);
    
    if (error.message?.includes('API_KEY')) {
      return res.status(401).json({ 
        error: 'Invalid API key. Please check your Gemini API key.' 
      });
    }
    
    if (error.message?.includes('quota')) {
      return res.status(429).json({ 
        error: 'API quota exceeded. Please try again later.' 
      });
    }

    res.status(500).json({ 
      error: 'Failed to process chat request. Please try again.' 
    });
  }
});

app.listen(port, () => {
  console.log(`🚀 Chatbot backend server running on port ${port}`);
  console.log(`🤖 Using Google Gemini API: ${process.env.GOOGLE_API_KEY ? 'YES' : 'NO'}`);
});
