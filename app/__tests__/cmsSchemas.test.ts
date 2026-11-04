import { collectionSchemas, contentSchemas, inquiryInputSchema } from '../lib/cms/schemas';
import { defaultContent, defaultJobs, defaultProjects, defaultServices } from '../lib/cms/defaults';

describe('CMS validation', () => {
  it('accepts every default document (seed data is valid)', () => {
    for (const key of Object.keys(contentSchemas) as (keyof typeof contentSchemas)[]) {
      const result = contentSchemas[key].safeParse(defaultContent[key]);
      expect(result.success).toBe(true);
    }
  });

  it('accepts every default service, project and job', () => {
    for (const s of defaultServices) expect(collectionSchemas.services.safeParse(s).success).toBe(true);
    for (const p of defaultProjects) expect(collectionSchemas.projects.safeParse(p).success).toBe(true);
    for (const j of defaultJobs) expect(collectionSchemas.jobs.safeParse(j).success).toBe(true);
  });

  it('rejects invalid slugs and unknown icons', () => {
    const bad = collectionSchemas.services.safeParse({ ...defaultServices[0], slug: 'Not A Slug', icon: 'Rocketship' });
    expect(bad.success).toBe(false);
    const paths = bad.success ? [] : bad.error.issues.map((i) => i.path.join('.'));
    expect(paths).toEqual(expect.arrayContaining(['slug', 'icon']));
  });

  it('only allows https URLs or site paths for images', () => {
    const ok = collectionSchemas.logos.safeParse({ name: 'Acme', logoUrl: '/media/abc-0123456789abcdef.png' });
    const js = collectionSchemas.logos.safeParse({ name: 'Acme', logoUrl: 'javascript:alert(1)' });
    expect(ok.success).toBe(true);
    expect(js.success).toBe(false);
  });

  it('normalises empty optional links to null', () => {
    const r = collectionSchemas.team.safeParse({ name: 'Ada', role: 'Engineer', imageUrl: '', linkedinUrl: '' });
    expect(r.success && r.data.imageUrl).toBeNull();
  });

  it('validates contact submissions like the original API', () => {
    expect(inquiryInputSchema.safeParse({ name: 'A', email: 'a@b.co', message: 'Hello there, team' }).success).toBe(true);
    expect(inquiryInputSchema.safeParse({ name: '', email: 'nope', message: 'short' }).success).toBe(false);
  });
});
