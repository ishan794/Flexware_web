import { Check } from 'lucide-react';
import PageHeader from '@/app/components/PageHeader';
import PageCta from '@/app/components/PageCta';
import Reveal from '@/app/components/Reveal';
import { getIcon } from '@/app/lib/icons';
import { getPublished } from '@/app/lib/server/content';
import { pageMetadata } from '@/app/lib/server/seo';

export const generateMetadata = () => pageMetadata('services');

export default async function ServicesPage() {
  const services = await getPublished('services');

  return (
    <>
      <PageHeader
        label="Services"
        title="Engineering for every stage of your product"
        description="We offer comprehensive software development services to help your business thrive in the digital age."
      />

      <div className="container-page grid grid-cols-[minmax(0,1fr)] gap-10 py-14 sm:py-20 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-14">
        {/* Jump navigation: sticky sidebar on desktop, scrollable chips on mobile */}
        <nav aria-label="Services on this page" className="lg:sticky lg:top-28 lg:self-start">
          <p className="mb-3 hidden text-xs font-semibold uppercase tracking-[0.12em] text-subtle lg:block">On this page</p>
          <ul className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:flex-col lg:gap-0.5 lg:overflow-visible">
            {services.map((s, i) => (
              <li key={s.slug} className="shrink-0">
                <a
                  href={`#${s.slug}`}
                  className="flex min-h-10 items-center gap-3 rounded-full border border-edge px-4 text-sm text-muted transition-colors hover:border-edge-active hover:text-foreground lg:rounded-lg lg:border-transparent lg:px-3 lg:hover:bg-surface"
                >
                  <span className="hidden font-display text-xs tabular-nums text-subtle lg:inline">{String(i + 1).padStart(2, '0')}</span>
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="divide-y divide-edge overflow-hidden rounded-[2rem] border border-edge">
          {services.map((s, i) => {
            const Icon = getIcon(s.icon);
            return (
              <Reveal
                as="article"
                key={s.slug}
                id={s.slug}
                aria-labelledby={`${s.slug}-title`}
                className={`scroll-mt-28 p-6 sm:p-10 ${i % 2 === 0 ? 'bg-surface' : 'bg-surface/40'}`}
              >
                <div className="grid gap-6 md:grid-cols-[auto_minmax(0,1fr)] md:gap-8">
                  <div className="flex items-center gap-4 md:flex-col md:items-start">
                    <span className="font-display text-sm font-semibold tabular-nums text-subtle">{String(i + 1).padStart(2, '0')}</span>
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-edge bg-background text-primary">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                  </div>
                  <div>
                    <h2 id={`${s.slug}-title`} className="text-h3 text-foreground sm:text-[1.75rem]">
                      {s.title}
                    </h2>
                    <p className="mt-3 max-w-2xl leading-relaxed text-muted sm:text-lg">{s.description}</p>
                    {s.features.length > 0 && (
                      <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${s.title} includes`}>
                        {s.features.map((f) => (
                          <li
                            key={f}
                            className="inline-flex items-center gap-1.5 rounded-full border border-edge bg-background/60 px-3 py-1.5 text-sm text-foreground"
                          >
                            <Check className="h-3.5 w-3.5 text-secondary" aria-hidden="true" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      <div className="px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <PageCta title="Need a custom solution?" text="Let's discuss your project requirements and find the right approach together." />
      </div>
    </>
  );
}
