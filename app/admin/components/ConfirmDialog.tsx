'use client';

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, Description } from '@headlessui/react';
import { AlertTriangle, Loader2 } from 'lucide-react';
import type { ReactNode } from 'react';

/** Accessible confirmation for destructive or consequential actions */
export default function ConfirmDialog({
  open,
  title,
  children,
  confirmLabel = 'Delete',
  busy = false,
  onConfirm,
  onClose,
}: {
  open: boolean;
  title: string;
  children?: ReactNode;
  confirmLabel?: string;
  busy?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}) {
  return (
    <Dialog open={open} onClose={busy ? () => {} : onClose} className="relative z-[80]">
      <DialogBackdrop transition className="fixed inset-0 bg-background/70 backdrop-blur-sm transition-opacity data-closed:opacity-0" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel
          transition
          className="w-full max-w-md rounded-2xl border border-edge bg-surface p-6 shadow-elevated-lg transition data-closed:scale-95 data-closed:opacity-0"
        >
          <div className="flex gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-error/10 text-error">
              <AlertTriangle className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <DialogTitle className="text-lg font-semibold text-foreground">{title}</DialogTitle>
              {children && <Description as="div" className="mt-2 text-sm text-muted">{children}</Description>}
            </div>
          </div>
          <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button type="button" onClick={onClose} disabled={busy} className="btn btn-outline btn-sm">
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={busy}
              className="btn btn-sm bg-red-600 text-white hover:bg-red-700"
            >
              {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
              {confirmLabel}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
