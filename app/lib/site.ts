import { HeartHandshake, Shield, Sparkles, Zap, type LucideIcon } from 'lucide-react';

// Structural, non-editable site data. Editable content (contact details, services,
// homepage copy, …) lives in the CMS — see app/lib/cms and /admin.

export const navLinks = [
  { href: '/#home', label: 'Home' },
  { href: '/#services', label: 'Services' },
  { href: '/#about', label: 'About' },
  { href: '/#portfolio', label: 'Portfolio' },
  { href: '/careers', label: 'Careers' },
  { href: '/#contact', label: 'Contact' },
] as const;

export const processSteps: { icon: LucideIcon; title: string; description: string }[] = [
  { icon: Sparkles, title: 'Discovery', description: 'We understand your vision, goals, and technical requirements.' },
  { icon: Zap, title: 'Design & Build', description: 'Our team crafts pixel-perfect designs and robust architecture.' },
  { icon: Shield, title: 'Test & Launch', description: 'Rigorous QA testing followed by seamless deployment.' },
  { icon: HeartHandshake, title: 'Support & Grow', description: 'Ongoing maintenance, optimization, and scaling.' },
];
