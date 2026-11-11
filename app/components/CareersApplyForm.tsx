'use client';

import { Mail } from 'lucide-react';

/**
 * Open-application form. No backend: submitting opens the visitor's email app,
 * addressed to the careers inbox with the role they typed as the subject.
 * The mailto URL is built by hand because a native GET form encodes spaces as "+".
 */
export default function CareersApplyForm({ email }: { email: string }) {
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const role = String(new FormData(e.currentTarget).get('role') ?? '').trim();
    const subject = encodeURIComponent(`Application: ${role}`);
    window.location.href = `mailto:${email}?subject=${subject}`;
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md lg:col-span-5 lg:pt-14">
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-x-4">
        <label htmlFor="open-application-role" className="sr-only">
          Role you&apos;re interested in
        </label>
        <input
          id="open-application-role"
          name="role"
          type="text"
          required
          maxLength={120}
          placeholder="Role you're interested in"
          className="field-input min-w-0 flex-auto"
        />
        <button type="submit" className="btn btn-primary flex-none">
          <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
          Apply
        </button>
      </div>
      <p className="mt-4 text-sm/6 text-muted">
        We&apos;re always looking for talented individuals. Attach your resume, or email us directly at{' '}
        <a
          href={`mailto:${email}`}
          className="font-semibold break-all text-primary-light hover:text-primary"
        >
          {email}
        </a>
        .
      </p>
    </form>
  );
}
