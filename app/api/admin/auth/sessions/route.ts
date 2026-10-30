import { NextResponse } from 'next/server';
import { countActiveSessions, destroyOtherSessions } from '@/app/lib/server/auth';
import { withAdmin } from '@/app/lib/server/api';

/** Active session count (for the Security page) */
export const GET = withAdmin('security:manage', async () => {
  return NextResponse.json({ active: await countActiveSessions() });
});

/** Sign out all other devices */
export const DELETE = withAdmin('security:manage', async (_req, _ctx: unknown, session) => {
  return NextResponse.json({ ok: true, signedOut: await destroyOtherSessions(session.id) });
});
