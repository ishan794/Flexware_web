/**
 * @jest-environment node
 *
 * Integration tests for the admin + contact API route handlers, run against the
 * isolated DEVELOPMENT in-memory repository (no PostgreSQL). They prove request
 * handling, validation, auth, authorization and repository wiring — NOT database
 * persistence, which still needs to be verified against a real PostgreSQL instance.
 */
import { mkdtempSync, rmSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { NextRequest } from 'next/server';

// ---- Environment: no database, known test password, temp upload dir ----
const uploadDir = mkdtempSync(path.join(tmpdir(), 'flx-uploads-'));
delete process.env.DATABASE_URL;
process.env.ADMIN_PASSWORD = 'test-password-1234';
process.env.UPLOAD_DIR = uploadDir;

// ---- Next.js runtime shims ----
const jar = new Map<string, string>();
jest.mock('next/headers', () => ({
  cookies: async () => ({
    get: (name: string) => (jar.has(name) ? { name, value: jar.get(name)! } : undefined),
    set: (name: string, value: string) => void jar.set(name, value),
    delete: (name: string) => void jar.delete(name),
  }),
}));
jest.mock('next/cache', () => ({
  revalidateTag: jest.fn(),
  unstable_cache: (fn: () => unknown) => fn,
}));

const ORIGIN = 'http://localhost:3000';
function req(url: string, init: { method?: string; body?: unknown; origin?: string | null; form?: FormData } = {}) {
  const headers: Record<string, string> = {};
  if (init.origin !== null) headers.origin = init.origin ?? ORIGIN;
  if (init.body !== undefined) headers['content-type'] = 'application/json';
  return new NextRequest(`${ORIGIN}${url}`, {
    method: init.method ?? 'GET',
    headers,
    body: init.form ?? (init.body !== undefined ? JSON.stringify(init.body) : undefined),
  });
}
const params = <T,>(p: T) => ({ params: Promise.resolve(p) });

// Route modules are loaded after the environment above is in place
let login: typeof import('../api/admin/auth/login/route');
let logout: typeof import('../api/admin/auth/logout/route');
let password: typeof import('../api/admin/auth/password/route');
let collections: typeof import('../api/admin/collections/[name]/route');
let collectionItem: typeof import('../api/admin/collections/[name]/[id]/route');
let content: typeof import('../api/admin/content/[key]/route');
let inquiries: typeof import('../api/admin/inquiries/route');
let inquiryItem: typeof import('../api/admin/inquiries/[id]/route');
let media: typeof import('../api/admin/media/route');
let mediaItem: typeof import('../api/admin/media/[id]/route');
let overview: typeof import('../api/admin/overview/route');
let contact: typeof import('../api/contact/route');
let cms: typeof import('../lib/server/content');
let repoModule: typeof import('../lib/server/repository');
let devStore: typeof import('../lib/server/repository/dev-memory');

beforeAll(async () => {
  login = await import('../api/admin/auth/login/route');
  logout = await import('../api/admin/auth/logout/route');
  password = await import('../api/admin/auth/password/route');
  collections = await import('../api/admin/collections/[name]/route');
  collectionItem = await import('../api/admin/collections/[name]/[id]/route');
  content = await import('../api/admin/content/[key]/route');
  inquiries = await import('../api/admin/inquiries/route');
  inquiryItem = await import('../api/admin/inquiries/[id]/route');
  media = await import('../api/admin/media/route');
  mediaItem = await import('../api/admin/media/[id]/route');
  overview = await import('../api/admin/overview/route');
  contact = await import('../api/contact/route');
  cms = await import('../lib/server/content');
  repoModule = await import('../lib/server/repository');
  devStore = await import('../lib/server/repository/dev-memory');
});

beforeEach(() => {
  devStore.resetDevStore();
  jar.clear();
});

afterAll(() => rmSync(uploadDir, { recursive: true, force: true }));

async function signIn() {
  const res = await login.POST(req('/api/admin/auth/login', { method: 'POST', body: { password: 'test-password-1234' } }));
  expect(res.status).toBe(200);
}

describe('data source selection', () => {
  it('uses the dev store without DATABASE_URL in non-production', () => {
    expect(repoModule.isDevDataSource()).toBe(true);
    expect(repoModule.getRepository().kind).toBe('dev-memory');
  });

  it('never selects the dev store in production', () => {
    const env = process.env as Record<string, string | undefined>;
    const prev = env.NODE_ENV;
    env.NODE_ENV = 'production';
    env.CMS_DATA_SOURCE = 'dev-memory';
    try {
      expect(repoModule.isDevDataSource()).toBe(false);
      expect(() => devStore.createDevMemoryRepository()).toThrow(/never be used in production/);
    } finally {
      env.NODE_ENV = prev;
      delete env.CMS_DATA_SOURCE;
    }
  });
});

describe('authentication', () => {
  it('rejects a wrong password and does not set a session', async () => {
    const res = await login.POST(req('/api/admin/auth/login', { method: 'POST', body: { password: 'nope' } }));
    expect(res.status).toBe(401);
    expect(jar.size).toBe(0);
  });

  it('blocks cross-origin login attempts', async () => {
    const res = await login.POST(
      req('/api/admin/auth/login', { method: 'POST', body: { password: 'test-password-1234' }, origin: 'https://evil.example' })
    );
    expect(res.status).toBe(403);
  });

  it('protects every admin endpoint without a session', async () => {
    expect((await collections.GET(req('/api/admin/collections/services'), params({ name: 'services' }))).status).toBe(401);
    expect((await inquiries.GET(req('/api/admin/inquiries'), {})).status).toBe(401);
    expect((await overview.GET(req('/api/admin/overview'), {})).status).toBe(401);
  });

  it('signs in, stores only a hashed token, and signs out', async () => {
    await signIn();
    const token = jar.get('flx_admin')!;
    expect(token).toBeTruthy();
    const sessions = await repoModule.getRepository().sessions.countActive();
    expect(sessions).toBe(1);
    expect(await repoModule.getRepository().sessions.findByHash(token)).toBeNull(); // raw token never stored

    await logout.POST(req('/api/admin/auth/logout', { method: 'POST' }));
    expect(jar.has('flx_admin')).toBe(false);
    expect((await overview.GET(req('/api/admin/overview'), {})).status).toBe(401);
  });

  it('changes the password and rejects the old one afterwards', async () => {
    await signIn();
    const weak = await password.POST(
      req('/api/admin/auth/password', { method: 'POST', body: { currentPassword: 'test-password-1234', newPassword: 'short' } }),
      {}
    );
    expect(weak.status).toBe(400);
    const ok = await password.POST(
      req('/api/admin/auth/password', {
        method: 'POST',
        body: { currentPassword: 'test-password-1234', newPassword: 'a-much-better-passphrase' },
      }),
      {}
    );
    expect(ok.status).toBe(200);
    jar.clear();
    const old = await login.POST(req('/api/admin/auth/login', { method: 'POST', body: { password: 'test-password-1234' } }));
    expect(old.status).toBe(401);
    const fresh = await login.POST(req('/api/admin/auth/login', { method: 'POST', body: { password: 'a-much-better-passphrase' } }));
    expect(fresh.status).toBe(200);
  });
});

describe('role-based authorization', () => {
  it('lets a viewer read but not write', async () => {
    const { createHash } = await import('node:crypto');
    const token = 'viewer-token';
    await repoModule.getRepository().sessions.create({
      tokenHash: createHash('sha256').update(token).digest('hex'),
      role: 'viewer',
      expiresAt: new Date(Date.now() + 60_000),
    });
    jar.set('flx_admin', token);

    expect((await collections.GET(req('/api/admin/collections/services'), params({ name: 'services' }))).status).toBe(200);
    const write = await collections.POST(
      req('/api/admin/collections/stats', { method: 'POST', body: { value: '1', label: 'x' } }),
      params({ name: 'stats' })
    );
    expect(write.status).toBe(403);
  });
});

describe('collections CRUD', () => {
  beforeEach(signIn);

  it('lists the seeded services', async () => {
    const res = await collections.GET(req('/api/admin/collections/services'), params({ name: 'services' }));
    const { items } = await res.json();
    expect(items.map((s: { slug: string }) => s.slug)).toEqual(['web', 'mobile', 'enterprise', 'cloud', 'api', 'support']);
  });

  it('keeps new showcase items hidden until published', async () => {
    expect(await cms.getPublished('testimonials')).toHaveLength(0);

    const created = await collections.POST(
      req('/api/admin/collections/testimonials', {
        method: 'POST',
        body: { quote: 'Clear communication throughout.', name: 'Test Person', role: 'QA, Test Co.', published: false },
      }),
      params({ name: 'testimonials' })
    );
    expect(created.status).toBe(201);
    const { item } = await created.json();
    expect(await cms.getPublished('testimonials')).toHaveLength(0);

    const toggled = await collectionItem.PUT(
      req(`/api/admin/collections/testimonials/${item.id}`, { method: 'PUT', body: { published: true } }),
      params({ name: 'testimonials', id: item.id })
    );
    expect(toggled.status).toBe(200);
    expect(await cms.getPublished('testimonials')).toHaveLength(1);
  });

  it('returns field-level validation errors', async () => {
    const res = await collections.POST(
      req('/api/admin/collections/services', { method: 'POST', body: { slug: 'Bad Slug', icon: 'Nope', title: '', description: '' } }),
      params({ name: 'services' })
    );
    expect(res.status).toBe(422);
    const body = await res.json();
    const paths = body.details.map((d: { path: string }) => d.path);
    expect(paths).toEqual(expect.arrayContaining(['slug', 'icon', 'title', 'description']));
  });

  it('rejects duplicate slugs', async () => {
    const res = await collections.POST(
      req('/api/admin/collections/services', {
        method: 'POST',
        body: { slug: 'web', icon: 'Code2', title: 'Duplicate', description: 'Same slug as an existing service', features: [] },
      }),
      params({ name: 'services' })
    );
    expect(res.status).toBe(422);
    expect((await res.json()).details[0].path).toBe('slug');
  });

  it('reorders and deletes', async () => {
    const list = async () =>
      (await (await collections.GET(req('/api/admin/collections/jobs'), params({ name: 'jobs' }))).json()).items as { id: string }[];
    const before = await list();
    const reversed = [...before].reverse().map((j) => j.id);
    const reorder = await collections.PATCH(
      req('/api/admin/collections/jobs', { method: 'PATCH', body: { ids: reversed } }),
      params({ name: 'jobs' })
    );
    expect(reorder.status).toBe(200);
    expect((await list()).map((j) => j.id)).toEqual(reversed);

    const del = await collectionItem.DELETE(
      req(`/api/admin/collections/jobs/${reversed[0]}`, { method: 'DELETE' }),
      params({ name: 'jobs', id: reversed[0] })
    );
    expect(del.status).toBe(200);
    expect(await list()).toHaveLength(before.length - 1);

    const again = await collectionItem.DELETE(
      req(`/api/admin/collections/jobs/${reversed[0]}`, { method: 'DELETE' }),
      params({ name: 'jobs', id: reversed[0] })
    );
    expect(again.status).toBe(404);
  });

  it('rejects unknown collections', async () => {
    expect((await collections.GET(req('/api/admin/collections/weddings'), params({ name: 'weddings' }))).status).toBe(404);
  });
});

describe('content documents', () => {
  beforeEach(signIn);

  it('saves settings and derives the tel: link', async () => {
    const current = await (await content.GET(req('/api/admin/content/settings'), params({ key: 'settings' }))).json();
    const res = await content.PUT(
      req('/api/admin/content/settings', { method: 'PUT', body: { ...current.data, phone: '+1 (555) 010-2030' } }),
      params({ key: 'settings' })
    );
    expect(res.status).toBe(200);
    expect((await res.json()).data.phoneHref).toBe('tel:+15550102030');
    expect((await cms.getContent('settings')).phone).toBe('+1 (555) 010-2030');
  });

  it('rejects invalid documents with field paths', async () => {
    const current = await (await content.GET(req('/api/admin/content/homepage'), params({ key: 'homepage' }))).json();
    const res = await content.PUT(
      req('/api/admin/content/homepage', { method: 'PUT', body: { ...current.data, hero: { ...current.data.hero, title: '' } } }),
      params({ key: 'homepage' })
    );
    expect(res.status).toBe(422);
    expect((await res.json()).details[0].path).toBe('hero.title');
  });
});

describe('contact form → inquiries inbox', () => {
  it('stores public submissions and lets an admin triage them', async () => {
    const send = await contact.POST(
      req('/api/contact', {
        method: 'POST',
        body: { name: 'Test Sender', email: 'sender@example.com', message: 'I would like a quote.', source: 'home' },
      })
    );
    expect(send.status).toBe(200);

    // Honeypot submissions are accepted silently but not stored
    await contact.POST(
      req('/api/contact', { method: 'POST', body: { name: 'Bot', email: 'bot@example.com', message: 'spam spam spam', company: 'x' } })
    );

    await signIn();
    const list = await (await inquiries.GET(req('/api/admin/inquiries?status=NEW'), {})).json();
    expect(list.items).toHaveLength(1);
    expect(list.items[0]).toMatchObject({ name: 'Test Sender', source: 'home', status: 'NEW' });
    expect(list.totals.NEW).toBe(1);

    const id = list.items[0].id;
    const patched = await inquiryItem.PATCH(
      req(`/api/admin/inquiries/${id}`, { method: 'PATCH', body: { status: 'ARCHIVED' } }),
      params({ id })
    );
    const patchedBody = await patched.json();
    expect(patchedBody.item.status).toBe('ARCHIVED');
    expect(patchedBody.totals).toEqual({ NEW: 0, READ: 0, ARCHIVED: 1 });

    const del = await inquiryItem.DELETE(req(`/api/admin/inquiries/${id}`, { method: 'DELETE' }), params({ id }));
    expect(del.status).toBe(200);
    expect((await del.json()).totals).toEqual({ NEW: 0, READ: 0, ARCHIVED: 0 });
    expect((await (await inquiries.GET(req('/api/admin/inquiries'), {})).json()).items).toHaveLength(0);
  });

  it('rejects invalid submissions', async () => {
    const res = await contact.POST(req('/api/contact', { method: 'POST', body: { name: '', email: 'bad', message: 'hi' } }));
    expect(res.status).toBe(400);
  });
});

describe('media library', () => {
  beforeEach(signIn);

  const png = () =>
    new File([Buffer.from('89504e470d0a1a0a0000000d49484452', 'hex')], 'logo.png', { type: 'image/png' });

  it('uploads a real image, refuses deletion while in use, then deletes', async () => {
    const form = new FormData();
    form.append('file', png());
    form.append('alt', 'Test logo');
    const up = await media.POST(req('/api/admin/media', { method: 'POST', form }), {});
    expect(up.status).toBe(201);
    const { item } = await up.json();
    expect(item.url).toMatch(/^\/media\/[a-z0-9]+-[a-f0-9]{16}\.png$/);
    expect(existsSync(path.join(uploadDir, item.filename))).toBe(true);

    // Reference it from a logo, then try to delete
    await collections.POST(
      req('/api/admin/collections/logos', { method: 'POST', body: { name: 'Test Co.', logoUrl: item.url } }),
      params({ name: 'logos' })
    );
    const blocked = await mediaItem.DELETE(req(`/api/admin/media/${item.id}`, { method: 'DELETE' }), params({ id: item.id }));
    expect(blocked.status).toBe(409);
    expect((await blocked.json()).details).toEqual(['Logo: Test Co.']);

    const forced = await mediaItem.DELETE(req(`/api/admin/media/${item.id}?force=1`, { method: 'DELETE' }), params({ id: item.id }));
    expect(forced.status).toBe(200);
    expect(existsSync(path.join(uploadDir, item.filename))).toBe(false);
  });

  it('rejects files that are not really images', async () => {
    const form = new FormData();
    form.append('file', new File(['MZ fake executable'], 'evil.png', { type: 'image/png' }));
    const res = await media.POST(req('/api/admin/media', { method: 'POST', form }), {});
    expect(res.status).toBe(415);
  });
});
