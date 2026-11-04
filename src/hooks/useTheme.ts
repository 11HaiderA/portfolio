import { useState, useEffect, useCallback } from 'react';

export type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'dark';
    const saved = localStorage.getItem('theme') as Theme | null;
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      root.setAttribute('data-theme', 'dark');
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', '#000000');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      root.setAttribute('data-theme', 'light');
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', '#fafafa');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const root = document.documentElement;
    root.classList.add('theme-transitioning');
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
    window.setTimeout(() => {
      root.classList.remove('theme-transitioning');
    }, 300);
  }, []);

  return { theme, toggleTheme, setTheme: setThemeState };
}
