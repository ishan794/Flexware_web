'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCw, AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div role="alert" className="grid min-h-[60vh] place-items-center px-4 py-20 sm:px-6">
      <div className="max-w-lg text-center">
        <span className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-error/10 text-error">
          <AlertTriangle className="h-7 w-7" aria-hidden="true" />
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Something went wrong</h1>
        <p className="mt-4 text-muted">
          This page hit an unexpected error. Try again — if it keeps happening, please let us know.
        </p>
        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <button type="button" onClick={() => unstable_retry()} className="btn btn-primary">
            <RefreshCw className="h-4 w-4" aria-hidden="true" /> Try again
          </button>
          <Link href="/" className="btn btn-outline">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
