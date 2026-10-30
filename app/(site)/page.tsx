import Link from 'next/link';
import { ArrowRight, Atom, Server, Database, Cloud, Smartphone, Code2, Mail } from 'lucide-react';
import Reveal from '@/app/components/Reveal';
import SectionHeading from '@/app/components/SectionHeading';
import Banner from '@/app/components/sections/Banner';
import HeroSection from '@/app/components/sections/HeroSection';
import ServicesBento from '@/app/components/sections/ServicesBento';
import FeaturesSection from '@/app/components/sections/FeaturesSection';
import StatsSection from '@/app/components/sections/StatsSection';
import LogoCloud from '@/app/components/sections/LogoCloud';
import TeamSection from '@/app/components/sections/TeamSection';
import TestimonialsSection from '@/app/components/sections/TestimonialsSection';
import FaqSection from '@/app/components/sections/FaqSection';
import ContactSection from '@/app/components/sections/ContactSection';
import { processSteps } from '@/app/lib/site';
import { getContent, getPublished } from '@/app/lib/server/content';
import { pageMetadata } from '@/app/lib/server/seo';

export const generateMetadata = () => pageMetadata('home');

// Showcase sections (logos, stats, team, testimonials) render nothing until
// entries are published in the admin.

const technologies = [
  { name: 'React', icon: Atom },
  { name: 'Next.js', icon: Code2 },
  { name: 'Node.js', icon: Server },
  { name: 'TypeScript', icon: Code2 },
  { name: 'Flutter', icon: Smartphone },
  { name: 'MongoDB', icon: Database },
  { name: 'AWS', icon: Cloud },
];

export default async function HomePage() {
  const [settings, home, logos, stats, team, testimonials] = await Promise.all([
    getContent('settings'),
    getContent('homepage'),
    getPublished('logos'),
    getPublished('stats'),
    getPublished('team'),
    getPublished('testimonials'),
  ]);

  return (
    <>
      <Banner banner={settings.banner} />
      <HeroSection hero={home.hero} capabilities={home.highlights} />

      {/* Technology stack: a compact band right under the hero */}
      <section aria-labelledby="stack-title" className="border-y border-edge bg-surface/60">
        <div className="container-page flex flex-col gap-5 py-7 lg:flex-row lg:items-center lg:gap-10">
          <h2 id="stack-title" className="shrink-0 font-sans text-sm font-semibold uppercase tracking-wider text-subtle lg:w-48">
            Built on a modern, proven stack
          </h2>
          <ul className="flex flex-wrap gap-x-7 gap-y-3">
            {technologies.map((tech, i) => (
              <Reveal as="li" key={tech.name} index={i} className="flex items-center gap-2 text-base font-medium text-muted">
                <tech.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                {tech.name}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <LogoCloud logos={logos} />
      <ServicesBento items={home.highlights} />
      <FeaturesSection />
      <StatsSection stats={stats} />

      {/* Process: connected timeline */}
      <section id="process" aria-labelledby="process-title" className="section-padding">
        <div className="mx-auto max-w-[76rem]">
          <SectionHeading
            id="process-title"
            label="How we work"
            title="From vision to reality"
            description="A clear, collaborative process keeps every project predictable — from the first conversation to long-term support."
          />
          <ol className="relative grid gap-10 md:grid-cols-4 md:gap-6">
            {/* Connector line */}
            <span
              aria-hidden="true"
              className="absolute bottom-6 left-6 top-6 w-px bg-gradient-to-b from-secondary/60 via-edge-active to-transparent md:bottom-auto md:left-6 md:right-6 md:top-6 md:h-px md:w-auto md:bg-gradient-to-r"
            />
            {processSteps.map((step, i) => (
              <Reveal as="li" key={step.title} index={i} className="relative flex gap-5 md:block">
                <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-edge-active bg-background font-display text-sm font-semibold text-foreground shadow-elevated">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="md:mt-6">
                  <h3 className="text-h3 flex items-center gap-2 text-foreground">
                    <span className="sr-only">Step {i + 1}: </span>
                    <step.icon className="h-5 w-5 text-secondary" aria-hidden="true" />
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-xs text-[0.9375rem] leading-relaxed text-muted">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <TeamSection members={team} />
      <TestimonialsSection testimonials={testimonials} />

      {/* CTA band — fixed brand navy in both themes */}
      <section id="cta" aria-labelledby="cta-title" className="px-4 sm:px-6 lg:px-8">
        <Reveal className="relative mx-auto max-w-[76rem] overflow-hidden rounded-[2rem] bg-[#0b1f3a] px-6 py-14 text-white sm:px-12 sm:py-16 lg:px-16">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'linear-gradient(rgba(184,232,192,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(184,232,192,0.08) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
              maskImage: 'radial-gradient(ellipse 70% 90% at 85% 50%, #000, transparent)',
              WebkitMaskImage: 'radial-gradient(ellipse 70% 90% at 85% 50%, #000, transparent)',
            }}
          />
          <div aria-hidden="true" className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#b8e8c0]/20 blur-3xl" />
          <div className="relative grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <h2 id="cta-title" className="text-h2 text-white">
                {home.cta.title}
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#c9d6e8]">{home.cta.text}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row xl:justify-end">
              <Link
                href="/contact"
                className="btn btn-lg group bg-[#b8e8c0] text-[#0a2240] shadow-[0_8px_30px_-8px_rgba(184,232,192,0.6)] hover:bg-[#cdf1d3]"
              >
                Get a free consultation
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
              <a href={`mailto:${settings.email}`} className="btn btn-lg border border-white/25 text-white hover:border-white/50 hover:bg-white/10">
                <Mail className="h-5 w-5" aria-hidden="true" />
                Email us
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      <FaqSection faqs={home.faqs} email={settings.email} />
      <ContactSection settings={settings} />
    </>
  );
}
