# Static hosting (Hostinger / cPanel)

The site can be built two ways. This document covers the second.

| | Server build | Static build |
|---|---|---|
| Command | `npm run build` | `npm run build:static` |
| Output | `.next/` (run with `npm start`) | `out/` (upload to `public_html`) |
| Needs | Node.js + PostgreSQL | Apache only |
| Admin panel at `/admin` | yes | **no** |
| Content edited in | the admin panel | `app/lib/cms/`, then rebuild |

## Deploying

```bash
npm run build:static
```

Upload the **contents** of `out/` to `public_html/` — the files themselves, not the
`out` folder. `.htaccess` and `contact.php` are included automatically.

The first deploy also needs the contact mailbox to exist: `contact.php` sends from
`website@flxwaretech.com`, and shared hosts reject mail claiming to come from a
domain they do not host. Create that address in hPanel first, or edit `MAIL_FROM`.

## What the static build does

Next has no way to exclude routes from `output: 'export'`, and the admin panel, the
API routes and the proxy all need a server. So `scripts/build-static.mjs`:

1. Moves `app/admin`, `app/api`, `app/media` and `proxy.ts` out of the tree.
2. Rewrites the `force-dynamic` line in `app/(site)/layout.tsx` to `force-static`
   (Next requires that value to be a literal, so it cannot be made conditional).
3. Runs `next build` with `STATIC_EXPORT=1` and an empty `DATABASE_URL`.
4. Puts all of it back — including when the build fails or you press Ctrl-C.
5. Copies `static-host/` (`.htaccess`, `contact.php`) into `out/`.

Nothing is left modified afterwards. If step 2's line no longer matches, the build
stops with an error rather than producing a half-configured export.

Prefer to stop `npm run dev` first. A dev server running alongside the build watches
the tree, sees the parked routes vanish and rewrites its generated route types
without them. The script deletes those types afterwards so they are rebuilt
correctly, but stopping dev avoids the churn.

## Where the content comes from

`getPublished()` and `getContent()` fall back to the defaults in `app/lib/cms/` when
storage is unreachable. The static build runs with no `DATABASE_URL`, so every page
is rendered from those files. To change site content, edit them and rebuild:

- `app/lib/cms/default-projects.ts` — portfolio
- `app/lib/cms/default-jobs.ts` — careers
- `app/lib/cms/defaults.ts` — everything else (settings, homepage, about, services, SEO)

## What changes versus the server build

**Gone:** the admin panel, all 12 admin API routes, uploaded media (`/media/[file]`)
and the proxy. Submissions are emailed rather than stored, so there is no
Inquiries list.

**Still works:** every public page, and the AI assistant — its engine is rule-based,
so it runs in the browser instead of calling `/api/assistant`.

**The contact form** posts to `/contact.php` instead of `/api/contact`, set by
`NEXT_PUBLIC_CONTACT_ENDPOINT` (the build script defaults it). Same JSON contract,
same validation, same per-IP throttle of 5 per 10 minutes.

## .htaccess

`next.config.ts`'s `headers()` is a server feature that `output: 'export'` ignores, so
the security headers are reproduced in `static-host/.htaccess`, which also forces
HTTPS, points 404s at `404.html`, caches hashed assets for a year, and blocks source
maps. Every directive is valid in `.htaccess` (directory) context — `<LocationMatch>`
and a mod_deflate-guarded `AddOutputFilterByType` both return 500 there, so avoid them
when editing.
