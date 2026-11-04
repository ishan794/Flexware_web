import { NextResponse, type NextRequest } from 'next/server';
import { getRepository } from '@/app/lib/server/repository';
import { jsonError, withAdmin } from '@/app/lib/server/api';
import { ALLOWED_TYPES, MAX_UPLOAD_BYTES, mediaUrl, removeUpload, saveUpload, sniffMatches } from '@/app/lib/server/media';

const withUrl = <T extends { filename: string }>(asset: T) => ({ ...asset, url: mediaUrl(asset.filename) });

export const GET = withAdmin('media:read', async () => {
  const items = await getRepository().media.list();
  return NextResponse.json({ items: items.map(withUrl) });
});

/** multipart/form-data with a single "file" field and optional "alt" */
export const POST = withAdmin('media:write', async (req: NextRequest) => {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return jsonError(400, 'Upload a file using the form.');
  }
  const file = form.get('file');
  if (!(file instanceof File)) return jsonError(400, 'Choose a file to upload.');
  if (!ALLOWED_TYPES[file.type]) return jsonError(415, 'Only PNG, JPG, WebP, GIF or SVG images are allowed.');
  if (file.size > MAX_UPLOAD_BYTES) return jsonError(413, 'Images must be 5 MB or smaller.');

  const buf = Buffer.from(await file.arrayBuffer());
  if (!sniffMatches(file.type, buf)) return jsonError(415, "This file doesn't look like a valid image.");

  const filename = await saveUpload(buf, file.type);
  const alt = String(form.get('alt') ?? '').trim().slice(0, 200);
  try {
    const asset = await getRepository().media.create({
      filename,
      originalName: file.name.slice(0, 200),
      mimeType: file.type,
      size: file.size,
      alt,
    });
    return NextResponse.json({ item: withUrl(asset) }, { status: 201 });
  } catch (err) {
    await removeUpload(filename); // keep disk and metadata in sync
    throw err;
  }
});
