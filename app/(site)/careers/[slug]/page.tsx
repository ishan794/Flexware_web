import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Mail, MapPin, Clock, Check } from 'lucide-react';
import Breadcrumbs from '@/app/components/Breadcrumbs';
import Reveal from '@/app/components/Reveal';
import { getContent, getPublishedJob } from '@/app/lib/server/content';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const job = await getPublishedJob(slug);
  if (!job) return {};
  return {
    title: `${job.title} — Careers`,
    description: `${job.title} (${job.commitment}, ${job.type}) at Flxware. ${(job.about[0] ?? '').slice(0, 110)}…`,
  };
}

export default async function JobPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [job, site] = await Promise.all([getPublishedJob(slug), getContent('settings')]);
  if (!job) notFound();

  const subject = `${job.title} - <First Name> <Last Name>`;

  return (
    <div className="px-4 pb-20 pt-10 sm:px-6 sm:pb-24 sm:pt-14 lg:px-8">
      <article className="mx-auto max-w-4xl">
        <Breadcrumbs items={[{ label: 'Careers', href: '/careers' }, { label: job.title }]} />

        <header className="mb-10 animate-fade-up">
          <ul className="mb-4 flex flex-wrap items-center gap-3 text-sm text-muted">
            <li className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> {job.type}
            </li>
            <li className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {job.commitment}
            </li>
            <li className="rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary-light">{job.dept}</li>
          </ul>
          <h1 className="text-display text-foreground">{job.title}</h1>
        </header>

        <Reveal as="section" className="glass-card mb-6 rounded-2xl p-6 sm:p-8">
          <h2 className="mb-4 text-2xl font-bold text-foreground">About the Role</h2>
          <div className="space-y-4 leading-relaxed text-muted">
            {job.about.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
        </Reveal>

        <Reveal as="section" className="glass-card mb-6 rounded-2xl p-6 sm:p-8">
          <h2 className="mb-4 text-2xl font-bold text-foreground">Requirements</h2>
          <ul className="space-y-3 text-muted">
            {job.requirements.map((r) => (
              <li key={r} className="flex items-start gap-3 text-sm sm:text-base">
                <Check className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {r}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal as="section" className="glass-card mb-12 rounded-2xl p-6 sm:p-8">
          <h2 className="mb-4 text-2xl font-bold text-foreground">How to Apply</h2>
          <p className="mb-2 text-muted">Send your resume and cover letter to our careers email.</p>
          <p className="mb-6 text-sm text-muted">
            Use the subject line: <span className="break-words font-medium text-primary-light">{subject}</span>
          </p>
          <a
            href={`mailto:${site.careersEmail}?subject=${encodeURIComponent(subject)}`}
            className="btn btn-primary max-w-full"
          >
            <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="truncate">Apply via {site.careersEmail}</span>
          </a>
        </Reveal>

        <div className="text-center">
          <Link href="/careers" className="btn btn-outline">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> View All Positions
          </Link>
        </div>
      </article>
    </div>
  );
}
