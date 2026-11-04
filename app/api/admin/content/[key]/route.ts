import { NextResponse, type NextRequest } from 'next/server';
import { contentSchemas, formatZodError } from '@/app/lib/cms/schemas';
import { contentKeys, type ContentDocs, type ContentKey } from '@/app/lib/cms/types';
import { readContentDoc, writeContentDoc } from '@/app/lib/server/content';
import { jsonError, readJson, withAdmin } from '@/app/lib/server/api';

type Ctx = { params: Promise<{ key: string }> };

function toKey(key: string): ContentKey | null {
  return (contentKeys as string[]).includes(key) ? (key as ContentKey) : null;
}

export const GET = withAdmin('content:read', async (_req: NextRequest, { params }: Ctx) => {
  const key = toKey((await params).key);
  if (!key) return jsonError(404, 'Unknown content section');
  return NextResponse.json({ data: await readContentDoc(key) });
});

export const PUT = withAdmin('content:write', async (req: NextRequest, { params }: Ctx) => {
  const key = toKey((await params).key);
  if (!key) return jsonError(404, 'Unknown content section');

  const parsed = contentSchemas[key].safeParse(await readJson(req));
  if (!parsed.success) return jsonError(422, 'Please fix the highlighted fields.', formatZodError(parsed.error));

  const data = parsed.data as ContentDocs[typeof key];
  if (key === 'settings') {
    // Keep the tel: link in sync with the display number
    const settings = data as ContentDocs['settings'];
    settings.phoneHref = `tel:${settings.phone.replace(/[^\d+]/g, '')}`;
  }
  await writeContentDoc(key, data);
  return NextResponse.json({ data });
});
