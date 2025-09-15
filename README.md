# ⚡ BizFlow

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/adityadomle/BizFlow/blob/main/LICENSE)
[![Vercel Deploy](https://img.shields.io/badge/deployed%20on-vercel-000?logo=vercel)](https://biz-flow-alpha.vercel.app/)
[![React](https://img.shields.io/badge/react-18+-61dafb?logo=react&logoColor=white)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-3+-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/framer%20motion-10+-e535ab?logo=framer&logoColor=white)](https://www.framer.com/motion/)

<div align="center">
  <img src="https://raw.githubusercontent.com/nzbin/animated-css-background/master/demo/images/space.gif" alt="Animated Cosmic Background" width="100%">
</div>

> **BizFlow** is a modern, open-source business workflow dashboard built with React, TailwindCSS, and Framer Motion.  
> Effortless task management, beautiful UI, and seamless team collaboration — for businesses, freelancers, and students.

---

## 📚 Table of Contents

1. [BizFlow Philosophy](#-the-bizflow-philosophy)
2. [Live Demo](#-live-demo)
3. [Tech Stack](#-tech-stack)
4. [Features](#-features)
5. [Project Structure](#-project-structure)
6. [Getting Started](#-getting-started)
7. [Analytics Setup](#-analytics-setup)
8. [Analytics Implementation Summary](#-analytics-implementation-summary)
9. [Contact Page Setup](#-contact-page-setup)
10. [Contributor Guide](#-contributor-guide)
11. [Code of Conduct](#-code-of-conduct)
12. [Community & Support](#-community--support)
13. [License](#-license)
14. [Contributing](CONTRIBUTING.md)
15. [FAQ](#-faq)

---

## 🌀 The BizFlow Philosophy

<div align="center" style="font-size:2em;">
  🚀 🪐 ✨
</div>

- Workflows shouldn’t be boring → they should feel like sci-fi adventures  
- Data shouldn’t just move → it should dance across systems  
- Humans shouldn’t do grunt work → BizFlow is your cosmic assistant

---

![BizFlow Screenshot](public/Screenshot%202025-08-10%20101620.png)

---

## 🚀 Live Demo

Try BizFlow instantly:  
👉 [biz-flow-alpha.vercel.app](https://biz-flow-alpha.vercel.app/)

---

## 🛠 Tech Stack

- **Frontend:** [React (Vite)](https://vitejs.dev/)
- **Styling:** [TailwindCSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Linting:** [ESLint](https://eslint.org/)
- **Deployment:** [Vercel](https://vercel.com/)

---

## 🌟 Features

- ✅ **Responsive & Mobile-First** — Works beautifully on all devices
- ✅ **Modular Components** — Easy to extend and customize
- ✅ **Smooth Animations** — Framer Motion-powered transitions
- ✅ **Modern UI** — Clean, accessible, and visually appealing
- ✅ **Theme Support** — Light & dark mode
- ✅ **Frontend-Only** — Connect to any backend API
- ✅ **Open Source** — MIT licensed, community-driven

---

## 📂 Project Structure

```bash
BIZFLOW
├── public/           # Static assets
│   ├── favicon.png
│   ├── Screenshot 2025-08-10 101620.png
│   └── vite.svg
├── src/
│   ├── assets/       # Images, icons, static files
│   ├── components/   # Reusable UI components
│   ├── utils/        # Helper functions
│   ├── config/       # App configuration
│   ├── context/      # React context providers
│   ├── pages/        # Route-based pages
│   ├── App.css
│   ├── App.jsx       # Main app component
│   ├── index.css
│   └── main.jsx      # Entry point
├── .gitignore
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── LICENSE
├── package.json
├── README.md
├── vercel.json
└── vite.config.js
```

---

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/adityadomle/BizFlow.git
   cd BizFlow
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Run the development server**
   ```bash
   npm run dev
   ```
4. **Open [localhost:5173](http://localhost:5173) in your browser**

---

## 📊 Analytics Setup

### Secure Google Analytics 4 (GA4) Integration

- **Never commit your actual Measurement ID or sensitive data.**
- Use environment variables for configuration.

#### Quick Setup

1. Create your own GA4 property at [Google Analytics](https://analytics.google.com/)
2. Copy your Measurement ID (`G-XXXXXXXXXX`)
3. Copy `env.example` to `.env` and add your ID:
   ```bash
   cp env.example .env
   ```
   ```
   REACT_APP_GA4_MEASUREMENT_ID=G-YOUR_ACTUAL_ID_HERE
   REACT_APP_ANALYTICS_ENABLED=true
   ```
4. For temporary manual setup, replace the placeholder in `index.html`:
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR_ACTUAL_ID_HERE"></script>
   <script>
     gtag('config', 'G-YOUR_ACTUAL_ID_HERE');
   </script>
   ```

#### Security Checklist

- Remove your personal GA4 Measurement ID from all files
- `.env` is in `.gitignore`
- Use placeholders in committed files
- Never commit API keys, credentials, or personal info

#### [See full analytics setup details](#analytics-implementation-summary)

---

## 📈 Analytics Implementation Summary

### What’s Implemented

- **GA4 tracking code** in `index.html`
- **Automatic tracking:** page views, scroll depth, time on page, session duration
- **Event tracking:** button clicks, form submissions, newsletter signups, external links, pricing plan interactions
- **Analytics dashboard:** `/analytics` route, key metrics, popular pages, referrer tracking, loading/error states
- **Testing tools:** `/analytics-test` route, real-time status, debugging
- **Utility hooks:** `useScrollTracking`, `useTimeTracking`, analytics utility functions

### How to Use

- Access dashboard at `/analytics`
- Test analytics at `/analytics-test`
- Add tracking to components:
  ```javascript
  import { trackButtonClick } from '../utils/analytics';
  <button onClick={() => trackButtonClick('My Button')}>Click Me</button>
  ```
- Track form submissions:
  ```javascript
  import { trackFormSubmission } from '../utils/analytics';
  <form onSubmit={() => trackFormSubmission('Contact Form')}>{/* ... */}</form>
  ```

### Configuration

- Update `src/config/analytics.js` with your Measurement ID
- Install dependencies:
  ```bash
  npm install react-use chart.js react-chartjs-2
  ```

---

## 📧 Contact Page Setup

### Email Configuration

- Add credentials to `.env.local`:
  ```
  EMAIL_USER=your-email@gmail.com
  EMAIL_PASS=your-app-password
  OWNER_EMAIL=owner@bizflow.com
  ```
- For Gmail, enable 2-Step Verification and generate an App Password.
- Supports SendGrid, Mailgun, and other services (see `api/contact.js`).

### Features

- Real-time validation, loading states, success/error messages
- Business notification and user confirmation emails
- Responsive, accessible, animated design
- Multiple contact methods, business hours, social links, FAQ

### Troubleshooting

- Check environment variables and app password
- Review CORS and API endpoint configuration
- Test form and email functionality locally

---

## 📚 Contributor Guide

New to BizFlow?  
Visit our [Contributor Guide](CONTRIBUTING.md) for step-by-step instructions, tips, and resources to help you get started contributing to the project.

---

## 📜 Code of Conduct

BizFlow is dedicated to maintaining an inclusive, respectful, and collaborative environment for all contributors.  
See the [Code of Conduct](CONTRIBUTING.md#code-of-conduct) for details.

---

## 📣 Community & Support

- [Discussions](https://github.com/adityadomle/BizFlow/discussions)
- [Issues](https://github.com/adityadomle/BizFlow/issues)
- [Contact](https://biz-flow-alpha.vercel.app/contact)
- [Twitter](https://twitter.com/adityadomle)
- [LinkedIn](https://linkedin.com/in/adityadomle)

---

## 📄 License

This project is licensed under the [MIT License](CONTRIBUTING.md#license).

---

## ❓ FAQ

**Q: Where can I find contribution guidelines and code standards?**  
A: See [CONTRIBUTING.md](CONTRIBUTING.md) for all details.

**Q: How do I report a bug or request a feature?**  
A: Open an issue on [GitHub Issues](https://github.com/adityadomle/BizFlow/issues).

**Q: How do I get help or support?**  
A: Use [GitHub Discussions](https://github.com/adityadomle/BizFlow/discussions) or contact a maintainer.

**Q: Where can I see the changelog?**  
A: See [GitHub Releases](https://github.com/adityadomle/BizFlow/releases).

---

> **Ready to streamline your business?**  
> ⭐️ Star this repo & [join the community](https://github.com/adityadomle/BizFlow/discussions)
