'use client';

const people = [
  {
    name: 'Leonard Krasner',
    role: 'Senior Designer',
    imageUrl: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
  },
  {
    name: 'Floyd Miles',
    role: 'Principal Designer',
    imageUrl: 'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
  },
  {
    name: 'Emily Selman',
    role: 'VP, User Experience',
    imageUrl: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
  },
  {
    name: 'Kristin Watson',
    role: 'VP, Human Resources',
    imageUrl: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
  },
  {
    name: 'Emma Dorsey',
    role: 'Senior Developer',
    imageUrl: 'https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
  },
  {
    name: 'Alicia Bell',
    role: 'Junior Copywriter',
    imageUrl: 'https://images.unsplash.com/photo-1509783236416-c9ad59bae472?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
  },
];

export default function TeamSection() {
  return (
    <section id="team" className="py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6 text-center lg:px-6">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl">
            Meet our team
          </h2>
          <p className="mt-7 text-lg/8 text-muted">
            We&apos;re a dynamic group of individuals passionate about what we do, 
            dedicated to delivering the best results for our clients.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8"
        >
          {people.map((person) => (
            <li key={person.name} className="rounded-2xl bg-surface-lighter px-8 py-10 ring-1 ring-edge">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                src={person.imageUrl}
                className="mx-auto size-48 rounded-full outline-1 -outline-offset-1 outline-edge md:size-56"
              />
              <h3 className="mt-6 text-base/7 font-semibold tracking-tight text-foreground">{person.name}</h3>
              <p className="text-sm/6 text-muted">{person.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
