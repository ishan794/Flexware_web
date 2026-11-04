import Link from 'next/link';
import { ArrowRight, Mail, MapPin, Clock, Briefcase, Layers } from 'lucide-react';
import SectionHeading from '@/app/components/SectionHeading';
import Reveal from '@/app/components/Reveal';
import { getContent, getPublished } from '@/app/lib/server/content';
import { pageMetadata } from '@/app/lib/server/seo';

export const generateMetadata = () => pageMetadata('careers');

export default async function CareersPage() {
  const [jobs, site] = await Promise.all([getPublished('jobs'), getContent('settings')]);

  return (
    <div className="px-4 pb-20 pt-12 sm:px-6 sm:pb-24 sm:pt-16 lg:px-8">
      <SectionHeading
        as="h1"
        label="We're hiring"
        title="Build the Future With Us"
        description="Join a team of passionate innovators dedicated to creating exceptional digital experiences. At Flxware, your work matters."
      />

      <section aria-labelledby="open-positions" className="mx-auto mb-20 max-w-4xl">
        <div className="mb-6 flex items-baseline justify-between gap-4">
          <h2 id="open-positions" className="text-2xl font-bold text-foreground">
            Open Positions
          </h2>
          <p className="text-sm text-muted">
            {jobs.length === 1 ? '1 role' : `${jobs.length} roles`}
          </p>
        </div>
        {jobs.length === 0 && (
          <p className="rounded-2xl border border-dashed border-edge p-8 text-center text-muted">
            There are no open positions right now. We&apos;re still happy to hear from talented people — see below.
          </p>
        )}
        <ul className="space-y-4">
          {jobs.map((job, i) => (
            <Reveal as="li" key={job.slug} index={i}>
              <Link
                href={`/careers/${job.slug}`}
                className="group glass-card card-interactive gradient-border flex flex-col justify-between gap-4 rounded-2xl p-5 sm:flex-row sm:items-center sm:p-6"
              >
                <div className="min-w-0">
                  <h3 className="text-lg font-bold text-foreground transition-colors group-hover:text-primary-light">
                    {job.title}
                  </h3>
                  <ul className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
                    <li className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> {job.type}
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {job.commitment}
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Layers className="h-3.5 w-3.5" aria-hidden="true" /> {job.dept}
                    </li>
                  </ul>
                </div>
                <span className="flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary-light">
                  View details
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      <Reveal className="mx-auto max-w-4xl text-center">
        <div className="glass-card rounded-3xl px-6 py-12 sm:p-12 md:p-16">
          <Briefcase className="mx-auto mb-5 h-8 w-8 text-primary" aria-hidden="true" />
          <h2 className="mb-4 text-2xl font-bold text-foreground sm:text-3xl">Don&apos;t See the Right Role?</h2>
          <p className="mx-auto mb-8 max-w-lg text-muted">
            We&apos;re always looking for talented individuals. Send us your resume and tell us how you can contribute.
          </p>
          <a href={`mailto:${site.careersEmail}`} className="btn btn-primary btn-lg max-w-full">
            <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="truncate">{site.careersEmail}</span>
          </a>
        </div>
      </Reveal>
    </div>
  );
}
