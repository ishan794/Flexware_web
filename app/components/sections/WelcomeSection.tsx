import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function WelcomeSection() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-20 sm:py-28 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 ring-1 ring-indigo-500/20 dark:bg-indigo-950/50 dark:text-indigo-400 dark:ring-indigo-500/30 mb-6">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Who We Are
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
            Welcome to Flxware Technologies
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
            Founded with a vision to bridge the gap between innovative ideas and practical software solutions, Flxware Technologies specializes in creating robust, scalable applications that drive business success. Our team combines technical expertise with creative problem-solving to deliver exceptional results.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="#about"
              className="inline-flex items-center gap-2 text-base font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
            >
              Learn More About Us
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
