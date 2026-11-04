import type { CollectionName, CollectionTypes, ContentKey } from '../../cms/types';
import type { AdminRole } from '../permissions';

/*
 * Storage contract for the CMS. Two adapters implement it:
 *  - postgres.ts   — production: PostgreSQL via Prisma (the real implementation)
 *  - dev-memory.ts — development only: in-memory, NOT persistent, never used in production
 * Everything above this layer (auth, content service, API routes) is adapter-agnostic.
 */

export type InquiryStatus = 'NEW' | 'READ' | 'ARCHIVED';

export interface InquiryRecord {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  phone: string | null;
  message: string;
  source: string;
  status: InquiryStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface MediaRecord {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  alt: string;
  createdAt: Date;
}

export interface SessionRecord {
  id: string;
  tokenHash: string;
  role: AdminRole;
  createdAt: Date;
  expiresAt: Date;
  lastSeenAt: Date;
}

/** Stored collection rows always carry these server-managed fields */
export type Stored<N extends CollectionName> = CollectionTypes[N] & {
  id: string;
  order: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export interface CmsRepository {
  readonly kind: 'postgres' | 'dev-memory';

  docs: {
    get(key: ContentKey): Promise<unknown | null>;
    set(key: ContentKey, data: unknown): Promise<void>;
  };

  collections: {
    list<N extends CollectionName>(name: N, opts?: { publishedOnly?: boolean }): Promise<Stored<N>[]>;
    find<N extends CollectionName>(name: N, id: string): Promise<Stored<N> | null>;
    count(name: CollectionName, opts?: { publishedOnly?: boolean }): Promise<number>;
    create<N extends CollectionName>(name: N, data: CollectionTypes[N] & { order: number }): Promise<Stored<N>>;
    update<N extends CollectionName>(name: N, id: string, data: Partial<CollectionTypes[N]>): Promise<Stored<N>>;
    remove(name: CollectionName, id: string): Promise<void>;
    reorder(name: CollectionName, ids: string[]): Promise<void>;
    slugTaken(name: 'services' | 'projects' | 'jobs', slug: string, exceptId?: string): Promise<boolean>;
  };

  inquiries: {
    list(filter: { status?: InquiryStatus; q?: string; take?: number }): Promise<InquiryRecord[]>;
    totals(): Promise<Record<InquiryStatus, number>>;
    find(id: string): Promise<InquiryRecord | null>;
    create(data: Pick<InquiryRecord, 'name' | 'email' | 'subject' | 'phone' | 'message' | 'source'>): Promise<InquiryRecord>;
    setStatus(id: string, status: InquiryStatus): Promise<InquiryRecord>;
    remove(id: string): Promise<boolean>;
  };

  media: {
    list(): Promise<MediaRecord[]>;
    find(id: string): Promise<MediaRecord | null>;
    count(): Promise<number>;
    create(data: Omit<MediaRecord, 'id' | 'createdAt'>): Promise<MediaRecord>;
    setAlt(id: string, alt: string): Promise<MediaRecord>;
    remove(id: string): Promise<void>;
    /** Human-readable places where this URL is referenced */
    usages(url: string): Promise<string[]>;
  };

  sessions: {
    create(data: { tokenHash: string; role: AdminRole; expiresAt: Date }): Promise<SessionRecord>;
    findByHash(tokenHash: string): Promise<SessionRecord | null>;
    touch(id: string): Promise<void>;
    remove(id: string): Promise<void>;
    removeByHash(tokenHash: string): Promise<void>;
    removeOthers(keepId: string): Promise<number>;
    countActive(): Promise<number>;
    purgeExpired(): Promise<void>;
  };

  credentials: {
    getPasswordHash(): Promise<string | null>;
    setPasswordHash(hash: string): Promise<void>;
  };
}
