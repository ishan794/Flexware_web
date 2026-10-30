import SectionHeading from '../SectionHeading';
import Reveal from '../Reveal';
import type { TeamMember } from '../../lib/content';

interface TeamSectionProps {
  members?: TeamMember[];
  title?: string;
  description?: string;
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

/** Team grid. Renders nothing until team members are published in Admin → Team. */
export default function TeamSection({
  members = [],
  title = 'Meet our team',
  description = "We're a dynamic group of individuals passionate about what we do, dedicated to delivering the best results for our clients.",
}: TeamSectionProps) {
  if (members.length === 0) return null;

  return (
    <section id="team" className="section-padding">
      <div className="mx-auto max-w-6xl">
        <SectionHeading label="Our people" title={title} description={description} />
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {members.map((person, i) => (
            <Reveal as="li" key={person.name} index={i % 3}>
              <div className="glass-card card-interactive flex h-full flex-col items-center rounded-2xl px-6 py-8 text-center">
                {person.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={person.imageUrl}
                    alt=""
                    loading="lazy"
                    className="size-28 rounded-full object-cover ring-1 ring-edge sm:size-32"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="flex size-28 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 text-2xl font-bold text-primary-light ring-1 ring-edge sm:size-32"
                  >
                    {initials(person.name)}
                  </span>
                )}
                <h3 className="mt-6 text-base font-semibold text-foreground">{person.name}</h3>
                <p className="mt-1 text-sm text-muted">{person.role}</p>
                {person.linkedinUrl && (
                  <a
                    href={person.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline mt-4 text-sm font-medium text-primary-light"
                  >
                    LinkedIn<span className="sr-only"> profile of {person.name} (opens in a new tab)</span>
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
