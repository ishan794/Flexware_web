'use client';

import { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { ArrowDown, ArrowUp, Eye, EyeOff, ExternalLink, Loader2, Pencil, Plus, Trash2, X } from 'lucide-react';
import { showToast } from '@/app/components/Toast';
import { iconNames, getIcon } from '@/app/lib/icons';
import type { CollectionName } from '@/app/lib/cms/types';
import { AdminApiError, adminFetch, errorMessage } from '../lib/client';
import { useAdminData } from '../lib/useAdminData';
import ConfirmDialog from './ConfirmDialog';
import ImageField from './ImageField';
import {
  EmptyState,
  ErrorBanner,
  IconButton,
  LinesInput,
  LoadingRows,
  PageHeader,
  SelectField,
  TextArea,
  TextInput,
  Toggle,
} from './fields';

type Item = Record<string, unknown> & { id: string; published: boolean; order: number };

export type FieldDef =
  | { name: string; label: string; type: 'text' | 'url'; required?: boolean; hint?: string; maxLength?: number; placeholder?: string; half?: boolean }
  | { name: string; label: string; type: 'textarea'; required?: boolean; hint?: string; maxLength?: number; rows?: number }
  | { name: string; label: string; type: 'slug'; from: string; hint?: string; half?: boolean }
  | { name: string; label: string; type: 'lines'; hint?: string; multiline?: boolean; placeholder?: string }
  | { name: string; label: string; type: 'icon'; half?: boolean }
  | { name: string; label: string; type: 'image'; hint?: string }
  | { name: string; label: string; type: 'facts'; hint?: string };

export interface CollectionConfig {
  name: CollectionName;
  title: string;
  singular: string;
  description: string;
  fields: FieldDef[];
  /** Initial values for "Add" */
  empty: Record<string, unknown>;
  /** New items start hidden for showcase content so nothing goes live by accident */
  defaultPublished: boolean;
  summary: (item: Record<string, unknown>) => { title: string; subtitle?: string; image?: string | null; icon?: string };
  /** Public URL for "View on site" */
  publicHref?: (item: Record<string, unknown>) => string;
  /** Shown when the list is empty */
  emptyHint: string;
}

const slugify = (v: string) =>
  v
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80);

/** Drop server-managed fields before sending */
function toPayload(fields: FieldDef[], draft: Record<string, unknown>) {
  const out: Record<string, unknown> = { published: draft.published };
  for (const f of fields) {
    const v = draft[f.name];
    if (f.type === 'lines') out[f.name] = ((v as string[]) ?? []).map((s) => s.trim()).filter(Boolean);
    else if (f.type === 'facts') out[f.name] = ((v as [string, string][]) ?? []).filter(([a, b]) => a.trim() || b.trim());
    else out[f.name] = v ?? '';
  }
  return out;
}

export default function CollectionManager({ config }: { config: CollectionConfig }) {
  const base = `/api/admin/collections/${config.name}`;
  const remote = useAdminData<{ items: Item[] }>(base);
  const items = remote.data?.items ?? null;
  const loadError = remote.error;
  const load = remote.reload;
  const setItems = (fn: Item[] | null | ((cur: Item[] | null) => Item[] | null)) =>
    remote.setData((d) => ({ items: (typeof fn === 'function' ? fn(d?.items ?? null) : fn) ?? [] }));
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [deleting, setDeleting] = useState<Item | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);


  const togglePublished = async (item: Item) => {
    setBusyId(item.id);
    try {
      const { item: updated } = await adminFetch<{ item: Item }>(`${base}/${item.id}`, {
        method: 'PUT',
        body: JSON.stringify({ published: !item.published }),
      });
      setItems((list) => list?.map((i) => (i.id === item.id ? updated : i)) ?? null);
      showToast({
        type: 'success',
        title: updated.published ? 'Published' : 'Hidden from website',
        message: config.summary(updated).title,
      });
    } catch (err) {
      showToast({ type: 'error', title: 'Could not update', message: errorMessage(err) });
    } finally {
      setBusyId(null);
    }
  };

  const move = async (index: number, dir: -1 | 1) => {
    if (!items) return;
    const next = [...items];
    [next[index], next[index + dir]] = [next[index + dir], next[index]];
    const previous = items;
    setItems(next); // optimistic
    try {
      await adminFetch(base, { method: 'PATCH', body: JSON.stringify({ ids: next.map((i) => i.id) }) });
    } catch (err) {
      setItems(previous);
      showToast({ type: 'error', title: 'Could not reorder', message: errorMessage(err) });
    }
  };

  const confirmDelete = async () => {
    if (!deleting) return;
    setBusyId(deleting.id);
    try {
      await adminFetch(`${base}/${deleting.id}`, { method: 'DELETE' });
      setItems((list) => list?.filter((i) => i.id !== deleting.id) ?? null);
      showToast({ type: 'success', title: `${config.singular} deleted` });
      setDeleting(null);
    } catch (err) {
      showToast({ type: 'error', title: 'Could not delete', message: errorMessage(err) });
    } finally {
      setBusyId(null);
    }
  };

  const publishedCount = items?.filter((i) => i.published).length ?? 0;

  return (
    <>
      <PageHeader
        title={config.title}
        description={config.description}
        actions={
          <button
            type="button"
            onClick={() => setEditing({ ...config.empty, published: config.defaultPublished })}
            className="btn btn-primary btn-sm"
          >
            <Plus className="h-4 w-4" aria-hidden="true" /> Add {config.singular.toLowerCase()}
          </button>
        }
      />

      {loadError && <ErrorBanner message={loadError} onRetry={load} />}
      {!items && !loadError && <LoadingRows />}

      {items && items.length === 0 && (
        <EmptyState
          title={`No ${config.title.toLowerCase()} yet`}
          description={config.emptyHint}
          action={
            <button
              type="button"
              onClick={() => setEditing({ ...config.empty, published: config.defaultPublished })}
              className="btn btn-primary btn-sm"
            >
              <Plus className="h-4 w-4" aria-hidden="true" /> Add {config.singular.toLowerCase()}
            </button>
          }
        />
      )}

      {items && items.length > 0 && (
        <>
          <p className="mb-3 text-sm text-muted" role="status">
            {publishedCount} of {items.length} visible on the website
          </p>
          <ul className="space-y-2">
            {items.map((item, i) => {
              const s = config.summary(item);
              const Icon = s.icon ? getIcon(s.icon) : null;
              return (
                <li
                  key={item.id}
                  className="flex flex-col gap-3 rounded-xl border border-edge bg-surface p-3 sm:flex-row sm:items-center sm:p-4"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-primary/10 text-primary">
                      {s.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={s.image} alt="" className="h-full w-full object-cover" />
                      ) : Icon ? (
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <span className="text-xs font-bold">{String(i + 1).padStart(2, '0')}</span>
                      )}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate font-medium text-foreground">{s.title || 'Untitled'}</p>
                      {s.subtitle && <p className="truncate text-sm text-muted">{s.subtitle}</p>}
                    </div>
                    <span
                      className={`ml-auto shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold sm:ml-2 ${
                        item.published ? 'bg-success/10 text-success' : 'bg-surface-lighter text-muted'
                      }`}
                    >
                      {item.published ? 'Published' : 'Hidden'}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5 sm:justify-end">
                    <IconButton label={`Move ${s.title} up`} disabled={i === 0} onClick={() => move(i, -1)}>
                      <ArrowUp className="h-4 w-4" />
                    </IconButton>
                    <IconButton label={`Move ${s.title} down`} disabled={i === items.length - 1} onClick={() => move(i, 1)}>
                      <ArrowDown className="h-4 w-4" />
                    </IconButton>
                    <IconButton
                      label={item.published ? `Hide ${s.title} from website` : `Publish ${s.title}`}
                      disabled={busyId === item.id}
                      onClick={() => togglePublished(item)}
                    >
                      {busyId === item.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : item.published ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </IconButton>
                    {config.publicHref && item.published && (
                      <a
                        href={config.publicHref(item)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${s.title} on the website (opens in a new tab)`}
                        title="View on website"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-edge text-muted transition-colors hover:bg-surface-light hover:text-foreground"
                      >
                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      </a>
                    )}
                    <IconButton label={`Edit ${s.title}`} onClick={() => setEditing({ ...item })}>
                      <Pencil className="h-4 w-4" />
                    </IconButton>
                    <IconButton label={`Delete ${s.title}`} danger onClick={() => setDeleting(item)}>
                      <Trash2 className="h-4 w-4" />
                    </IconButton>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}

      {editing && (
      <ItemEditor
        key={String(editing.id ?? 'new')}
        config={config}
        initial={editing}
        onClose={() => setEditing(null)}
        onSaved={(saved, isNew) => {
          setItems((list) => (isNew ? [...(list ?? []), saved] : list?.map((i) => (i.id === saved.id ? saved : i)) ?? null));
          setEditing(null);
        }}
      />
      )}

      <ConfirmDialog
        open={!!deleting}
        title={`Delete this ${config.singular.toLowerCase()}?`}
        busy={!!deleting && busyId === deleting.id}
        onClose={() => setDeleting(null)}
        onConfirm={confirmDelete}
      >
        <strong className="text-foreground">{deleting ? config.summary(deleting).title : ''}</strong> will be removed from
        the website and the database. This can&apos;t be undone — use <em>Hide</em> instead if you might need it again.
      </ConfirmDialog>
    </>
  );
}

function ItemEditor({
  config,
  initial,
  onClose,
  onSaved,
}: {
  config: CollectionConfig;
  initial: Record<string, unknown>;
  onClose: () => void;
  onSaved: (item: Item, isNew: boolean) => void;
}) {
  // Mounted fresh (keyed) for each item, so state initialises straight from props
  const [draft, setDraft] = useState<Record<string, unknown>>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [slugTouched, setSlugTouched] = useState(Boolean(initial.id));
  const open = true;
  const isNew = !initial.id;

  const set = (name: string, value: unknown) => {
    setDraft((d) => {
      const next = { ...d, [name]: value };
      // Auto-fill the slug from its source field until the admin edits it
      const slugField = config.fields.find((f) => f.type === 'slug' && f.from === name);
      if (slugField && !slugTouched && typeof value === 'string') next[slugField.name] = slugify(value);
      return next;
    });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrors({});
    const base = `/api/admin/collections/${config.name}`;
    try {
      const { item } = await adminFetch<{ item: Item }>(isNew ? base : `${base}/${initial.id}`, {
        method: isNew ? 'POST' : 'PUT',
        body: JSON.stringify(toPayload(config.fields, draft)),
      });
      showToast({
        type: 'success',
        title: isNew ? `${config.singular} added` : 'Changes saved',
        message: item.published ? 'Live on the website.' : 'Saved as hidden — publish it when ready.',
      });
      onSaved(item, isNew);
    } catch (err) {
      if (err instanceof AdminApiError) setErrors(err.fieldErrors);
      showToast({ type: 'error', title: 'Not saved', message: errorMessage(err) });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onClose={saving ? () => {} : onClose} className="relative z-[70]">
      <DialogBackdrop transition className="fixed inset-0 bg-background/70 backdrop-blur-sm transition-opacity data-closed:opacity-0" />
      <div className="fixed inset-0 flex justify-end">
        <DialogPanel
          as="form"
          onSubmit={submit}
          noValidate
          transition
          className="flex h-full w-full max-w-2xl flex-col border-l border-edge bg-background shadow-elevated-lg transition duration-300 data-closed:translate-x-full"
        >
          <div className="flex items-center justify-between gap-4 border-b border-edge px-5 py-4 sm:px-6">
            <DialogTitle className="text-lg font-semibold text-foreground">
              {isNew ? `Add ${config.singular.toLowerCase()}` : `Edit ${config.singular.toLowerCase()}`}
            </DialogTitle>
            <button type="button" onClick={onClose} disabled={saving} className="icon-btn" aria-label="Close editor">
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="flex-1 space-y-5 overflow-y-auto px-5 py-6 sm:px-6">
            <div className="rounded-xl border border-edge bg-surface p-4">
              <Toggle
                label="Visible on the website"
                description="Hidden items are saved but not shown publicly."
                checked={Boolean(draft.published)}
                onChange={(v) => set('published', v)}
              />
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {config.fields.map((f) => (
                <FieldRenderer
                  key={f.name}
                  field={f}
                  value={draft[f.name]}
                  error={errors[f.name] ?? Object.entries(errors).find(([p]) => p.startsWith(`${f.name}.`))?.[1]}
                  onChange={(v) => {
                    if (f.type === 'slug') setSlugTouched(true);
                    set(f.name, v);
                  }}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col-reverse gap-2 border-t border-edge px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
            <button type="button" onClick={onClose} disabled={saving} className="btn btn-outline btn-sm">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="btn btn-primary btn-sm">
              {saving && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
              {isNew ? `Add ${config.singular.toLowerCase()}` : 'Save changes'}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

function FieldRenderer({
  field: f,
  value,
  error,
  onChange,
}: {
  field: FieldDef;
  value: unknown;
  error?: string;
  onChange: (v: unknown) => void;
}) {
  const full = 'sm:col-span-2';
  switch (f.type) {
    case 'text':
    case 'url':
      return (
        <TextInput
          className={f.half ? '' : full}
          label={f.label}
          value={(value as string) ?? ''}
          onChange={onChange}
          hint={f.hint}
          error={error}
          required={f.required}
          maxLength={f.maxLength}
          placeholder={f.placeholder}
          type={f.type === 'url' ? 'url' : 'text'}
        />
      );
    case 'slug':
      return (
        <TextInput
          className={f.half ? '' : full}
          label={f.label}
          value={(value as string) ?? ''}
          onChange={(v) => onChange(slugify(v))}
          hint={f.hint ?? 'Used in the page address. Lowercase letters, numbers and hyphens.'}
          error={error}
          required
        />
      );
    case 'textarea':
      return (
        <TextArea
          className={full}
          label={f.label}
          value={(value as string) ?? ''}
          onChange={onChange}
          hint={f.hint}
          error={error}
          required={f.required}
          maxLength={f.maxLength}
          rows={f.rows}
        />
      );
    case 'lines':
      return (
        <div className={full}>
          <LinesInput
            label={f.label}
            value={(value as string[]) ?? []}
            onChange={onChange}
            hint={f.hint}
            error={error}
            multiline={f.multiline}
            placeholder={f.placeholder}
          />
        </div>
      );
    case 'icon':
      return (
        <SelectField
          className={f.half ? '' : full}
          label={f.label}
          value={(value as string) ?? 'Sparkles'}
          onChange={onChange}
          error={error}
          options={iconNames.map((n) => ({ value: n, label: n.replace(/([a-z])([A-Z0-9])/g, '$1 $2') }))}
        />
      );
    case 'image':
      return (
        <div className={full}>
          <ImageField label={f.label} value={value as string | null} onChange={onChange} hint={f.hint} error={error} />
        </div>
      );
    case 'facts': {
      const pairs = (value as [string, string][]) ?? [];
      const set = (i: number, j: 0 | 1, v: string) =>
        onChange(pairs.map((p, k) => (k === i ? ((j === 0 ? [v, p[1]] : [p[0], v]) as [string, string]) : p)));
      return (
        <fieldset className={full}>
          <legend className="mb-1.5 text-sm font-medium text-foreground">{f.label}</legend>
          {f.hint && <p className="mb-2 text-xs text-subtle">{f.hint}</p>}
          <ul className="space-y-2">
            {pairs.map(([k, v], i) => (
              <li key={i} className="flex items-center gap-2">
                <input value={k} onChange={(e) => set(i, 0, e.target.value)} aria-label={`Fact ${i + 1} label`} placeholder="Label" className="field-input w-2/5" />
                <input value={v} onChange={(e) => set(i, 1, e.target.value)} aria-label={`Fact ${i + 1} value`} placeholder="Value" className="field-input flex-1" />
                <IconButton label={`Remove fact ${i + 1}`} danger onClick={() => onChange(pairs.filter((_, k) => k !== i))}>
                  <Trash2 className="h-4 w-4" />
                </IconButton>
              </li>
            ))}
          </ul>
          <button type="button" onClick={() => onChange([...pairs, ['', '']])} className="btn btn-ghost btn-sm mt-2 px-2">
            <Plus className="h-4 w-4" aria-hidden="true" /> Add fact
          </button>
          {error && <p className="mt-1 text-sm text-error">{error}</p>}
        </fieldset>
      );
    }
  }
}
