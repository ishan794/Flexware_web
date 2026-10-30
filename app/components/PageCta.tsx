import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Reveal from './Reveal';

/** Closing call-to-action used on inner pages — brand navy in both themes */
export default function PageCta({
  title,
  text,
  cta = 'Start a project',
  href = '/contact',
}: {
  title: string;
  text: string;
  cta?: string;
  href?: string;
}) {
  return (
    <Reveal className="relative mx-auto max-w-[76rem] overflow-hidden rounded-[2rem] bg-[#0b1f3a] px-6 py-12 text-white sm:px-12 lg:px-14">
      <div aria-hidden="true" className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#b8e8c0]/20 blur-3xl" />
      <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-h2 text-white">{title}</h2>
          <p className="mt-4 text-lg leading-relaxed text-[#c9d6e8]">{text}</p>
        </div>
        <Link
          href={href}
          className="btn btn-lg group shrink-0 bg-[#b8e8c0] text-[#0a2240] shadow-[0_8px_30px_-8px_rgba(184,232,192,0.6)] hover:bg-[#cdf1d3]"
        >
          {cta}
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </div>
    </Reveal>
  );
}
