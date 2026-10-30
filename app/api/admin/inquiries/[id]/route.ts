import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { getRepository } from '@/app/lib/server/repository';
import { jsonError, readJson, withAdmin } from '@/app/lib/server/api';

type Ctx = { params: Promise<{ id: string }> };

const patchSchema = z.object({ status: z.enum(['NEW', 'READ', 'ARCHIVED']) });

export const PATCH = withAdmin('inquiries:write', async (req: NextRequest, { params }: Ctx) => {
  const { id } = await params;
  const parsed = patchSchema.safeParse(await readJson(req));
  if (!parsed.success) return jsonError(422, 'Invalid status');
  const repo = getRepository();
  if (!(await repo.inquiries.find(id))) return jsonError(404, 'This inquiry no longer exists.');
  const item = await repo.inquiries.setStatus(id, parsed.data.status);
  // Authoritative counts so the inbox tabs never drift
  return NextResponse.json({ item, totals: await repo.inquiries.totals() });
});

export const DELETE = withAdmin('inquiries:write', async (_req: NextRequest, { params }: Ctx) => {
  const { id } = await params;
  const repo = getRepository();
  if (!(await repo.inquiries.remove(id))) return jsonError(404, 'This inquiry no longer exists.');
  return NextResponse.json({ ok: true, totals: await repo.inquiries.totals() });
});
