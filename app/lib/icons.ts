import {
  Bot,
  Brain,
  Briefcase,
  Building2,
  Cloud,
  Code2,
  Database,
  Globe,
  HeartHandshake,
  Layers,
  Lock,
  Rocket,
  Server,
  Shield,
  Smartphone,
  Sparkles,
  Wrench,
  Zap,
  type LucideIcon,
} from 'lucide-react';

/** Icons an admin can choose for services, highlights and projects. Stored by name. */
export const iconRegistry = {
  Code2,
  Smartphone,
  Brain,
  Cloud,
  Building2,
  Globe,
  Wrench,
  Database,
  Server,
  Bot,
  Briefcase,
  Layers,
  Lock,
  Shield,
  Rocket,
  Sparkles,
  Zap,
  HeartHandshake,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof iconRegistry;
export const iconNames = Object.keys(iconRegistry) as IconName[];

export function getIcon(name: string | null | undefined): LucideIcon {
  return (name && (iconRegistry as Record<string, LucideIcon>)[name]) || Sparkles;
}

/** Accent tones for service highlight cards */
export const toneClasses = {
  primary: 'bg-primary/10 text-primary',
  accent: 'bg-accent/10 text-accent',
  secondary: 'bg-secondary/10 text-secondary',
  emerald: 'bg-emerald/10 text-emerald',
} as const;

export type ToneName = keyof typeof toneClasses;
export const toneNames = Object.keys(toneClasses) as ToneName[];
