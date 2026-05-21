'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';

type LandingMode = 'dark' | 'light';

interface NavLink {
  href: string;
  label: string;
}

interface LandingNavProps {
  mode: LandingMode;
  product: string;
  links: NavLink[];
  ctaHref: string;
  ctaLabel: string;
}

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
  mode: LandingMode;
  align?: 'left' | 'center';
  className?: string;
}

interface LandingFooterProps {
  mode: LandingMode;
  product: string;
  description: string;
}

const modeClasses = {
  dark: {
    nav: 'border-white/10 bg-black/55 text-white backdrop-blur-xl',
    navLink: 'text-gray-300 hover:text-white',
    brand: 'text-white',
    cta: 'bg-white text-black hover:bg-gray-200',
    eyebrow: 'border-white/10 bg-white/5 text-cyan-200',
    title: 'text-white',
    description: 'text-gray-300',
    footer: 'border-white/10 bg-black text-gray-300',
    footerMuted: 'text-gray-400',
  },
  light: {
    nav: 'border-gray-200 bg-white/80 text-gray-900 backdrop-blur',
    navLink: 'text-gray-600 hover:text-gray-950',
    brand: 'text-gray-950',
    cta: 'bg-gray-950 text-white hover:bg-gray-800',
    eyebrow: 'border-blue-100 bg-blue-50 text-blue-700',
    title: 'text-gray-950',
    description: 'text-gray-600',
    footer: 'border-gray-200 bg-white text-gray-700',
    footerMuted: 'text-gray-500',
  },
};

export function LandingChromeReset() {
  return (
    <style>{`
      #main-navbar,
      #main-footer {
        display: none;
      }
    `}</style>
  );
}

export function LandingNav({
  mode,
  product,
  links,
  ctaHref,
  ctaLabel,
}: LandingNavProps) {
  const classes = modeClasses[mode];

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b ${classes.nav}`}>
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className={`text-lg font-semibold ${classes.brand}`}>
          {product}
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${classes.navLink}`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link
            href={ctaHref}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold shadow-xl transition-transform hover:-translate-y-0.5 ${classes.cta}`}
          >
            {ctaLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </nav>
    </header>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  mode,
  align = 'center',
  className = '',
}: SectionHeadingProps) {
  const classes = modeClasses[mode];

  return (
    <div
      className={`mb-12 ${align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'} ${className}`}
    >
      <span
        className={`mb-5 inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${classes.eyebrow}`}
      >
        {eyebrow}
      </span>
      <h2 className={`text-3xl font-semibold leading-tight md:text-5xl ${classes.title}`}>
        {title}
      </h2>
      <p className={`mt-5 text-base leading-8 md:text-lg ${classes.description}`}>
        {description}
      </p>
    </div>
  );
}

export function LandingSection({
  children,
  className = '',
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`relative px-6 py-20 md:py-28 lg:px-8 ${className}`}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

export function LandingFooter({ mode, product, description }: LandingFooterProps) {
  const classes = modeClasses[mode];
  const year = new Date().getFullYear();

  return (
    <footer className={`border-t px-6 py-12 lg:px-8 ${classes.footer}`}>
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <Link href="/" className={`text-lg font-semibold ${mode === 'dark' ? 'text-white' : 'text-gray-950'}`}>
            {product}
          </Link>
          <p className={`mt-3 max-w-xl text-sm leading-6 ${classes.footerMuted}`}>{description}</p>
        </div>
        <div className={`flex flex-wrap gap-5 text-sm ${classes.footerMuted}`}>
          <Link href="/services" className="hover:text-primary">
            Services
          </Link>
          <Link href="/portfolio" className="hover:text-primary">
            Portfolio
          </Link>
          <Link href="/contact" className="hover:text-primary">
            Contact
          </Link>
          <span>© {year} Flxware</span>
        </div>
      </div>
    </footer>
  );
}
