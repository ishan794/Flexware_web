import { z } from 'zod';
import { iconNames, toneNames } from '../icons';
import { seoPageKeys, type CollectionName, type ContentKey } from './types';

const text = (max: number) => z.string().trim().max(max);
const required = (max: number, label = 'This field') => z.string().trim().min(1, `${label} is required`).max(max);
const lines = (maxItems: number, maxLen = 300) => z.array(text(maxLen).min(1)).max(maxItems);
const slug = z
  .string()
  .trim()
  .min(1, 'Slug is required')
  .max(80)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use lowercase letters, numbers and single hyphens');
const icon = z.enum(iconNames as [string, ...string[]]);

/** Absolute http(s) URL, a site-relative path ("/media/…"), or empty */
const link = z
  .string()
  .trim()
  .max(500)
  .refine((v) => v === '' || v.startsWith('/') || /^https?:\/\//i.test(v), 'Use a full https:// URL or a path starting with /')
  .optional()
  .nullable()
  .transform((v) => (v ? v : null));

const base = { order: z.number().int().min(0).max(10000).optional(), published: z.boolean().optional() };

export const contentSchemas = {
  settings: z.object({
    name: required(60, 'Site name'),
    tagline: text(120),
    description: required(300, 'Description'),
    email: z.string().trim().email('Enter a valid email'),
    careersEmail: z.string().trim().email('Enter a valid email'),
    phone: required(40, 'Phone'),
    phoneHref: text(60).optional(),
    locations: text(120),
    hours: text(120),
    banner: z.object({
      enabled: z.boolean(),
      title: text(60),
      text: text(200),
      ctaLabel: text(40),
    }),
  }),
  homepage: z.object({
    hero: z.object({
      badge: text(120),
      title: required(120, 'Headline'),
      subtitle: required(300, 'Subtitle'),
      primaryCtaLabel: required(40, 'Primary button'),
      secondaryCtaLabel: required(40, 'Secondary button'),
    }),
    highlights: z
      .array(
        z.object({
          icon,
          title: required(60, 'Title'),
          description: required(240, 'Description'),
          href: z.string().trim().max(200).refine((v) => v.startsWith('/'), 'Link must start with /'),
          tone: z.enum(toneNames as [string, ...string[]]),
        })
      )
      .max(8),
    cta: z.object({ title: required(120, 'CTA title'), text: required(300, 'CTA text') }),
    faqs: z.array(z.object({ q: required(200, 'Question'), a: required(1000, 'Answer') })).max(30),
  }),
  about: z.object({
    label: text(60),
    title: required(120, 'Title'),
    intro: required(600, 'Intro'),
  }),
  seo: z.object({
    pages: z.object(
      Object.fromEntries(seoPageKeys.map((k) => [k, z.object({ title: text(70), description: text(170) })])) as Record<
        (typeof seoPageKeys)[number],
        z.ZodObject<{ title: z.ZodString; description: z.ZodString }>
      >
    ),
  }),
} satisfies Record<ContentKey, z.ZodTypeAny>;

export const collectionSchemas = {
  services: z.object({
    ...base,
    slug,
    icon,
    title: required(120, 'Title'),
    description: required(600, 'Description'),
    features: lines(12, 80),
  }),
  projects: z.object({
    ...base,
    slug,
    title: required(120, 'Title'),
    type: required(60, 'Type'),
    year: z.string().trim().regex(/^\d{4}$/, 'Use a 4-digit year'),
    icon,
    summary: required(300, 'Summary'),
    cardTech: lines(10, 40),
    tagline: required(300, 'Tagline'),
    tech: lines(15, 40),
    facts: z.array(z.tuple([required(40, 'Label'), required(80, 'Value')])).max(8),
    overview: required(3000, 'Overview'),
    features: lines(20, 160),
    challenges: lines(10, 200),
    solutions: lines(10, 200),
    imageUrl: link,
  }),
  jobs: z.object({
    ...base,
    slug,
    title: required(120, 'Title'),
    dept: required(60, 'Department'),
    type: required(40, 'Location type'),
    commitment: required(40, 'Commitment'),
    about: lines(6, 2000).min(1, 'Add at least one paragraph'),
    requirements: lines(20, 300),
  }),
  testimonials: z.object({
    ...base,
    quote: required(800, 'Quote'),
    name: required(80, 'Name'),
    role: required(120, 'Role'),
    imageUrl: link,
  }),
  logos: z.object({
    ...base,
    name: required(80, 'Name'),
    logoUrl: link,
    href: link,
  }),
  team: z.object({
    ...base,
    name: required(80, 'Name'),
    role: required(120, 'Role'),
    imageUrl: link,
    linkedinUrl: link,
  }),
  stats: z.object({
    ...base,
    value: required(20, 'Value'),
    label: required(60, 'Label'),
  }),
} satisfies Record<CollectionName, z.ZodTypeAny>;

export const inquiryInputSchema = z.object({
  name: required(120, 'Name'),
  email: z.string().trim().email('Invalid email').max(200),
  subject: text(120).optional(),
  phone: text(40).optional(),
  message: z.string().trim().min(10, 'Message too short').max(5000),
  /** Honeypot: real users never fill this hidden field */
  company: z.string().max(500).optional(),
});

/** Readable "field: message" list for API error responses */
export function formatZodError(error: z.ZodError) {
  return error.issues.map((i) => ({ path: i.path.join('.'), message: i.message }));
}
