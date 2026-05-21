'use client';

import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ArrowPathIcon,
  FingerPrintIcon,
  Cog6ToothIcon,
  ServerIcon,
} from '@heroicons/react/20/solid';

const features = [
  { name: 'Push to deploy.', description: 'Ship features fast with automated CI/CD pipelines. From commit to production in minutes.', icon: CloudArrowUpIcon },
  { name: 'SSL certificates.', description: 'Enterprise-grade encryption and certificate management built into every project.', icon: LockClosedIcon },
  { name: 'Simple queues.', description: 'Background job processing, event-driven architecture, and message queues out of the box.', icon: ArrowPathIcon },
  { name: 'Advanced security.', description: 'Auth, audit logging, rate limiting, and data governance as core architecture decisions.', icon: FingerPrintIcon },
  { name: 'Powerful API.', description: 'RESTful and GraphQL APIs designed for scalability. Clean, documented, and version-controlled.', icon: Cog6ToothIcon },
  { name: 'Database backups.', description: 'Automated backups, point-in-time recovery, and multi-region redundancy.', icon: ServerIcon },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-base/7 font-semibold text-primary">Everything you need</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-foreground sm:text-5xl">
            No server? No problem.
          </p>
          <p className="mt-6 text-lg/8 text-muted">
            We handle infrastructure so you can focus on building. Every project ships with a 
            battle-tested stack that scales from day one.
          </p>
        </div>
        <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base/7 text-muted sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-16">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-9">
              <dt className="inline font-semibold text-foreground">
                <feature.icon aria-hidden="true" className="absolute top-1 left-1 size-5 text-primary" />
                {feature.name}
              </dt>{' '}
              <dd className="inline">{feature.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
