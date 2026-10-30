'use client';

import { createContext, useCallback, useContext, useEffect, useSyncExternalStore, type ReactNode } from 'react';

export type Theme = 'light' | 'dark';
export type ThemePreference = Theme | 'system';

interface ThemeContextValue {
  /** The theme actually applied to the page */
  theme: Theme;
  /** What the user chose; "system" follows the OS setting */
  preference: ThemePreference;
  setPreference: (preference: ThemePreference) => void;
  toggle: () => void;
}

const STORAGE_KEY = 'theme';
const SYSTEM_QUERY = '(prefers-color-scheme: light)';

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'dark',
  preference: 'system',
  setPreference: () => {},
  toggle: () => {},
});

/*
 * The inline script in app/layout.tsx applies the theme before first paint.
 * This store keeps React in sync with that DOM state and with the OS setting,
 * without reading browser-only APIs during render (avoids hydration mismatches).
 */
const listeners = new Set<() => void>();

function readPreference(): ThemePreference {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
  } catch {
    // Storage can be unavailable (private mode, blocked cookies)
  }
  return 'system';
}

function resolve(preference: ThemePreference): Theme {
  if (preference !== 'system') return preference;
  return window.matchMedia(SYSTEM_QUERY).matches ? 'light' : 'dark';
}

function applyTheme(theme: Theme, animate: boolean) {
  const root = document.documentElement;
  if (animate) {
    root.classList.add('theme-transition');
    window.setTimeout(() => root.classList.remove('theme-transition'), 350);
  }
  root.setAttribute('data-theme', theme);
  root.style.colorScheme = theme;
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  const media = window.matchMedia(SYSTEM_QUERY);
  const onSystemChange = () => {
    if (readPreference() === 'system') applyTheme(resolve('system'), true);
    callback();
  };
  const onStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return;
    applyTheme(resolve(readPreference()), true);
    callback();
  };
  media.addEventListener('change', onSystemChange);
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(callback);
    media.removeEventListener('change', onSystemChange);
    window.removeEventListener('storage', onStorage);
  };
}

const getPreferenceSnapshot = () => readPreference();
const getThemeSnapshot = (): Theme =>
  document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
const getServerPreference = (): ThemePreference => 'system';
const getServerTheme = (): Theme => 'dark';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const preference = useSyncExternalStore(subscribe, getPreferenceSnapshot, getServerPreference);
  const theme = useSyncExternalStore(subscribe, getThemeSnapshot, getServerTheme);

  // Reveal-on-scroll hides content only once JS is confirmed running
  useEffect(() => {
    document.documentElement.classList.add('js-reveal');
  }, []);

  const setPreference = useCallback((next: ThemePreference) => {
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore: the theme still applies for this page view
    }
    applyTheme(resolve(next), true);
    listeners.forEach((listener) => listener());
  }, []);

  const toggle = useCallback(() => {
    setPreference(getThemeSnapshot() === 'dark' ? 'light' : 'dark');
  }, [setPreference]);

  return (
    <ThemeContext.Provider value={{ theme, preference, setPreference, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
