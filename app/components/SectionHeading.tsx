import Reveal from './Reveal';

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  /** Use "h1" when the heading is the page title */
  as?: 'h1' | 'h2';
}

export default function SectionHeading({
  label,
  title,
  description,
  align = 'center',
  className = '',
  as: Heading = 'h2',
}: SectionHeadingProps) {
  const centered = align === 'center';

  return (
    <Reveal className={`mb-12 sm:mb-16 ${centered ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'} ${className}`}>
      {label && <p className="eyebrow mb-5">{label}</p>}
      <Heading
        className={`font-extrabold tracking-tight text-foreground ${
          Heading === 'h1' ? 'text-4xl sm:text-5xl lg:text-6xl' : 'text-3xl sm:text-4xl lg:text-5xl'
        }`}
      >
        {title}
      </Heading>
      {description && (
        <p className={`mt-5 text-base leading-relaxed text-muted sm:text-lg ${centered ? 'mx-auto max-w-2xl' : ''}`}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
