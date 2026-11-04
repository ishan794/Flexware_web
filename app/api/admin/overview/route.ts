import { NextResponse } from 'next/server';
import { getRepository } from '@/app/lib/server/repository';
import { collectionNames, type CollectionName } from '@/app/lib/cms/types';
import { withAdmin } from '@/app/lib/server/api';

/** Dashboard numbers: real counts only */
export const GET = withAdmin('content:read', async () => {
  const repo = getRepository();
  const [totals, recent, media, ...counts] = await Promise.all([
    repo.inquiries.totals(),
    repo.inquiries.list({ take: 5 }),
    repo.media.count(),
    ...collectionNames.map((name) => repo.collections.count(name, { publishedOnly: true })),
  ]);
  const published = Object.fromEntries(collectionNames.map((name, i) => [name, counts[i]])) as Record<CollectionName, number>;

  return NextResponse.json({
    inquiries: { new: totals.NEW, total: totals.NEW + totals.READ + totals.ARCHIVED, recent },
    published,
    media,
    dataSource: repo.kind,
  });
});
