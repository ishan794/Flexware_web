import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import AdminShell from '../components/AdminShell';
import { getAdminSession } from '@/app/lib/server/auth';
import { isDevDataSource } from '@/app/lib/server/repository';

export const metadata: Metadata = {
  title: { default: 'Admin', template: '%s · Admin | Flxware' },
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function AdminPanelLayout({ children }: { children: ReactNode }) {
  let session;
  try {
    session = await getAdminSession();
  } catch (err) {
    console.error('[admin] session check failed', err);
    return (
      <div role="alert" className="grid min-h-screen place-items-center bg-background px-4 text-center">
        <div className="max-w-md">
          <h1 className="text-2xl font-bold text-foreground">Admin is unavailable</h1>
          <p className="mt-3 text-muted">
            The admin panel can&apos;t reach its database. Check <code>DATABASE_URL</code> and that PostgreSQL is
            running, then reload.
          </p>
        </div>
      </div>
    );
  }
  if (!session) redirect('/admin/login');

  return <AdminShell devData={isDevDataSource()}>{children}</AdminShell>;
}
