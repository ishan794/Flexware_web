'use client';

import type { ReactNode } from 'react';
import { openAssistant } from './events';

export default function OpenAssistantButton({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <button type="button" onClick={openAssistant} className={className} aria-haspopup="dialog">
      {children}
    </button>
  );
}
