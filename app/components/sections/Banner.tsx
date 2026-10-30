'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { openAssistant } from '../ai-assistant/events';
import type { BannerSettings } from '../../lib/cms/types';

/** Announcement bar; controlled from Admin → Settings */
export default function Banner({ banner }: { banner: BannerSettings }) {
  const [visible, setVisible] = useState(true);

  if (!visible || !banner.enabled || !banner.text) return null;

  return (
    <div
      role="region"
      aria-label="Announcement"
      className="relative isolate flex items-center gap-x-4 overflow-hidden border-b border-edge bg-primary/10 px-4 py-2.5 sm:px-6"
    >
      <div className="flex flex-1 flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center">
        <p className="text-sm leading-6 text-foreground">
          {banner.title && (
            <>
              <strong className="font-semibold">{banner.title}</strong>
              <span aria-hidden="true" className="mx-2">
                ·
              </span>
            </>
          )}
          {banner.text}
        </p>
        {banner.ctaLabel && (
        <button
          type="button"
          onClick={openAssistant}
          aria-haspopup="dialog"
          className="flex-none rounded-full bg-primary-dark px-3.5 py-1 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary"
        >
          {banner.ctaLabel} <span aria-hidden="true">&rarr;</span>
        </button>
        )}
      </div>
      <button
        type="button"
        onClick={() => setVisible(false)}
        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-light hover:text-foreground"
        aria-label="Dismiss announcement"
      >
        <X aria-hidden="true" className="h-5 w-5" />
      </button>
    </div>
  );
}
