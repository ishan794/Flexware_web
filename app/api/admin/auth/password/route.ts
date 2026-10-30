import { NextResponse, type NextRequest } from 'next/server';
import { destroyOtherSessions, MIN_PASSWORD_LENGTH, setPassword, verifyPassword } from '@/app/lib/server/auth';
import { jsonError, readJson, withAdmin } from '@/app/lib/server/api';

/** Change the shared admin password; signs out every other device */
export const POST = withAdmin('security:manage', async (req: NextRequest, _ctx: unknown, session) => {
  const body = await readJson(req);
  const current = typeof body?.currentPassword === 'string' ? body.currentPassword : '';
  const next = typeof body?.newPassword === 'string' ? body.newPassword : '';

  if (!(await verifyPassword(current))) return jsonError(400, 'Current password is incorrect.');
  if (next.length < MIN_PASSWORD_LENGTH) {
    return jsonError(400, `New password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
  }
  if (next === current) return jsonError(400, 'New password must be different from the current one.');

  await setPassword(next);
  const signedOut = await destroyOtherSessions(session.id);
  return NextResponse.json({ ok: true, signedOut });
});
