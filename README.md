# Flxware website

Marketing website and content-managed admin panel for Flxware, built with Next.js 16 (App Router),
Tailwind CSS v4, Prisma and PostgreSQL.

## Quick start

```bash
npm install
cp .env.example .env    # leave DATABASE_URL empty to use the development data store
npm run dev
```

- Website: http://localhost:3000
- Admin: http://localhost:3000/admin. Use `ADMIN_PASSWORD` from `.env`, or, in development only, the
  one-time password printed in the server console when it's empty.

Without `DATABASE_URL` the app runs on an **in-memory development store** (not persisted, refused in
production). See [docs/ADMIN.md](docs/ADMIN.md) to connect PostgreSQL.

## Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build / server |
| `npm test` | Jest: components, validation schemas, admin API integration (no database needed) |
| `npm run lint` | ESLint |
| `npm run db:deploy` | Apply Prisma migrations (needs `DATABASE_URL`) |
| `npm run db:seed` | Load the site's current content into the database (idempotent) |
| `npm run db:migrate` | Create a new migration after editing `prisma/schema.prisma` |
| `npm run db:studio` | Browse the database |

## Project layout

```
app/(site)/         public pages (home, services, portfolio, careers, about, contact…)
app/admin/          admin panel (login + modules)
app/api/admin/      admin API (session + role protected)
app/api/contact/    public contact endpoint → admin Inquiries
app/lib/cms/        content types, defaults (seed source) and validation schemas
app/lib/server/     auth, permissions, content service, repository adapters, media storage
prisma/             schema, generated SQL migration, seed script
docs/ADMIN.md       CMS architecture, security model, database setup, deployment
```
