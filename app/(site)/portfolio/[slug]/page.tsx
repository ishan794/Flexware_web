import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, CheckCircle, AlertTriangle, Lightbulb } from 'lucide-react';
import Breadcrumbs from '@/app/components/Breadcrumbs';
import Reveal from '@/app/components/Reveal';
import { getPublished, getPublishedProject } from '@/app/lib/server/content';

// Enumerates the slugs so `output: 'export'` can emit a page per project.
// Harmless in the server build: it just pre-renders the same pages at build time.
export async function generateStaticParams() {
  return (await getPublished('projects')).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPublishedProject(slug);
  if (!project) return {};
  return { title: `${project.title} — Case Study`, description: project.summary };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getPublishedProject(slug);
  if (!project) notFound();

  return (
    <div className="px-4 pb-20 pt-10 sm:px-6 sm:pb-24 sm:pt-14 lg:px-8">
      <article className="mx-auto max-w-4xl">
        <Breadcrumbs items={[{ label: 'Portfolio', href: '/portfolio' }, { label: project.title }]} />

        <header className="mb-10 animate-fade-up">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary-light">
            {project.type} · {project.year}
          </p>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">{project.title}</h1>
          <p className="max-w-2xl text-lg leading-relaxed text-muted">{project.tagline}</p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
            {project.tech.map((t) => (
              <li key={t} className="rounded-lg bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary-light">
                {t}
              </li>
            ))}
          </ul>
        </header>

        {project.imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.imageUrl}
            alt=""
            className="mb-10 aspect-video w-full rounded-2xl border border-edge object-cover"
          />
        )}

        {project.facts.length > 0 && (
        <dl className="mb-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {project.facts.map(([k, v]) => (
            <div key={k} className="glass-card rounded-xl p-4">
              <dt className="mb-1 text-xs font-medium uppercase tracking-wide text-subtle">{k}</dt>
              <dd className="text-sm font-semibold text-foreground">{v}</dd>
            </div>
          ))}
        </dl>
        )}

        <Reveal as="section" aria-labelledby="overview" className="glass-card mb-8 rounded-2xl p-6 sm:p-8">
          <h2 id="overview" className="mb-4 text-2xl font-bold text-foreground">
            Project Overview
          </h2>
          {/* Blank lines in the admin textarea become paragraphs, so a long overview stays readable */}
          <div className="mb-8 space-y-4">
            {project.overview.split(/\n\s*\n/).map((para, i) => (
              <p key={i} className="leading-relaxed text-muted">
                {para}
              </p>
            ))}
          </div>
          <h3 className="mb-4 text-lg font-semibold text-foreground">Key Features</h3>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {project.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-muted">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" /> {f}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal as="section" className="glass-card mb-12 rounded-2xl p-6 sm:p-8">
          <h2 className="mb-6 text-2xl font-bold text-foreground">Challenges &amp; Solutions</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-rose">
                <AlertTriangle className="h-4 w-4" aria-hidden="true" /> Challenges faced
              </h3>
              <ul className="list-disc space-y-2 pl-5 text-sm text-muted marker:text-rose">
                {project.challenges.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-emerald">
                <Lightbulb className="h-4 w-4" aria-hidden="true" /> Solutions implemented
              </h3>
              <ul className="list-disc space-y-2 pl-5 text-sm text-muted marker:text-emerald">
                {project.solutions.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col-reverse items-stretch justify-between gap-3 sm:flex-row sm:items-center">
          <Link href="/portfolio" className="btn btn-outline">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All projects
          </Link>
          <Link href="/contact" className="btn btn-primary btn-lg group">
            Start a Similar Project
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </article>
    </div>
  );
}
