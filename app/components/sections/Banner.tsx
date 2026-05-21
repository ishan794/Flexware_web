'use client';

import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/20/solid';

export default function Banner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-primary/10 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-[max(-7rem,calc(50%-52rem))] -z-10 -translate-y-1/2 transform-gpu blur-2xl"
      >
        <div className="aspect-577/310 w-144.25 bg-gradient-to-r from-primary/30 to-secondary/30 opacity-40"
          style={{
            clipPath: 'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
          }}
        />
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="text-sm/6 text-foreground">
          <strong className="font-semibold">Flxware Launch</strong>
          <svg viewBox="0 0 2 2" aria-hidden="true" className="mx-2 inline size-0.5 fill-current">
            <circle r={1} cx={1} cy={1} />
          </svg>
          New AI Business Assistant experience — live now. Try the voice-powered demo.
        </p>
        <a
          href="#"
          className="flex-none rounded-full bg-primary px-3.5 py-1 text-sm font-semibold text-white shadow-xs hover:bg-primary-light transition-colors"
        >
          Learn more <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
      <div className="flex flex-1 justify-end">
        <button type="button" onClick={() => setVisible(false)} className="-m-3 p-3 focus-visible:outline-offset-4">
          <span className="sr-only">Dismiss</span>
          <XMarkIcon aria-hidden="true" className="size-5 text-muted" />
        </button>
      </div>
    </div>
  );
}
