'use client';

import { useGlobalScrollAnimations } from '@/app/lib/animations';

/**
 * Client component that initializes the global IntersectionObserver
 * for .animate-on-scroll elements across all pages.
 */
export default function ScrollAnimationProvider() {
  useGlobalScrollAnimations();
  return null;
}
