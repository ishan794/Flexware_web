import 'server-only';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../../generated/prisma/client';
import type { CollectionName } from '../../cms/types';
import { isRole } from '../permissions';
import type { CmsRepository, InquiryRecord, SessionRecord, Stored } from './types';

/** PRODUCTION adapter: PostgreSQL via Prisma. Requires DATABASE_URL. */

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function client(): PrismaClient {
  if (!globalForPrisma.prisma) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) throw new Error('DATABASE_URL is not set.');
    globalForPrisma.prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });
  }
  return globalForPrisma.prisma;
}

type Delegate = {
  findMany: (args?: object) => Promise<unknown[]>;
  findUnique: (args: object) => Promise<unknown>;
  findFirst: (args: object) => Promise<unknown>;
  create: (args: object) => Promise<unknown>;
  update: (args: object) => Promise<unknown>;
  delete: (args: object) => Promise<unknown>;
  count: (args?: object) => Promise<number>;
};

function delegate(name: CollectionName): Delegate {
  const db = client();
  const map = {
    services: db.service,
    projects: db.project,
    jobs: db.job,
    testimonials: db.testimonial,
    logos: db.clientLogo,
    team: db.teamMember,
    stats: db.companyStat,
  };
  return map[name] as unknown as Delegate;
}

const ORDER = [{ order: 'asc' }, { createdAt: 'asc' }];

const toSession = (s: { role: string } & Omit<SessionRecord, 'role'>): SessionRecord => ({
  ...s,
  role: isRole(s.role) ? s.role : 'viewer',
});

export const postgresRepository: CmsRepository = {
  kind: 'postgres',

  docs: {
    async get(key) {
      return (await client().siteContent.findUnique({ where: { key } }))?.data ?? null;
    },
    async set(key, data) {
      const json = data as object;
      await client().siteContent.upsert({ where: { key }, update: { data: json }, create: { key, data: json } });
    },
  },

  collections: {
    async list(name, opts) {
      return (await delegate(name).findMany({
        where: opts?.publishedOnly ? { published: true } : undefined,
        orderBy: ORDER,
      })) as Stored<typeof name>[];
    },
    async find(name, id) {
      return (await delegate(name).findUnique({ where: { id } })) as Stored<typeof name> | null;
    },
    count: (name, opts) => delegate(name).count({ where: opts?.publishedOnly ? { published: true } : undefined }),
    async create(name, data) {
      return (await delegate(name).create({ data })) as Stored<typeof name>;
    },
    async update(name, id, data) {
      return (await delegate(name).update({ where: { id }, data })) as Stored<typeof name>;
    },
    async remove(name, id) {
      await delegate(name).delete({ where: { id } });
    },
    async reorder(name, ids) {
      const d = delegate(name);
      await client().$transaction(ids.map((id, order) => d.update({ where: { id }, data: { order } }) as never));
    },
    async slugTaken(name, slug, exceptId) {
      return Boolean(await delegate(name).findFirst({ where: { slug, ...(exceptId ? { id: { not: exceptId } } : {}) } }));
    },
  },

  inquiries: {
    list({ status, q, take = 200 }) {
      return client().inquiry.findMany({
        where: {
          ...(status ? { status } : {}),
          ...(q
            ? {
                OR: [
                  { name: { contains: q, mode: 'insensitive' } },
                  { email: { contains: q, mode: 'insensitive' } },
                  { message: { contains: q, mode: 'insensitive' } },
                ],
              }
            : {}),
        },
        orderBy: { createdAt: 'desc' },
        take,
      }) as Promise<InquiryRecord[]>;
    },
    async totals() {
      const rows = await client().inquiry.groupBy({ by: ['status'], _count: { _all: true } });
      const get = (s: string) => rows.find((r) => r.status === s)?._count._all ?? 0;
      return { NEW: get('NEW'), READ: get('READ'), ARCHIVED: get('ARCHIVED') };
    },
    find: (id) => client().inquiry.findUnique({ where: { id } }) as Promise<InquiryRecord | null>,
    create: (data) => client().inquiry.create({ data }) as Promise<InquiryRecord>,
    setStatus: (id, status) => client().inquiry.update({ where: { id }, data: { status } }) as Promise<InquiryRecord>,
    async remove(id) {
      return (await client().inquiry.deleteMany({ where: { id } })).count > 0;
    },
  },

  media: {
    list: () => client().mediaAsset.findMany({ orderBy: { createdAt: 'desc' } }),
    find: (id) => client().mediaAsset.findUnique({ where: { id } }),
    count: () => client().mediaAsset.count(),
    create: (data) => client().mediaAsset.create({ data }),
    setAlt: (id, alt) => client().mediaAsset.update({ where: { id }, data: { alt } }),
    async remove(id) {
      await client().mediaAsset.delete({ where: { id } });
    },
    async usages(url) {
      const db = client();
      const [projects, testimonials, logos, team] = await Promise.all([
        db.project.findMany({ where: { imageUrl: url }, select: { title: true } }),
        db.testimonial.findMany({ where: { imageUrl: url }, select: { name: true } }),
        db.clientLogo.findMany({ where: { logoUrl: url }, select: { name: true } }),
        db.teamMember.findMany({ where: { imageUrl: url }, select: { name: true } }),
      ]);
      return [
        ...projects.map((p) => `Project: ${p.title}`),
        ...testimonials.map((t) => `Testimonial: ${t.name}`),
        ...logos.map((l) => `Logo: ${l.name}`),
        ...team.map((m) => `Team: ${m.name}`),
      ];
    },
  },

  sessions: {
    async create(data) {
      return toSession(await client().adminSession.create({ data }));
    },
    async findByHash(tokenHash) {
      const s = await client().adminSession.findUnique({ where: { tokenHash } });
      return s ? toSession(s) : null;
    },
    async touch(id) {
      await client().adminSession.update({ where: { id }, data: { lastSeenAt: new Date() } });
    },
    async remove(id) {
      await client().adminSession.deleteMany({ where: { id } });
    },
    async removeByHash(tokenHash) {
      await client().adminSession.deleteMany({ where: { tokenHash } });
    },
    async removeOthers(keepId) {
      return (await client().adminSession.deleteMany({ where: { id: { not: keepId } } })).count;
    },
    countActive: () => client().adminSession.count({ where: { expiresAt: { gt: new Date() } } }),
    async purgeExpired() {
      await client().adminSession.deleteMany({ where: { expiresAt: { lt: new Date() } } });
    },
  },

  credentials: {
    async getPasswordHash() {
      return (await client().adminCredential.findUnique({ where: { id: 1 } }))?.passwordHash ?? null;
    },
    async setPasswordHash(passwordHash) {
      await client().adminCredential.upsert({ where: { id: 1 }, update: { passwordHash }, create: { id: 1, passwordHash } });
    },
  },
};
