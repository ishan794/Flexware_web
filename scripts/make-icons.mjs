#!/usr/bin/env node
/**
 * Generates the site icons from the logo artwork (`npm run icons`).
 *
 * The logo is a wide wordmark, so the icons use the "FLX" letterforms cut straight
 * out of public/brand/logo-light.png — no redrawn glyphs — set in white on a brand
 * navy plate. Each size is rendered on its own rather than downscaled from one
 * master: at 16px the glyph needs proportionally more of the plate and a sharpen
 * pass to stay legible, and a single downscale loses it.
 *
 * Writes app/favicon.ico (16/32/48), app/icon.png (512) and app/apple-icon.png (180).
 * Next picks all three up by filename — no <link> tags needed.
 */
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(root, 'public/brand/logo-light.png');

const NAVY = '#234b78';          // the wordmark's own navy
const FG = [0xf8, 0xfa, 0xfc];   // --theme-foreground
const MINT = [0xc2, 0xee, 0xc6]; // the wordmark's mint accent

// "FLX" in the source artwork: glyph runs F(5-46) L(53-90) X(92-146), ink rows 4-64.
const CROP = { left: 5, top: 4, width: 142, height: 61 };

/**
 * Navy letterforms -> white, with the same continuous greenness blend used for the
 * dark wordmark so any accent pixel keeps its antialiasing rather than snapping.
 */
async function toLightInk(buffer) {
  const { data, info } = await sharp(buffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const out = Buffer.from(data);
  for (let i = 0; i < out.length; i += 4) {
    if (out[i + 3] === 0) continue;
    const [r, g, b] = [out[i], out[i + 1], out[i + 2]];
    const t = Math.min(1, Math.max(0, (g - Math.max(r, b)) / 40));
    for (let c = 0; c < 3; c++) out[i + c] = Math.round(FG[c] + (MINT[c] - FG[c]) * t);
  }
  return sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toBuffer();
}

const glyph = await toLightInk(await sharp(SRC).extract(CROP).png().toBuffer());

/** One icon at `size`, with the glyph spanning `inset` of the width. */
async function icon(size, { inset, radius = 0.22, sharpen = false } = {}) {
  const plate = Buffer.from(
    `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">` +
      `<rect width="${size}" height="${size}" rx="${size * radius}" ry="${size * radius}" fill="${NAVY}"/>` +
      `</svg>`
  );
  let art = sharp(glyph).resize({ width: Math.round(size * inset), fit: 'inside' });
  // Downscaling thin strokes to tab size softens them past reading; this pulls the
  // edges back without the halo a stronger unsharp mask would leave.
  if (sharpen) art = art.sharpen({ sigma: 0.6 });
  const scaled = await art.png().toBuffer();
  const { width, height } = await sharp(scaled).metadata();
  return sharp(plate)
    .composite([{ input: scaled, left: Math.round((size - width) / 2), top: Math.round((size - height) / 2) }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

/**
 * Minimal ICO container holding PNG-encoded entries, which every browser in use
 * reads. Avoids a dependency, and ImageMagick is not available here.
 */
function ico(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // 1 = icon
  header.writeUInt16LE(images.length, 4);

  let offset = 6 + images.length * 16;
  const entries = [];
  for (const { size, data } of images) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0); // 0 means 256
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt8(0, 2); // palette colours
    e.writeUInt8(0, 3); // reserved
    e.writeUInt16LE(1, 4); // colour planes
    e.writeUInt16LE(32, 6); // bits per pixel
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += data.length;
    entries.push(e);
  }
  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

const favicon = [
  { size: 16, data: await icon(16, { inset: 0.86, radius: 0.16, sharpen: true }) },
  { size: 32, data: await icon(32, { inset: 0.80, radius: 0.19, sharpen: true }) },
  { size: 48, data: await icon(48, { inset: 0.76 }) },
];

writeFileSync(join(root, 'app/favicon.ico'), ico(favicon));
writeFileSync(join(root, 'app/icon.png'), await icon(512, { inset: 0.70 }));
// Apple crops to a squircle itself, so the plate is square and the glyph sits tighter.
writeFileSync(join(root, 'app/apple-icon.png'), await icon(180, { inset: 0.66, radius: 0 }));

console.log('Wrote app/favicon.ico (16/32/48), app/icon.png (512), app/apple-icon.png (180)');
