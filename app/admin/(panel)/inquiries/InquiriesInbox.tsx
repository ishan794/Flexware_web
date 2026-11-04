'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAdminData } from '../../lib/useAdminData';
import { Archive, ArrowLeft, Inbox, Mail, MailOpen, Phone, Search, Trash2 } from 'lucide-react';
import { showToast } from '@/app/components/Toast';
import { adminFetch, errorMessage } from '../../lib/client';
import ConfirmDialog from '../../components/ConfirmDialog';
import { EmptyState, ErrorBanner, LoadingRows, PageHeader } from '../../components/fields';

type Status = 'NEW' | 'READ' | 'ARCHIVED';
interface Inquiry {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  phone: string | null;
  message: string;
  source: string;
  status: Status;
  createdAt: string;
}

const tabs: { value: Status | 'ALL'; label: string }[] = [
  { value: 'NEW', label: 'New' },
  { value: 'READ', label: 'Read' },
  { value: 'ARCHIVED', label: 'Archived' },
  { value: 'ALL', label: 'All' },
];

const fmt = (iso: string) => new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
const sourceLabel = (s: string) => (s === 'home' ? 'Home page form' : 'Contact page form');

export default function InquiriesInbox({
  initialStatus,
  initialOpenId,
}: {
  initialStatus: string | null;
  initialOpenId: string | null;
}) {
  const startStatus = (initialStatus?.toUpperCase() ?? 'ALL') as Status | 'ALL';
  const [status, setStatus] = useState<Status | 'ALL'>(tabs.some((t) => t.value === startStatus) ? startStatus : 'ALL');
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState('');
  const [openId, setOpenId] = useState<string | null>(initialOpenId);
  const [busy, setBusy] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const qs = new URLSearchParams();
  if (status !== 'ALL') qs.set('status', status);
  if (search) qs.set('q', search);
  const remote = useAdminData<{ items: Inquiry[]; totals: Record<Status, number> }>(`/api/admin/inquiries?${qs}`);
  // Show the loading state while a new filter/search is in flight
  const items = remote.loading ? null : (remote.data?.items ?? null);
  const totals = remote.data?.totals ?? null;
  const error = remote.error;
  const load = remote.reload;
  const { setData } = remote;
  const setItems = useCallback(
    (fn: (cur: Inquiry[] | null) => Inquiry[] | null) => setData((d) => (d ? { ...d, items: fn(d.items) ?? [] } : d)),
    [setData]
  );
  const setTotals = useCallback(
    (fn: (cur: Record<Status, number> | null) => Record<Status, number> | null) =>
      setData((d) => (d ? { ...d, totals: fn(d.totals) ?? d.totals } : d)),
    [setData]
  );

  // Debounce the search box
  useEffect(() => {
    const t = setTimeout(() => setSearch(query.trim()), 300);
    return () => clearTimeout(t);
  }, [query]);

  const open = useMemo(() => items?.find((i) => i.id === openId) ?? null, [items, openId]);

  const setItemStatus = useCallback(async (item: Inquiry, next: Status, quiet = false) => {
    try {
      const { item: updated, totals: fresh } = await adminFetch<{ item: Inquiry; totals: Record<Status, number> }>(`/api/admin/inquiries/${item.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: next }),
      });
      setItems((list) => list?.map((i) => (i.id === item.id ? updated : i)) ?? null);
      setTotals(() => fresh);
      if (!quiet) showToast({ type: 'success', title: next === 'ARCHIVED' ? 'Archived' : next === 'READ' ? 'Marked as read' : 'Marked as new' });
    } catch (err) {
      showToast({ type: 'error', title: 'Could not update', message: errorMessage(err) });
    }
  }, [setItems, setTotals]);

  // Opening a new inquiry marks it as read
  const openInquiry = (q: Inquiry) => {
    setOpenId(q.id);
    if (q.status === 'NEW') void setItemStatus(q, 'READ', true);
  };

  const remove = async () => {
    if (!open) return;
    setBusy(true);
    try {
      const { totals: fresh } = await adminFetch<{ totals: Record<Status, number> }>(`/api/admin/inquiries/${open.id}`, { method: 'DELETE' });
      setItems((list) => list?.filter((i) => i.id !== open.id) ?? null);
      setTotals(() => fresh);
      setOpenId(null);
      setConfirmDelete(false);
      showToast({ type: 'success', title: 'Inquiry deleted' });
    } catch (err) {
      showToast({ type: 'error', title: 'Could not delete', message: errorMessage(err) });
    } finally {
      setBusy(false);
    }
  };

  if (open) {
    return (
      <>
        <button type="button" onClick={() => setOpenId(null)} className="btn btn-ghost btn-sm mb-4 px-2">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to inbox
        </button>
        <article className="rounded-2xl border border-edge bg-surface">
          <header className="flex flex-col gap-3 border-b border-edge p-5 sm:flex-row sm:items-start sm:justify-between sm:p-6">
            <div className="min-w-0">
              <h1 className="text-xl font-bold text-foreground">{open.subject || 'Website inquiry'}</h1>
              <p className="mt-1 text-sm text-muted">
                From <strong className="text-foreground">{open.name}</strong> · <time dateTime={open.createdAt}>{fmt(open.createdAt)}</time> · {sourceLabel(open.source)}
              </p>
            </div>
            <span className="w-fit rounded-full bg-surface-lighter px-2.5 py-0.5 text-xs font-semibold text-muted">{open.status.toLowerCase()}</span>
          </header>
          <dl className="grid gap-3 border-b border-edge p-5 text-sm sm:grid-cols-2 sm:p-6">
            <div className="flex items-center gap-2">
              <dt><Mail className="h-4 w-4 text-subtle" aria-label="Email" /></dt>
              <dd className="min-w-0 truncate"><a href={`mailto:${open.email}`} className="link-underline text-primary-light">{open.email}</a></dd>
            </div>
            {open.phone && (
              <div className="flex items-center gap-2">
                <dt><Phone className="h-4 w-4 text-subtle" aria-label="Phone" /></dt>
                <dd><a href={`tel:${open.phone.replace(/[^\d+]/g, '')}`} className="link-underline text-primary-light">{open.phone}</a></dd>
              </div>
            )}
          </dl>
          <div className="whitespace-pre-wrap break-words p-5 leading-relaxed text-foreground sm:p-6">{open.message}</div>
          <footer className="flex flex-wrap gap-2 border-t border-edge p-5 sm:p-6">
            <a
              href={`mailto:${open.email}?subject=${encodeURIComponent(`Re: ${open.subject || 'Your inquiry to Flxware'}`)}`}
              className="btn btn-primary btn-sm"
            >
              <Mail className="h-4 w-4" aria-hidden="true" /> Reply by email
            </a>
            {open.status !== 'ARCHIVED' ? (
              <button type="button" onClick={() => setItemStatus(open, 'ARCHIVED')} className="btn btn-outline btn-sm">
                <Archive className="h-4 w-4" aria-hidden="true" /> Archive
              </button>
            ) : (
              <button type="button" onClick={() => setItemStatus(open, 'READ')} className="btn btn-outline btn-sm">
                <Inbox className="h-4 w-4" aria-hidden="true" /> Move to inbox
              </button>
            )}
            {open.status === 'NEW' ? (
              <button type="button" onClick={() => setItemStatus(open, 'READ')} className="btn btn-outline btn-sm">
                <MailOpen className="h-4 w-4" aria-hidden="true" /> Mark as read
              </button>
            ) : (
              <button type="button" onClick={() => setItemStatus(open, 'NEW')} className="btn btn-outline btn-sm">
                <Mail className="h-4 w-4" aria-hidden="true" /> Mark as new
              </button>
            )}
            <button type="button" onClick={() => setConfirmDelete(true)} className="btn btn-ghost btn-sm text-error sm:ml-auto">
              <Trash2 className="h-4 w-4" aria-hidden="true" /> Delete
            </button>
          </footer>
        </article>
        <ConfirmDialog open={confirmDelete} title="Delete this inquiry?" busy={busy} onClose={() => setConfirmDelete(false)} onConfirm={remove}>
          The message from <strong className="text-foreground">{open.name}</strong> will be permanently deleted. Archive it instead if you
          may need it later.
        </ConfirmDialog>
      </>
    );
  }

  return (
    <>
      <PageHeader title="Inquiries" description="Messages sent through the website's contact forms." />

      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div role="tablist" aria-label="Filter by status" className="flex gap-1 overflow-x-auto rounded-xl border border-edge bg-surface p-1">
          {tabs.map((t) => (
            <button
              key={t.value}
              type="button"
              role="tab"
              aria-selected={status === t.value}
              onClick={() => setStatus(t.value)}
              className={`min-h-9 whitespace-nowrap rounded-lg px-3 text-sm font-medium transition-colors ${
                status === t.value ? 'bg-primary/10 text-primary-light' : 'text-muted hover:text-foreground'
              }`}
            >
              {t.label}
              {totals && t.value !== 'ALL' && <span className="ml-1.5 tabular-nums text-subtle">{totals[t.value]}</span>}
            </button>
          ))}
        </div>
        <div className="relative lg:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" aria-hidden="true" />
          <label htmlFor="inquiry-search" className="sr-only">Search inquiries</label>
          <input
            id="inquiry-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, email or message"
            className="field-input pl-9"
          />
        </div>
      </div>

      {error && <ErrorBanner message={error} onRetry={load} />}
      {!items && !error && <LoadingRows />}
      {items && items.length === 0 && (
        <EmptyState
          title={search ? 'No matching inquiries' : 'Nothing here'}
          description={search ? 'Try a different search.' : 'New contact form submissions will appear here.'}
        />
      )}
      {items && items.length > 0 && (
        <ul className="divide-y divide-edge overflow-hidden rounded-xl border border-edge bg-surface">
          {items.map((q) => (
            <li key={q.id}>
              <button
                type="button"
                onClick={() => openInquiry(q)}
                className="flex w-full flex-col gap-1 px-4 py-3.5 text-left transition-colors hover:bg-surface-light sm:flex-row sm:items-center sm:gap-4"
              >
                <span className="flex items-center gap-2 sm:w-52 sm:shrink-0">
                  {q.status === 'NEW' ? (
                    <span className="h-2 w-2 shrink-0 rounded-full bg-primary" aria-label="Unread" />
                  ) : (
                    <span className="h-2 w-2 shrink-0" aria-hidden="true" />
                  )}
                  <span className={`truncate ${q.status === 'NEW' ? 'font-semibold text-foreground' : 'text-foreground'}`}>{q.name}</span>
                </span>
                <span className="min-w-0 flex-1 truncate text-sm text-muted">
                  {q.subject && <span className="font-medium text-foreground">{q.subject} — </span>}
                  {q.message}
                </span>
                <time className="shrink-0 text-xs text-subtle" dateTime={q.createdAt}>{fmt(q.createdAt)}</time>
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
