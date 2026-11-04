import 'server-only';
import { revalidateTag, unstable_cache } from 'next/cache';
import { getRepository } from './repository';
import type { Stored } from './repository/types';
import { defaultContent, defaultJobs, defaultProjects, defaultServices } from '../cms/defaults';
import type {
  CollectionName,
  CollectionTypes,
  ContentDocs,
  ContentKey,
  JobItem,
  ProjectItem,
} from '../cms/types';

/*
 * Content service: cached reads for the public site, writes for the admin API.
 * Storage goes through the repository (PostgreSQL in production).
 */

const contentTag = (key: ContentKey) => `content:${key}`;
const collectionTag = (name: CollectionName) => `collection:${name}`;

function invalidate(tag: string) {
  try {
    revalidateTag(tag, { expire: 0 });
  } catch {
    // Outside a Next.js request (e.g. unit tests) there is no cache to invalidate
  }
}

// ---------- Singleton documents ----------

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

/** Stored values win; keys missing from older stored documents fall back to defaults. Arrays are replaced. */
export function mergeDefaults<T>(defaults: T, stored: unknown): T {
  if (stored === null || stored === undefined) return defaults;
  if (!isPlainObject(defaults) || !isPlainObject(stored)) return stored as T;
  const out: Record<string, unknown> = { ...defaults };
  for (const [k, v] of Object.entries(stored)) {
    out[k] = k in defaults ? mergeDefaults((defaults as Record<string, unknown>)[k], v) : v;
  }
  return out as T;
}

/** Uncached read for the admin editor */
export async function readContentDoc<K extends ContentKey>(key: K): Promise<ContentDocs[K]> {
  return mergeDefaults(defaultContent[key], await getRepository().docs.get(key));
}

export async function writeContentDoc<K extends ContentKey>(key: K, data: ContentDocs[K]) {
  await getRepository().docs.set(key, data);
  invalidate(contentTag(key));
}

/** Cached read for the public site; falls back to defaults if storage is unreachable */
export function getContent<K extends ContentKey>(key: K): Promise<ContentDocs[K]> {
  return unstable_cache(
    async () => {
      try {
        return await readContentDoc(key);
      } catch (err) {
        console.error(`[cms] Could not load "${key}"; using built-in defaults.`, err);
        return defaultContent[key];
      }
    },
    ['cms-content', key],
    { tags: [contentTag(key)] }
  )();
}

// ---------- Collections ----------

/** Published-content fallbacks when storage is unreachable (showcase lists stay empty) */
const fallback: { [K in CollectionName]: CollectionTypes[K][] } = {
  services: defaultServices,
  projects: defaultProjects,
  jobs: defaultJobs,
  testimonials: [],
  logos: [],
  team: [],
  stats: [],
};

export function listCollection<N extends CollectionName>(name: N): Promise<Stored<N>[]> {
  return getRepository().collections.list(name);
}

export function getPublished<N extends CollectionName>(name: N): Promise<CollectionTypes[N][]> {
  return unstable_cache(
    async () => {
      try {
        return (await getRepository().collections.list(name, { publishedOnly: true })) as CollectionTypes[N][];
      } catch (err) {
        console.error(`[cms] Could not load "${name}"; using built-in defaults.`, err);
        return fallback[name] as CollectionTypes[N][];
      }
    },
    ['cms-collection', name],
    { tags: [collectionTag(name)] }
  )();
}

export async function getPublishedProject(slug: string): Promise<ProjectItem | undefined> {
  return (await getPublished('projects')).find((p) => p.slug === slug);
}

export async function getPublishedJob(slug: string): Promise<JobItem | undefined> {
  return (await getPublished('jobs')).find((j) => j.slug === slug);
}

export async function createItem<N extends CollectionName>(name: N, data: CollectionTypes[N]) {
  const repo = getRepository();
  // New items go to the end of the list unless an order was given
  const order = data.order ?? (await repo.collections.count(name));
  const created = await repo.collections.create(name, { ...data, order });
  invalidate(collectionTag(name));
  return created;
}

export async function updateItem<N extends CollectionName>(name: N, id: string, data: Partial<CollectionTypes[N]>) {
  const updated = await getRepository().collections.update(name, id, data);
  invalidate(collectionTag(name));
  return updated;
}

export async function deleteItem(name: CollectionName, id: string) {
  await getRepository().collections.remove(name, id);
  invalidate(collectionTag(name));
}

export async function reorderItems(name: CollectionName, ids: string[]) {
  await getRepository().collections.reorder(name, ids);
  invalidate(collectionTag(name));
}

export function findItem(name: CollectionName, id: string) {
  return getRepository().collections.find(name, id);
}

export function slugTaken(name: 'services' | 'projects' | 'jobs', slug: string, exceptId?: string) {
  return getRepository().collections.slugTaken(name, slug, exceptId);
}
