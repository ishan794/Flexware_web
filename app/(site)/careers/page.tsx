import Link from 'next/link';
import { ArrowRight, Clock, Layers, MapPin } from 'lucide-react';
import PageHeader from '@/app/components/PageHeader';
import PageCta from '@/app/components/PageCta';
import Reveal from '@/app/components/Reveal';
import { getContent, getPublished } from '@/app/lib/server/content';
import { pageMetadata } from '@/app/lib/server/seo';

export const generateMetadata = () => pageMetadata('careers');

export default async function CareersPage() {
  const [jobs, site] = await Promise.all([getPublished('jobs'), getContent('settings')]);

  return (
    <>
      <PageHeader
        label="Careers"
        title="Build the future with us"
        description="Join a team of passionate people creating exceptional digital experiences. At Flxware, your work matters."
        aside={
          <p className="inline-flex items-center gap-3 rounded-2xl border border-edge bg-surface px-5 py-4">
            <span className="font-display text-3xl font-semibold tabular-nums text-foreground">{jobs.length}</span>
            <span className="text-sm leading-tight text-muted">
              open {jobs.length === 1 ? 'role' : 'roles'}
              <br />
              right now
            </span>
          </p>
        }
      />

      <section aria-labelledby="open-positions" className="container-page py-14 sm:py-20">
        <h2 id="open-positions" className="text-h3 mb-6 text-foreground">
          Open positions
        </h2>
        {jobs.length === 0 ? (
          <p className="rounded-3xl border border-dashed border-edge-hover p-10 text-center text-muted">
            There are no open positions right now. We&apos;re still happy to hear from talented people — see below.
          </p>
        ) : (
          <ul className="divide-y divide-edge overflow-hidden rounded-3xl border border-edge bg-surface">
            {jobs.map((job, i) => (
              <Reveal as="li" key={job.slug} index={i}>
                <Link
                  href={`/careers/${job.slug}`}
                  className="group flex flex-col gap-4 p-5 transition-colors hover:bg-surface-light sm:flex-row sm:items-center sm:justify-between sm:p-7"
                >
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-semibold text-foreground transition-colors group-hover:text-primary sm:text-xl">
                      {job.title}
                    </h3>
                    <ul className="mt-3 flex flex-wrap gap-2 text-sm text-muted">
                      <li className="inline-flex items-center gap-1.5 rounded-full border border-edge px-2.5 py-1">
                        <Layers className="h-3.5 w-3.5" aria-hidden="true" /> {job.dept}
                      </li>
                      <li className="inline-flex items-center gap-1.5 rounded-full border border-edge px-2.5 py-1">
                        <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> {job.type}
                      </li>
                      <li className="inline-flex items-center gap-1.5 rounded-full border border-edge px-2.5 py-1">
                        <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {job.commitment}
                      </li>
                    </ul>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-foreground">
                    View role
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-edge transition-colors group-hover:border-transparent group-hover:bg-secondary group-hover:text-ink">
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        )}
      </section>

      <div className="px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <PageCta
          title="Don't see the right role?"
          text="We're always looking for talented people. Send us your resume and tell us how you could contribute."
          cta={`Email ${site.careersEmail}`}
          href={`mailto:${site.careersEmail}`}
        />
      </div>
    </>
  );
}
