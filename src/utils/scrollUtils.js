// Scroll utilities for smooth navigation and header offset management

// Get navbar height dynamically
export const getNavbarHeight = () => {
  const navbar = document.querySelector('nav');
  return navbar ? navbar.offsetHeight : 80; // fallback to 80px
};

// Smooth scroll to top with navbar consideration
export const scrollToTop = (behavior = 'smooth') => {
  window.scrollTo({
    top: 0,
    behavior: behavior
  });
};

// Smooth scroll to element with navbar offset
export const scrollToElement = (elementId, offset = null) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const navbarHeight = offset || getNavbarHeight();
  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
  const targetPosition = elementPosition - navbarHeight - 20; // 20px extra padding

  window.scrollTo({
    top: Math.max(0, targetPosition),
    behavior: 'smooth'
  });
};

// Enhanced hash link scrolling with proper offset
export const scrollToHash = (hash) => {
  if (!hash || hash === '#') return;
  
  const elementId = hash.replace('#', '');
  scrollToElement(elementId);
};

// Debounced scroll handler for performance
export const createDebouncedScrollHandler = (callback, delay = 100) => {
  let timeoutId;
  
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(null, args), delay);
  };
};

// Check if element is in viewport considering navbar
export const isElementInViewport = (element, offset = null) => {
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  const navbarHeight = offset || getNavbarHeight();
  
  return (
    rect.top >= navbarHeight &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

// Enhanced intersection observer for scroll spy
export const createScrollSpy = (sections, callback, options = {}) => {
  const defaultOptions = {
    threshold: 0.6,
    rootMargin: `-${getNavbarHeight()}px 0px 0px 0px`
  };
  
  const observerOptions = { ...defaultOptions, ...options };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback(`#${entry.target.id}`);
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));
  
  return () => {
    sections.forEach((section) => observer.unobserve(section));
  };
};
