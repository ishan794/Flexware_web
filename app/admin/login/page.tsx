import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import Logo from '@/app/components/Logo';
import LoginForm from './LoginForm';
import { getAdminSession } from '@/app/lib/server/auth';
import { isDevDataSource } from '@/app/lib/server/repository';

export const metadata: Metadata = {
  title: 'Sign in · Admin',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

/** Only allow redirects back into the admin */
function safeNext(next: string | string[] | undefined) {
  const value = Array.isArray(next) ? next[0] : next;
  return value && value.startsWith('/admin') && !value.startsWith('//') ? value : '/admin';
}

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string | string[] }> }) {
  const next = safeNext((await searchParams).next);
  const session = await getAdminSession().catch(() => null);
  if (session) redirect(next);

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-background px-4 py-12">
      <div aria-hidden="true" className="absolute -top-40 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="relative w-full max-w-sm animate-fade-up">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <Logo className="h-7 w-auto" priority />
          <h1 className="text-xl font-semibold text-foreground">Sign in to the admin</h1>
          <p className="text-sm text-muted">Manage the Flxware website content.</p>
        </div>
        <div className="rounded-2xl border border-edge bg-surface p-6 shadow-elevated-lg sm:p-8">
          <LoginForm next={next} />
        </div>
        {isDevDataSource() && (
          <p role="note" className="mt-4 rounded-xl border border-amber/30 bg-amber/10 p-3 text-xs leading-relaxed text-foreground">
            <strong>Development mode:</strong> no database is configured. Use <code>ADMIN_PASSWORD</code> from <code>.env</code>, or the
            one-time password printed in the dev server console if it isn&apos;t set. Content changes are not persisted.
          </p>
        )}
        <p className="mt-6 text-center text-sm">
          <Link href="/" className="link-underline text-muted hover:text-foreground">
            ← Back to website
          </Link>
        </p>
      </div>
    </main>
  );
}
