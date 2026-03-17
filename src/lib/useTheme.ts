/**
 * useTheme Hook
 * Manages light/dark mode with localStorage persistence
 */

'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>('light');
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null;

    if (stored) {
      setTheme(stored);
      applyTheme(stored);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme: Theme = prefersDark ? 'dark' : 'light';
      setTheme(initialTheme);
      applyTheme(initialTheme);
    }

    setIsLoaded(true);
  }, []);

  // Apply theme to DOM
  const applyTheme = (newTheme: Theme) => {
    const html = document.documentElement;

    if (newTheme === 'dark') {
      html.setAttribute('data-theme', 'dark');
      html.classList.add('dark');
    } else {
      html.removeAttribute('data-theme');
      html.classList.remove('dark');
    }

    localStorage.setItem('theme', newTheme);
  };

  // Toggle theme
  const toggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  return {
    theme,
    toggle,
    isLoaded,
    isDark: theme === 'dark',
    isLight: theme === 'light',
  };
};

export default useTheme;
