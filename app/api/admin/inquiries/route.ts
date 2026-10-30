import { NextResponse, type NextRequest } from 'next/server';
import { getRepository } from '@/app/lib/server/repository';
import type { InquiryStatus } from '@/app/lib/server/repository/types';
import { withAdmin } from '@/app/lib/server/api';

const STATUSES: InquiryStatus[] = ['NEW', 'READ', 'ARCHIVED'];

/** GET ?status=NEW|READ|ARCHIVED&q=search — newest first, capped at 200 */
export const GET = withAdmin('inquiries:read', async (req: NextRequest) => {
  const raw = req.nextUrl.searchParams.get('status')?.toUpperCase();
  const status = STATUSES.includes(raw as InquiryStatus) ? (raw as InquiryStatus) : undefined;
  const q = req.nextUrl.searchParams.get('q')?.trim().slice(0, 100) || undefined;
  const repo = getRepository();
  const [items, totals] = await Promise.all([repo.inquiries.list({ status, q }), repo.inquiries.totals()]);
  return NextResponse.json({ items, totals });
});
