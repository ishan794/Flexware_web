import Reveal from '../Reveal';
import type { ClientLogo } from '../../lib/content';

interface LogoCloudProps {
  logos?: ClientLogo[];
  title?: string;
}

/** Client logo strip. Renders nothing until logos are published in Admin → Logos. */
export default function LogoCloud({ logos = [], title = 'Trusted by innovative teams' }: LogoCloudProps) {
  if (logos.length === 0) return null;

  return (
    <section aria-labelledby="logo-cloud-title" className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal as="h2" id="logo-cloud-title" className="text-center text-sm font-semibold uppercase tracking-wider text-subtle">
          {title}
        </Reveal>
        <ul className="mx-auto mt-10 grid max-w-lg grid-cols-2 items-center gap-4 sm:max-w-3xl sm:grid-cols-3 lg:max-w-none lg:grid-cols-5">
          {logos.map((logo, i) => {
            const content = logo.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logo.logoUrl}
                alt={logo.name}
                loading="lazy"
                className="max-h-8 w-auto max-w-[140px] object-contain opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0 dark:invert"
              />
            ) : (
              <span className="text-sm font-semibold tracking-wide text-muted transition-colors group-hover:text-foreground">
                {logo.name}
              </span>
            );
            const box =
              'group flex h-16 items-center justify-center rounded-xl border border-edge bg-surface-light/50 px-4 transition-colors hover:border-primary/30';
            return (
              <Reveal as="li" key={logo.name} index={i}>
                {logo.href ? (
                  <a href={logo.href} target="_blank" rel="noopener noreferrer" className={box}>
                    {content}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  <div className={box}>{content}</div>
                )}
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
