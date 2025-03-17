import { useState, useEffect } from 'react';

const useResponsiveEvent = (breakpoint = 768) => {
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileScreen(window.innerWidth < breakpoint);
    };

    // Run on initial render
    checkScreenSize();

    // Listen for window resize events
    window.addEventListener('resize', checkScreenSize);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, [breakpoint]);

  return isMobileScreen;
};

export default useResponsiveEvent;