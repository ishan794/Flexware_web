import Reveal from '../Reveal';
import type { CompanyStat } from '../../lib/content';

interface StatsSectionProps {
  stats?: CompanyStat[];
  title?: string;
  description?: string;
}

/**
 * Company figures. Renders nothing until figures are published in Admin → Stats.
 * (The previous figures — 150+ projects, 98%, 99.9% uptime, 40+ team — were unverified
 * and contradicted other copy, so they were removed from the public UI.)
 */
export default function StatsSection({
  stats = [],
  title = 'Trusted by businesses worldwide',
  description = 'Every project is a partnership built on delivery, quality, and measurable results.',
}: StatsSectionProps) {
  if (stats.length === 0) return null;

  return (
    <section aria-labelledby="stats-title" className="relative isolate overflow-hidden border-y border-edge bg-surface/60">
      <div aria-hidden="true" className="absolute -left-32 top-0 -z-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div aria-hidden="true" className="absolute -right-32 bottom-0 -z-10 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="eyebrow mb-5">Our track record</p>
          <h2 id="stats-title" className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{description}</p>
        </Reveal>
        <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:mt-16 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} index={i} className="flex flex-col gap-y-2 border-l-2 border-primary/40 pl-5">
              <dt className="text-sm text-muted">{stat.label}</dt>
              <dd className="order-first text-3xl font-extrabold tracking-tight text-foreground tabular-nums sm:text-4xl">
                {stat.value}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
