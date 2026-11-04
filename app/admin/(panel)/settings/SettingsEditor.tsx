'use client';

import type { SiteSettings } from '@/app/lib/cms/types';
import { useDocEditor } from '../../components/useDocEditor';
import SaveBar from '../../components/SaveBar';
import { ErrorBanner, LoadingRows, PageHeader, Section, TextArea, TextInput, Toggle } from '../../components/fields';

type Field = Exclude<keyof SiteSettings, 'banner' | 'phoneHref'>;

export default function SettingsEditor() {
  const { draft, update, save, reset, dirty, saving, errors, loadError, reload } = useDocEditor('settings');

  const set = (field: Field, v: string) => update((d) => ({ ...d, [field]: v }));
  const setBanner = (field: keyof SiteSettings['banner'], v: string | boolean) =>
    update((d) => ({ ...d, banner: { ...d.banner, [field]: v } }));

  return (
    <>
      <PageHeader title="Site settings" description="Company details used in the header, footer, contact page and forms." />
      {loadError && <ErrorBanner message={loadError} onRetry={reload} />}
      {!draft && !loadError && <LoadingRows />}

      {draft && (
        <div className="space-y-5">
          <Section title="Brand">
            <div className="grid gap-5 sm:grid-cols-2">
              <TextInput label="Company name" required value={draft.name} onChange={(v) => set('name', v)} maxLength={60} error={errors.name} />
              <TextInput label="Tagline" value={draft.tagline} onChange={(v) => set('tagline', v)} maxLength={120} error={errors.tagline} />
            </div>
            <TextArea label="Short description" required value={draft.description} onChange={(v) => set('description', v)} maxLength={300} rows={3} hint="Fallback description for search results." error={errors.description} />
          </Section>

          <Section title="Contact details" description="Shown in the footer, contact page and form error messages.">
            <div className="grid gap-5 sm:grid-cols-2">
              <TextInput label="Email" type="email" required value={draft.email} onChange={(v) => set('email', v)} error={errors.email} />
              <TextInput label="Careers email" type="email" required value={draft.careersEmail} onChange={(v) => set('careersEmail', v)} error={errors.careersEmail} />
              <TextInput label="Phone" type="tel" required value={draft.phone} onChange={(v) => set('phone', v)} hint="Include the country code, e.g. +971 50 739 0610" error={errors.phone} />
              <TextInput label="Locations" value={draft.locations} onChange={(v) => set('locations', v)} error={errors.locations} />
              <TextInput className="sm:col-span-2" label="Office hours" value={draft.hours} onChange={(v) => set('hours', v)} error={errors.hours} />
            </div>
          </Section>

          <Section title="Announcement bar" description="Strip at the top of the homepage. Its button opens the AI assistant.">
            <Toggle label="Show announcement" checked={draft.banner.enabled} onChange={(v) => setBanner('enabled', v)} />
            <div className="grid gap-5 sm:grid-cols-2">
              <TextInput label="Label" value={draft.banner.title} onChange={(v) => setBanner('title', v)} maxLength={60} hint="Bold text before the message (optional)" error={errors['banner.title']} />
              <TextInput label="Button text" value={draft.banner.ctaLabel} onChange={(v) => setBanner('ctaLabel', v)} maxLength={40} hint="Leave empty to hide the button" error={errors['banner.ctaLabel']} />
            </div>
            <TextArea label="Message" value={draft.banner.text} onChange={(v) => setBanner('text', v)} maxLength={200} rows={2} error={errors['banner.text']} />
          </Section>

          <SaveBar dirty={dirty} saving={saving} onSave={save} onReset={reset} />
        </div>
      )}
    </>
  );
}
