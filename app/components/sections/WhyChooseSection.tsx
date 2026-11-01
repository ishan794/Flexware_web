import { Code2, Smartphone, Cloud, Headphones } from 'lucide-react';

const reasons = [
  {
    icon: Code2,
    title: 'Custom Development',
    description: 'Tailored software solutions built to your exact specifications and business needs.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Excellence',
    description: 'Native and cross-platform mobile applications that deliver exceptional user experiences.',
  },
  {
    icon: Cloud,
    title: 'Cloud Integration',
    description: 'Scalable cloud solutions that grow with your business and ensure optimal performance.',
  },
  {
    icon: Headphones,
    title: 'Dedicated Support',
    description: 'Ongoing maintenance and support to keep your applications running smoothly.',
  },
];

export default function WhyChooseSection() {
  return (
    <section className="bg-gray-50 py-24 sm:py-32 dark:bg-gray-950/60 border-b border-gray-100 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-base font-semibold leading-7 text-indigo-600 dark:text-indigo-400">Our Advantages</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
            Why Choose Flxware?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
            We combine cutting-edge technology with proven methodologies to deliver software that exceeds expectations.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-4 sm:grid-cols-2">
            {reasons.map((reason) => {
              const Icon = reason.icon;
              return (
                <div
                  key={reason.title}
                  className="relative flex flex-col rounded-2xl border border-gray-200/80 bg-white p-8 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 dark:hover:border-indigo-500/40"
                >
                  <dt className="flex items-center gap-x-3 text-lg font-bold leading-7 text-gray-900 dark:text-white">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span>{reason.title}</span>
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-sm leading-6 text-gray-600 dark:text-gray-400">
                    <p className="flex-auto">{reason.description}</p>
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
    </section>
  );
}
