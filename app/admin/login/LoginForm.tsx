'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle, Eye, EyeOff, Loader2, LogIn } from 'lucide-react';

export default function LoginForm({ next }: { next: string }) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    if (!password) {
      setError('Enter the admin password.');
      return;
    }
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(body.error || 'Could not sign in.');
        setBusy(false);
        return;
      }
      router.replace(next);
      router.refresh();
    } catch {
      setError('Network error. Check your connection and try again.');
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} noValidate className="space-y-5" aria-busy={busy}>
      <div>
        <label htmlFor="admin-password" className="mb-1.5 block text-sm font-medium text-foreground">
          Password
        </label>
        <div className="relative">
          <input
            id="admin-password"
            type={show ? 'text' : 'password'}
            autoComplete="current-password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={!!error}
            aria-describedby={error ? 'admin-login-error' : undefined}
            className="field-input pr-12"
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-subtle hover:text-foreground"
            aria-label={show ? 'Hide password' : 'Show password'}
          >
            {show ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
          </button>
        </div>
        {error && (
          <p id="admin-login-error" role="alert" className="mt-2 flex items-center gap-1.5 text-sm text-error">
            <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" /> {error}
          </p>
        )}
      </div>
      <button type="submit" disabled={busy} className="btn btn-primary w-full">
        {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <LogIn className="h-4 w-4" aria-hidden="true" />}
        {busy ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  );
}
