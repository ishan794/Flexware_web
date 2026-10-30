import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';
import SectionHeading from '@/app/components/SectionHeading';
import Reveal from '@/app/components/Reveal';
import { getIcon } from '@/app/lib/icons';
import { getPublished } from '@/app/lib/server/content';
import { pageMetadata } from '@/app/lib/server/seo';

export const generateMetadata = () => pageMetadata('services');

export default async function ServicesPage() {
  const services = await getPublished('services');

  return (
    <div className="px-4 pb-20 pt-12 sm:px-6 sm:pb-24 sm:pt-16 lg:px-8">
      <SectionHeading
        as="h1"
        label="Services"
        title="Our Services"
        description="We offer comprehensive software development services to help your business thrive in the digital age."
      />

      {/* In-page jump links */}
      <nav aria-label="Services on this page" className="mx-auto -mt-4 mb-12 max-w-4xl sm:mb-16">
        <ul className="flex flex-wrap justify-center gap-2">
          {services.map((s) => (
            <li key={s.slug}>
              <a
                href={`#${s.slug}`}
                className="inline-flex min-h-10 items-center rounded-full border border-edge px-4 text-sm text-muted transition-colors hover:border-primary/40 hover:text-foreground"
              >
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mx-auto mb-20 grid max-w-7xl grid-cols-1 gap-6 sm:mb-24 lg:grid-cols-2 lg:gap-8">
        {services.map((s, i) => {
          const Icon = getIcon(s.icon);
          return (
          <Reveal
            as="article"
            key={s.slug}
            id={s.slug}
            index={i % 2}
            className="glass-card scroll-mt-28 rounded-2xl p-6 sm:p-8 lg:p-10"
          >
            <div className="mb-6 inline-flex rounded-xl bg-primary/10 p-3 text-primary">
              <Icon className="h-6 w-6" aria-hidden="true" />
            </div>
            <h2 className="mb-4 text-xl font-bold text-foreground sm:text-2xl">{s.title}</h2>
            <p className="mb-6 leading-relaxed text-muted">{s.description}</p>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {s.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-muted">
                  <CheckCircle className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>
          );
        })}
      </div>

      <Reveal className="mx-auto max-w-4xl text-center">
        <div className="glass-card rounded-3xl px-6 py-12 sm:p-12 md:p-16">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">Need a Custom Solution?</h2>
          <p className="mx-auto mb-8 max-w-xl text-muted">
            Let&apos;s discuss your project requirements and find the right approach.
          </p>
          <Link href="/contact" className="btn btn-primary btn-lg group">
            Start a Project
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
