import { NextResponse, type NextRequest } from 'next/server';
import { collectionSchemas, formatZodError } from '@/app/lib/cms/schemas';
import { collectionNames, type CollectionName, type CollectionTypes } from '@/app/lib/cms/types';
import { deleteItem, findItem, slugTaken, updateItem } from '@/app/lib/server/content';
import { jsonError, readJson, withAdmin } from '@/app/lib/server/api';

type Ctx = { params: Promise<{ name: string; id: string }> };

function toCollection(name: string): CollectionName | null {
  return (collectionNames as string[]).includes(name) ? (name as CollectionName) : null;
}

/** Full update, or a partial { published } toggle */
export const PUT = withAdmin('content:write', async (req: NextRequest, { params }: Ctx) => {
  const { name: rawName, id } = await params;
  const name = toCollection(rawName);
  if (!name) return jsonError(404, 'Unknown collection');
  if (!(await findItem(name, id))) return jsonError(404, 'This item no longer exists.');

  const body = await readJson(req);
  const keys = body && typeof body === 'object' ? Object.keys(body) : [];
  const isToggle = keys.length === 1 && keys[0] === 'published' && typeof body.published === 'boolean';

  if (isToggle) {
    return NextResponse.json({ item: await updateItem(name, id, { published: body.published }) });
  }

  const parsed = collectionSchemas[name].safeParse(body);
  if (!parsed.success) return jsonError(422, 'Please fix the highlighted fields.', formatZodError(parsed.error));

  const data = parsed.data as CollectionTypes[typeof name];
  if ('slug' in data && (name === 'services' || name === 'projects' || name === 'jobs')) {
    if (await slugTaken(name, data.slug, id)) {
      return jsonError(422, 'That slug is already used.', [{ path: 'slug', message: 'Choose a different slug' }]);
    }
  }
  return NextResponse.json({ item: await updateItem(name, id, data) });
});

export const DELETE = withAdmin('content:write', async (_req: NextRequest, { params }: Ctx) => {
  const { name: rawName, id } = await params;
  const name = toCollection(rawName);
  if (!name) return jsonError(404, 'Unknown collection');
  if (!(await findItem(name, id))) return jsonError(404, 'This item no longer exists.');
  await deleteItem(name, id);
  return NextResponse.json({ ok: true });
});
