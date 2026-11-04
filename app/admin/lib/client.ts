'use client';

export interface FieldIssue {
  path: string;
  message: string;
}

export class AdminApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public details?: unknown
  ) {
    super(message);
  }

  /** Field errors keyed by dotted path ("hero.title") */
  get fieldErrors(): Record<string, string> {
    if (!Array.isArray(this.details)) return {};
    return Object.fromEntries(
      (this.details as FieldIssue[]).filter((d) => d && typeof d.path === 'string').map((d) => [d.path, d.message])
    );
  }
}

/** JSON fetch for /api/admin; an expired session sends the user back to sign in */
export async function adminFetch<T = unknown>(path: string, init: RequestInit = {}): Promise<T> {
  const isForm = init.body instanceof FormData;
  const res = await fetch(path, {
    ...init,
    credentials: 'same-origin',
    headers: isForm ? init.headers : { 'Content-Type': 'application/json', ...init.headers },
  });

  if (res.status === 401) {
    window.location.href = `/admin/login?next=${encodeURIComponent(window.location.pathname)}`;
    throw new AdminApiError('Session expired', 401);
  }

  let body: { error?: string; details?: unknown } & Record<string, unknown> = {};
  try {
    body = await res.json();
  } catch {
    // Non-JSON response
  }
  if (!res.ok) throw new AdminApiError(body.error || `Request failed (${res.status})`, res.status, body.details);
  return body as T;
}

export const errorMessage = (err: unknown) =>
  err instanceof Error ? err.message : 'Something went wrong. Please try again.';
