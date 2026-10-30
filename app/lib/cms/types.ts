// Shapes shared by the admin UI, the API and the public site.

export interface BannerSettings {
  enabled: boolean;
  title: string;
  text: string;
  ctaLabel: string;
}

export interface SiteSettings {
  name: string;
  tagline: string;
  description: string;
  email: string;
  careersEmail: string;
  phone: string;
  /** tel: link, derived from phone when saved */
  phoneHref: string;
  locations: string;
  hours: string;
  banner: BannerSettings;
}

export interface Highlight {
  icon: string;
  title: string;
  description: string;
  href: string;
  tone: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface HomepageContent {
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
  };
  highlights: Highlight[];
  cta: {
    title: string;
    text: string;
  };
  faqs: Faq[];
}

export interface AboutContent {
  label: string;
  title: string;
  intro: string;
}

export const seoPageKeys = ['home', 'services', 'about', 'portfolio', 'careers', 'contact'] as const;
export type SeoPageKey = (typeof seoPageKeys)[number];

export interface SeoContent {
  pages: Record<SeoPageKey, { title: string; description: string }>;
}

export interface ContentDocs {
  settings: SiteSettings;
  homepage: HomepageContent;
  about: AboutContent;
  seo: SeoContent;
}

export type ContentKey = keyof ContentDocs;
export const contentKeys: ContentKey[] = ['settings', 'homepage', 'about', 'seo'];

// ---- Collections ----

export interface ServiceItem {
  id?: string;
  slug: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  order?: number;
  published?: boolean;
}

export interface ProjectItem {
  id?: string;
  slug: string;
  title: string;
  type: string;
  year: string;
  icon: string;
  summary: string;
  cardTech: string[];
  tagline: string;
  tech: string[];
  facts: [string, string][];
  overview: string;
  features: string[];
  challenges: string[];
  solutions: string[];
  imageUrl?: string | null;
  order?: number;
  published?: boolean;
}

export interface JobItem {
  id?: string;
  slug: string;
  title: string;
  dept: string;
  type: string;
  commitment: string;
  about: string[];
  requirements: string[];
  order?: number;
  published?: boolean;
}

export interface TestimonialItem {
  id?: string;
  quote: string;
  name: string;
  role: string;
  imageUrl?: string | null;
  order?: number;
  published?: boolean;
}

export interface LogoItem {
  id?: string;
  name: string;
  logoUrl?: string | null;
  href?: string | null;
  order?: number;
  published?: boolean;
}

export interface TeamItem {
  id?: string;
  name: string;
  role: string;
  imageUrl?: string | null;
  linkedinUrl?: string | null;
  order?: number;
  published?: boolean;
}

export interface StatItem {
  id?: string;
  value: string;
  label: string;
  order?: number;
  published?: boolean;
}

export interface CollectionTypes {
  services: ServiceItem;
  projects: ProjectItem;
  jobs: JobItem;
  testimonials: TestimonialItem;
  logos: LogoItem;
  team: TeamItem;
  stats: StatItem;
}

export type CollectionName = keyof CollectionTypes;
export const collectionNames: CollectionName[] = ['services', 'projects', 'jobs', 'testimonials', 'logos', 'team', 'stats'];
