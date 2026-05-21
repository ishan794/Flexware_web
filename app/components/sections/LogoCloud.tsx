'use client';

const logos = ['Transistor', 'Reform', 'Tuple', 'SavvyCal', 'Statamic'];

export default function LogoCloud() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-lg/8 font-semibold text-foreground">
          Trusted by innovative teams
        </h2>
        <div className="mx-auto mt-10 grid max-w-lg grid-cols-2 items-center gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-5 sm:gap-x-10 lg:mx-0 lg:max-w-none">
          {logos.map((name) => (
            <div
              key={name}
              className="flex items-center justify-center h-12 rounded-xl bg-surface-light/50 border border-edge px-4 opacity-60 hover:opacity-100 hover:border-primary/30 transition-all"
            >
              <span className="text-sm font-semibold text-muted tracking-wide">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
