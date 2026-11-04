import { NextResponse, type NextRequest } from 'next/server';
import {
  clearLoginFailures,
  createSession,
  isPasswordConfigured,
  loginBlockedFor,
  recordLoginFailure,
  verifyPassword,
} from '@/app/lib/server/auth';
import { clientIp, isSameOrigin, jsonError, readJson } from '@/app/lib/server/api';

export async function POST(req: NextRequest) {
  if (!isSameOrigin(req)) return jsonError(403, 'Cross-origin request blocked');

  const ip = clientIp(req);
  const wait = loginBlockedFor(ip);
  if (wait) {
    return jsonError(429, `Too many failed attempts. Try again in ${Math.ceil(wait / 60)} minute(s).`);
  }

  const body = await readJson(req);
  const password = typeof body?.password === 'string' ? body.password : '';
  if (!password) return jsonError(400, 'Enter the admin password.');

  try {
    if (!(await isPasswordConfigured())) {
      return jsonError(503, 'Admin sign-in is not configured. Set ADMIN_PASSWORD on the server.');
    }
    if (!(await verifyPassword(password))) {
      recordLoginFailure(ip);
      return jsonError(401, 'Incorrect password.');
    }
    clearLoginFailures(ip);
    await createSession();
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[admin login]', err);
    return jsonError(500, 'Could not sign in. Check that the database is reachable.');
  }
}
