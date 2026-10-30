import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Reveal from '../Reveal';
import SectionHeading from '../SectionHeading';
import { getIcon, toneClasses, type ToneName } from '../../lib/icons';
import type { Highlight } from '../../lib/cms/types';

/* Small decorative illustrations, picked by the service's icon. aria-hidden; no data. */
function Motif({ icon }: { icon: string }) {
  const stroke = 'stroke-[color:var(--color-edge-active)]';
  switch (icon) {
    case 'Code2':
    case 'Globe':
      return (
        <div className="overflow-hidden rounded-xl border border-edge bg-background/60">
          <div className="flex items-center gap-1.5 border-b border-edge px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-surface-lighter" />
            <span className="h-2 w-2 rounded-full bg-surface-lighter" />
            <span className="h-2 w-2 rounded-full bg-surface-lighter" />
            <span className="ml-2 h-2 w-28 rounded-full bg-surface-lighter" />
          </div>
          <div className="grid grid-cols-[1fr_2fr] gap-3 p-3">
            <div className="space-y-2">
              <div className="h-2 rounded-full bg-surface-lighter" />
              <div className="h-2 w-3/4 rounded-full bg-surface-lighter" />
              <div className="h-2 w-2/3 rounded-full bg-surface-lighter" />
            </div>
            <div className="space-y-2">
              <div className="h-14 rounded-lg bg-gradient-to-br from-primary/25 to-secondary/20" />
              <div className="grid grid-cols-3 gap-2">
                <div className="h-6 rounded-md bg-surface-lighter" />
                <div className="h-6 rounded-md bg-surface-lighter" />
                <div className="h-6 rounded-md bg-surface-lighter" />
              </div>
            </div>
          </div>
        </div>
      );
    case 'Smartphone':
      return (
        <svg viewBox="0 0 120 80" className="h-20 w-auto" fill="none">
          <rect x="40" y="4" width="40" height="72" rx="8" className={stroke} strokeWidth="1.5" />
          <rect x="46" y="14" width="28" height="18" rx="3" className="fill-[color:var(--color-primary)]" opacity="0.25" />
          <rect x="46" y="38" width="28" height="4" rx="2" className="fill-[color:var(--color-surface-lighter)]" />
          <rect x="46" y="46" width="20" height="4" rx="2" className="fill-[color:var(--color-surface-lighter)]" />
          <circle cx="60" cy="66" r="3" className={stroke} strokeWidth="1.5" />
        </svg>
      );
    case 'Brain':
    case 'Bot':
      return (
        <svg viewBox="0 0 120 80" className="h-20 w-auto" fill="none">
          {[
            [20, 40, 60, 16],
            [20, 40, 60, 64],
            [60, 16, 100, 40],
            [60, 64, 100, 40],
            [60, 16, 60, 64],
          ].map(([x1, y1, x2, y2], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} className={stroke} strokeWidth="1.5" />
          ))}
          {[
            [20, 40],
            [60, 16],
            [60, 64],
            [100, 40],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="6" className={i === 3 ? 'fill-[color:var(--color-secondary)]' : 'fill-[color:var(--color-surface-lighter)]'} />
          ))}
        </svg>
      );
    case 'Cloud':
    case 'Server':
      return (
        <svg viewBox="0 0 120 80" className="h-20 w-auto" fill="none">
          {[8, 30, 52].map((y, i) => (
            <g key={y}>
              <rect x="22" y={y} width="76" height="18" rx="5" className={stroke} strokeWidth="1.5" />
              <circle cx="34" cy={y + 9} r="2.5" className={i === 0 ? 'fill-[color:var(--color-secondary)]' : 'fill-[color:var(--color-surface-lighter)]'} />
              <rect x="44" y={y + 7} width={30 - i * 6} height="4" rx="2" className="fill-[color:var(--color-surface-lighter)]" />
            </g>
          ))}
        </svg>
      );
    default:
      return null;
  }
}

/** Homepage "What we do": a bento layout driven by Admin → Homepage → Service highlights */
export default function ServicesBento({ items }: { items: Highlight[] }) {
  if (items.length === 0) return null;

  const placement = (i: number) => {
    if (items.length >= 4 && i === 0) return 'lg:col-span-2 lg:row-span-2';
    if (items.length === 4 && i === 3) return 'lg:col-span-3';
    return '';
  };

  return (
    <section id="services-preview" aria-labelledby="services-preview-title" className="section-padding">
      <div className="mx-auto max-w-[76rem]">
        <SectionHeading
          id="services-preview-title"
          label="What we do"
          title="Solutions that drive growth"
          description="We combine modern engineering with strategic thinking to deliver digital products that make a real impact."
          action={
            <Link href="/services" className="btn btn-outline group">
              All services
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          }
        />

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {items.map((item, i) => {
            const Icon = getIcon(item.icon);
            const featured = items.length >= 4 && i === 0;
            const wide = items.length === 4 && i === 3;
            return (
              <Reveal as="li" key={item.title} index={i} className={`flex ${placement(i)} ${featured || wide ? 'sm:col-span-2' : ''}`}>
                <Link
                  href={item.href}
                  className={`group relative flex w-full overflow-hidden rounded-3xl border border-edge bg-surface p-6 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-edge-active hover:shadow-elevated-lg sm:p-8 ${
                    wide ? 'flex-col gap-6 md:flex-row md:items-center' : 'flex-col'
                  }`}
                >
                  {/* Accent wash in the card's tone */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: 'radial-gradient(circle, var(--theme-glow-a), transparent 70%)' }}
                  />
                  <div className={wide ? 'flex-1' : ''}>
                    <span className={`mb-6 inline-flex rounded-2xl p-3 ${toneClasses[item.tone as ToneName] ?? toneClasses.primary}`}>
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h3 className={`${featured ? 'text-h2' : 'text-h3'} text-foreground`}>{item.title}</h3>
                    <p className={`mt-3 leading-relaxed text-muted ${featured ? 'max-w-md text-base sm:text-lg' : 'text-[0.9375rem]'}`}>
                      {item.description}
                    </p>
                  </div>

                  <div className={`${wide ? 'flex items-center gap-8 md:w-auto' : 'mt-auto pt-8'} ${featured ? 'space-y-8' : ''}`}>
                    {/* Illustrations only on the featured and wide cards; compact cards stay text-first */}
                    {(featured || wide) && (
                      <div className={featured ? 'w-full' : 'hidden md:block'}>
                        <Motif icon={item.icon} />
                      </div>
                    )}
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground">
                      Explore
                      <ArrowUpRight
                        className="h-4 w-4 text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
