/**
 * Showcase content types used by the public section components.
 *
 * Content itself is managed in /admin (Testimonials, Logos, Team, Stats) and
 * stored in PostgreSQL. Each section renders NOTHING until at least one entry is
 * published — no blank sections, no placeholders. Only publish real, approved
 * clients / people / figures with permission to use names, quotes and images.
 */

export interface Testimonial {
  quote: string;
  name: string;
  /** e.g. "CTO, Acme Inc." */
  role: string;
  imageUrl?: string | null;
}

export interface ClientLogo {
  name: string;
  logoUrl?: string | null;
  href?: string | null;
}

export interface TeamMember {
  name: string;
  role: string;
  imageUrl?: string | null;
  linkedinUrl?: string | null;
}

export interface CompanyStat {
  value: string;
  label: string;
}
