import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { getRepository } from '@/app/lib/server/repository';
import { jsonError, readJson, withAdmin } from '@/app/lib/server/api';
import { mediaUrl, removeUpload } from '@/app/lib/server/media';

type Ctx = { params: Promise<{ id: string }> };

const patchSchema = z.object({ alt: z.string().trim().max(200) });

export const PATCH = withAdmin('media:write', async (req: NextRequest, { params }: Ctx) => {
  const { id } = await params;
  const parsed = patchSchema.safeParse(await readJson(req));
  if (!parsed.success) return jsonError(422, 'Alt text must be 200 characters or fewer.');
  const repo = getRepository();
  if (!(await repo.media.find(id))) return jsonError(404, 'This file no longer exists.');
  const item = await repo.media.setAlt(id, parsed.data.alt);
  return NextResponse.json({ item: { ...item, url: mediaUrl(item.filename) } });
});

/** Refuses (409 + usage list) while the image is referenced, unless ?force=1 */
export const DELETE = withAdmin('media:write', async (req: NextRequest, { params }: Ctx) => {
  const { id } = await params;
  const repo = getRepository();
  const asset = await repo.media.find(id);
  if (!asset) return jsonError(404, 'This file no longer exists.');

  const usages = await repo.media.usages(mediaUrl(asset.filename));
  if (usages.length && req.nextUrl.searchParams.get('force') !== '1') {
    return jsonError(409, 'This image is still in use.', usages);
  }
  await repo.media.remove(id);
  await removeUpload(asset.filename);
  return NextResponse.json({ ok: true });
});
