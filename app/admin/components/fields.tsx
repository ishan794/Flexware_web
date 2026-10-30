'use client';

/*
 * Admin form controls — adapted from the CreativeFX admin's AdminFields
 * (TextInput, TextArea, ToggleSwitch, CollapseSection, PageHeader, EmptyState)
 * and restyled with Flxware's design tokens, light/dark themes and a11y wiring.
 */

import { useId, useState, type ReactNode } from 'react';
import { AlertCircle, ArrowDown, ArrowUp, ChevronDown, Plus, Trash2 } from 'lucide-react';

export function FieldShell({
  id,
  label,
  hint,
  error,
  required,
  children,
  className = '',
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
        {required && (
          <span className="ml-0.5 text-error" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-subtle">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm text-error">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

const describedBy = (id: string, hint?: string, error?: string) =>
  [hint && !error ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(' ') || undefined;

interface TextProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
  maxLength?: number;
  type?: 'text' | 'email' | 'url' | 'tel' | 'password';
  className?: string;
}

export function TextInput({ label, value, onChange, hint, error, required, placeholder, maxLength, type = 'text', className }: TextProps) {
  const id = useId();
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} required={required} className={className}>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        aria-invalid={!!error}
        aria-describedby={describedBy(id, hint, error)}
        className="field-input"
      />
    </FieldShell>
  );
}

export function TextArea({ label, value, onChange, hint, error, required, placeholder, maxLength, rows = 4, className }: TextProps & { rows?: number }) {
  const id = useId();
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} required={required} className={className}>
      <textarea
        id={id}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        aria-invalid={!!error}
        aria-describedby={describedBy(id, hint, error)}
        className="field-input resize-y"
      />
      {maxLength && (
        <p className="mt-1 text-right text-xs tabular-nums text-subtle" aria-hidden="true">
          {value.length}/{maxLength}
        </p>
      )}
    </FieldShell>
  );
}

export function SelectField({
  label,
  value,
  onChange,
  options,
  hint,
  error,
  className,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  hint?: string;
  error?: string;
  className?: string;
}) {
  const id = useId();
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} className={className}>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={describedBy(id, hint, error)}
        className="field-input"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

export function Toggle({
  label,
  checked,
  onChange,
  description,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  description?: string;
}) {
  const id = useId();
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
        </label>
        {description && <p className="mt-0.5 text-xs text-subtle">{description}</p>}
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
          checked ? 'bg-primary-dark' : 'bg-surface-lighter'
        }`}
      >
        <span
          aria-hidden="true"
          className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  );
}

/** Editable list of short text lines (features, requirements, tech tags…) */
export function LinesInput({
  label,
  value,
  onChange,
  hint,
  error,
  placeholder = 'Add an item',
  multiline = false,
}: {
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
  hint?: string;
  error?: string;
  placeholder?: string;
  multiline?: boolean;
}) {
  const groupId = useId();
  const set = (i: number, v: string) => onChange(value.map((x, j) => (j === i ? v : x)));
  const move = (i: number, d: -1 | 1) => {
    const next = [...value];
    [next[i], next[i + d]] = [next[i + d], next[i]];
    onChange(next);
  };

  return (
    <fieldset aria-describedby={error ? `${groupId}-error` : hint ? `${groupId}-hint` : undefined}>
      <legend className="mb-1.5 text-sm font-medium text-foreground">{label}</legend>
      <ul className="space-y-2">
        {value.map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            {multiline ? (
              <textarea
                rows={3}
                value={item}
                aria-label={`${label} ${i + 1}`}
                onChange={(e) => set(i, e.target.value)}
                className="field-input flex-1 resize-y"
              />
            ) : (
              <input
                value={item}
                aria-label={`${label} ${i + 1}`}
                onChange={(e) => set(i, e.target.value)}
                className="field-input flex-1"
              />
            )}
            <div className="flex shrink-0 gap-1 pt-1">
              <IconButton label={`Move ${label} ${i + 1} up`} disabled={i === 0} onClick={() => move(i, -1)}>
                <ArrowUp className="h-4 w-4" />
              </IconButton>
              <IconButton label={`Move ${label} ${i + 1} down`} disabled={i === value.length - 1} onClick={() => move(i, 1)}>
                <ArrowDown className="h-4 w-4" />
              </IconButton>
              <IconButton label={`Remove ${label} ${i + 1}`} danger onClick={() => onChange(value.filter((_, j) => j !== i))}>
                <Trash2 className="h-4 w-4" />
              </IconButton>
            </div>
          </li>
        ))}
      </ul>
      <button type="button" onClick={() => onChange([...value, ''])} className="btn btn-ghost btn-sm mt-2 px-2">
        <Plus className="h-4 w-4" aria-hidden="true" /> {placeholder}
      </button>
      {hint && !error && (
        <p id={`${groupId}-hint`} className="mt-1 text-xs text-subtle">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${groupId}-error`} className="mt-1 flex items-center gap-1.5 text-sm text-error">
          <AlertCircle className="h-4 w-4" aria-hidden="true" /> {error}
        </p>
      )}
    </fieldset>
  );
}

export function IconButton({
  label,
  onClick,
  children,
  disabled,
  danger,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
  disabled?: boolean;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border border-edge text-muted transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
        danger ? 'hover:border-error/40 hover:bg-error/10 hover:text-error' : 'hover:bg-surface-light hover:text-foreground'
      }`}
    >
      <span aria-hidden="true">{children}</span>
    </button>
  );
}

/** Collapsible panel for grouping related fields */
export function Section({
  title,
  description,
  children,
  defaultOpen = true,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <section className="rounded-2xl border border-edge bg-surface">
      <h2>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={id}
          className="flex w-full items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left sm:px-6"
        >
          <span>
            <span className="block font-semibold text-foreground">{title}</span>
            {description && <span className="mt-0.5 block text-sm font-normal text-muted">{description}</span>}
          </span>
          <ChevronDown
            className={`h-5 w-5 shrink-0 text-subtle transition-transform ${open ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>
      </h2>
      <div id={id} hidden={!open} className="space-y-5 border-t border-edge px-5 py-5 sm:px-6">
        {children}
      </div>
    </section>
  );
}

export function PageHeader({ title, description, actions }: { title: string; description?: string; actions?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{title}</h1>
        {description && <p className="mt-1.5 max-w-2xl text-sm text-muted sm:text-base">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function EmptyState({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-edge-hover px-6 py-12 text-center">
      <p className="font-semibold text-foreground">{title}</p>
      {description && <p className="mx-auto mt-1.5 max-w-md text-sm text-muted">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function LoadingRows({ rows = 4 }: { rows?: number }) {
  return (
    <div role="status" aria-label="Loading" className="space-y-3">
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="skeleton h-16" aria-hidden="true" />
      ))}
    </div>
  );
}

export function ErrorBanner({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div role="alert" className="flex flex-wrap items-center gap-3 rounded-xl border border-error/30 bg-error/10 px-4 py-3 text-sm text-error">
      <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span className="flex-1">{message}</span>
      {onRetry && (
        <button type="button" onClick={onRetry} className="font-semibold underline underline-offset-2">
          Retry
        </button>
      )}
    </div>
  );
}
