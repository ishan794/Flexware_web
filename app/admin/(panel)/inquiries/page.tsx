import type { Metadata } from 'next';
import InquiriesInbox from './InquiriesInbox';

export const metadata: Metadata = { title: 'Inquiries' };

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? null;

/** Initial filter (?status=NEW) and deep link (?open=<id>) are read on the server */
export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  return <InquiriesInbox initialStatus={first(params.status)} initialOpenId={first(params.open)} />;
}
