'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '../../lib/theme-context';

export default function HeroSection() {
  const { theme } = useTheme();

  return (
    <div className="relative isolate overflow-hidden pt-14">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        src={
          theme === 'light'
            ? 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2830&q=80&blend=fff&sat=-100&exp=15&blend-mode=overlay'
            : 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2830&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply'
        }
        className={`absolute inset-0 -z-10 size-full object-cover ${theme === 'light' ? 'opacity-10' : ''}`}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className={`relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75 ${
            theme === 'light' 
              ? 'bg-gradient-to-tr from-[#ff80b5] to-[#9089fc]' 
              : 'bg-gradient-to-tr from-primary/30 to-secondary/30'
          }`}
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm/6 text-muted ring-1 ring-edge hover:ring-edge-hover transition-colors">
              Announcing our AI Business Assistant.{' '}
              <Link href="#" className="font-semibold text-primary hover:text-primary-light">
                <span aria-hidden="true" className="absolute inset-0" />
                Read more <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-foreground sm:text-7xl">
              Build Tomorrow&apos;s Digital Products
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-muted sm:text-xl/8">
              Flxware crafts cutting-edge web applications, mobile solutions, and AI-powered systems
              that transform businesses and delight users.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="btn btn-primary btn-lg group animate-pulse-soft"
              >
                Get started
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link 
                href="/services" 
                className="btn btn-outline btn-lg"
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className={`relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75 ${
            theme === 'light'
              ? 'bg-gradient-to-tr from-[#ff80b5] to-[#9089fc]'
              : 'bg-gradient-to-tr from-primary/30 to-secondary/30'
          }`}
        />
      </div>
    </div>
  );
}
