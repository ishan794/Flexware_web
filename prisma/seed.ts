/**
 * Seeds the database with the website's current real content.
 * Safe to run repeatedly: existing documents/rows are never overwritten, so
 * edits made in /admin survive re-seeding. Showcase tables (testimonials, logos,
 * team, stats) are intentionally left empty — add verified entries in the admin.
 */
import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../app/generated/prisma/client';
import { defaultContent, defaultJobs, defaultProjects, defaultServices } from '../app/lib/cms/defaults';
import { contentKeys } from '../app/lib/cms/types';

const db = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }) });

async function main() {
  for (const key of contentKeys) {
    const exists = await db.siteContent.findUnique({ where: { key } });
    if (!exists) {
      await db.siteContent.create({ data: { key, data: defaultContent[key] as object } });
      console.log(`  + content: ${key}`);
    }
  }

  if ((await db.service.count()) === 0) {
    await db.service.createMany({ data: defaultServices.map((s, order) => ({ ...s, order })) });
    console.log(`  + ${defaultServices.length} services`);
  }

  if ((await db.project.count()) === 0) {
    await db.project.createMany({
      data: defaultProjects.map(({ facts, ...p }, order) => ({ ...p, facts: facts as unknown as object, order })),
    });
    console.log(`  + ${defaultProjects.length} projects`);
  }

  if ((await db.job.count()) === 0) {
    await db.job.createMany({ data: defaultJobs.map((j, order) => ({ ...j, order })) });
    console.log(`  + ${defaultJobs.length} jobs`);
  }
}

main()
  .then(() => console.log('Seed complete.'))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
