// Analytics utility functions for tracking user interactions

// Track button clicks
export const trackButtonClick = (label, category = 'User Interaction') => {
  if (window.gtag) {
    window.gtag('event', 'button_click', {
      event_category: category,
      event_label: label
    });
  }
};

// Track form submissions
export const trackFormSubmission = (formName) => {
  if (window.gtag) {
    window.gtag('event', 'form_submit', {
      event_category: 'Form',
      event_label: formName
    });
  }
};

// Track page views
export const trackPageView = (pageName) => {
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: pageName,
      page_location: window.location.href
    });
  }
};

// Track scroll depth
export const trackScrollDepth = (scrollPercent) => {
  if (window.gtag) {
    window.gtag('event', 'scroll_depth', {
      event_category: 'Engagement',
      event_label: `${scrollPercent}%`
    });
  }
};

// Track time on page
export const trackTimeOnPage = (seconds) => {
  if (window.gtag) {
    window.gtag('event', 'time_on_page', {
      event_category: 'Engagement',
      value: seconds
    });
  }
};

// Track external link clicks
export const trackExternalLink = (url) => {
  if (window.gtag) {
    window.gtag('event', 'click_external_link', {
      event_category: 'Navigation',
      event_label: url
    });
  }
};

// Track newsletter signup
export const trackNewsletterSignup = (source = 'general') => {
  if (window.gtag) {
    window.gtag('event', 'newsletter_signup', {
      event_category: 'Conversion',
      event_label: source
    });
  }
};

// Track pricing plan selection
export const trackPricingPlan = (planName, planPrice) => {
  if (window.gtag) {
    window.gtag('event', 'pricing_plan_view', {
      event_category: 'Pricing',
      event_label: planName,
      value: planPrice
    });
  }
};
