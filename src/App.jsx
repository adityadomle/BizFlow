import React from "react";
import "./App.css";

// Components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CompanyLogo from "./components/CompanyLogo";
import PurposeSection from "./components/PurposeSection";
import FeaturesSection from "./components/FeaturesSection";
import ScheduleSection from "./components/ScheduleSection";
import MonitorSection from "./components/MonitorSection";
import PricingSection from "./components/PricingSection";
import ServicesSection from "./components/ServicesSection";
import TestimonialsSection from "./components/TestimonialsSection";
import NewsletterSection from "./components/NewsletterSection";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

// Pages
import Partner from "./pages/Partner";
import AnalyticsDashboard from "./components/AnalyticsDashboard";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Analytics hooks and utils
import useScrollTracking from './utils/useScrollTracking';
import useTimeTracking from './utils/useTimeTracking';
import { trackPageView } from './utils/analytics';
import { useEffect } from "react";

function App() {
  // Initialize analytics tracking hooks
  useScrollTracking();
  useTimeTracking();

  // Track page views on route changes
  useEffect(() => {
    const currentPath = window.location.pathname;
    const pageName = currentPath === '/' ? 'Home' : currentPath.charAt(1).toUpperCase() + currentPath.slice(2);
    trackPageView(pageName);
  }, []);

  return (
    <Router>
      <main className="relative min-h-screen overflow-x-hidden scroll-smooth">
        {/* Background Gradient Blob */}
        <div className="absolute -top-28 -left-28 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 rounded-full blur-[80px] -z-10"></div>

        <div className="overflow-hidden">
          {/* Navbar always visible */}
          <Navbar />

          {/* Routes */}
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <section id="home">
                    <Hero />
                  </section>
                  <section id="about">
                    <CompanyLogo />
                    <PurposeSection />
                    <FeaturesSection />
                  </section>
                  <section id="services">
                    <ScheduleSection />
                    <MonitorSection />
                    <PricingSection />
                    <ServicesSection />
                  </section>
                  <section id="testimonials">
                    <TestimonialsSection />
                  </section>
                  <section id="newsletter">
                    <NewsletterSection />
                  </section>
                </>
              }
            />
            <Route path="/partner" element={<Partner />} />
            <Route path="/analytics" element={<AnalyticsDashboard />} />
          </Routes>

          <Footer />
           <ScrollToTop />
        </div>
      </main>
    </Router>
  );
}

export default App;
