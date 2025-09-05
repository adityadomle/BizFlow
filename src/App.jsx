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
import DeadlineReminder from "./components/DeadlineReminder";  // 👈 NEW IMPORT

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
const LeaderBoard = lazy(() => import("./pages/LeaderBoard"));

// Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Analytics hooks
import useScrollTracking from "./utils/useScrollTracking";
import useTimeTracking from "./utils/useTimeTracking";
import { trackPageView } from "./utils/analytics";
import Loader from "./components/Loader";


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
      <section id="reminders">     {/* 👈 NEW SECTION */}
        <DeadlineReminder />       {/* 👈 REMINDER FEATURE ADDED */}
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

  useEffect(() => {
    const currentPath = location.pathname;
    let pageTitle = "BizFlow"; // default

    switch (currentPath) {
      case "/":
        pageTitle = "Home | BizFlow";
        break;
      case "/partner":
        pageTitle = "Partner | BizFlow";
        break;
      case "/about":
        pageTitle = "About Us | BizFlow";
        break;
      case "/contact":
        pageTitle = "Contact | BizFlow";
        break;
      case "/contributors":
        pageTitle = "Contributors | BizFlow";
        break;
      case "/contributor-guide":
        pageTitle = "Contributor Guide | BizFlow";
        break;
      case "/leaderboard":
        pageTitle = "Leaderboard | BizFlow";
        break;
      case "/support-career":
        pageTitle = "Support Career | BizFlow";
        break;
      case "/faqs":
        pageTitle = "FAQs | BizFlow";
        break;
      case "/privacy-policy":
        pageTitle = "Privacy Policy | BizFlow";
        break;
      case "/terms-of-use":
        pageTitle = "Terms of Use | BizFlow";
        break;
      default:
        pageTitle = "Page Not Found | BizFlow";
    }

    document.title = pageTitle;

    // also keep your analytics
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

        {/* Single Suspense wrapper for all routes */}
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/partner" element={<Partner />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/contributors" element={<Contibutors />} />
            <Route path="/contributor-guide" element={<ContributorGuide />} />
            <Route path="/leaderboard" element={<LeaderBoard />} />

            <Route path="/support-career" element={<SupportCareer />} />
            <Route path="/faqs" element={<FAQ />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-use" element={<TermsOfUsePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>

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