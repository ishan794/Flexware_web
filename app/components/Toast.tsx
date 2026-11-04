'use client';

import { useEffect, useState, useCallback } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

const toastConfig: Record<ToastType, { icon: typeof CheckCircle; color: string; bg: string; accent: string }> = {
  success: { icon: CheckCircle, color: 'text-success', bg: 'bg-success/10', accent: 'border-l-success' },
  error: { icon: AlertCircle, color: 'text-error', bg: 'bg-error/10', accent: 'border-l-error' },
  info: { icon: Info, color: 'text-info', bg: 'bg-info/10', accent: 'border-l-info' },
  warning: { icon: AlertTriangle, color: 'text-warning', bg: 'bg-warning/10', accent: 'border-l-warning' },
};

// Global toast event system
type ToastHandler = (toast: Omit<ToastItem, 'id'>) => void;
let addToastHandler: ToastHandler | null = null;

export function showToast(toast: Omit<ToastItem, 'id'>) {
  if (addToastHandler) {
    addToastHandler(toast);
  }
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (toast: Omit<ToastItem, 'id'>) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      setToasts((prev) => [...prev, { ...toast, id }]);
      // Errors stay longer so they can be read and acted on
      const duration = toast.duration ?? (toast.type === 'error' ? 9000 : 6000);
      setTimeout(() => removeToast(id), duration);
    },
    [removeToast]
  );

  useEffect(() => {
    addToastHandler = addToast;
    return () => {
      addToastHandler = null;
    };
  }, [addToast]);

  return (
    <div
      id="toast-container"
      aria-live="polite"
      aria-relevant="additions"
      className="pointer-events-none fixed inset-x-4 top-20 z-[100] flex flex-col items-end gap-3 sm:left-auto sm:right-6 sm:top-24 sm:w-96"
    >
      {toasts.map((toast) => {
        const config = toastConfig[toast.type];
        const Icon = config.icon;

        return (
          <div
            key={toast.id}
            role={toast.type === 'error' ? 'alert' : 'status'}
            className={`glass-strong pointer-events-auto w-full rounded-xl border-l-4 p-4 shadow-elevated-lg ${config.accent}`}
            style={{ animation: 'slide-in-bottom 0.35s cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            <div className="flex items-start gap-3">
              <div className={`shrink-0 rounded-lg p-1.5 ${config.bg}`}>
                <Icon className={`h-4 w-4 ${config.color}`} aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground">{toast.title}</p>
                {toast.message && <p className="mt-1 text-sm text-muted">{toast.message}</p>}
              </div>
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="-m-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-subtle transition-colors hover:bg-surface-light hover:text-foreground"
                aria-label="Dismiss notification"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
