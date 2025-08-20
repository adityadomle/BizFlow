import { useEffect, useRef } from 'react';
import { trackScrollDepth } from './analytics.js';

export default function useScrollTracking() {
  const lastTrackedScroll = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      // Track scroll depth at 25%, 50%, 75%, and 100% intervals
      if (scrollPercent >= 25 && lastTrackedScroll.current < 25) {
        trackScrollDepth(25);
        lastTrackedScroll.current = 25;
      } else if (scrollPercent >= 50 && lastTrackedScroll.current < 50) {
        trackScrollDepth(50);
        lastTrackedScroll.current = 50;
      } else if (scrollPercent >= 75 && lastTrackedScroll.current < 75) {
        trackScrollDepth(75);
        lastTrackedScroll.current = 75;
      } else if (scrollPercent >= 95 && lastTrackedScroll.current < 95) {
        trackScrollDepth(100);
        lastTrackedScroll.current = 100;
      }
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, []);
}
