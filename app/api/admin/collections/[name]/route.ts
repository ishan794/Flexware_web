import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { collectionSchemas, formatZodError } from '@/app/lib/cms/schemas';
import { collectionNames, type CollectionName, type CollectionTypes } from '@/app/lib/cms/types';
import { createItem, listCollection, reorderItems, slugTaken } from '@/app/lib/server/content';
import { jsonError, readJson, withAdmin } from '@/app/lib/server/api';

type Ctx = { params: Promise<{ name: string }> };

function toCollection(name: string): CollectionName | null {
  return (collectionNames as string[]).includes(name) ? (name as CollectionName) : null;
}

export const GET = withAdmin('content:read', async (_req: NextRequest, { params }: Ctx) => {
  const name = toCollection((await params).name);
  if (!name) return jsonError(404, 'Unknown collection');
  return NextResponse.json({ items: await listCollection(name) });
});

export const POST = withAdmin('content:write', async (req: NextRequest, { params }: Ctx) => {
  const name = toCollection((await params).name);
  if (!name) return jsonError(404, 'Unknown collection');

  const parsed = collectionSchemas[name].safeParse(await readJson(req));
  if (!parsed.success) return jsonError(422, 'Please fix the highlighted fields.', formatZodError(parsed.error));

  const data = parsed.data as CollectionTypes[typeof name];
  if ('slug' in data && (name === 'services' || name === 'projects' || name === 'jobs')) {
    if (await slugTaken(name, data.slug)) {
      return jsonError(422, 'That slug is already used.', [{ path: 'slug', message: 'Choose a different slug' }]);
    }
  }
  return NextResponse.json({ item: await createItem(name, data) }, { status: 201 });
});

const reorderSchema = z.object({ ids: z.array(z.string().min(1)).min(1).max(500) });

/** Reorder: body { ids: [...] } in the desired display order */
export const PATCH = withAdmin('content:write', async (req: NextRequest, { params }: Ctx) => {
  const name = toCollection((await params).name);
  if (!name) return jsonError(404, 'Unknown collection');
  const parsed = reorderSchema.safeParse(await readJson(req));
  if (!parsed.success) return jsonError(422, 'Invalid order');
  await reorderItems(name, parsed.data.ids);
  return NextResponse.json({ ok: true });
});
