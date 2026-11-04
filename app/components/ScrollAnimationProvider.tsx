'use client';

import { usePathname } from 'next/navigation';
import { useGlobalScrollAnimations, useSectionTextReveal } from '@/app/lib/animations';

/**
 * Client component that initializes the global IntersectionObserver
 * for .animate-on-scroll elements across all pages (re-scans on route change).
 * Prefer <Reveal> for new components; this keeps the class-based API working.
 */
export default function ScrollAnimationProvider() {
  const pathname = usePathname();
  useGlobalScrollAnimations(pathname);
  useSectionTextReveal(pathname);
  return null;
}
