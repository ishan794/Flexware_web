'use client';

import Link from 'next/link';
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  FolderKanban,
  Home,
  ImageIcon,
  Mail,
  MessageSquareQuote,
  Search,
  Shapes,
  Users,
  Wrench,
} from 'lucide-react';
import { useAdminData } from '../lib/useAdminData';
import { ErrorBanner, LoadingRows, PageHeader } from '../components/fields';

interface Overview {
  inquiries: {
    new: number;
    total: number;
    recent: { id: string; name: string; email: string; message: string; status: string; createdAt: string }[];
  };
  published: Record<'services' | 'projects' | 'jobs' | 'testimonials' | 'logos' | 'team' | 'stats', number>;
  media: number;
}

const contentCards = [
  { key: 'services', label: 'Services', href: '/admin/services', icon: Wrench },
  { key: 'projects', label: 'Projects', href: '/admin/portfolio', icon: FolderKanban },
  { key: 'jobs', label: 'Open roles', href: '/admin/careers', icon: Briefcase },
  { key: 'testimonials', label: 'Testimonials', href: '/admin/testimonials', icon: MessageSquareQuote },
  { key: 'logos', label: 'Client logos', href: '/admin/logos', icon: Shapes },
  { key: 'team', label: 'Team members', href: '/admin/team', icon: Users },
  { key: 'stats', label: 'Stats', href: '/admin/stats', icon: BarChart3 },
] as const;

const fmt = (iso: string) =>
  new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });

export default function Dashboard() {
  const { data, error, reload: load } = useAdminData<Overview>('/api/admin/overview');

  return (
    <>
      <PageHeader title="Dashboard" description="What's live on the website and what needs your attention." />
      {error && <ErrorBanner message={error} onRetry={load} />}
      {!data && !error && <LoadingRows rows={3} />}

      {data && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Link
              href="/admin/inquiries?status=NEW"
              className="glass-card card-interactive flex items-center gap-4 rounded-2xl p-5"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Mail className="h-6 w-6" aria-hidden="true" />
              </span>
              <div className="flex-1">
                <p className="text-3xl font-bold tabular-nums text-foreground">{data.inquiries.new}</p>
                <p className="text-sm text-muted">
                  new {data.inquiries.new === 1 ? 'inquiry' : 'inquiries'} · {data.inquiries.total} total
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-subtle" aria-hidden="true" />
            </Link>
            <Link href="/admin/media" className="glass-card card-interactive flex items-center gap-4 rounded-2xl p-5">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                <ImageIcon className="h-6 w-6" aria-hidden="true" />
              </span>
              <div className="flex-1">
                <p className="text-3xl font-bold tabular-nums text-foreground">{data.media}</p>
                <p className="text-sm text-muted">files in the media library</p>
              </div>
              <ArrowRight className="h-5 w-5 text-subtle" aria-hidden="true" />
            </Link>
          </div>

          <section aria-labelledby="published-heading">
            <h2 id="published-heading" className="mb-3 text-lg font-semibold text-foreground">
              Published on the website
            </h2>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {contentCards.map(({ key, label, href, icon: Icon }) => {
                const count = data.published[key];
                return (
                  <li key={key}>
                    <Link href={href} className="block rounded-xl border border-edge bg-surface p-4 transition-colors hover:border-primary/40">
                      <Icon className="mb-2 h-4 w-4 text-primary" aria-hidden="true" />
                      <p className="text-2xl font-bold tabular-nums text-foreground">{count}</p>
                      <p className="text-sm text-muted">{label}</p>
                      {count === 0 && ['testimonials', 'logos', 'team', 'stats'].includes(key) && (
                        <p className="mt-1 text-xs text-subtle">Section hidden on site</p>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>

          <section aria-labelledby="recent-heading">
            <div className="mb-3 flex items-center justify-between">
              <h2 id="recent-heading" className="text-lg font-semibold text-foreground">
                Latest inquiries
              </h2>
              <Link href="/admin/inquiries" className="link-underline text-sm font-medium text-primary-light">
                View all
              </Link>
            </div>
            {data.inquiries.recent.length === 0 ? (
              <p className="rounded-xl border border-dashed border-edge p-6 text-center text-sm text-muted">
                No inquiries yet. Contact form submissions will appear here.
              </p>
            ) : (
              <ul className="divide-y divide-edge overflow-hidden rounded-xl border border-edge bg-surface">
                {data.inquiries.recent.map((q) => (
                  <li key={q.id}>
                    <Link href={`/admin/inquiries?open=${q.id}`} className="flex flex-col gap-1 px-4 py-3 transition-colors hover:bg-surface-light sm:flex-row sm:items-center sm:gap-4">
                      <span className="flex items-center gap-2 font-medium text-foreground sm:w-48 sm:shrink-0">
                        {q.status === 'NEW' && <span className="h-2 w-2 rounded-full bg-primary" aria-label="New" />}
                        <span className="truncate">{q.name}</span>
                      </span>
                      <span className="min-w-0 flex-1 truncate text-sm text-muted">{q.message}</span>
                      <time className="shrink-0 text-xs text-subtle" dateTime={q.createdAt}>
                        {fmt(q.createdAt)}
                      </time>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section aria-labelledby="quick-heading">
            <h2 id="quick-heading" className="mb-3 text-lg font-semibold text-foreground">
              Quick links
            </h2>
            <div className="flex flex-wrap gap-2">
              <Link href="/admin/homepage" className="btn btn-outline btn-sm"><Home className="h-4 w-4" aria-hidden="true" /> Edit homepage</Link>
              <Link href="/admin/seo" className="btn btn-outline btn-sm"><Search className="h-4 w-4" aria-hidden="true" /> Page titles &amp; SEO</Link>
              <a href="/" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">View website ↗</a>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
