import type { NextRequest } from 'next/server';
import { readUpload } from '@/app/lib/server/media';

type Ctx = { params: Promise<{ file: string }> };

/** Public, immutable delivery of uploaded media (file names are random and never reused) */
export async function GET(_req: NextRequest, { params }: Ctx) {
  const file = await readUpload((await params).file);
  if (!file) return new Response('Not found', { status: 404 });

  return new Response(new Uint8Array(file.data), {
    headers: {
      'Content-Type': file.mime,
      'Content-Length': String(file.data.length),
      'Cache-Control': 'public, max-age=31536000, immutable',
      'X-Content-Type-Options': 'nosniff',
      // SVGs opened directly can't run scripts or load anything
      'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; sandbox",
    },
  });
}
