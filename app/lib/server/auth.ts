import 'server-only';
import { createHash, randomBytes, scrypt as scryptCb, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import { cookies } from 'next/headers';
import { getRepository } from './repository';
import type { SessionRecord } from './repository/types';
import type { AdminRole } from './permissions';

const scrypt = promisify(scryptCb) as (pw: string, salt: Buffer, keylen: number, opts: object) => Promise<Buffer>;

export const SESSION_COOKIE = 'flx_admin';
const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours
export const MIN_PASSWORD_LENGTH = 12;

const sha256 = (value: string) => createHash('sha256').update(value).digest('hex');

// ---------- Password ----------

const SCRYPT = { N: 16384, r: 8, p: 1, keylen: 64 };

export async function hashPassword(password: string) {
  const salt = randomBytes(16);
  const hash = await scrypt(password, salt, SCRYPT.keylen, { N: SCRYPT.N, r: SCRYPT.r, p: SCRYPT.p });
  return ['scrypt', SCRYPT.N, SCRYPT.r, SCRYPT.p, salt.toString('base64'), hash.toString('base64')].join('$');
}

export async function verifyHash(password: string, stored: string) {
  const [alg, n, r, p, saltB64, hashB64] = stored.split('$');
  if (alg !== 'scrypt' || !saltB64 || !hashB64) return false;
  const expected = Buffer.from(hashB64, 'base64');
  const actual = await scrypt(password, Buffer.from(saltB64, 'base64'), expected.length, {
    N: Number(n),
    r: Number(r),
    p: Number(p),
  });
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

function safeEqual(a: string, b: string) {
  // Compare fixed-length digests so neither length nor content leaks through timing
  return timingSafeEqual(Buffer.from(sha256(a)), Buffer.from(sha256(b)));
}

/**
 * DEVELOPMENT ONLY: when ADMIN_PASSWORD is not set, generate a random one-time
 * password per server process and print it to the server console so the admin can
 * be tested locally. Never used when NODE_ENV=production.
 */
const g = globalThis as unknown as { __flxDevPassword?: string };
function devGeneratedPassword(): string | null {
  if (process.env.NODE_ENV === 'production' || process.env.ADMIN_PASSWORD) return null;
  if (!g.__flxDevPassword) {
    g.__flxDevPassword = randomBytes(12).toString('base64url');
    console.warn(
      `\n[admin] ⚠ ADMIN_PASSWORD is not set. DEVELOPMENT sign-in password for this server run:\n` +
        `        ${g.__flxDevPassword}\n` +
        `        (Random each restart. Production requires ADMIN_PASSWORD and has no fallback.)\n`
    );
  }
  return g.__flxDevPassword;
}

function configuredPassword() {
  return process.env.ADMIN_PASSWORD || devGeneratedPassword();
}

/** True when a password has been configured (stored hash, ADMIN_PASSWORD, or the dev fallback) */
export async function isPasswordConfigured() {
  return Boolean(await getRepository().credentials.getPasswordHash()) || Boolean(configuredPassword());
}

/**
 * A password changed in the admin (stored as a scrypt hash) takes precedence;
 * otherwise ADMIN_PASSWORD is used. No built-in default password exists.
 */
export async function verifyPassword(password: string) {
  const stored = await getRepository().credentials.getPasswordHash();
  if (stored) return verifyHash(password, stored);
  const expected = configuredPassword();
  return expected ? safeEqual(password, expected) : false;
}

export async function setPassword(password: string) {
  await getRepository().credentials.setPasswordHash(await hashPassword(password));
}

// ---------- Sessions ----------

/** Shared password ⇒ every session is the owner. Per-user accounts would pass other roles. */
export async function createSession(role: AdminRole = 'owner') {
  const token = randomBytes(32).toString('base64url');
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);
  const repo = getRepository();
  await repo.sessions.create({ tokenHash: sha256(token), role, expiresAt });
  await repo.sessions.purgeExpired();

  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    expires: expiresAt,
  });
}

/** Returns the current admin session, or null. Safe to call from layouts and route handlers. */
export async function getAdminSession(): Promise<SessionRecord | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const repo = getRepository();
  const session = await repo.sessions.findByHash(sha256(token));
  if (!session) return null;
  if (session.expiresAt.getTime() <= Date.now()) {
    await repo.sessions.remove(session.id).catch(() => {});
    return null;
  }
  // Record activity at most once a minute
  if (Date.now() - session.lastSeenAt.getTime() > 60_000) {
    await repo.sessions.touch(session.id).catch(() => {});
  }
  return session;
}

export async function destroyCurrentSession() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (token) await getRepository().sessions.removeByHash(sha256(token));
  store.delete(SESSION_COOKIE);
}

/** Sign out every device except the current session */
export function destroyOtherSessions(currentId: string) {
  return getRepository().sessions.removeOthers(currentId);
}

export function countActiveSessions() {
  return getRepository().sessions.countActive();
}

// ---------- Login throttling ----------
// In-memory, per server instance: 5 failed attempts per IP per 15 minutes.

const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILURES = 5;
const failures = new Map<string, { count: number; first: number }>();

export function loginBlockedFor(ip: string) {
  const entry = failures.get(ip);
  if (!entry) return 0;
  if (Date.now() - entry.first > WINDOW_MS) {
    failures.delete(ip);
    return 0;
  }
  return entry.count >= MAX_FAILURES ? Math.ceil((entry.first + WINDOW_MS - Date.now()) / 1000) : 0;
}

export function recordLoginFailure(ip: string) {
  const entry = failures.get(ip);
  if (!entry || Date.now() - entry.first > WINDOW_MS) failures.set(ip, { count: 1, first: Date.now() });
  else entry.count += 1;
}

export function clearLoginFailures(ip: string) {
  failures.delete(ip);
}
