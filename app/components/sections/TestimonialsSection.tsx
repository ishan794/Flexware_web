'use client';

const testimonials = [
  [
    {
      body: 'Laborum quis quam. Dolorum et ut quod quia. Voluptas numquam delectus nihil. Aut enim doloremque et ipsam.',
      author: { name: 'Leslie Alexander', handle: 'lesliealexander', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
    },
    {
      body: 'Quia dolorem qui et. Atque quo aliquid sit eos officia. Dolores similique laboriosam quaerat cupiditate.',
      author: { name: 'Michael Foster', handle: 'michaelfoster', imageUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
    },
    {
      body: 'Consequatur ut atque. Itaque nostrum molestiae id veniam eos cumque. Ut quia eum fugit laborum autem inventore ut voluptate.',
      author: { name: 'Dries Vincent', handle: 'driesvincent', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
    },
  ],
  [
    {
      body: 'Aut reprehenderit voluptatem eum asperiores beatae id. Iure molestiae ipsam ut officia rem nulla blanditiis.',
      author: { name: 'Lindsay Walton', handle: 'lindsaywalton', imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
    },
    {
      body: 'Nam nesciunt dolorem dolor asperiores cum. Incidunt molestiae quis deleniti vitae ut in earum delectus iusto.',
      author: { name: 'Courtney Henry', handle: 'courtneyhenry', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
    },
  ],
  [
    {
      body: 'Voluptas quos itaque ipsam in voluptatem est. Iste eos blanditiis repudiandae. Earum deserunt enim molestiae ipsum perferendis recusandae saepe corrupti.',
      author: { name: 'Tom Cook', handle: 'tomcook', imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
    },
    {
      body: 'Aliquid dolore praesentium ratione. Cumque ea officia repellendus laboriosam. Vitae quod id explicabo non sunt.',
      author: { name: 'Whitney Francis', handle: 'whitneyfrancis', imageUrl: 'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
    },
  ],
];

const allTestimonials = testimonials.flat();
const duplicatedTestimonials = [...allTestimonials, ...allTestimonials];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative isolate py-24 sm:py-32 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl"
      >
        <div
          style={{
            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="ml-[max(50%,38rem)] aspect-1313/771 w-328.25 bg-gradient-to-tr from-primary/30 to-secondary/30"
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base/7 font-semibold text-primary">Testimonials</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl">
            Trusted by industry leaders
          </p>
        </div>
      </div>

      <div className="mt-16 sm:mt-20 relative w-full overflow-hidden">
        {/* Container with asymmetric fade mask */}
        <div className="relative w-full h-full" style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 60%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 60%, transparent 100%)'
          }}>
          <div 
            className="flex w-max gap-8 pb-8 hover:[animation-play-state:paused]"
            style={{ animation: 'auto-scroll 60s linear infinite' }}
          >
            {duplicatedTestimonials.map((t, i) => (
              <figure
                key={`${t.author.handle}-${i}`}
                className="shrink-0 w-[85vw] sm:w-[400px] rounded-2xl bg-surface-lighter/75 p-6 ring-1 ring-edge/50 shadow-lg hover:ring-primary/50 hover:bg-surface-lighter hover:-translate-y-1 transition-all duration-300"
              >
                <blockquote className="text-foreground text-sm/6">
                  <p>{`"${t.body}"`}</p>
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-x-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" src={t.author.imageUrl} className="size-10 rounded-full" />
                  <div>
                    <div className="font-semibold text-foreground text-sm/6">{t.author.name}</div>
                    <div className="text-muted text-sm/6">{`@${t.author.handle}`}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
        
        {/* Blur overlay on the right side to blur upcoming testimonials */}
        <div className="absolute inset-y-0 right-0 w-1/3 pointer-events-none backdrop-blur-sm z-10" style={{
            maskImage: 'linear-gradient(to left, black 0%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to left, black 0%, transparent 100%)'
          }} />
      </div>
    </section>
  );
}
