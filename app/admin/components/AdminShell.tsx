'use client';

import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import {
  BarChart3,
  Briefcase,
  ExternalLink,
  FileText,
  FolderKanban,
  Home,
  ImageIcon,
  LayoutDashboard,
  Loader2,
  LogOut,
  Mail,
  Menu,
  MessageSquareQuote,
  Search,
  Settings,
  ShieldCheck,
  Shapes,
  TriangleAlert,
  Users,
  Wrench,
  X,
} from 'lucide-react';
import Logo from '@/app/components/Logo';
import ThemeMenu from '@/app/components/ThemeMenu';

/*
 * Navigation adapted from the CreativeFX admin's grouped sidebar menu, reduced to
 * the modules Flxware's website actually uses.
 */
const NAV: { group: string; items: { href: string; label: string; icon: typeof Home }[] }[] = [
  { group: 'Overview', items: [{ href: '/admin', label: 'Dashboard', icon: LayoutDashboard }] },
  {
    group: 'Website content',
    items: [
      { href: '/admin/homepage', label: 'Homepage', icon: Home },
      { href: '/admin/services', label: 'Services', icon: Wrench },
      { href: '/admin/portfolio', label: 'Portfolio', icon: FolderKanban },
      { href: '/admin/careers', label: 'Careers', icon: Briefcase },
      { href: '/admin/about', label: 'About', icon: FileText },
    ],
  },
  {
    group: 'Social proof',
    items: [
      { href: '/admin/testimonials', label: 'Testimonials', icon: MessageSquareQuote },
      { href: '/admin/logos', label: 'Client logos', icon: Shapes },
      { href: '/admin/team', label: 'Team', icon: Users },
      { href: '/admin/stats', label: 'Stats', icon: BarChart3 },
    ],
  },
  {
    group: 'Manage',
    items: [
      { href: '/admin/inquiries', label: 'Inquiries', icon: Mail },
      { href: '/admin/media', label: 'Media library', icon: ImageIcon },
      { href: '/admin/seo', label: 'SEO', icon: Search },
      { href: '/admin/settings', label: 'Site settings', icon: Settings },
      { href: '/admin/security', label: 'Security', icon: ShieldCheck },
    ],
  },
];

function isActive(pathname: string, href: string) {
  return href === '/admin' ? pathname === '/admin' : pathname === href || pathname.startsWith(`${href}/`);
}

function SidebarNav({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <nav aria-label="Admin" className="flex-1 overflow-y-auto px-3 py-4">
      {NAV.map((section) => (
        <div key={section.group} className="mb-5">
          <p className="mb-1.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-subtle">{section.group}</p>
          <ul className="space-y-0.5">
            {section.items.map(({ href, label, icon: Icon }) => {
              const active = isActive(pathname, href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={onNavigate}
                    aria-current={active ? 'page' : undefined}
                    className={`flex min-h-10 items-center gap-3 rounded-lg px-3 text-sm transition-colors ${
                      active
                        ? 'bg-primary/10 font-semibold text-primary-light'
                        : 'text-muted hover:bg-surface-light hover:text-foreground'
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export default function AdminShell({ children, devData = false }: { children: ReactNode; devData?: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const signOut = async () => {
    setSigningOut(true);
    await fetch('/api/admin/auth/logout', { method: 'POST' }).catch(() => {});
    router.replace('/admin/login');
    router.refresh();
  };

  const brand = (
    <Link href="/admin" className="flex items-center gap-2 rounded-md" aria-label="Flxware admin dashboard">
      <Logo className="h-5 w-auto" />
      <span className="rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-light">
        Admin
      </span>
    </Link>
  );

  const footer = (
    <div className="space-y-1 border-t border-edge p-3">
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-10 items-center gap-3 rounded-lg px-3 text-sm text-muted transition-colors hover:bg-surface-light hover:text-foreground"
      >
        <ExternalLink className="h-4 w-4" aria-hidden="true" /> View website
        <span className="sr-only">(opens in a new tab)</span>
      </a>
      <button
        type="button"
        onClick={signOut}
        disabled={signingOut}
        className="flex min-h-10 w-full items-center gap-3 rounded-lg px-3 text-sm text-muted transition-colors hover:bg-error/10 hover:text-error"
      >
        {signingOut ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <LogOut className="h-4 w-4" aria-hidden="true" />}
        Sign out
      </button>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-background">
      <a href="#admin-main" className="skip-link">
        Skip to content
      </a>

      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-edge bg-surface lg:flex">
        <div className="flex h-16 items-center border-b border-edge px-5">{brand}</div>
        <SidebarNav pathname={pathname} />
        {footer}
      </aside>

      {/* Mobile drawer */}
      <Dialog open={menuOpen} onClose={setMenuOpen} className="relative z-[70] lg:hidden">
        <DialogBackdrop transition className="fixed inset-0 bg-background/70 backdrop-blur-sm transition-opacity data-closed:opacity-0" />
        <DialogPanel
          transition
          className="fixed inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col border-r border-edge bg-surface transition-transform duration-300 data-closed:-translate-x-full"
        >
          <div className="flex h-16 items-center justify-between border-b border-edge px-4">
            {brand}
            <button type="button" onClick={() => setMenuOpen(false)} className="icon-btn" aria-label="Close menu">
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <SidebarNav pathname={pathname} onNavigate={() => setMenuOpen(false)} />
          {footer}
        </DialogPanel>
      </Dialog>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-3 border-b border-edge bg-background/90 px-4 backdrop-blur sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="icon-btn"
              aria-label="Open admin menu"
              aria-expanded={menuOpen}
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
            {brand}
          </div>
          <p className="hidden text-sm text-muted lg:block">Flxware content management</p>
          <ThemeMenu />
        </header>
        {devData && (
          <div role="status" className="flex items-start gap-2 border-b border-amber/30 bg-amber/10 px-4 py-2.5 text-sm text-foreground sm:px-6 lg:px-8">
            <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber" aria-hidden="true" />
            <p>
              <strong className="font-semibold">Development data store.</strong>{' '}PostgreSQL isn&apos;t configured, so changes are kept in
              memory only and are lost when the server restarts. This mode is disabled in production.
            </p>
          </div>
        )}
        <main id="admin-main" tabIndex={-1} className="flex-1 px-4 py-6 focus:outline-none sm:px-6 sm:py-8 lg:px-8">
          <div className="mx-auto max-w-5xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
