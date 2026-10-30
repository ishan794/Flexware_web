'use client';

import { useId, useRef, useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { ImageIcon, Loader2, Upload, X } from 'lucide-react';
import { adminFetch, errorMessage } from '../lib/client';
import { useAdminData } from '../lib/useAdminData';
import { FieldShell } from './fields';

export interface MediaItem {
  id: string;
  url: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  alt: string;
  createdAt: string;
}

export async function uploadImage(file: File, alt = '') {
  const form = new FormData();
  form.append('file', file);
  form.append('alt', alt);
  const { item } = await adminFetch<{ item: MediaItem }>('/api/admin/media', { method: 'POST', body: form });
  return item;
}

/**
 * Image picker (adapted from the CreativeFX ImageUpload field): choose from the media
 * library, upload a new file, or paste an https URL. Stores a URL string.
 */
export default function ImageField({
  label,
  value,
  onChange,
  hint,
  error,
}: {
  label: string;
  value: string | null | undefined;
  onChange: (url: string | null) => void;
  hint?: string;
  error?: string;
}) {
  const id = useId();
  const [open, setOpen] = useState(false);

  return (
    <FieldShell id={id} label={label} hint={hint} error={error}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex h-20 w-28 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-edge bg-surface-light">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="h-full w-full object-contain" />
          ) : (
            <ImageIcon className="h-6 w-6 text-subtle" aria-hidden="true" />
          )}
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <input
            id={id}
            value={value ?? ''}
            onChange={(e) => onChange(e.target.value || null)}
            placeholder="/media/… or https://…"
            aria-invalid={!!error}
            className="field-input"
          />
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => setOpen(true)} className="btn btn-outline btn-sm">
              <ImageIcon className="h-4 w-4" aria-hidden="true" /> Choose or upload
            </button>
            {value && (
              <button type="button" onClick={() => onChange(null)} className="btn btn-ghost btn-sm">
                <X className="h-4 w-4" aria-hidden="true" /> Remove
              </button>
            )}
          </div>
        </div>
      </div>
      <MediaPickerDialog
        open={open}
        onClose={() => setOpen(false)}
        onPick={(url) => {
          onChange(url);
          setOpen(false);
        }}
      />
    </FieldShell>
  );
}

function MediaPickerDialog({ open, onClose, onPick }: { open: boolean; onClose: () => void; onPick: (url: string) => void }) {
  // Only fetch while the dialog is open
  const media = useAdminData<{ items: MediaItem[] }>(open ? '/api/admin/media' : null);
  const items = media.data?.items ?? null;
  const [uploadError, setUploadError] = useState('');
  const error = uploadError || media.error;
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const onFile = async (file?: File) => {
    if (!file) return;
    setUploading(true);
    setUploadError('');
    try {
      const item = await uploadImage(file);
      onPick(item.url);
    } catch (err) {
      setUploadError(errorMessage(err));
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-[80]">
      <DialogBackdrop transition className="fixed inset-0 bg-background/70 backdrop-blur-sm transition-opacity data-closed:opacity-0" />
      <div className="fixed inset-0 flex items-end justify-center p-0 sm:items-center sm:p-4">
        <DialogPanel
          transition
          className="flex max-h-[90vh] w-full max-w-3xl flex-col rounded-t-2xl border border-edge bg-surface shadow-elevated-lg transition data-closed:translate-y-4 data-closed:opacity-0 sm:rounded-2xl"
        >
          <div className="flex items-center justify-between gap-4 border-b border-edge px-5 py-4">
            <DialogTitle className="text-lg font-semibold text-foreground">Media library</DialogTitle>
            <button type="button" onClick={onClose} className="icon-btn" aria-label="Close media library">
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-5">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <input
                ref={fileRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
                className="sr-only"
                id="media-picker-upload"
                onChange={(e) => onFile(e.target.files?.[0])}
              />
              <label htmlFor="media-picker-upload" className={`btn btn-primary btn-sm ${uploading ? 'pointer-events-none opacity-60' : ''}`}>
                {uploading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Upload className="h-4 w-4" aria-hidden="true" />}
                {uploading ? 'Uploading…' : 'Upload new image'}
              </label>
              <span className="text-xs text-subtle">PNG, JPG, WebP, GIF or SVG · up to 5 MB</span>
            </div>
            {error && (
              <p role="alert" className="mb-4 text-sm text-error">
                {error}
              </p>
            )}
            {items === null && !error && <div className="skeleton h-40" aria-label="Loading media" />}
            {items && items.length === 0 && (
              <p className="py-10 text-center text-sm text-muted">No images yet. Upload one to get started.</p>
            )}
            {items && items.length > 0 && (
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {items.map((m) => (
                  <li key={m.id}>
                    <button
                      type="button"
                      onClick={() => onPick(m.url)}
                      className="group block w-full overflow-hidden rounded-xl border border-edge bg-surface-light text-left transition-colors hover:border-primary/50 focus-visible:border-primary"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={m.url} alt={m.alt} loading="lazy" className="aspect-square w-full object-contain p-2" />
                      <span className="block truncate border-t border-edge px-2 py-1.5 text-xs text-muted">
                        {m.originalName}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
