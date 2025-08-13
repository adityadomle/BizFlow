// Analytics configuration file
export const ANALYTICS_CONFIG = {
  // Google Analytics 4 Configuration
  GA4: {
    measurementId: process.env.REACT_APP_GA4_MEASUREMENT_ID || 'YOUR_GA4_MEASUREMENT_ID_HERE', // Set in .env file
    enabled: process.env.REACT_APP_ANALYTICS_ENABLED !== 'false',
    debug: process.env.NODE_ENV === 'development',
  },
  // Event tracking configuration
  events: {
    buttonClicks: { enabled: true, category: 'User Interaction' },
    formSubmissions: { enabled: true, category: 'Form' },
    scrollDepth: { enabled: true, intervals: [25, 50, 75, 100], category: 'Engagement' },
    timeOnPage: { enabled: true, interval: 30000, category: 'Engagement' },
    pageViews: { enabled: true, category: 'Navigation' },
  },
  privacy: {
    respectDoNotTrack: true,
    anonymizeIP: true,
    cookieConsent: false,
  },
  customDimensions: {
    userType: 'dimension1',
    pageSection: 'dimension2',
    userJourney: 'dimension3',
  },
  goals: {
    newsletterSignup: { name: 'Newsletter Signup', value: 10 },
    contactForm: { name: 'Contact Form Submission', value: 25 },
    pricingView: { name: 'Pricing Page View', value: 5 },
  },
};

// Helper function to check if analytics is enabled
export const isAnalyticsEnabled = () => {
  return ANALYTICS_CONFIG.GA4.enabled && typeof window !== 'undefined' && window.gtag;
};

// Helper function to get GA4 measurement ID
export const getGA4MeasurementId = () => {
  return ANALYTICS_CONFIG.GA4.measurementId;
};

// Helper function to check if debug mode is enabled
export const isDebugMode = () => {
  return ANALYTICS_CONFIG.GA4.debug;
};
