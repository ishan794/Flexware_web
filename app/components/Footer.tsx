'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Code2, Globe, Briefcase, ArrowUpRight } from 'lucide-react';

const footerSections = [
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Services', href: '/services' },
      { label: 'Portfolio', href: '/portfolio' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Web Development', href: '/services#web' },
      { label: 'Mobile Apps', href: '/services#mobile' },
      { label: 'AI Solutions', href: '/services#ai' },
      { label: 'Cloud & DevOps', href: '/services#cloud' },
    ],
  },
];

const socialLinks = [
  { icon: Code2, href: '#', label: 'GitHub' },
  { icon: Globe, href: '#', label: 'Twitter' },
  { icon: Briefcase, href: '#', label: 'LinkedIn' },
];

export default function Footer() {
  return (
    <footer id="main-footer" className="relative border-t border-edge bg-surface">
      {/* Gradient glow at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="text-2xl font-extrabold gradient-text">
              Flxware
            </Link>
            <p className="mt-4 text-muted text-sm leading-relaxed max-w-xs">
              Crafting cutting-edge digital experiences with modern technology.
              We build solutions that transform businesses.
            </p>

            {/* Contact Info */}
            <div className="mt-6 space-y-3">
              <a href="mailto:hello@flxwaretech.com" className="flex items-center gap-3 text-sm text-muted hover:text-primary-light transition-colors">
                <Mail className="w-4 h-4 text-primary" />
                hello@flxwaretech.com
              </a>
              <a href="tel:+971507390610" className="flex items-center gap-3 text-sm text-muted hover:text-primary-light transition-colors">
                <Phone className="w-4 h-4 text-primary" />
                +971 50 739 0610
              </a>
              <div className="flex items-center gap-3 text-sm text-muted">
                <MapPin className="w-4 h-4 text-primary" />
                Digital Worldwide
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-1.5 text-sm text-muted hover:text-primary-light transition-colors"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Column */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Stay Updated
            </h3>
            <p className="text-sm text-muted mb-4">
              Get the latest updates on our projects and technology insights.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-2.5 text-sm bg-surface-light border border-edge rounded-lg text-foreground placeholder:text-subtle focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
              />
              <button
                type="submit"
                className="btn btn-primary btn-sm px-4"
                aria-label="Subscribe"
              >
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-edge flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-subtle">
            © {new Date().getFullYear()} Flxware. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="p-2.5 rounded-lg text-subtle hover:text-primary-light hover:bg-primary/10 transition-all duration-200"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
