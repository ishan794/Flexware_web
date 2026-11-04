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
 * Selector for the text and cards in every page section (hero excluded) that fade up
 * on scroll. Mirrored in globals.css (.js-reveal …), which hides them until revealed.
 */
export const SECTION_TEXT =
  'main > :not(#home) :is(h1, h2, h3, h4, p, dl > div, ul > li, ol > li, [class*="rounded-xl"], [class*="rounded-2xl"])' +
  ':not(:is(dl > div, li, [class*="rounded-xl"], [class*="rounded-2xl"], .animate-on-scroll, .reveal, [data-no-reveal]) *)' +
  ':not(.animate-on-scroll, .reveal, [data-no-reveal])';

/**
 * Reveals SECTION_TEXT elements as they enter the viewport using the Web Animations API,
 * so React-owned attributes (class/style) are never touched and hydration stays clean.
 * Opacity is held with fill: 'forwards'; the slide uses `translate` without fill so
 * Tailwind hover translates work again afterwards. Watches <main> for streamed sections.
 */
export function useSectionTextReveal(rescanKey?: unknown) {
  useEffect(() => {
    if (!('animate' in Element.prototype)) return;
    const seen = new WeakSet<Element>();
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observer = new IntersectionObserver(
      (entries) => {
        let i = 0;
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          observer.unobserve(el);
          const delay = reduce ? 0 : Math.min(i++, 5) * 80;
          const duration = reduce ? 0 : 700;
          const easing = 'cubic-bezier(0.16, 1, 0.3, 1)';
          el.animate([{ opacity: 0 }, { opacity: 1 }], { duration, delay, easing, fill: 'forwards' });
          if (!reduce) el.animate([{ translate: '0 24px' }, { translate: '0 0' }], { duration, delay, easing, fill: 'backwards' });
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const scan = () => {
      document.querySelectorAll(SECTION_TEXT).forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        observer.observe(el);
      });
    };
    scan();

    // Streamed (Suspense) sections arrive after mount
    let frame = 0;
    const mutations = new MutationObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(scan);
    });
    const main = document.querySelector('main');
    if (main) mutations.observe(main, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(frame);
      mutations.disconnect();
      observer.disconnect();
    };
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
