import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import OpenAssistantButton from '../ai-assistant/OpenAssistantButton';
import type { HomepageContent } from '../../lib/cms/types';
import { defaultContent } from '../../lib/cms/defaults';

const blobClip =
  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)';

/** Homepage hero; copy is edited in Admin → Homepage */
export default function HeroSection({ hero = defaultContent.homepage.hero }: { hero?: HomepageContent['hero'] }) {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      {/* One image for both themes; the overlay tint adapts via theme tokens (no theme-dependent src, no hydration mismatch) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2000&q=70&sat=-100"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 -z-20 size-full object-cover opacity-40 dark:opacity-60"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-background/80 via-background/85 to-background"
      />
      <div aria-hidden="true" className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div
          style={{ clipPath: blobClip }}
          className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-gradient-to-tr from-primary/40 to-secondary/40 opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl py-20 text-center sm:py-28 lg:py-36">
          {hero.badge && (
          <div className="mb-8 flex justify-center animate-fade-up">
            <p className="relative flex flex-wrap items-center justify-center gap-x-1.5 rounded-full px-4 py-1.5 text-sm text-muted ring-1 ring-edge transition-colors hover:ring-edge-hover">
              {hero.badge}
              <OpenAssistantButton className="font-semibold text-primary-light hover:text-foreground">
                <span aria-hidden="true" className="absolute inset-0 rounded-full" />
                Try it now <span aria-hidden="true">&rarr;</span>
              </OpenAssistantButton>
            </p>
          </div>
          )}
          <h1
            id="hero-title"
            className="text-4xl font-extrabold tracking-tight text-foreground animate-fade-up sm:text-6xl lg:text-7xl"
            style={{ animationDelay: '80ms' }}
          >
            {hero.title}
          </h1>
          <p
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted animate-fade-up sm:mt-8 sm:text-xl"
            style={{ animationDelay: '160ms' }}
          >
            {hero.subtitle}
          </p>
          <div
            className="mt-10 flex flex-col items-stretch justify-center gap-3 animate-fade-up sm:flex-row sm:items-center sm:gap-4"
            style={{ animationDelay: '240ms' }}
          >
            <Link href="/contact" className="btn btn-primary btn-lg group">
              {hero.primaryCtaLabel}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
            <Link href="/services" className="btn btn-outline btn-lg">
              {hero.secondaryCtaLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
