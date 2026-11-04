# Production image for the Flxware website + admin (Next.js standalone server).
# Runtime env: DATABASE_URL, ADMIN_PASSWORD, SITE_URL (defaults to https://flxwaretech.com),
# optional UPLOAD_DIR (mount a volume there).

FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma
COPY prisma.config.ts ./
# postinstall runs `prisma generate`; no database connection is needed for that
RUN DATABASE_URL="postgresql://build:build@localhost:5432/build" npm ci

FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Public pages render on request, so the build does not connect to the database
RUN DATABASE_URL="postgresql://build:build@localhost:5432/build" npm run build

FROM node:20-alpine AS run
WORKDIR /app
ENV NODE_ENV=production
ENV UPLOAD_DIR=/app/uploads
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs && mkdir -p /app/uploads && chown nextjs:nodejs /app/uploads
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
# Prisma CLI + schema so migrations can run on deploy: `npx prisma migrate deploy`
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/prisma.config.ts ./prisma.config.ts
COPY --from=deps /app/node_modules/prisma ./node_modules/prisma
COPY --from=deps /app/node_modules/@prisma ./node_modules/@prisma
USER nextjs
VOLUME ["/app/uploads"]
EXPOSE 3000
ENV PORT=3000 HOSTNAME=0.0.0.0
CMD ["node", "server.js"]
