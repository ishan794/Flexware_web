import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import OpenAssistantButton from '../ai-assistant/OpenAssistantButton';
import HeroVisual from './HeroVisual';
import { getIcon } from '../../lib/icons';
import type { Highlight, HomepageContent } from '../../lib/cms/types';
import { defaultContent } from '../../lib/cms/defaults';

/** Homepage hero; copy is edited in Admin → Homepage, capability chips come from the service highlights */
export default function HeroSection({
  hero = defaultContent.homepage.hero,
  capabilities = defaultContent.homepage.highlights,
}: {
  hero?: HomepageContent['hero'];
  capabilities?: Highlight[];
}) {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      {/* Backdrop: fading technical grid + two restrained brand glows */}
      <div aria-hidden="true" className="bg-tech-grid absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="absolute -top-40 right-[-10%] -z-10 h-[34rem] w-[34rem] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--theme-glow-a), transparent 65%)' }}
      />
      <div
        aria-hidden="true"
        className="absolute -left-40 top-1/3 -z-10 h-[28rem] w-[28rem] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--theme-glow-b), transparent 65%)' }}
      />

      <div className="container-page grid items-center gap-16 pb-20 pt-12 sm:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-12 lg:pb-28 lg:pt-20">
        <div className="max-w-2xl">
          {hero.badge && (
            <p
              className="relative mb-7 inline-flex max-w-full flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-edge bg-surface/80 py-1 pl-1.5 pr-3.5 text-sm text-muted shadow-elevated animate-fade-up"
            >
              <span className="rounded-full bg-secondary/15 px-2 py-0.5 text-xs font-semibold text-secondary">New</span>
              <span>{hero.badge}</span>
              <OpenAssistantButton className="inline-flex items-center gap-0.5 font-semibold text-foreground hover:text-primary">
                <span aria-hidden="true" className="absolute inset-0 rounded-full" />
                Try it now <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </OpenAssistantButton>
            </p>
          )}

          <h1 id="hero-title" className="text-display text-foreground animate-fade-up" style={{ animationDelay: '60ms' }}>
            {hero.title}
          </h1>

          <p className="text-lead mt-6 max-w-xl animate-fade-up" style={{ animationDelay: '120ms' }}>
            {hero.subtitle}
          </p>

          <div className="mt-9 flex flex-col gap-3 animate-fade-up sm:flex-row sm:items-center" style={{ animationDelay: '180ms' }}>
            <Link href="/contact" className="btn btn-primary btn-lg group">
              {hero.primaryCtaLabel}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
            <Link href="/services" className="btn btn-outline btn-lg">
              {hero.secondaryCtaLabel}
            </Link>
          </div>

          {capabilities.length > 0 && (
            <div className="mt-10 animate-fade-up border-t border-edge pt-6" style={{ animationDelay: '240ms' }}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-subtle">What we build</p>
              <ul className="flex flex-wrap gap-2">
                {capabilities.map((c) => {
                  const Icon = getIcon(c.icon);
                  return (
                    <li key={c.title}>
                      <Link
                        href={c.href}
                        className="inline-flex items-center gap-2 rounded-full border border-edge bg-surface/70 px-3 py-1.5 text-sm text-muted transition-colors hover:border-edge-active hover:text-foreground"
                      >
                        <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                        {c.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        <div className="relative pb-6 pl-4 pr-2 pt-6 sm:pl-10 lg:pl-0">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
