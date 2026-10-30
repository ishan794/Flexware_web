'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { Menu, X, ArrowRight } from 'lucide-react';
import ThemeMenu from './ThemeMenu';
import Logo from './Logo';
import { navLinks } from '../lib/site';

function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMobileOpen(false);

  return (
    <header
      id="main-navbar"
      // Sticky (in normal flow) rather than fixed: no content offset hacks, and full-page
      // screenshots/prints show the header at the top instead of mid-page.
      className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300 ${
        isScrolled ? 'border-edge bg-background/85 shadow-elevated' : 'border-transparent bg-background/60'
      }`}
    >
      <nav aria-label="Main" className="container-page flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
        <Link
          href="/"
          className="-m-1.5 shrink-0 rounded-md p-1.5 transition-opacity hover:opacity-80"
          aria-label="Flxware home"
        >
          <Logo priority />
        </Link>

        {/* Desktop navigation */}
        <ul className="hidden items-center gap-0.5 rounded-full border border-edge bg-surface/70 p-1 md:flex">
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={`relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-200 lg:px-4 ${
                    active ? 'bg-surface-lighter text-foreground' : 'text-muted hover:text-foreground'
                  }`}
                >
                  {active && <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-secondary" />}
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeMenu />
          <Link href="/contact" className="btn btn-primary btn-sm group hidden whitespace-nowrap lg:inline-flex">
            Start a project
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeMenu />
          <button
            type="button"
            id="mobile-menu-toggle"
            onClick={() => setIsMobileOpen(true)}
            className="icon-btn"
            aria-label="Open menu"
            aria-expanded={isMobileOpen}
            aria-controls="mobile-menu-drawer"
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>

      {/* Mobile drawer: Headless UI handles focus trap, Escape, scroll lock and inert background */}
      <Dialog open={isMobileOpen} onClose={closeMenu} className="relative z-[70] md:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-background/70 backdrop-blur-sm transition-opacity duration-300 data-closed:opacity-0"
        />
        <DialogPanel
          id="mobile-menu-drawer"
          transition
          className="glass-strong fixed inset-y-0 right-0 flex w-80 max-w-[85vw] flex-col overflow-y-auto px-4 pb-8 transition-transform duration-300 ease-out data-closed:translate-x-full"
        >
          <div className="flex h-16 items-center justify-between px-2">
            <DialogTitle>
              <Logo className="h-6 w-auto" />
              <span className="sr-only"> menu</span>
            </DialogTitle>
            <button type="button" onClick={closeMenu} className="icon-btn" aria-label="Close menu">
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <ul className="mt-2 flex flex-col gap-1">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    aria-current={active ? 'page' : undefined}
                    className={`flex min-h-12 items-center rounded-xl px-4 text-base font-medium transition-colors ${
                      active ? 'bg-primary/10 text-primary-light' : 'text-muted hover:bg-surface-light hover:text-foreground'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-6 border-t border-edge pt-6">
            <Link href="/contact" onClick={closeMenu} className="btn btn-primary w-full group">
              Start a project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
