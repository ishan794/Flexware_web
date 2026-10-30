import { NextResponse, type NextRequest } from 'next/server';
import { destroyCurrentSession } from '@/app/lib/server/auth';
import { isSameOrigin, jsonError } from '@/app/lib/server/api';

export async function POST(req: NextRequest) {
  if (!isSameOrigin(req)) return jsonError(403, 'Cross-origin request blocked');
  await destroyCurrentSession();
  return NextResponse.json({ ok: true });
}
