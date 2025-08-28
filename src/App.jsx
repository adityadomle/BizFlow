import { useEffect, useRef, Suspense, lazy } from "react";
import "./App.css";
import { useTheme } from "./context/ThemeContext";
import { useLocation } from "react-router-dom";

// react-toastify
import { ToastContainer } from "react-toastify";

// Essential components (loaded immediately)
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import NotFound from "./components/NotFound";
import Contact from "./components/Contact";
import FAQ from "./components/FAQ";
import PolicyPage from "./pages/PolicyPage";
import BusinessSupportPage from "./pages/BusinessSupportPage";
import QuickChatPage from "./pages/QuickChatPage";
import WhatsAppPage from "./pages/WhatsAppPage";
import Support24Page from "./pages/Support24Page";



// Lazy loaded components
const Hero = lazy(() => import("./components/Hero"));
const About = lazy(()=> import("./pages/About"))
const CompanyLogo = lazy(() => import("./components/CompanyLogo"));
const PurposeSection = lazy(() => import("./components/PurposeSection"));
const FeaturesSection = lazy(() => import("./components/FeaturesSection"));
const ScheduleSection = lazy(() => import("./components/ScheduleSection"));
const MonitorSection = lazy(() => import("./components/MonitorSection"));
const PricingSection = lazy(() => import("./components/PricingSection"));
const ServicesSection = lazy(() => import("./components/ServicesSection"));
const TestimonialsSection = lazy(() => import("./components/TestimonialsSection"));
const NewsletterSection = lazy(() => import("./components/NewsletterSection"));
const NotFound = lazy(() => import("./components/NotFound"));
const Contact = lazy(() => import("./components/Contact"));
const FAQ = lazy(() => import("./components/FAQ"));

// Lazy loaded pages
const Partner = lazy(() => import("./pages/Partner"));
const Contibutors = lazy(() => import("./pages/Contibutors"));
const SupportCareer = lazy(() => import("./pages/SupportCareer"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const TermsOfUsePage = lazy(() => import("./pages/TermsOfUsePage"));
const ContributorGuide = lazy(() => import("./pages/ContributorGuide"));

// Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Analytics hooks
import useScrollTracking from "./utils/useScrollTracking";
import useTimeTracking from "./utils/useTimeTracking";
import { trackPageView } from "./utils/analytics";

// Improved Simple Loader Component
function Loader() {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="flex items-center justify-center min-h-screen py-12">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div 
            className={`w-8 h-8 rounded-full border-2 border-solid ${
              isDarkMode 
                ? 'border-gray-600 border-t-indigo-400' 
                : 'border-gray-300 border-t-indigo-600'
            }`}
            style={{
              animation: 'spin 1s linear infinite'
            }}
          ></div>
        </div>
        <p className={`text-sm font-medium ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Loading...
        </p>
      </div>
    </div>
  );
}

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

// Home Page Component to reduce nesting
function HomePage() {
  return (
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
  );
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
          <Route path="/policy" element={<PolicyPage />} />
          <Route path="/business-support" element={<BusinessSupportPage />} />
          <Route path="/quick-chat" element={<QuickChatPage />} />
          <Route path="/contact/whatsapp" element={<WhatsAppPage />} />
          <Route path="/contact/support-24" element={<Support24Page />} />
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