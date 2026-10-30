# Flxware admin panel & CMS

The website's editable content is managed at **`/admin`**. This document covers how the
pieces fit together and how to switch from the development data store to PostgreSQL.

## Architecture

```
Public pages (app/(site))  ─┐                        ┌─ PostgreSQL adapter (production)
Admin UI (app/admin)        ├─► content service ─► repository ─┤   app/lib/server/repository/postgres.ts
Admin API (app/api/admin)  ─┘   app/lib/server/content.ts     └─ Dev in-memory adapter (development only)
                                (cache + invalidation)            app/lib/server/repository/dev-memory.ts
```

- **Repository contract:** `app/lib/server/repository/types.ts`. Nothing above it knows which adapter is active.
- **Adapter selection:** `app/lib/server/repository/index.ts`
  - `NODE_ENV=production` → **always PostgreSQL**. The dev adapter's factory throws if called.
  - Development/test → PostgreSQL when `DATABASE_URL` is set, otherwise the in-memory dev store
    (force it with `CMS_DATA_SOURCE=dev-memory`).
- **Caching:** public reads use `unstable_cache` tagged per document/collection; every admin write calls
  `revalidateTag(tag, { expire: 0 })`, so changes are live on the next request.
- **Fallback:** if storage is unreachable, public pages render the built-in defaults
  (`app/lib/cms/defaults.ts`) instead of failing. Showcase sections stay hidden.

### Modules

| Admin page | Public effect | Storage |
|---|---|---|
| Dashboard | — | counts only |
| Homepage | hero, service highlight cards, CTA, FAQ | `SiteContent['homepage']` |
| Services | `/services`, footer links | `Service` |
| Portfolio | `/portfolio`, `/portfolio/[slug]` | `Project` |
| Careers | `/careers`, `/careers/[slug]` | `Job` |
| About | `/about` intro | `SiteContent['about']` |
| Testimonials / Client logos / Team / Stats | hidden sections, shown only when ≥1 entry is published | `Testimonial`, `ClientLogo`, `TeamMember`, `CompanyStat` |
| Inquiries | both contact forms post here | `Inquiry` |
| Media library | images used by the above | `MediaAsset` + files in `UPLOAD_DIR` |
| SEO | per-page `<title>` and description | `SiteContent['seo']` |
| Site settings | contact details, announcement bar | `SiteContent['settings']` |
| Security | change password, sign out other sessions | `AdminCredential`, `AdminSession` |

## Authentication & authorization

- One shared password (`ADMIN_PASSWORD`). Changing it in **Admin → Security** stores a scrypt hash that
  then takes precedence, and signs out other sessions.
- Sessions: random 256-bit token in an `httpOnly`, `SameSite=Strict` (and `Secure` in production) cookie;
  only its SHA-256 hash is stored. 12-hour lifetime.
- Login is throttled to 5 failures per IP per 15 minutes (in memory, per server instance).
- Every `/api/admin/*` route goes through `withAdmin(permission, handler)` (`app/lib/server/api.ts`):
  same-origin check → valid session → role permission. `proxy.ts` only redirects page views without a
  cookie to the login screen; it is not the security boundary.
- **Roles** (`app/lib/server/permissions.ts`): `owner` (everything), `editor` (content, media, inquiries),
  `viewer` (read-only). The shared password always creates `owner` sessions; adding per-person accounts
  later only requires issuing sessions with other roles. No route changes.
- **Development only:** if `ADMIN_PASSWORD` is empty, a random one-time password is printed in the dev
  server console on the first sign-in attempt. Production has no fallback; sign-in is disabled until
  `ADMIN_PASSWORD` is set.

## Development without a database

Leave `DATABASE_URL` empty in `.env` and run `npm run dev`.

- The admin shows a yellow **"Development data store"** banner. All changes live in memory and are lost
  when the server restarts.
- The store is seeded only with the site's existing real content (services, projects, jobs). Testimonials,
  logos, team and stats start **empty**: no fabricated data.
- Uploaded images are written to `./uploads` (gitignored); their metadata is in memory only.

## Switching to PostgreSQL (one-time setup)

1. Create a database (PostgreSQL 14+), e.g. `flxware`.
2. In `.env` set:
   ```
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/flxware?schema=public"
   ADMIN_PASSWORD="at-least-12-characters"
   ```
3. Apply the schema (the migration SQL is already generated in `prisma/migrations/`):
   ```bash
   npm run db:deploy
   ```
4. Load the current website content (idempotent: never overwrites admin edits; showcase tables stay empty):
   ```bash
   npm run db:seed
   ```
5. Restart `npm run dev`. The dev-store banner disappears.

For schema changes later: edit `prisma/schema.prisma`, then `npm run db:migrate -- --name <change>`.

## Production deployment

- Build/run: `npm run build` then `npm start` (or the `Dockerfile`, which uses Next's standalone output).
- Required env: `DATABASE_URL`, `ADMIN_PASSWORD`. Optional: `UPLOAD_DIR` (mount a **persistent volume**
  there; uploads are not stored in the database).
- Run `npx prisma migrate deploy` on each release before starting the new version.
- Serve over HTTPS (the session cookie is `Secure` in production).
- Login and contact-form throttles are per instance; behind multiple instances use a shared rate limiter.

## Tests

`npm test` runs component tests, schema tests and API integration tests. The integration tests exercise
the real route handlers against the isolated dev store. They verify request handling, validation, auth,
roles and repository wiring, **not** PostgreSQL persistence, which needs a live database to verify.
