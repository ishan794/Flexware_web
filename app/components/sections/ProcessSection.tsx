import { Search, Palette, Code, Rocket } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We analyze your requirements and define project scope',
    icon: Search,
  },
  {
    number: '02',
    title: 'Design',
    description: 'Creating wireframes, prototypes, and technical architecture',
    icon: Palette,
  },
  {
    number: '03',
    title: 'Development',
    description: 'Agile development with regular updates and feedback',
    icon: Code,
  },
  {
    number: '04',
    title: 'Deployment',
    description: 'Testing, optimization, and successful launch',
    icon: Rocket,
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="bg-gray-50 py-24 sm:py-32 dark:bg-gray-950/60 border-b border-gray-100 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-base font-semibold leading-7 text-indigo-600 dark:text-indigo-400">How We Work</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
            Our Development Process
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
            We follow a proven methodology to ensure your project is delivered on time, within budget, and exceeds expectations.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-4 sm:grid-cols-2">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative flex flex-col rounded-2xl border border-gray-200/80 bg-white p-8 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 dark:hover:border-indigo-500/40"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-indigo-600/30 dark:text-indigo-400/30">
                    {step.number}
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                </div>
                <h3 className="mt-6 text-xl font-bold text-gray-900 dark:text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
