import Image from 'next/image';
import logoLight from '@/public/brand/logo-light.png';
import logoDark from '@/public/brand/logo-dark.png';

interface LogoProps {
  /**
   * "auto" follows the site theme; "onDark"/"onLight" force a variant for
   * surfaces whose background doesn't follow the theme.
   */
  variant?: 'auto' | 'onDark' | 'onLight';
  className?: string;
  priority?: boolean;
}

/**
 * Flxware wordmark (trimmed from /public/logo.png).
 * The navy original disappears on dark surfaces, so a dark-mode variant is swapped in
 * with CSS only — no hydration flash. That variant recolours the navy letterforms to
 * --theme-foreground (#f8fafc) and deepens the mint accent to #5fd97f, which keeps the
 * brand hue but stays legible against near-white letters. Both are generated from
 * logo-light.png with a continuous greenness blend, so the accent keeps its antialiasing.
 * `unoptimized`: the site is a static export, so the image optimizer is unavailable.
 */
export default function Logo({ variant = 'auto', className = 'h-6 w-auto sm:h-7', priority = false }: LogoProps) {
  if (variant !== 'auto') {
    return (
      <Image
        src={variant === 'onDark' ? logoDark : logoLight}
        alt="Flxware"
        priority={priority}
        unoptimized
        className={className}
      />
    );
  }

  // The inactive variant is display:none, so only one is ever exposed to assistive tech
  return (
    <>
      <Image src={logoLight} alt="Flxware" priority={priority} unoptimized className={`${className} dark:hidden`} />
      <Image src={logoDark} alt="Flxware" priority={priority} unoptimized className={`${className} hidden dark:block`} />
    </>
  );
}
