import { Quote } from 'lucide-react';
import SectionHeading from '../SectionHeading';
import Reveal from '../Reveal';
import type { Testimonial } from '../../lib/content';

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
  title?: string;
}

function TestimonialCard({ t, hidden = false }: { t: Testimonial; hidden?: boolean }) {
  return (
    <figure
      aria-hidden={hidden || undefined}
      className="glass-card flex h-full w-[85vw] max-w-[400px] shrink-0 flex-col rounded-2xl p-6 sm:w-[400px]"
    >
      <Quote className="mb-4 h-6 w-6 text-primary/60" aria-hidden="true" />
      <blockquote className="flex-1 text-sm leading-relaxed text-foreground sm:text-base">
        <p>{t.quote}</p>
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-x-4 border-t border-edge pt-5">
        {t.imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img alt="" src={t.imageUrl} loading="lazy" className="size-10 rounded-full object-cover" />
        )}
        <div>
          <div className="text-sm font-semibold text-foreground">{t.name}</div>
          <div className="text-sm text-muted">{t.role}</div>
        </div>
      </figcaption>
    </figure>
  );
}

/**
 * Client testimonials. Renders nothing until quotes are published in Admin → Testimonials.
 * 1–3 quotes show as a grid; 4+ become a marquee that pauses on hover/focus and
 * turns into a plain scrollable row under prefers-reduced-motion.
 */
export default function TestimonialsSection({
  testimonials = [],
  title = 'What our clients say',
}: TestimonialsSectionProps) {
  if (testimonials.length === 0) return null;

  const useMarquee = testimonials.length >= 4;

  return (
    <section id="testimonials" className="section-padding relative isolate overflow-hidden">
      <div aria-hidden="true" className="absolute inset-x-0 top-1/2 -z-10 h-72 -translate-y-1/2 bg-primary/5 blur-3xl" />
      <div className="mx-auto max-w-7xl">
        <SectionHeading label="Testimonials" title={title} />
      </div>

      {useMarquee ? (
        <div
          className="marquee-viewport relative -mx-5 overflow-hidden sm:-mx-6 lg:-mx-8"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          }}
        >
          <div
            role="region"
            aria-label="Client testimonials"
            tabIndex={0}
            className="marquee-track flex w-max gap-6 px-6 pb-4"
          >
            {testimonials.map((t) => (
              <TestimonialCard key={`a-${t.name}`} t={t} />
            ))}
            {/* Duplicate set makes the loop seamless; hidden from assistive tech */}
            {testimonials.map((t) => (
              <TestimonialCard key={`b-${t.name}`} t={t} hidden />
            ))}
          </div>
        </div>
      ) : (
        <ul className="mx-auto flex max-w-7xl flex-wrap justify-center gap-6">
          {testimonials.map((t, i) => (
            <Reveal as="li" key={t.name} index={i}>
              <TestimonialCard t={t} />
            </Reveal>
          ))}
        </ul>
      )}
    </section>
  );
}
