import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowRight, ArrowUpRight } from 'lucide-react';
import Logo from './Logo';
import type { SiteSettings } from '../lib/cms/types';
import { getPublished } from '../lib/server/content';

const companyLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
];

export default async function Footer({ settings: site }: { settings: SiteSettings }) {
  // First four published services, linked to their anchors on /services
  const services = (await getPublished('services')).slice(0, 4);
  const footerSections = [
    { title: 'Company', links: companyLinks },
    { title: 'Services', links: services.map((s) => ({ label: s.title, href: `/services#${s.slug}` })) },
  ].filter((section) => section.links.length > 0);

  return (
    <footer id="main-footer" className="relative border-t border-edge bg-surface">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-secondary/60 to-transparent"
      />

      <div className="container-page pb-8 pt-14 sm:pt-16">
        <div className="mb-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:mb-14 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-12">
          {/* Brand + contact */}
          <div>
            <Link href="/" aria-label="Flxware home" className="inline-block rounded-md transition-opacity hover:opacity-80">
              <Logo className="h-7 w-auto" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Crafting cutting-edge digital experiences with modern technology. We build solutions that transform
              businesses.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <a href={`mailto:${site.email}`} className="inline-flex items-center gap-3 py-1 text-muted transition-colors hover:text-primary-light">
                  <Mail className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  {site.email}
                </a>
              </li>
              <li>
                <a href={site.phoneHref} className="inline-flex items-center gap-3 py-1 text-muted transition-colors hover:text-primary-light">
                  <Phone className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  {site.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 text-muted">
                <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {site.locations}
              </li>
            </ul>
          </div>

          {footerSections.map((section) => (
            <nav key={section.title} aria-label={section.title}>
              <h2 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-subtle">{section.title}</h2>
              <ul className="space-y-1">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex min-h-9 items-center gap-1.5 text-sm text-muted transition-colors hover:text-primary-light"
                    >
                      {link.label}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-3 w-3 -translate-y-0.5 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Project CTA */}
          <div>
            <h2 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-subtle">Start a project</h2>
            <p className="mb-5 text-sm leading-relaxed text-muted">
              Tell us about your idea and we&apos;ll get back to you within 24 hours.
            </p>
            <Link href="/contact" className="btn btn-primary btn-sm group">
              Get in touch
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-edge pt-8 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-subtle">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="text-sm text-subtle">
            Careers:{' '}
            <a href={`mailto:${site.careersEmail}`} className="link-underline text-muted hover:text-foreground">
              {site.careersEmail}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
