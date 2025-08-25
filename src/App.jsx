import { useEffect, useRef } from "react";
import "./App.css";
import { useTheme } from "./context/ThemeContext";
import { useLocation } from "react-router-dom";

// react-toastify
import { ToastContainer } from "react-toastify";

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
import FloatingThemeToggle from "./components/FloatingThemeToggle";
import NotFound from "./components/NotFound";
import Contact from "./components/Contact";
import FAQ from "./components/FAQ";

// Pages
import Partner from "./pages/Partner";
import Contibutors from "./pages/Contibutors";
import SupportCareer from "./pages/SupportCareer";

// Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Analytics hooks
import useScrollTracking from "./utils/useScrollTracking";
import useTimeTracking from "./utils/useTimeTracking";
import { trackPageView } from "./utils/analytics";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfUsePage from "./pages/TermsOfUsePage";

// Hash Navigation component
function HashNavigation() {
  const location = useLocation();
  const previousHash = useRef(location.hash);

  useEffect(() => {
    if (location.hash && location.hash !== previousHash.current) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
    previousHash.current = location.hash;
  }, [location]);

  return null;
}

function AppContent() {
  const { isDarkMode } = useTheme();
  const location = useLocation();

  // Initialize analytics tracking hooks
  useScrollTracking();
  useTimeTracking();

  // Track page views on route changes
  useEffect(() => {
    const currentPath = location.pathname;
    const pageName =
      currentPath === "/"
        ? "Home"
        : currentPath.charAt(1).toUpperCase() + currentPath.slice(2);
    trackPageView(pageName);
  }, [location.pathname]);

  return (
    <main className="relative min-h-screen overflow-x-hidden scroll-smooth transition-colors duration-300">
      {/* Background Gradients */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div
          className={`absolute -top-28 -left-28 w-[500px] h-[500px] rounded-full blur-[80px] ${
            isDarkMode
              ? "bg-gradient-to-tr from-indigo-500/10 to-pink-500/10"
              : "bg-gradient-to-tr from-indigo-500/20 to-pink-500/20"
          }`}
        ></div>
        <div
          className={`absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full blur-[100px] ${
            isDarkMode
              ? "bg-gradient-to-tr from-blue-500/10 to-purple-500/10"
              : "bg-gradient-to-tr from-blue-500/20 to-purple-500/20"
          }`}
        ></div>
      </div>

      <div className="relative z-10 overflow-hidden">
        <Navbar />

        {/* Hash Navigation Handler */}
        <HashNavigation />

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
                <section id="faq">
                  <FAQ />
                </section>
                <section id="newsletter">
                  <NewsletterSection />
                </section>
              </>
            }
          />
          <Route path="/partner" element={<Partner />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contributors" element={<Contibutors />} />
          <Route path="/support-career" element={<SupportCareer />} />

          <Route path="/faqs" element={<FAQ />} />

          <Route path="*" element={<NotFound />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage/>} />
          <Route path="/terms-of-use" element={<TermsOfUsePage/>} />
        </Routes>

        {/* Toast container for messages */}
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick={false}
          draggable
          theme={isDarkMode ? "dark" : "light"}
          pauseOnHover
        />

        <Footer />
        <ScrollToTop />
        <FloatingThemeToggle />
      </div>
    </main>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
