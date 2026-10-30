import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Mail } from 'lucide-react';
import SiteChrome from './components/SiteChrome';
import { navLinks } from './lib/site';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <SiteChrome>
    <div className="grid min-h-[70vh] place-items-center px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="max-w-xl text-center animate-fade-up">
        <p className="gradient-text text-7xl font-extrabold tracking-tight sm:text-8xl">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-5xl">Page not found</h1>
        <p className="mt-5 text-base text-muted sm:text-lg">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It may have moved, or the link may be out of date.
        </p>
        <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <Link href="/" className="btn btn-primary">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to home
          </Link>
          <Link href="/contact" className="btn btn-outline">
            <Mail className="h-4 w-4" aria-hidden="true" /> Contact us
          </Link>
        </div>
        <nav aria-label="Popular pages" className="mt-12 border-t border-edge pt-8">
          <p className="mb-4 text-sm font-medium text-subtle">Or try one of these pages</p>
          <ul className="flex flex-wrap justify-center gap-2">
            {navLinks
              .filter((l) => l.href !== '/')
              .map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-flex min-h-10 items-center rounded-full border border-edge px-4 text-sm text-muted transition-colors hover:border-primary/40 hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
      </div>
    </div>
    </SiteChrome>
  );
}
