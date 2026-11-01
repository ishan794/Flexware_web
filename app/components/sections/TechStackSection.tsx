'use client';

import { ArrowRight } from 'lucide-react';

function ReactIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="-11.5 -10.23174 23 20.46348" className={className} fill="none" stroke="currentColor">
      <circle cx="0" cy="0" r="2.05" fill="currentColor" stroke="none" />
      <g strokeWidth="1.2">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

function NodeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path d="M12 2l8.5 4.9v9.8L12 22l-8.5-5.3V6.9L12 2z" strokeLinejoin="round" />
      <text x="8.5" y="14.5" fontSize="6.5" fontWeight="bold" fill="currentColor" stroke="none">
        JS
      </text>
    </svg>
  );
}

function MongoIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12.007 2C11.666 2 11.236 3.5 11.082 4.2c-.89 4-4.58 6.5-4.58 11 0 4.29 3.037 7.5 5.505 8.5.332-.3.497-.6.505-.88-.008-.28.165-.58.497-.88 2.468-1 5.505-4.21 5.505-8.5 0-4.5-3.69-7-4.58-11C12.778 3.5 12.348 2 12.007 2zm0 18.2c-.6-1.5-1.2-3.3-1.2-6.2 0-3.1 1.2-5.8 1.2-7.5 0 1.7 1.2 4.4 1.2 7.5 0 2.9-.6 4.7-1.2 6.2z" />
    </svg>
  );
}

function AwsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path d="M6.5 14.5a3.5 3.5 0 0 1-.5-6.9A4.5 4.5 0 0 1 14.5 6a4.5 4.5 0 0 1 4 6.5" strokeLinecap="round" />
      <path d="M7.5 17.5c2.5 1.5 6.5 1.5 9 0" strokeLinecap="round" strokeWidth="1.5" />
      <path d="M15.5 16.5l1.5 1-1 1.5" strokeLinecap="round" strokeLinejoin="round" />
      <text x="7.2" y="13.5" fontSize="5" fontWeight="bold" fill="currentColor" stroke="none">
        aws
      </text>
    </svg>
  );
}

function FlutterIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <rect x="5.5" y="2.5" width="13" height="19" rx="3" />
      <path d="M12 18h.01" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M9.5 5.5h5" strokeLinecap="round" />
    </svg>
  );
}

function TypeScriptIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3.5" />
      <path d="M9 10l-2 2 2 2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 10l2 2-2 2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 8.5l-2 7" strokeLinecap="round" />
    </svg>
  );
}

const technologies = [
  {
    name: 'React',
    description: 'Modern UI library for interactive user interfaces.',
    icon: ReactIcon,
  },
  {
    name: 'Node.js',
    description: 'Scalable server-side runtime for modern applications.',
    icon: NodeIcon,
  },
  {
    name: 'MongoDB',
    description: 'Flexible and scalable NoSQL database solutions.',
    icon: MongoIcon,
  },
  {
    name: 'AWS',
    description: 'Cloud infrastructure for reliable and secure deployments.',
    icon: AwsIcon,
  },
  {
    name: 'Flutter',
    description: 'Cross-platform framework for mobile application development.',
    icon: FlutterIcon,
    highlight: true,
  },
  {
    name: 'TypeScript',
    description: 'Type-safe JavaScript for scalable and maintainable code.',
    icon: TypeScriptIcon,
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
            const Icon = tech.icon;
            return (
              <div
                key={tech.name}
                className={`group relative flex flex-col items-center justify-between rounded-2xl border p-6 text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${
                  tech.highlight
                    ? 'border-blue-500 bg-blue-50/60 ring-1 ring-blue-500/30 shadow-md shadow-blue-500/10 dark:border-blue-500/70 dark:bg-[#0c152a] dark:ring-blue-500/50 dark:shadow-xl dark:shadow-blue-500/10'
                    : 'border-gray-200/80 bg-white hover:border-blue-500/60 hover:ring-1 hover:ring-blue-500/30 hover:shadow-blue-500/10 dark:border-slate-800/90 dark:bg-[#0b1222] dark:hover:border-blue-500/60 dark:hover:ring-1 dark:hover:ring-blue-500/40 dark:hover:shadow-blue-500/10'
                }`}
              >
                {/* Top Icon */}
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-50 text-blue-600 shadow-xs transition-transform duration-300 group-hover:scale-110 group-hover:border-blue-400/50 group-hover:bg-blue-100/60 dark:border-blue-500/20 dark:bg-blue-950/40 dark:text-blue-400 dark:group-hover:bg-blue-900/40">
                  <Icon className="h-7 w-7" />
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
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 ${
                      tech.highlight
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/40 group-hover:bg-blue-700 group-hover:scale-110'
                        : 'bg-gray-100 text-gray-600 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-md group-hover:shadow-blue-500/40 group-hover:scale-110 dark:bg-slate-800/80 dark:text-slate-400 dark:group-hover:bg-blue-600 dark:group-hover:text-white'
                    }`}
                  >
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
