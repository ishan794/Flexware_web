import { MapPin, Globe2, Clock } from 'lucide-react';
import PageHeader from '@/app/components/PageHeader';
import PageCta from '@/app/components/PageCta';
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
    { icon: Globe2, label: 'Working model', value: 'Remote-first studio' },
    { icon: Clock, label: 'Response time', value: 'Within 24 hours' },
  ];

  return (
    <>
      <PageHeader
        label={about.label}
        title={about.title}
        description={about.intro}
        aside={
          <dl className="grid gap-px overflow-hidden rounded-2xl border border-edge bg-edge sm:min-w-72">
            {facts.map((fact) => (
              <div key={fact.label} className="flex items-center gap-3 bg-surface px-4 py-3.5">
                <fact.icon className="h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
                <div>
                  <dt className="text-xs text-subtle">{fact.label}</dt>
                  <dd className="font-medium text-foreground">{fact.value}</dd>
                </div>
              </div>
            ))}
          </dl>
        }
      />

      <section aria-labelledby="what-we-do" className="section-padding">
        <div className="mx-auto grid max-w-[76rem] gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow mb-4">What we do</p>
            <h2 id="what-we-do" className="text-h2 text-foreground">
              End-to-end product delivery
            </h2>
            <p className="text-lead mt-5">
              We combine modern engineering with strategic thinking to deliver digital solutions that make a real impact.
            </p>
          </Reveal>
          <ul className="grid gap-px overflow-hidden rounded-3xl border border-edge bg-edge sm:grid-cols-2">
            {home.highlights.map((s, i) => {
              const Icon = getIcon(s.icon);
              return (
                <Reveal as="li" key={s.title} index={i % 2} className="bg-surface p-6 sm:p-8">
                  <span className={`mb-5 inline-flex rounded-2xl p-3 ${toneClasses[s.tone as ToneName] ?? toneClasses.primary}`}>
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="text-h3 text-foreground">{s.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{s.description}</p>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      <section aria-labelledby="how-we-work" className="surface-band">
        <div className="section-padding">
          <div className="mx-auto max-w-[76rem]">
            <Reveal className="mb-10 max-w-2xl sm:mb-14">
              <p className="eyebrow mb-4">How we work</p>
              <h2 id="how-we-work" className="text-h2 text-foreground">
                From vision to reality
              </h2>
            </Reveal>
            <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((step, i) => (
                <Reveal as="li" key={step.title} index={i} className="relative overflow-hidden rounded-3xl border border-edge bg-background p-6">
                  <span aria-hidden="true" className="pointer-events-none absolute -right-2 -top-6 font-display text-[6rem] font-semibold leading-none text-edge-hover">
                    {i + 1}
                  </span>
                  <step.icon className="relative mb-10 h-6 w-6 text-secondary" aria-hidden="true" />
                  <h3 className="text-h3 relative text-foreground">
                    <span className="sr-only">Step {i + 1}: </span>
                    {step.title}
                  </h3>
                  <p className="relative mt-2 text-[0.9375rem] leading-relaxed text-muted">{step.description}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Verified-content slots: each renders nothing while its list is empty */}
      <div className="empty:hidden">
        <StatsSection stats={stats} title="Flxware in numbers" />
        <TeamSection members={team} />
        <TestimonialsSection testimonials={testimonials} />
      </div>

      <div className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <PageCta
          title="Let's build something together"
          text="Tell us about your project, or browse the work we've delivered so far."
        />
      </div>
    </>
  );
}
