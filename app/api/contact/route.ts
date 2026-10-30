import { NextRequest, NextResponse } from 'next/server';
import { getRepository } from '@/app/lib/server/repository';
import { inquiryInputSchema } from '@/app/lib/cms/schemas';

// Simple per-IP throttle for the public form (per server instance)
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function throttled(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

/**
 * Contact form endpoint. Request contract is unchanged:
 * { name, email, subject?, phone?, message } → { success: true } | { error }
 * Submissions are now stored as inquiries and appear in /admin/inquiries.
 */
export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const parsed = inquiryInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues.map((i) => i.message).join(', ') }, { status: 400 });
  }

  // Honeypot filled → silently accept without storing (bots get no signal)
  if (parsed.data.company) return NextResponse.json({ success: true });

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (throttled(ip)) {
    return NextResponse.json({ error: 'Too many messages. Please try again later.' }, { status: 429 });
  }

  const { name, email, subject, phone, message } = parsed.data;
  const source = typeof (body as { source?: unknown }).source === 'string' && (body as { source: string }).source === 'home' ? 'home' : 'contact-page';

  try {
    await getRepository().inquiries.create({ name, email, subject: subject || null, phone: phone || null, message, source });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[contact] Could not store inquiry', err);
    return NextResponse.json({ error: 'Could not send your message right now.' }, { status: 500 });
  }
}
