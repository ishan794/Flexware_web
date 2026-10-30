'use client';

import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useDocEditor } from '../../components/useDocEditor';
import SaveBar from '../../components/SaveBar';
import { ErrorBanner, LoadingRows, PageHeader, Section, TextArea, TextInput } from '../../components/fields';

export default function AboutEditor() {
  const { draft, update, save, reset, dirty, saving, errors, loadError, reload } = useDocEditor('about');

  return (
    <>
      <PageHeader
        title="About page"
        description="Intro at the top of /about."
        actions={
          <a href="/about" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
            <ExternalLink className="h-4 w-4" aria-hidden="true" /> Preview
          </a>
        }
      />
      {loadError && <ErrorBanner message={loadError} onRetry={reload} />}
      {!draft && !loadError && <LoadingRows />}

      {draft && (
        <div className="space-y-5">
          <Section title="Intro">
            <TextInput label="Eyebrow label" value={draft.label} onChange={(v) => update((d) => ({ ...d, label: v }))} maxLength={60} error={errors.label} />
            <TextInput label="Title" required value={draft.title} onChange={(v) => update((d) => ({ ...d, title: v }))} maxLength={120} error={errors.title} />
            <TextArea label="Introduction" required value={draft.intro} onChange={(v) => update((d) => ({ ...d, intro: v }))} maxLength={600} rows={4} error={errors.intro} />
          </Section>
          <p className="rounded-xl border border-edge bg-surface p-4 text-sm text-muted">
            The service cards on the About page come from{' '}
            <Link href="/admin/homepage" className="link-underline font-medium text-primary-light">Homepage → Service highlights</Link>. Stats, team and
            testimonials appear automatically once you publish entries in{' '}
            <Link href="/admin/stats" className="link-underline font-medium text-primary-light">Stats</Link>,{' '}
            <Link href="/admin/team" className="link-underline font-medium text-primary-light">Team</Link> and{' '}
            <Link href="/admin/testimonials" className="link-underline font-medium text-primary-light">Testimonials</Link>.
          </p>
          <SaveBar dirty={dirty} saving={saving} onSave={save} onReset={reset} />
        </div>
      )}
    </>
  );
}
