import type { ReactNode } from 'react';
import Reveal from './Reveal';

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  /** Use "h1" when the heading is the page title */
  as?: 'h1' | 'h2';
  id?: string;
  /** Optional element shown beside the heading on wide screens (e.g. a link) */
  action?: ReactNode;
}

export default function SectionHeading({
  label,
  title,
  description,
  align = 'left',
  className = '',
  as: Heading = 'h2',
  id,
  action,
}: SectionHeadingProps) {
  const centered = align === 'center';

  return (
    <Reveal
      className={`mb-10 sm:mb-14 ${
        centered ? 'mx-auto max-w-3xl text-center' : action ? 'flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between' : 'max-w-3xl'
      } ${className}`}
    >
      <div className={action ? 'max-w-2xl' : undefined}>
        {label && <p className="eyebrow mb-4">{label}</p>}
        <Heading id={id} className={`${Heading === 'h1' ? 'text-display' : 'text-h2'} text-foreground`}>
          {title}
        </Heading>
        {description && <p className={`text-lead mt-5 ${centered ? 'mx-auto max-w-2xl' : 'max-w-2xl'}`}>{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </Reveal>
  );
}
