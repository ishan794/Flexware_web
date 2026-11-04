'use client';

import { ArrowRight } from 'lucide-react';

const technologies = [
  {
    name: 'React',
    description: 'Modern UI library for interactive user interfaces.',
    logo: '/tech/react.svg',
  },
  {
    name: 'Node.js',
    description: 'Scalable server-side runtime for modern applications.',
    logo: '/tech/nodejs.svg',
  },
  {
    name: 'MongoDB',
    description: 'Flexible and scalable NoSQL database solutions.',
    logo: '/tech/mongodb.svg',
  },
  {
    name: 'AWS',
    description: 'Cloud infrastructure for reliable and secure deployments.',
    logo: '/tech/amazonwebservices.svg',
  },
  {
    name: 'Flutter',
    description: 'Cross-platform framework for mobile application development.',
    logo: '/tech/flutter.svg',
  },
  {
    name: 'TypeScript',
    description: 'Type-safe JavaScript for scalable and maintainable code.',
    logo: '/tech/typescript.svg',
  },
];

export default function TechStackSection() {
  return (
    <section
      id="technologies"
      className="bg-white py-24 sm:py-32 dark:bg-[#070c18] border-b border-gray-100 dark:border-slate-800 transition-colors"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Eyebrow and Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center justify-center gap-3 text-sm font-semibold text-blue-600 dark:text-blue-400">
            <span className="h-px w-8 bg-blue-500/30 dark:bg-blue-500/40" />
            <span>Tech Stack</span>
            <span className="h-px w-8 bg-blue-500/30 dark:bg-blue-500/40" />
          </div>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
            Technologies We Use
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg dark:text-slate-400">
            We leverage cutting-edge technologies and frameworks to build robust, scalable solutions.
          </p>
        </div>

        {/* 6 Technology Cards */}
        <div className="mx-auto mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {technologies.map((tech) => {
            return (
              <div
                key={tech.name}
                className="group relative flex flex-col items-center justify-between rounded-2xl border border-gray-200/80 bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-500/60 hover:shadow-xl hover:ring-1 hover:shadow-blue-500/10 hover:ring-blue-500/30 dark:border-slate-800/90 dark:bg-[#0b1222] dark:hover:border-blue-500/60 dark:hover:ring-blue-500/40"
              >
                {/* Top Icon */}
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gray-200 bg-white shadow-xs transition-transform duration-300 group-hover:scale-110 group-hover:border-blue-400/50 dark:border-white/10 dark:bg-white/95">
                  <img src={tech.logo} alt={`${tech.name} logo`} width={32} height={32} loading="lazy" className="h-8 w-8 object-contain" />
                </div>

                {/* Content */}
                <div className="mt-5 flex-1 flex flex-col justify-center">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">
                    {tech.name}
                  </h3>
                  <p className="mt-2.5 text-xs sm:text-[13px] leading-relaxed text-gray-600 dark:text-slate-400">
                    {tech.description}
                  </p>
                </div>

                {/* Bottom Circular Arrow Button */}
                <div className="mt-6 flex justify-center">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-md group-hover:shadow-blue-500/40 dark:bg-slate-800/80 dark:text-slate-400 dark:group-hover:bg-blue-600 dark:group-hover:text-white">
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
