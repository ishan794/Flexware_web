import Link from 'next/link';
import { ArrowRight, ChevronRight, Atom, Server, Database, Cloud, Smartphone, Code2 } from 'lucide-react';
import SectionHeading from '@/app/components/SectionHeading';
import Reveal from '@/app/components/Reveal';
import Banner from '@/app/components/sections/Banner';
import HeroSection from '@/app/components/sections/HeroSection';
import FeaturesSection from '@/app/components/sections/FeaturesSection';
import StatsSection from '@/app/components/sections/StatsSection';
import LogoCloud from '@/app/components/sections/LogoCloud';
import TeamSection from '@/app/components/sections/TeamSection';
import TestimonialsSection from '@/app/components/sections/TestimonialsSection';
import FaqSection from '@/app/components/sections/FaqSection';
import ContactSection from '@/app/components/sections/ContactSection';
import { processSteps } from '@/app/lib/site';
import { getIcon, toneClasses, type ToneName } from '@/app/lib/icons';
import { getContent, getPublished } from '@/app/lib/server/content';
import { pageMetadata } from '@/app/lib/server/seo';

export const generateMetadata = () => pageMetadata('home');

// Showcase sections (logos, stats, team, testimonials) render nothing until
// entries are published in the admin.

const technologies = [
  { name: 'React', icon: Atom },
  { name: 'Node.js', icon: Server },
  { name: 'MongoDB', icon: Database },
  { name: 'AWS', icon: Cloud },
  { name: 'Flutter', icon: Smartphone },
  { name: 'TypeScript', icon: Code2 },
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
      <HeroSection hero={home.hero} />
      <LogoCloud logos={logos} />

      {/* Services */}
      <section id="services-preview" className="section-padding relative">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            label="What We Do"
            title="Solutions That Drive Growth"
            description="We combine cutting-edge technology with strategic thinking to deliver digital solutions that make a real impact."
          />
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {home.highlights.map((service, i) => {
              const Icon = getIcon(service.icon);
              return (
              <Reveal as="li" key={service.title} index={i} className="flex">
                <Link
                  href={service.href}
                  className="group glass-card card-interactive gradient-border flex w-full flex-col rounded-2xl p-6 sm:p-7"
                >
                  <span className={`mb-5 inline-flex w-fit rounded-xl p-3 transition-transform duration-300 group-hover:scale-110 ${toneClasses[service.tone as ToneName] ?? toneClasses.primary}`}>
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mb-3 text-lg font-bold text-foreground sm:text-xl">{service.title}</h3>
                  <p className="mb-6 flex-1 text-sm leading-relaxed text-muted">{service.description}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-light">
                    Learn more
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      <FeaturesSection />
      <StatsSection stats={stats} />

      {/* Process */}
      <section id="process" className="section-padding relative">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            label="How We Work"
            title="From Vision to Reality"
            description="Our proven process ensures every project is delivered on time, on budget, and beyond expectations."
          />
          <ol className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <Reveal as="li" key={step.title} index={i} className="relative flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/15 to-secondary/15 text-primary">
                    <step.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <span
                    aria-hidden="true"
                    className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary-dark text-xs font-bold text-white"
                  >
                    {i + 1}
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-bold text-foreground">
                  <span className="sr-only">Step {i + 1}: </span>
                  {step.title}
                </h3>
                <p className="max-w-xs text-sm leading-relaxed text-muted">{step.description}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <TeamSection members={team} />
      <TestimonialsSection testimonials={testimonials} />

      {/* Technologies */}
      <section id="technologies" className="section-padding relative">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            label="Tech Stack"
            title="Technologies We Use"
            description="We leverage cutting-edge technologies and frameworks to build robust, scalable solutions."
          />
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {technologies.map((tech, i) => (
              <Reveal as="li" key={tech.name} index={i}>
                <div className="group glass-card flex aspect-square flex-col items-center justify-center gap-4 rounded-2xl p-4 hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-edge bg-gradient-to-br from-surface to-surface-lighter text-primary transition-transform duration-300 group-hover:scale-110">
                    <tech.icon className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold text-foreground sm:text-base">{tech.name}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="section-padding relative overflow-hidden">
        <Reveal className="relative mx-auto max-w-4xl">
          <div className="glass-card relative overflow-hidden rounded-3xl px-6 py-12 text-center sm:p-12 md:p-16">
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/5" />
            <div aria-hidden="true" className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-primary/10 blur-[80px]" />
            <div aria-hidden="true" className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-secondary/10 blur-[80px]" />

            <div className="relative">
              <h2 className="mb-5 text-3xl font-extrabold tracking-tight text-foreground md:text-5xl">
                {home.cta.title}
              </h2>
              <p className="mx-auto mb-10 max-w-xl text-base text-muted sm:text-lg">{home.cta.text}</p>
              <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
                <Link href="/contact" className="btn btn-primary btn-lg group">
                  Get a Free Consultation
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
                <Link href="/services" className="btn btn-outline btn-lg">
                  Explore Services
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <FaqSection faqs={home.faqs} email={settings.email} />
      <ContactSection settings={settings} />
    </>
  );
}
