#!/usr/bin/env node
/**
 * Builds the static site for Apache/cPanel hosting (`npm run build:static`).
 *
 * Next has no way to exclude routes from `output: 'export'`, and the admin panel,
 * the API routes and the proxy all need a server — the build fails while they are
 * present. So they are moved aside for the duration of the build and put back
 * afterwards, including when the build fails or is interrupted.
 *
 * Output: out/ — upload its *contents* to public_html.
 */
import { spawnSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const parked = join(root, '.static-build-parked');

// Server-only routes, relative to the project root.
const SERVER_ONLY = ['app/admin', 'app/api', 'app/media', 'proxy.ts'];

// Next requires route segment config to be a literal string, so it cannot be made
// conditional in the source. These substitutions are applied for the build and
// reverted afterwards. A `from` that no longer matches aborts the build rather than
// silently producing a half-configured export.
const PATCHES = [
  {
    file: 'app/(site)/layout.tsx',
    from: "export const dynamic = 'force-dynamic';",
    to: "export const dynamic = 'force-static';",
  },
];

const moved = [];
const patched = [];

function park() {
  mkdirSync(parked, { recursive: true });
  for (const rel of SERVER_ONLY) {
    const from = join(root, rel);
    if (!existsSync(from)) continue;
    const to = join(parked, rel.replace(/[/\\]/g, '__'));
    renameSync(from, to);
    moved.push({ from, to });
    console.log(`  parked  ${rel}`);
  }
}

function applyPatches() {
  for (const { file, from, to } of PATCHES) {
    const path = join(root, file);
    const original = readFileSync(path, 'utf8');
    if (!original.includes(from)) {
      throw new Error(
        `${file} no longer contains:\n  ${from}\n` +
          'The static build patches that line. Update PATCHES in scripts/build-static.mjs.'
      );
    }
    patched.push({ path, original });
    writeFileSync(path, original.replaceAll(from, to));
    console.log(`  patched ${file}`);
  }
}

function restore() {
  while (patched.length) {
    const { path, original } = patched.pop();
    try {
      writeFileSync(path, original);
      console.log(`  reverted ${path.replace(root + '/', '')}`);
    } catch (err) {
      console.error(`\n!! Could not revert ${path}. Restore it from git.\n`, err);
    }
  }
  while (moved.length) {
    const { from, to } = moved.pop();
    try {
      mkdirSync(dirname(from), { recursive: true });
      renameSync(to, from);
      console.log(`  restored ${from.replace(root + '/', '')}`);
    } catch (err) {
      // Loud, because leaving the tree half-moved would be far worse than a failed build
      console.error(`\n!! Could not restore ${from}. It is at ${to} — move it back by hand.\n`, err);
    }
  }
  rmSync(parked, { recursive: true, force: true });

  // A dev server running alongside this build sees the parked routes disappear and
  // rewrites its generated route types without them, which then fails `tsc` even
  // though the tree is back. Drop them so they are regenerated from the real tree.
  rmSync(join(root, '.next/dev/types'), { recursive: true, force: true });
}

// Restore on Ctrl-C / kill as well as on normal failure
for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    restore();
    process.exit(130);
  });
}

console.log('\nBuilding static site\n');
let status = 1;
try {
  park();
  applyPatches();
  rmSync(join(root, 'out'), { recursive: true, force: true });

  const result = spawnSync('npx', ['next', 'build'], {
    cwd: root,
    stdio: 'inherit',
    env: {
      ...process.env,
      STATIC_EXPORT: '1',
      // No API routes in the export, so the form posts to the PHP handler.
      NEXT_PUBLIC_CONTACT_ENDPOINT: process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || '/contact.php',
      // Must be unset: with it, the build would try to read the real database
      // instead of falling back to the defaults in app/lib/cms/.
      DATABASE_URL: '',
    },
  });
  status = result.status ?? 1;
} finally {
  restore();
}

if (status !== 0) {
  console.error('\nBuild failed. Nothing was written to out/.\n');
  process.exit(status);
}

// next.config.ts gives the static build its own distDir so it cannot clobber the
// server build's .next. With a custom distDir, `output: 'export'` writes the
// finished site into that directory instead of out/, so move it into place.
const exportDir = join(root, '.next-static');
if (!existsSync(join(exportDir, 'index.html'))) {
  console.error(`\nExpected the exported site at ${exportDir}, but found no index.html there.\n`);
  process.exit(1);
}
// Build intermediates must never reach public_html. Today the export directory holds
// only the site; if a future Next leaves these behind, stop rather than publish them.
const strays = ['server', 'cache', 'BUILD_ID', 'trace', 'types'].filter((name) =>
  existsSync(join(exportDir, name))
);
if (strays.length) {
  console.error(`\nRefusing to publish: build intermediates in the export (${strays.join(', ')}).\n`);
  process.exit(1);
}
rmSync(join(root, 'out'), { recursive: true, force: true });
renameSync(exportDir, join(root, 'out'));

// Ship the Apache config and the PHP form handler alongside the export.
const hostFiles = join(root, 'static-host');
if (existsSync(hostFiles)) {
  cpSync(hostFiles, join(root, 'out'), { recursive: true });
  console.log('\n  added   .htaccess and contact.php');
}

console.log('\nDone. Upload the CONTENTS of out/ to public_html/\n');
