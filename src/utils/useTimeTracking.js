import { useEffect, useRef } from 'react';
import { trackTimeOnPage } from './analytics.js';

export default function useTimeTracking() {
  const startTime = useRef(Date.now());
  const intervalRef = useRef(null);

  useEffect(() => {
    // Track time every 30 seconds
    intervalRef.current = setInterval(() => {
      const timeSpent = Math.floor((Date.now() - startTime.current) / 1000);
      trackTimeOnPage(timeSpent);
    }, 30000);

    // Track when user leaves the page
    const handleBeforeUnload = () => {
      const timeSpent = Math.floor((Date.now() - startTime.current) / 1000);
      trackTimeOnPage(timeSpent);
    };

    // Track when user switches tabs or minimizes window
    const handleVisibilityChange = () => {
      if (document.hidden) {
        const timeSpent = Math.floor((Date.now() - startTime.current) / 1000);
        trackTimeOnPage(timeSpent);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
}
