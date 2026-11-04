'use client';

import { useEffect, useRef, type ElementType, type HTMLAttributes, type ReactNode } from 'react';

interface RevealProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  as?: ElementType;
  /** Stagger position; each step adds 80ms of delay */
  index?: number;
}

/**
 * Fades and lifts its content into view once it enters the viewport.
 * Content stays fully visible without JS and under prefers-reduced-motion
 * (see .reveal / .js-reveal in globals.css). Only opacity/transform animate.
 */
export default function Reveal({ children, as: Tag = 'div', className = '', index = 0, style, ...rest }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('is-visible');
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={index ? { transitionDelay: `${Math.min(index, 6) * 80}ms`, ...style } : style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
