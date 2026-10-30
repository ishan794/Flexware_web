import 'server-only';
import { randomBytes } from 'node:crypto';
import { mkdir, readFile, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';

/**
 * Uploaded media lives outside /public (Next only serves files present at build time
 * from /public). Files are served by app/media/[file]/route.ts. In production, mount
 * UPLOAD_DIR on a persistent volume.
 */
// turbopackIgnore: runtime-only path; stops the build tracing the whole project into the standalone output
const configuredUploadDir = process.env.UPLOAD_DIR;
export const UPLOAD_DIR = configuredUploadDir
  ? path.resolve(/*turbopackIgnore: true*/ configuredUploadDir)
  : path.join(/*turbopackIgnore: true*/ process.cwd(), 'uploads');
export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

export const ALLOWED_TYPES: Record<string, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/svg+xml': 'svg',
};

const MIME_BY_EXT: Record<string, string> = Object.fromEntries(Object.entries(ALLOWED_TYPES).map(([m, e]) => [e, m]));

/** Checks file signatures so a renamed executable can't pose as an image */
export function sniffMatches(mime: string, buf: Buffer) {
  const hex = buf.subarray(0, 12).toString('hex');
  switch (mime) {
    case 'image/png':
      return hex.startsWith('89504e470d0a1a0a');
    case 'image/jpeg':
      return hex.startsWith('ffd8ff');
    case 'image/gif':
      return hex.startsWith('474946383');
    case 'image/webp':
      return hex.startsWith('52494646') && buf.subarray(8, 12).toString('ascii') === 'WEBP';
    case 'image/svg+xml': {
      const head = buf.subarray(0, 1024).toString('utf8').toLowerCase();
      return head.includes('<svg');
    }
    default:
      return false;
  }
}

export async function saveUpload(buf: Buffer, mime: string) {
  await mkdir(UPLOAD_DIR, { recursive: true });
  const filename = `${Date.now().toString(36)}-${randomBytes(8).toString('hex')}.${ALLOWED_TYPES[mime]}`;
  await writeFile(path.join(/*turbopackIgnore: true*/ UPLOAD_DIR, filename), buf);
  return filename;
}

/** Only plain generated names are accepted — no paths, no traversal */
export function isSafeFilename(name: string) {
  return /^[a-z0-9]+-[a-f0-9]{16}\.(png|jpg|webp|gif|svg)$/.test(name);
}

export async function readUpload(filename: string) {
  if (!isSafeFilename(filename)) return null;
  try {
    const data = await readFile(path.join(/*turbopackIgnore: true*/ UPLOAD_DIR, filename));
    return { data, mime: MIME_BY_EXT[filename.split('.').pop()!] };
  } catch {
    return null;
  }
}

export async function removeUpload(filename: string) {
  if (!isSafeFilename(filename)) return;
  await unlink(path.join(/*turbopackIgnore: true*/ UPLOAD_DIR, filename)).catch(() => {});
}

export const mediaUrl = (filename: string) => `/media/${filename}`;
