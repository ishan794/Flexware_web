import Link from 'next/link';
import { ArrowRight, CloudUpload, Lock, RefreshCw, Fingerprint, Settings, Server } from 'lucide-react';
import Reveal from '../Reveal';

const features = [
  { name: 'Push to deploy', description: 'Automated CI/CD pipelines take features from commit to production in minutes.', icon: CloudUpload },
  { name: 'SSL certificates', description: 'Encryption and certificate management built into every project from day one.', icon: Lock },
  { name: 'Simple queues', description: 'Background jobs, event-driven architecture and message queues out of the box.', icon: RefreshCw },
  { name: 'Advanced security', description: 'Auth, audit logging, rate limiting and data governance as core decisions.', icon: Fingerprint },
  { name: 'Powerful APIs', description: 'RESTful and GraphQL APIs designed to scale: clean, documented, versioned.', icon: Settings },
  { name: 'Database backups', description: 'Automated backups, point-in-time recovery and redundancy planned for your needs.', icon: Server },
];

/** Infrastructure benefits — split layout on a layered surface band */
export default function FeaturesSection() {
  return (
    <section id="features" aria-labelledby="features-title" className="surface-band relative overflow-hidden">
      <div aria-hidden="true" className="bg-tech-grid absolute inset-0 opacity-60" />
      <div className="section-padding relative">
        <div className="mx-auto grid max-w-[76rem] gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow mb-4">Everything you need</p>
            <h2 id="features-title" className="text-h2 text-foreground">
              No server? No problem.
            </h2>
            <p className="text-lead mt-5 max-w-md">
              We handle the infrastructure so you can focus on your product. Every project ships on a battle-tested
              stack that scales from day one.
            </p>
            <Link href="/content" className="btn btn-outline group mt-8">
              How we deliver
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </Reveal>

          <dl className="grid overflow-hidden rounded-3xl border border-edge bg-edge sm:grid-cols-2" style={{ gap: '1px' }}>
            {features.map((feature, i) => (
              <Reveal key={feature.name} index={i % 2} className="bg-surface p-6 transition-colors duration-300 hover:bg-surface-light sm:p-7">
                <dt className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-edge bg-background text-secondary">
                    <feature.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="font-display text-base font-semibold text-foreground">{feature.name}</span>
                </dt>
                <dd className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{feature.description}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
