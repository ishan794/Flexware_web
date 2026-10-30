import type { ReactNode } from 'react';

interface PageHeaderProps {
  label: string;
  title: string;
  description?: string;
  /** Optional content shown beside the title on wide screens */
  aside?: ReactNode;
  children?: ReactNode;
}

/** Shared top section for inner pages: left-aligned, brand grid backdrop, fluid display type */
export default function PageHeader({ label, title, description, aside, children }: PageHeaderProps) {
  return (
    <header className="relative isolate overflow-hidden border-b border-edge">
      <div aria-hidden="true" className="bg-tech-grid absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="absolute -right-32 -top-32 -z-10 h-96 w-96 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--theme-glow-a), transparent 65%)' }}
      />
      <div className="container-page grid gap-10 pb-14 pt-14 sm:pb-16 sm:pt-20 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div className="max-w-3xl animate-fade-up">
          <p className="eyebrow mb-5">{label}</p>
          <h1 className="text-display text-foreground">{title}</h1>
          {description && <p className="text-lead mt-6 max-w-2xl">{description}</p>}
          {children}
        </div>
        {aside && <div className="animate-fade-up lg:pb-2" style={{ animationDelay: '120ms' }}>{aside}</div>}
      </div>
    </header>
  );
}
