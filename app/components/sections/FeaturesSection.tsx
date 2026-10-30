import { CloudUpload, Lock, RefreshCw, Fingerprint, Settings, Server } from 'lucide-react';
import SectionHeading from '../SectionHeading';
import Reveal from '../Reveal';

const features = [
  { name: 'Push to deploy', description: 'Ship features fast with automated CI/CD pipelines. From commit to production in minutes.', icon: CloudUpload },
  { name: 'SSL certificates', description: 'Enterprise-grade encryption and certificate management built into every project.', icon: Lock },
  { name: 'Simple queues', description: 'Background job processing, event-driven architecture, and message queues out of the box.', icon: RefreshCw },
  { name: 'Advanced security', description: 'Auth, audit logging, rate limiting, and data governance as core architecture decisions.', icon: Fingerprint },
  { name: 'Powerful API', description: 'RESTful and GraphQL APIs designed for scalability. Clean, documented, and version-controlled.', icon: Settings },
  { name: 'Database backups', description: 'Automated backups, point-in-time recovery, and multi-region redundancy.', icon: Server },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="section-padding">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          align="left"
          label="Everything you need"
          title="No server? No problem."
          description="We handle infrastructure so you can focus on building. Every project ships with a battle-tested stack that scales from day one."
        />
        <dl className="grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <Reveal key={feature.name} index={i % 3} className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <feature.icon aria-hidden="true" className="h-5 w-5" />
              </div>
              <div>
                <dt className="font-semibold text-foreground">{feature.name}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-muted sm:text-base">{feature.description}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
