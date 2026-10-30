'use client';

import { useCallback, useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { adminFetch, errorMessage } from './client';

/**
 * Fetches admin JSON for `path` and refetches when `path` changes or reload() is called.
 * State is only set from promise callbacks, and stale responses are ignored.
 * Pass null to skip fetching.
 */
export function useAdminData<T>(path: string | null): {
  data: T | null;
  error: string;
  loading: boolean;
  reload: () => void;
  setData: Dispatch<SetStateAction<T | null>>;
} {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState('');
  const [loadedKey, setLoadedKey] = useState<string | null>(null);
  const [nonce, setNonce] = useState(0);
  const key = path === null ? null : `${path}#${nonce}`;

  useEffect(() => {
    if (key === null || path === null) return;
    let stale = false;
    adminFetch<T>(path)
      .then((result) => {
        if (stale) return;
        setData(result);
        setError('');
      })
      .catch((err) => {
        if (!stale) setError(errorMessage(err));
      })
      .finally(() => {
        if (!stale) setLoadedKey(key);
      });
    return () => {
      stale = true;
    };
  }, [key, path]);

  const reload = useCallback(() => setNonce((n) => n + 1), []);

  return { data, error, loading: key !== null && loadedKey !== key, reload, setData };
}
