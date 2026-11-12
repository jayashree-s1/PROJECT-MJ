import { useState, useEffect } from 'react';

export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    } else {
      mediaQuery.addListener(listener);
      return () => mediaQuery.removeListener(listener);
    }
  }, []);

  return reducedMotion;
}

