'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAdminData } from '../lib/useAdminData';
import { showToast } from '@/app/components/Toast';
import { AdminApiError, adminFetch, errorMessage } from '../lib/client';
import type { ContentDocs, ContentKey } from '@/app/lib/cms/types';

/**
 * Load → edit → save for a singleton content document, with dirty tracking,
 * field-level server errors and a warning before leaving with unsaved changes.
 */
export function useDocEditor<K extends ContentKey>(key: K) {
  const remote = useAdminData<{ data: ContentDocs[K] }>(`/api/admin/content/${key}`);
  const saved = remote.data?.data ?? null;
  const loadError = remote.error;
  const load = remote.reload;
  // Local edits; null means "unchanged from the server copy"
  const [edits, setEdits] = useState<ContentDocs[K] | null>(null);
  const draft = edits ?? saved;
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const dirty = useMemo(() => JSON.stringify(saved) !== JSON.stringify(draft), [saved, draft]);

  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  const update = useCallback(
    (fn: (d: ContentDocs[K]) => ContentDocs[K]) => {
      setEdits((d) => {
        const base = d ?? saved;
        return base ? fn(base) : d;
      });
    },
    [saved]
  );

  const save = useCallback(async () => {
    if (!draft) return;
    setSaving(true);
    setErrors({});
    try {
      const { data } = await adminFetch<{ data: ContentDocs[K] }>(`/api/admin/content/${key}`, {
        method: 'PUT',
        body: JSON.stringify(draft),
      });
      remote.setData({ data });
      setEdits(null);
      showToast({ type: 'success', title: 'Changes published', message: 'The website now shows your updates.' });
    } catch (err) {
      if (err instanceof AdminApiError) setErrors(err.fieldErrors);
      showToast({ type: 'error', title: 'Not saved', message: errorMessage(err) });
    } finally {
      setSaving(false);
    }
  }, [draft, key, remote]);

  const reset = useCallback(() => {
    setEdits(null);
    setErrors({});
  }, []);

  return { draft, update, save, reset, dirty, saving, errors, loadError, reload: load };
}
