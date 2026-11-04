import 'server-only';
import type { CmsRepository } from './types';
import { postgresRepository } from './postgres';
import { createDevMemoryRepository } from './dev-memory';

export type { CmsRepository } from './types';

/**
 * Chooses the storage adapter.
 *
 *  • Production (NODE_ENV=production): ALWAYS PostgreSQL. The dev adapter is never
 *    used (its factory throws), even if CMS_DATA_SOURCE says otherwise.
 *  • Development/test: PostgreSQL when DATABASE_URL is set; otherwise the in-memory
 *    dev adapter (or force it with CMS_DATA_SOURCE=dev-memory).
 */
export function isDevDataSource() {
  if (process.env.NODE_ENV === 'production') return false;
  return process.env.CMS_DATA_SOURCE === 'dev-memory' || !process.env.DATABASE_URL;
}

let cached: CmsRepository | undefined;

export function getRepository(): CmsRepository {
  if (cached) return cached;
  if (isDevDataSource()) {
    cached = createDevMemoryRepository();
    console.warn(
      '\n[cms] ⚠ Using the DEVELOPMENT in-memory data store. Changes are NOT persisted and reset on restart.\n' +
        '      Set DATABASE_URL to use PostgreSQL.\n'
    );
  } else {
    cached = postgresRepository;
  }
  return cached;
}

/** For tests only */
export function __setRepositoryForTests(repo: CmsRepository | undefined) {
  cached = repo;
}
