'use client';

import { useScrollAnimation } from '@/app/lib/animations';

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeading({
  label,
  title,
  description,
  align = 'center',
  className = '',
}: SectionHeadingProps) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`mb-16 ${align === 'center' ? 'text-center mx-auto' : ''} ${
        isVisible ? 'animate-fade-up' : 'opacity-0'
      } ${className}`}
      style={{ maxWidth: align === 'center' ? '48rem' : undefined }}
    >
      {label && (
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-primary-light border border-primary/20 bg-primary/5 mb-6">
          {label}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg text-muted leading-relaxed max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
