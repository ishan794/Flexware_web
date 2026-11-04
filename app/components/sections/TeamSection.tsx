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
      <div className="mx-auto max-w-7xl text-center">
        <SectionHeading label="Our people" title={title} description={description} />
        <ul className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8">
          {members.map((person, i) => (
            <Reveal as="li" key={person.name} index={i % 3}>
              <div className="glass-card card-interactive flex h-full flex-col items-center rounded-2xl px-8 py-10 text-center">
                {person.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={person.imageUrl}
                    alt=""
                    loading="lazy"
                    className="mx-auto size-48 rounded-full object-cover ring-1 ring-edge md:size-56"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="flex size-48 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 text-3xl font-bold text-primary-light ring-1 ring-edge md:size-56"
                  >
                    {initials(person.name)}
                  </span>
                )}
                <h3 className="mt-6 text-base/7 font-semibold tracking-tight text-foreground">
                  {person.name}
                </h3>
                <p className="text-sm/6 text-muted">{person.role}</p>
                {(person.xUrl || person.linkedinUrl) && (
                  <ul role="list" className="mt-6 flex justify-center gap-x-6">
                    {person.xUrl && (
                      <li>
                        <a
                          href={person.xUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-subtle transition-colors hover:text-foreground"
                        >
                          <span className="sr-only">X profile of {person.name} (opens in a new tab)</span>
                          <svg fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" className="size-5">
                            <path d="M11.4678 8.77491L17.2961 2H15.915L10.8543 7.88256L6.81232 2H2.15039L8.26263 10.8955L2.15039 18H3.53159L8.87581 11.7878L13.1444 18H17.8063L11.4675 8.77491H11.4678ZM9.57608 10.9738L8.95678 10.0881L4.02925 3.03974H6.15068L10.1273 8.72795L10.7466 9.61374L15.9156 17.0075H13.7942L9.57608 10.9742V10.9738Z" />
                          </svg>
                        </a>
                      </li>
                    )}
                    {person.linkedinUrl && (
                      <li>
                        <a
                          href={person.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-subtle transition-colors hover:text-foreground"
                        >
                          <span className="sr-only">LinkedIn profile of {person.name} (opens in a new tab)</span>
                          <svg fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" className="size-5">
                            <path
                              d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                              clipRule="evenodd"
                              fillRule="evenodd"
                            />
                          </svg>
                        </a>
                      </li>
                    )}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
