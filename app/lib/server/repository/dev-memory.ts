import 'server-only';
import { randomUUID } from 'node:crypto';
import { defaultJobs, defaultProjects, defaultServices } from '../../cms/defaults';
import type { CollectionName, ContentKey } from '../../cms/types';
import type { CmsRepository, InquiryRecord, InquiryStatus, MediaRecord, SessionRecord, Stored } from './types';

/**
 * ⚠️ DEVELOPMENT-ONLY adapter — NOT persistent, NOT for production.
 *
 * Keeps all CMS data in process memory so the website and admin can be built and
 * tested before PostgreSQL is configured. Everything resets when the dev server
 * restarts. It is seeded only with the site's existing real content (services,
 * projects, jobs); showcase lists (testimonials, logos, team, stats) start EMPTY —
 * no fabricated data. Selection rules live in ./index.ts, which refuses to use this
 * adapter when NODE_ENV=production.
 */

type Row = Record<string, unknown> & { id: string; order: number; published: boolean; createdAt: Date; updatedAt: Date };

interface Store {
  docs: Map<ContentKey, unknown>;
  collections: Record<CollectionName, Row[]>;
  inquiries: InquiryRecord[];
  media: MediaRecord[];
  sessions: SessionRecord[];
  passwordHash: string | null;
}

function seedRows(items: object[]): Row[] {
  const now = new Date();
  return items.map((item, order) => ({ ...item, id: randomUUID(), order, published: true, createdAt: now, updatedAt: now }));
}

function createStore(): Store {
  return {
    docs: new Map(),
    collections: {
      services: seedRows(defaultServices),
      projects: seedRows(defaultProjects),
      jobs: seedRows(defaultJobs),
      testimonials: [],
      logos: [],
      team: [],
      stats: [],
    },
    inquiries: [],
    media: [],
    sessions: [],
    passwordHash: null,
  };
}

// Survive hot reloads in `next dev`
const g = globalThis as unknown as { __flxDevStore?: Store };
const store = () => (g.__flxDevStore ??= createStore());

/** Test helper: start from a clean seeded store */
export function resetDevStore() {
  g.__flxDevStore = createStore();
}

const clone = <T>(v: T): T => structuredClone(v);
const sortRows = (rows: Row[]) => [...rows].sort((a, b) => a.order - b.order || a.createdAt.getTime() - b.createdAt.getTime());

function notFound(): never {
  // Mirrors Prisma's "record not found" so callers behave the same with either adapter
  throw Object.assign(new Error('Record not found'), { code: 'P2025' });
}

/** Refuses to run in production — the dev store is never a production data source */
export function createDevMemoryRepository(): CmsRepository {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('The dev-memory repository must never be used in production.');
  }
  return devMemoryRepository;
}

const devMemoryRepository: CmsRepository = {
  kind: 'dev-memory',

  docs: {
    async get(key) {
      return clone(store().docs.get(key) ?? null);
    },
    async set(key, data) {
      store().docs.set(key, clone(data));
    },
  },

  collections: {
    async list(name, opts) {
      const rows = sortRows(store().collections[name]).filter((r) => !opts?.publishedOnly || r.published);
      return clone(rows) as unknown as Stored<typeof name>[];
    },
    async find(name, id) {
      const row = store().collections[name].find((r) => r.id === id);
      return row ? (clone(row) as unknown as Stored<typeof name>) : null;
    },
    async count(name, opts) {
      return store().collections[name].filter((r) => !opts?.publishedOnly || r.published).length;
    },
    async create(name, data) {
      const now = new Date();
      const row = { published: false, ...clone(data), id: randomUUID(), createdAt: now, updatedAt: now } as unknown as Row;
      store().collections[name].push(row);
      return clone(row) as unknown as Stored<typeof name>;
    },
    async update(name, id, data) {
      const row = store().collections[name].find((r) => r.id === id) ?? notFound();
      Object.assign(row, clone(data), { updatedAt: new Date() });
      return clone(row) as unknown as Stored<typeof name>;
    },
    async remove(name, id) {
      const list = store().collections[name];
      const i = list.findIndex((r) => r.id === id);
      if (i < 0) notFound();
      list.splice(i, 1);
    },
    async reorder(name, ids) {
      const list = store().collections[name];
      ids.forEach((id, order) => {
        const row = list.find((r) => r.id === id);
        if (row) row.order = order;
      });
    },
    async slugTaken(name, slug, exceptId) {
      return store().collections[name].some((r) => r.slug === slug && r.id !== exceptId);
    },
  },

  inquiries: {
    async list({ status, q, take = 200 }) {
      const needle = q?.toLowerCase();
      return clone(
        store()
          .inquiries.filter((i) => !status || i.status === status)
          .filter((i) => !needle || [i.name, i.email, i.message].some((v) => v.toLowerCase().includes(needle)))
          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
          .slice(0, take)
      );
    },
    async totals() {
      const t: Record<InquiryStatus, number> = { NEW: 0, READ: 0, ARCHIVED: 0 };
      for (const i of store().inquiries) t[i.status] += 1;
      return t;
    },
    async find(id) {
      return clone(store().inquiries.find((i) => i.id === id) ?? null);
    },
    async create(data) {
      const now = new Date();
      const row: InquiryRecord = { ...data, id: randomUUID(), status: 'NEW', createdAt: now, updatedAt: now };
      store().inquiries.push(row);
      return clone(row);
    },
    async setStatus(id, status) {
      const row = store().inquiries.find((i) => i.id === id) ?? notFound();
      row.status = status;
      row.updatedAt = new Date();
      return clone(row);
    },
    async remove(id) {
      const list = store().inquiries;
      const i = list.findIndex((r) => r.id === id);
      if (i < 0) return false;
      list.splice(i, 1);
      return true;
    },
  },

  media: {
    async list() {
      return clone([...store().media].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));
    },
    async find(id) {
      return clone(store().media.find((m) => m.id === id) ?? null);
    },
    async count() {
      return store().media.length;
    },
    async create(data) {
      const row: MediaRecord = { ...data, id: randomUUID(), createdAt: new Date() };
      store().media.push(row);
      return clone(row);
    },
    async setAlt(id, alt) {
      const row = store().media.find((m) => m.id === id) ?? notFound();
      row.alt = alt;
      return clone(row);
    },
    async remove(id) {
      const list = store().media;
      const i = list.findIndex((m) => m.id === id);
      if (i < 0) notFound();
      list.splice(i, 1);
    },
    async usages(url) {
      const c = store().collections;
      return [
        ...c.projects.filter((r) => r.imageUrl === url).map((r) => `Project: ${r.title}`),
        ...c.testimonials.filter((r) => r.imageUrl === url).map((r) => `Testimonial: ${r.name}`),
        ...c.logos.filter((r) => r.logoUrl === url).map((r) => `Logo: ${r.name}`),
        ...c.team.filter((r) => r.imageUrl === url).map((r) => `Team: ${r.name}`),
      ];
    },
  },

  sessions: {
    async create(data) {
      const now = new Date();
      const row: SessionRecord = { ...data, id: randomUUID(), createdAt: now, lastSeenAt: now };
      store().sessions.push(row);
      return clone(row);
    },
    async findByHash(tokenHash) {
      return clone(store().sessions.find((s) => s.tokenHash === tokenHash) ?? null);
    },
    async touch(id) {
      const s = store().sessions.find((x) => x.id === id);
      if (s) s.lastSeenAt = new Date();
    },
    async remove(id) {
      store().sessions = store().sessions.filter((s) => s.id !== id);
    },
    async removeByHash(tokenHash) {
      store().sessions = store().sessions.filter((s) => s.tokenHash !== tokenHash);
    },
    async removeOthers(keepId) {
      const before = store().sessions.length;
      store().sessions = store().sessions.filter((s) => s.id === keepId);
      return before - store().sessions.length;
    },
    async countActive() {
      const now = Date.now();
      return store().sessions.filter((s) => s.expiresAt.getTime() > now).length;
    },
    async purgeExpired() {
      const now = Date.now();
      store().sessions = store().sessions.filter((s) => s.expiresAt.getTime() > now);
    },
  },

  credentials: {
    async getPasswordHash() {
      return store().passwordHash;
    },
    async setPasswordHash(hash) {
      store().passwordHash = hash;
    },
  },
};
