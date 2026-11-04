'use client';

import { useRef, useState } from 'react';
import { Check, Copy, Loader2, Trash2, Upload } from 'lucide-react';
import { showToast } from '@/app/components/Toast';
import { AdminApiError, adminFetch, errorMessage } from '../../lib/client';
import { useAdminData } from '../../lib/useAdminData';
import ConfirmDialog from '../../components/ConfirmDialog';
import { uploadImage, type MediaItem } from '../../components/ImageField';
import { EmptyState, ErrorBanner, LoadingRows, PageHeader } from '../../components/fields';

const kb = (bytes: number) => (bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`);

export default function MediaLibrary() {
  const media = useAdminData<{ items: MediaItem[] }>('/api/admin/media');
  const items = media.data?.items ?? null;
  const error = media.error;
  const load = media.reload;
  const setItems = (fn: (cur: MediaItem[] | null) => MediaItem[] | null) =>
    media.setData((d) => ({ items: fn(d?.items ?? null) ?? [] }));
  const [uploading, setUploading] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const [deleting, setDeleting] = useState<MediaItem | null>(null);
  const [usages, setUsages] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);


  const upload = async (files: FileList | File[]) => {
    const list = Array.from(files);
    if (!list.length) return;
    setUploading((n) => n + list.length);
    for (const file of list) {
      try {
        const item = await uploadImage(file);
        setItems((cur) => [item, ...(cur ?? [])]);
        showToast({ type: 'success', title: 'Uploaded', message: file.name });
      } catch (err) {
        showToast({ type: 'error', title: `Could not upload ${file.name}`, message: errorMessage(err) });
      } finally {
        setUploading((n) => n - 1);
      }
    }
    if (fileRef.current) fileRef.current.value = '';
  };

  const saveAlt = async (item: MediaItem, alt: string) => {
    if (alt === item.alt) return;
    try {
      const { item: updated } = await adminFetch<{ item: MediaItem }>(`/api/admin/media/${item.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ alt }),
      });
      setItems((cur) => cur?.map((m) => (m.id === item.id ? updated : m)) ?? null);
      showToast({ type: 'success', title: 'Alt text saved' });
    } catch (err) {
      showToast({ type: 'error', title: 'Could not save alt text', message: errorMessage(err) });
    }
  };

  const copyUrl = async (item: MediaItem) => {
    try {
      await navigator.clipboard.writeText(item.url);
      setCopied(item.id);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      showToast({ type: 'info', title: 'Copy this path', message: item.url });
    }
  };

  const remove = async (force = false) => {
    if (!deleting) return;
    setBusy(true);
    try {
      await adminFetch(`/api/admin/media/${deleting.id}${force ? '?force=1' : ''}`, { method: 'DELETE' });
      setItems((cur) => cur?.filter((m) => m.id !== deleting.id) ?? null);
      setDeleting(null);
      setUsages([]);
      showToast({ type: 'success', title: 'File deleted' });
    } catch (err) {
      if (err instanceof AdminApiError && err.status === 409 && Array.isArray(err.details)) {
        setUsages(err.details as string[]);
      } else {
        showToast({ type: 'error', title: 'Could not delete', message: errorMessage(err) });
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Media library"
        description="Images for logos, team photos, testimonials and project covers."
        actions={
          <>
            <input
              ref={fileRef}
              id="media-upload"
              type="file"
              multiple
              accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
              className="sr-only"
              onChange={(e) => e.target.files && upload(e.target.files)}
            />
            <label htmlFor="media-upload" className="btn btn-primary btn-sm cursor-pointer">
              {uploading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Upload className="h-4 w-4" aria-hidden="true" />}
              {uploading ? `Uploading ${uploading}…` : 'Upload images'}
            </label>
          </>
        }
      />

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          void upload(e.dataTransfer.files);
        }}
        className={`mb-6 rounded-2xl border-2 border-dashed px-6 py-8 text-center text-sm transition-colors ${
          dragOver ? 'border-primary bg-primary/5 text-foreground' : 'border-edge-hover text-muted'
        }`}
      >
        Drag and drop images here, or use <strong className="text-foreground">Upload images</strong>. PNG, JPG, WebP, GIF or SVG, up
        to 5 MB each.
      </div>

      {error && <ErrorBanner message={error} onRetry={load} />}
      {!items && !error && <LoadingRows rows={2} />}
      {items && items.length === 0 && <EmptyState title="No images yet" description="Uploaded images will appear here." />}

      {items && items.length > 0 && (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((m) => (
            <li key={m.id} className="overflow-hidden rounded-xl border border-edge bg-surface">
              <div className="flex aspect-video items-center justify-center bg-surface-light p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.url} alt={m.alt} loading="lazy" className="max-h-full max-w-full object-contain" />
              </div>
              <div className="space-y-3 p-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground" title={m.originalName}>{m.originalName}</p>
                  <p className="text-xs text-subtle">{m.mimeType.replace('image/', '').toUpperCase()} · {kb(m.size)}</p>
                </div>
                <div>
                  <label htmlFor={`alt-${m.id}`} className="mb-1 block text-xs font-medium text-muted">Alt text</label>
                  <input
                    id={`alt-${m.id}`}
                    defaultValue={m.alt}
                    maxLength={200}
                    placeholder="Describe the image"
                    onBlur={(e) => saveAlt(m, e.target.value.trim())}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        e.currentTarget.blur(); // saves via onBlur
                      }
                    }}
                    aria-describedby={`alt-hint-${m.id}`}
                    className="field-input min-h-9 py-1.5 text-sm"
                  />
                  <p id={`alt-hint-${m.id}`} className="mt-1 text-xs text-subtle">Saved when you press Enter or leave the field.</p>
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => copyUrl(m)} className="btn btn-outline btn-sm flex-1">
                    {copied === m.id ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
                    {copied === m.id ? 'Copied' : 'Copy path'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setUsages([]);
                      setDeleting(m);
                    }}
                    className="btn btn-ghost btn-sm text-error"
                    aria-label={`Delete ${m.originalName}`}
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <ConfirmDialog
        open={!!deleting}
        title={usages.length ? 'This image is in use' : 'Delete this image?'}
        confirmLabel={usages.length ? 'Delete anyway' : 'Delete'}
        busy={busy}
        onClose={() => {
          setDeleting(null);
          setUsages([]);
        }}
        onConfirm={() => remove(usages.length > 0)}
      >
        {usages.length ? (
          <>
            <p>Deleting it will leave a broken image in:</p>
            <ul className="mt-2 list-disc pl-5">
              {usages.map((u) => (
                <li key={u}>{u}</li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <strong className="text-foreground">{deleting?.originalName}</strong> will be permanently removed.
          </>
        )}
      </ConfirmDialog>
    </>
  );
}
