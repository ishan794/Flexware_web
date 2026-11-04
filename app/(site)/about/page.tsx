import Link from 'next/link';
import { ArrowRight, MapPin, Clock } from 'lucide-react';
import SectionHeading from '@/app/components/SectionHeading';
import Reveal from '@/app/components/Reveal';
import StatsSection from '@/app/components/sections/StatsSection';
import TeamSection from '@/app/components/sections/TeamSection';
import TestimonialsSection from '@/app/components/sections/TestimonialsSection';
import { processSteps } from '@/app/lib/site';
import { getIcon, toneClasses, type ToneName } from '@/app/lib/icons';
import { getContent, getPublished } from '@/app/lib/server/content';
import { pageMetadata } from '@/app/lib/server/seo';

export const generateMetadata = () => pageMetadata('about');

// Intro copy is edited in Admin → About. Stats, team and testimonials render only
// once entries are published in the admin.
export default async function AboutPage() {
  const [about, site, home, stats, team, testimonials] = await Promise.all([
    getContent('about'),
    getContent('settings'),
    getContent('homepage'),
    getPublished('stats'),
    getPublished('team'),
    getPublished('testimonials'),
  ]);
  const facts = [
    { icon: MapPin, label: 'Locations', value: site.locations },
    { icon: Clock, label: 'Response time', value: 'Within 24 hours' },
  ];

  return (
    <div className="px-4 pb-20 pt-12 sm:px-6 sm:pb-24 sm:pt-16 lg:px-8">
      <SectionHeading
        as="h1"
        label={about.label}
        title={about.title}
        description={about.intro}
      />

      {/* Two facts: a narrower container keeps the cards near their original width
          instead of stretching them across the full measure. */}
      <dl className="mx-auto mb-20 grid max-w-2xl grid-cols-1 gap-4 sm:mb-28 sm:grid-cols-2">
        {facts.map((fact, i) => (
          <Reveal key={fact.label} index={i} className="glass-card flex items-center gap-4 rounded-2xl p-5">
            <span className="rounded-xl bg-primary/10 p-2.5 text-primary">
              <fact.icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-subtle">{fact.label}</dt>
              <dd className="mt-0.5 font-semibold text-foreground">{fact.value}</dd>
            </div>
          </Reveal>
        ))}
      </dl>

      <section className="mx-auto mb-20 max-w-7xl sm:mb-28">
        <SectionHeading
          label="What we do"
          title="End-to-end product delivery"
          description="We combine cutting-edge technology with strategic thinking to deliver digital solutions that make a real impact."
        />
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {home.highlights.map((s, i) => {
            const Icon = getIcon(s.icon);
            return (
            <Reveal as="li" key={s.title} index={i} className="glass-card rounded-2xl p-6">
              <span className={`mb-4 inline-flex rounded-xl p-3 ${toneClasses[s.tone as ToneName] ?? toneClasses.primary}`}>
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mb-2 text-lg font-bold text-foreground">{s.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{s.description}</p>
            </Reveal>
            );
          })}
        </ul>
      </section>

      <section className="mx-auto mb-20 max-w-6xl sm:mb-28">
        <SectionHeading
          label="How we work"
          title="From vision to reality"
          description="Our proven process ensures every project is delivered on time, on budget, and beyond expectations."
        />
        <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <Reveal as="li" key={step.title} index={i} className="glass-card rounded-2xl p-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-dark text-sm font-bold text-white">
                  {i + 1}
                </span>
                <step.icon className="h-5 w-5 text-primary" aria-hidden="true" />
              </div>
              <h3 className="mb-2 font-bold text-foreground">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{step.description}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Verified-content slots: each renders nothing while its list is empty */}
      <div className="-mx-4 mb-20 sm:-mx-6 sm:mb-28 lg:-mx-8 empty:hidden">
        <StatsSection stats={stats} title="Flxware in numbers" />
        <TeamSection members={team} />
        <TestimonialsSection testimonials={testimonials} />
      </div>

      <Reveal className="mx-auto max-w-4xl text-center">
        <div className="glass-card rounded-3xl px-6 py-12 sm:p-12 md:p-16">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">Let&apos;s build something together</h2>
          <p className="mx-auto mb-8 max-w-xl text-muted">
            Tell us about your project, or see the work we&apos;ve delivered so far.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
            <Link href="/contact" className="btn btn-primary btn-lg group">
              Start a project
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
            <Link href="/portfolio" className="btn btn-outline btn-lg">
              View our portfolio
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
