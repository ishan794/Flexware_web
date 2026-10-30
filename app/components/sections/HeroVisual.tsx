import { Check, Cloud, Globe, Server, Smartphone } from 'lucide-react';

/**
 * Hero illustration: an abstract picture of how Flxware ships software — a config
 * "file", a delivery pipeline and a service map. Purely decorative (aria-hidden):
 * it is not a product screenshot and shows no metrics or claims.
 */
export default function HeroVisual() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-[34rem] select-none lg:max-w-none">
      {/* Editor window */}
      <div className="hero-card relative overflow-hidden rounded-2xl border border-edge bg-surface shadow-elevated-lg animate-fade-up" style={{ animationDelay: '200ms' }}>
        <div className="flex items-center gap-2 border-b border-edge bg-surface-light/70 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-rose/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald/70" />
          <span className="ml-3 font-mono text-xs text-subtle">delivery.config.ts</span>
        </div>
        <pre className="overflow-hidden px-5 pb-20 pt-5 font-mono sm:pb-16 text-[0.8rem] leading-6 sm:text-[0.8125rem]">
          <code>
            <span className="text-subtle">{'// One codebase, every platform'}</span>
            {'\n'}
            <span className="text-primary">export const</span> <span className="text-foreground">project</span> = {'{'}
            {'\n  '}
            <span className="text-foreground">platforms</span>: [<span className="text-secondary">&apos;web&apos;</span>, <span className="text-secondary">&apos;ios&apos;</span>, <span className="text-secondary">&apos;android&apos;</span>],
            {'\n  '}
            <span className="text-foreground">stack</span>: [<span className="text-secondary">&apos;next.js&apos;</span>, <span className="text-secondary">&apos;node&apos;</span>, <span className="text-secondary">&apos;flutter&apos;</span>],
            {'\n  '}
            <span className="text-foreground">pipeline</span>: [<span className="text-secondary">&apos;build&apos;</span>, <span className="text-secondary">&apos;test&apos;</span>, <span className="text-secondary">&apos;deploy&apos;</span>],
            {'\n  '}
            <span className="text-foreground">cloud</span>: <span className="text-accent">aws</span>({'{ '}
            <span className="text-foreground">autoscale</span>: <span className="text-primary">true</span>
            {' }'}),
            {'\n'}
            {'};'}
            <span className="hero-caret ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 bg-secondary" />
          </code>
        </pre>
      </div>

      {/* Pipeline card */}
      <div
        className="hero-float absolute -bottom-8 -left-4 w-56 rounded-2xl border border-edge bg-surface/95 p-4 shadow-elevated-lg backdrop-blur sm:-left-10 sm:w-60"
        style={{ animationDelay: '420ms' }}
      >
        <p className="mb-3 text-[0.7rem] font-semibold uppercase tracking-wider text-subtle">Delivery pipeline</p>
        <ol className="space-y-2.5">
          {['Build', 'Test'].map((step) => (
            <li key={step} className="flex items-center gap-2.5 text-sm text-foreground">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary/20 text-secondary">
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              {step}
            </li>
          ))}
          <li className="flex items-center gap-2.5 text-sm text-foreground">
            <span className="relative flex h-5 w-5 items-center justify-center">
              <span className="hero-ping absolute inset-0 rounded-full bg-primary/40" />
              <span className="relative h-2.5 w-2.5 rounded-full bg-primary" />
            </span>
            Deploy
          </li>
        </ol>
      </div>

      {/* Service map card */}
      <div
        className="hero-float-slow absolute -right-3 -top-8 hidden rounded-2xl border border-edge bg-surface/95 p-4 shadow-elevated-lg backdrop-blur sm:block lg:-right-8"
        style={{ animationDelay: '560ms' }}
      >
        <p className="mb-3 text-[0.7rem] font-semibold uppercase tracking-wider text-subtle">Service map</p>
        <div className="relative grid grid-cols-2 gap-x-8 gap-y-3">
          <svg className="pointer-events-none absolute inset-0 h-full w-full text-edge-active" fill="none">
            <line x1="25%" y1="25%" x2="75%" y2="25%" stroke="currentColor" strokeDasharray="3 3" />
            <line x1="25%" y1="75%" x2="75%" y2="75%" stroke="currentColor" strokeDasharray="3 3" />
            <line x1="25%" y1="25%" x2="25%" y2="75%" stroke="currentColor" strokeDasharray="3 3" />
            <line x1="75%" y1="25%" x2="75%" y2="75%" stroke="currentColor" strokeDasharray="3 3" />
          </svg>
          {[
            { icon: Globe, label: 'Web' },
            { icon: Smartphone, label: 'Mobile' },
            { icon: Server, label: 'API' },
            { icon: Cloud, label: 'Cloud' },
          ].map(({ icon: Icon, label }) => (
            <span key={label} className="relative flex items-center gap-1.5 rounded-lg border border-edge bg-surface-light px-2.5 py-1.5 text-xs font-medium text-foreground">
              <Icon className="h-3.5 w-3.5 text-primary" />
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
