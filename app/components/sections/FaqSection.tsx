import { Mail, Plus } from 'lucide-react';
import Reveal from '../Reveal';
import type { Faq } from '../../lib/cms/types';

/** FAQ: split layout, native <details> accordion (keyboard + screen-reader support, no JS). Hidden when empty. */
export default function FaqSection({ faqs, email }: { faqs: Faq[]; email: string }) {
  if (faqs.length === 0) return null;

  return (
    <section id="faq" aria-labelledby="faq-title" className="section-padding">
      <div className="mx-auto grid max-w-[76rem] gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow mb-4">FAQ</p>
          <h2 id="faq-title" className="text-h2 text-foreground">
            Questions, answered
          </h2>
          <p className="text-lead mt-5">Everything you need to know before we start working together.</p>
          <a
            href={`mailto:${email}`}
            className="group mt-8 flex items-center gap-4 rounded-2xl border border-edge bg-surface p-4 transition-colors hover:border-edge-active"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary/15 text-secondary">
              <Mail className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm text-muted">Have a different question?</span>
              <span className="block truncate font-semibold text-foreground group-hover:text-primary">{email}</span>
            </span>
          </a>
        </Reveal>

        <Reveal index={1}>
          <div className="faq-list divide-y divide-edge border-y border-edge">
            {faqs.map((faq) => (
              <details key={faq.q} className="group">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-left">
                  <span className="font-display text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-primary sm:text-xl">
                    {faq.q}
                  </span>
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-edge text-muted transition-[transform,background-color,color] duration-300 group-open:rotate-45 group-open:border-transparent group-open:bg-secondary group-open:text-ink">
                    <Plus className="h-4 w-4" aria-hidden="true" />
                  </span>
                </summary>
                <p className="max-w-2xl pb-6 pr-12 leading-relaxed text-muted">{faq.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
