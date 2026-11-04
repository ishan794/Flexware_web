import type { CollectionConfig } from './components/CollectionManager';

const line = (v: unknown) => (Array.isArray(v) ? v.filter(Boolean).join(' · ') : '');

/** Admin field definitions for each content collection */
export const collections: Record<string, CollectionConfig> = {
  services: {
    name: 'services',
    title: 'Services',
    singular: 'Service',
    description: 'Services listed on /services. The first four also appear in the footer.',
    defaultPublished: true,
    empty: { slug: '', icon: 'Code2', title: '', description: '', features: [] },
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true, maxLength: 120 },
      { name: 'slug', label: 'Anchor (slug)', type: 'slug', from: 'title', half: true, hint: 'Links to /services#slug' },
      { name: 'icon', label: 'Icon', type: 'icon', half: true },
      { name: 'description', label: 'Description', type: 'textarea', required: true, maxLength: 600 },
      { name: 'features', label: 'Key features', type: 'lines', placeholder: 'Add feature' },
    ],
    summary: (i) => ({ title: String(i.title ?? ''), subtitle: line(i.features), icon: String(i.icon ?? '') }),
    publicHref: (i) => `/services#${i.slug}`,
    emptyHint: 'Add the services Flxware offers. They appear on the Services page in this order.',
  },

  projects: {
    name: 'projects',
    title: 'Portfolio',
    singular: 'Project',
    description: 'Case studies shown on /portfolio and their detail pages.',
    defaultPublished: true,
    empty: {
      slug: '', title: '', type: '', year: String(new Date().getFullYear()), icon: 'Smartphone', summary: '',
      cardTech: [], tagline: '', tech: [], facts: [], overview: '', features: [], challenges: [], solutions: [], imageUrl: null,
    },
    fields: [
      { name: 'title', label: 'Project name', type: 'text', required: true, maxLength: 120 },
      { name: 'slug', label: 'URL slug', type: 'slug', from: 'title', half: true, hint: 'Page address: /portfolio/slug' },
      { name: 'icon', label: 'Icon', type: 'icon', half: true },
      { name: 'type', label: 'Type', type: 'text', required: true, half: true, placeholder: 'Mobile App' },
      { name: 'year', label: 'Year', type: 'text', required: true, half: true, maxLength: 4, placeholder: '2025' },
      { name: 'summary', label: 'Card summary', type: 'textarea', required: true, maxLength: 300, rows: 3, hint: 'Shown on the portfolio grid.' },
      { name: 'cardTech', label: 'Card tech tags', type: 'lines', placeholder: 'Add tag' },
      { name: 'imageUrl', label: 'Cover image', type: 'image', hint: 'Optional. Shown at the top of the case study.' },
      { name: 'tagline', label: 'Detail page tagline', type: 'textarea', required: true, maxLength: 300, rows: 2 },
      { name: 'tech', label: 'Technologies', type: 'lines', placeholder: 'Add technology' },
      { name: 'facts', label: 'Project facts', type: 'facts', hint: 'e.g. Category, Client, Duration, Status.' },
      { name: 'overview', label: 'Overview', type: 'textarea', required: true, maxLength: 3000, rows: 6 },
      { name: 'features', label: 'Key features', type: 'lines', placeholder: 'Add feature' },
      { name: 'challenges', label: 'Challenges', type: 'lines', placeholder: 'Add challenge' },
      { name: 'solutions', label: 'Solutions', type: 'lines', placeholder: 'Add solution' },
    ],
    summary: (i) => ({ title: String(i.title ?? ''), subtitle: `${i.type ?? ''} · ${i.year ?? ''}`, image: (i.imageUrl as string) || null, icon: String(i.icon ?? '') }),
    publicHref: (i) => `/portfolio/${i.slug}`,
    emptyHint: 'Add real case studies. Each one gets its own page.',
  },

  jobs: {
    name: 'jobs',
    title: 'Careers',
    singular: 'Job',
    description: 'Open positions on /careers. Hide a role when it is filled.',
    defaultPublished: true,
    empty: { slug: '', title: '', dept: 'Engineering', type: 'Onsite', commitment: 'Full-time', about: [''], requirements: [] },
    fields: [
      { name: 'title', label: 'Job title', type: 'text', required: true, maxLength: 120 },
      { name: 'slug', label: 'URL slug', type: 'slug', from: 'title', hint: 'Page address: /careers/slug' },
      { name: 'dept', label: 'Department', type: 'text', required: true, half: true },
      { name: 'type', label: 'Location type', type: 'text', required: true, half: true, placeholder: 'Onsite / Remote / Hybrid' },
      { name: 'commitment', label: 'Commitment', type: 'text', required: true, half: true, placeholder: 'Full-time / Internship' },
      { name: 'about', label: 'About the role (paragraphs)', type: 'lines', multiline: true, placeholder: 'Add paragraph' },
      { name: 'requirements', label: 'Requirements', type: 'lines', placeholder: 'Add requirement' },
    ],
    summary: (i) => ({ title: String(i.title ?? ''), subtitle: `${i.dept ?? ''} · ${i.type ?? ''} · ${i.commitment ?? ''}` }),
    publicHref: (i) => `/careers/${i.slug}`,
    emptyHint: 'No open roles. The careers page will show a friendly “no openings” message.',
  },

  testimonials: {
    name: 'testimonials',
    title: 'Testimonials',
    singular: 'Testimonial',
    description: 'Client quotes on the home and About pages. The section appears only when at least one is published.',
    defaultPublished: false,
    empty: { quote: '', name: '', role: '', imageUrl: null },
    fields: [
      { name: 'quote', label: 'Quote', type: 'textarea', required: true, maxLength: 800, rows: 4 },
      { name: 'name', label: 'Person', type: 'text', required: true, half: true },
      { name: 'role', label: 'Role & company', type: 'text', required: true, half: true, placeholder: 'CTO, Acme Inc.' },
      { name: 'imageUrl', label: 'Photo', type: 'image', hint: 'Optional. Only with the person’s permission.' },
    ],
    summary: (i) => ({ title: String(i.name ?? ''), subtitle: String(i.role ?? ''), image: (i.imageUrl as string) || null }),
    emptyHint: 'Only publish real quotes from real clients who agreed to be featured.',
  },

  logos: {
    name: 'logos',
    title: 'Client logos',
    singular: 'Logo',
    description: '“Trusted by” strip under the home hero. Shown only when at least one logo is published.',
    defaultPublished: false,
    empty: { name: '', logoUrl: null, href: null },
    fields: [
      { name: 'name', label: 'Company name', type: 'text', required: true },
      { name: 'logoUrl', label: 'Logo', type: 'image', hint: 'SVG or transparent PNG works best. The name is shown if empty.' },
      { name: 'href', label: 'Website', type: 'url', placeholder: 'https://', hint: 'Optional link to the company.' },
    ],
    summary: (i) => ({ title: String(i.name ?? ''), subtitle: (i.href as string) || undefined, image: (i.logoUrl as string) || null }),
    emptyHint: 'Only add companies you have worked with and have permission to name.',
  },

  team: {
    name: 'team',
    title: 'Team',
    singular: 'Team member',
    description: '“Meet our team” on the home and About pages. Shown only when at least one member is published.',
    defaultPublished: false,
    empty: { name: '', role: '', imageUrl: null, linkedinUrl: null, xUrl: null },
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true, half: true },
      { name: 'role', label: 'Role', type: 'text', required: true, half: true },
      { name: 'imageUrl', label: 'Photo', type: 'image', hint: 'Optional. Initials are shown when empty.' },
      { name: 'linkedinUrl', label: 'LinkedIn URL', type: 'url', placeholder: 'https://www.linkedin.com/in/…' },
      { name: 'xUrl', label: 'X (Twitter) URL', type: 'url', placeholder: 'https://x.com/…' },
    ],
    summary: (i) => ({ title: String(i.name ?? ''), subtitle: String(i.role ?? ''), image: (i.imageUrl as string) || null }),
    emptyHint: 'Add real team members with their consent.',
  },

  stats: {
    name: 'stats',
    title: 'Stats',
    singular: 'Stat',
    description: 'Headline figures on the home and About pages. Shown only when at least one is published.',
    defaultPublished: false,
    empty: { value: '', label: '' },
    fields: [
      { name: 'value', label: 'Value', type: 'text', required: true, half: true, maxLength: 20, placeholder: '120+' },
      { name: 'label', label: 'Label', type: 'text', required: true, half: true, maxLength: 60, placeholder: 'Projects delivered' },
    ],
    summary: (i) => ({ title: `${i.value ?? ''} — ${i.label ?? ''}` }),
    emptyHint: 'Only publish figures the business can verify.',
  },
};
