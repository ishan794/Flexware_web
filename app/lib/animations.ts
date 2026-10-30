'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Hook that triggers visibility state when element enters viewport.
 * Attaches IntersectionObserver and unobserves once visible (one-shot animation).
 */
export function useScrollAnimation(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px', ...options }
    );

    observer.observe(element);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, isVisible };
}

/**
 * Hook for auto-applying `.is-visible` to `.animate-on-scroll` elements.
 * Call once in your layout or page to activate scroll animations globally.
 * Pass a value that changes per route (e.g. the pathname) so new pages are scanned
 * after client-side navigation.
 */
export function useGlobalScrollAnimations(rescanKey?: unknown) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.animate-on-scroll:not(.is-visible)');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [rescanKey]);
}

/**
 * Hook for animated count-up effect.
 * Uses requestAnimationFrame for smooth 60fps counting.
 */
export function useCountUp(
  end: number,
  duration: number = 2000,
  startOnMount: boolean = false
) {
  const [count, setCount] = useState(0);
  const [shouldStart, setShouldStart] = useState(startOnMount);
  const frameRef = useRef<number>(0);

  const start = useCallback(() => setShouldStart(true), []);

  useEffect(() => {
    if (!shouldStart) return;

    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Ease-out cubic for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [end, duration, shouldStart]);

  return { count, start };
}

/**
 * Calculate staggered delay for list items.
 */
export function staggerDelay(index: number, baseDelay: number = 100): string {
  return `${index * baseDelay}ms`;
}

/**
 * Calculate stagger style object for inline use.
 */
export function staggerStyle(index: number, baseDelay: number = 100) {
  return { transitionDelay: `${index * baseDelay}ms`, animationDelay: `${index * baseDelay}ms` };
}
