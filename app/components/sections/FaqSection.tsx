import { ChevronDown } from 'lucide-react';
import SectionHeading from '../SectionHeading';
import type { Faq } from '../../lib/cms/types';

/** FAQ accordion; questions are edited in Admin → Homepage. Hidden when empty. */
export default function FaqSection({ faqs, email }: { faqs: Faq[]; email: string }) {
  if (faqs.length === 0) return null;

  return (
    <section id="faq" className="section-padding">
      <div className="mx-auto max-w-3xl">
        <SectionHeading label="FAQ" title="Frequently asked questions" />
        {/* Native <details> gives keyboard + screen-reader support with no JS */}
        <div className="divide-y divide-edge overflow-hidden rounded-2xl border border-edge bg-surface/50">
          {faqs.map((faq) => (
            <details key={faq.q} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-left font-semibold text-foreground transition-colors hover:bg-surface-light sm:px-6">
                <span>{faq.q}</span>
                <ChevronDown
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 text-subtle transition-transform duration-300 group-open:rotate-180"
                />
              </summary>
              <p className="px-5 pb-5 text-sm leading-relaxed text-muted animate-fade-in sm:px-6 sm:text-base">{faq.a}</p>
            </details>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted sm:text-base">
          Have a different question? Email us at{' '}
          <a href={`mailto:${email}`} className="link-underline font-semibold text-primary-light">
            {email}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
