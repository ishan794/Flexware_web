import 'server-only';
import { NextResponse, type NextRequest } from 'next/server';
import { getAdminSession } from './auth';
import { can, type Permission } from './permissions';
import type { SessionRecord } from './repository/types';

export function jsonError(status: number, error: string, details?: unknown) {
  return NextResponse.json(details ? { error, details } : { error }, { status });
}

export function clientIp(req: NextRequest) {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown';
}

/**
 * Rejects cross-site requests to state-changing endpoints. The session cookie is
 * SameSite=Strict already; this is defence in depth against CSRF.
 */
export function isSameOrigin(req: NextRequest) {
  const origin = req.headers.get('origin');
  if (!origin) return req.method === 'GET' || req.method === 'HEAD';
  try {
    const host = req.headers.get('x-forwarded-host') ?? req.headers.get('host') ?? req.nextUrl.host;
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

/** Prisma / dev-store "record not found" → 404 instead of 500 */
function isNotFound(err: unknown) {
  return typeof err === 'object' && err !== null && (err as { code?: string }).code === 'P2025';
}

type Handler<C> = (req: NextRequest, ctx: C, session: SessionRecord) => Promise<Response>;

/**
 * Wraps an admin route handler: same-origin writes, a valid session, and the
 * required role permission. Every /api/admin route (except login) goes through this.
 */
export function withAdmin<C>(permission: Permission, handler: Handler<C>) {
  return async (req: NextRequest, ctx: C): Promise<Response> => {
    if (!isSameOrigin(req)) return jsonError(403, 'Cross-origin request blocked');
    try {
      const session = await getAdminSession();
      if (!session) return jsonError(401, 'Your session has expired. Please sign in again.');
      if (!can(session.role, permission)) return jsonError(403, "You don't have permission to do that.");
      return await handler(req, ctx, session);
    } catch (err) {
      if (isNotFound(err)) return jsonError(404, 'This item no longer exists.');
      console.error('[admin api]', err);
      return jsonError(500, 'Something went wrong on the server. Please try again.');
    }
  };
}

export async function readJson(req: NextRequest) {
  try {
    return await req.json();
  } catch {
    return undefined;
  }
}
