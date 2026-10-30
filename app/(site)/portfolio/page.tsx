import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '@/app/components/SectionHeading';
import Reveal from '@/app/components/Reveal';
import { getIcon } from '@/app/lib/icons';
import { getPublished } from '@/app/lib/server/content';
import { pageMetadata } from '@/app/lib/server/seo';

export const generateMetadata = () => pageMetadata('portfolio');

export default async function PortfolioPage() {
  const projects = await getPublished('projects');

  return (
    <div className="px-4 pb-20 pt-12 sm:px-6 sm:pb-24 sm:pt-16 lg:px-8">
      <SectionHeading
        as="h1"
        label="Portfolio"
        title="Our Portfolio"
        description="Explore our recent projects and see how we've helped businesses transform their ideas into successful digital solutions."
      />

      <ul className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {projects.length === 0 && (
          <li className="col-span-full rounded-2xl border border-dashed border-edge p-10 text-center text-muted">
            New case studies are on the way. <Link href="/contact" className="link-underline font-semibold text-primary-light">Get in touch</Link> to discuss your project.
          </li>
        )}
        {projects.map((p, i) => {
          const Icon = getIcon(p.icon);
          return (
          <Reveal as="li" key={p.slug} index={i} className="flex">
            <Link
              href={`/portfolio/${p.slug}`}
              className="group glass-card card-interactive gradient-border flex w-full flex-col rounded-2xl p-6 sm:p-8"
            >
              <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary-light">
                <Icon className="h-5 w-5" aria-hidden="true" />
                {p.type} · {p.year}
              </p>
              <h2 className="mb-3 text-2xl font-bold text-foreground transition-colors group-hover:text-primary-light">
                {p.title}
              </h2>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-muted">{p.summary}</p>
              <ul className="mb-6 flex flex-wrap gap-2" aria-label="Technologies">
                {p.cardTech.map((t) => (
                  <li key={t} className="rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary-light">
                    {t}
                  </li>
                ))}
              </ul>
              <span className="flex items-center gap-1.5 text-sm font-semibold text-primary-light">
                View project details
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          </Reveal>
          );
        })}
      </ul>
    </div>
  );
}
