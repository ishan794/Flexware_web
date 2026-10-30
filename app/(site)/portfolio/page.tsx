import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import PageHeader from '@/app/components/PageHeader';
import PageCta from '@/app/components/PageCta';
import Reveal from '@/app/components/Reveal';
import { getIcon } from '@/app/lib/icons';
import { getPublished } from '@/app/lib/server/content';
import { pageMetadata } from '@/app/lib/server/seo';

export const generateMetadata = () => pageMetadata('portfolio');

export default async function PortfolioPage() {
  const projects = await getPublished('projects');

  return (
    <>
      <PageHeader
        label="Portfolio"
        title="Work we're proud of"
        description="Explore our recent projects and see how we've helped businesses turn ideas into successful digital products."
      />

      <div className="container-page py-14 sm:py-20">
        {projects.length === 0 ? (
          <p className="rounded-3xl border border-dashed border-edge-hover p-10 text-center text-muted">
            New case studies are on the way.{' '}
            <Link href="/contact" className="link-underline font-semibold text-primary">
              Get in touch
            </Link>{' '}
            to discuss your project.
          </p>
        ) : (
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => {
              const Icon = getIcon(p.icon);
              return (
                <Reveal as="li" key={p.slug} index={i} className="flex">
                  <Link
                    href={`/portfolio/${p.slug}`}
                    className="group flex w-full flex-col overflow-hidden rounded-3xl border border-edge bg-surface transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-edge-active hover:shadow-elevated-lg"
                  >
                    {/* Visual header: cover image when provided, otherwise a branded panel */}
                    <div className="relative aspect-[16/9] overflow-hidden border-b border-edge bg-surface-light">
                      {p.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={p.imageUrl}
                          alt=""
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <>
                          <div aria-hidden="true" className="bg-tech-grid absolute inset-0" />
                          <div
                            aria-hidden="true"
                            className="absolute inset-0"
                            style={{ background: 'radial-gradient(circle at 70% 30%, var(--theme-glow-a), transparent 60%), radial-gradient(circle at 20% 90%, var(--theme-glow-b), transparent 55%)' }}
                          />
                          <div className="relative flex h-full items-center justify-center">
                            <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-edge bg-background/80 text-primary shadow-elevated transition-transform duration-500 group-hover:scale-110">
                              <Icon className="h-8 w-8" aria-hidden="true" />
                            </span>
                          </div>
                        </>
                      )}
                      <span className="absolute left-4 top-4 rounded-full border border-edge bg-background/85 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
                        {p.type} · {p.year}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <h2 className="text-h3 flex items-start justify-between gap-3 text-foreground">
                        {p.title}
                        <ArrowUpRight
                          className="mt-1 h-5 w-5 shrink-0 text-subtle transition-[transform,color] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                          aria-hidden="true"
                        />
                      </h2>
                      <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-muted">{p.summary}</p>
                      <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technologies">
                        {p.cardTech.map((t) => (
                          <li key={t} className="rounded-md bg-surface-light px-2 py-1 text-xs font-medium text-muted">
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        )}
      </div>

      <div className="px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <PageCta title="Have a project like these?" text="Tell us what you're building and we'll show you how we'd approach it." cta="Start a similar project" />
      </div>
    </>
  );
}
