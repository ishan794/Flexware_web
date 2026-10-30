'use client';

import { ArrowDown, ArrowUp, ExternalLink, Plus, Trash2 } from 'lucide-react';
import { iconNames, toneNames } from '@/app/lib/icons';
import type { HomepageContent } from '@/app/lib/cms/types';
import { useDocEditor } from '../../components/useDocEditor';
import SaveBar from '../../components/SaveBar';
import { ErrorBanner, IconButton, LoadingRows, PageHeader, Section, SelectField, TextArea, TextInput } from '../../components/fields';

function moveItem<T>(list: T[], i: number, d: -1 | 1) {
  const next = [...list];
  [next[i], next[i + d]] = [next[i + d], next[i]];
  return next;
}

export default function HomepageEditor() {
  const { draft, update, save, reset, dirty, saving, errors, loadError, reload } = useDocEditor('homepage');

  const setHero = (field: keyof HomepageContent['hero'], v: string) => update((d) => ({ ...d, hero: { ...d.hero, [field]: v } }));
  const setCta = (field: keyof HomepageContent['cta'], v: string) => update((d) => ({ ...d, cta: { ...d.cta, [field]: v } }));
  const setHighlight = (i: number, field: string, v: string) =>
    update((d) => ({ ...d, highlights: d.highlights.map((h, j) => (j === i ? { ...h, [field]: v } : h)) }));
  const setFaq = (i: number, field: 'q' | 'a', v: string) =>
    update((d) => ({ ...d, faqs: d.faqs.map((f, j) => (j === i ? { ...f, [field]: v } : f)) }));

  return (
    <>
      <PageHeader
        title="Homepage"
        description="Hero, service highlights, call-to-action and FAQ. The announcement bar is in Site settings."
        actions={
          <a href="/" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
            <ExternalLink className="h-4 w-4" aria-hidden="true" /> Preview
          </a>
        }
      />
      {loadError && <ErrorBanner message={loadError} onRetry={reload} />}
      {!draft && !loadError && <LoadingRows />}

      {draft && (
        <div className="space-y-5">
          <Section title="Hero" description="The first thing visitors see.">
            <TextInput label="Badge text" value={draft.hero.badge} onChange={(v) => setHero('badge', v)} maxLength={120} hint="Optional small announcement above the headline. Leave empty to hide." error={errors['hero.badge']} />
            <TextInput label="Headline" required value={draft.hero.title} onChange={(v) => setHero('title', v)} maxLength={120} error={errors['hero.title']} />
            <TextArea label="Subtitle" required value={draft.hero.subtitle} onChange={(v) => setHero('subtitle', v)} maxLength={300} rows={3} error={errors['hero.subtitle']} />
            <div className="grid gap-5 sm:grid-cols-2">
              <TextInput label="Primary button" required value={draft.hero.primaryCtaLabel} onChange={(v) => setHero('primaryCtaLabel', v)} maxLength={40} hint="Links to /contact" error={errors['hero.primaryCtaLabel']} />
              <TextInput label="Secondary button" required value={draft.hero.secondaryCtaLabel} onChange={(v) => setHero('secondaryCtaLabel', v)} maxLength={40} hint="Links to /services" error={errors['hero.secondaryCtaLabel']} />
            </div>
          </Section>

          <Section title="Service highlights" description="Cards under “What We Do” (also used on the About page).">
            {draft.highlights.map((h, i) => (
              <div key={i} className="rounded-xl border border-edge p-4">
                <div className="mb-4 flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-foreground">Card {i + 1}</p>
                  <div className="flex gap-1">
                    <IconButton label={`Move card ${i + 1} up`} disabled={i === 0} onClick={() => update((d) => ({ ...d, highlights: moveItem(d.highlights, i, -1) }))}>
                      <ArrowUp className="h-4 w-4" />
                    </IconButton>
                    <IconButton label={`Move card ${i + 1} down`} disabled={i === draft.highlights.length - 1} onClick={() => update((d) => ({ ...d, highlights: moveItem(d.highlights, i, 1) }))}>
                      <ArrowDown className="h-4 w-4" />
                    </IconButton>
                    <IconButton label={`Remove card ${i + 1}`} danger onClick={() => update((d) => ({ ...d, highlights: d.highlights.filter((_, j) => j !== i) }))}>
                      <Trash2 className="h-4 w-4" />
                    </IconButton>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <TextInput label="Title" required value={h.title} onChange={(v) => setHighlight(i, 'title', v)} maxLength={60} error={errors[`highlights.${i}.title`]} />
                  <TextInput label="Link" required value={h.href} onChange={(v) => setHighlight(i, 'href', v)} hint="Site path, e.g. /services#web" error={errors[`highlights.${i}.href`]} />
                  <SelectField label="Icon" value={h.icon} onChange={(v) => setHighlight(i, 'icon', v)} options={iconNames.map((n) => ({ value: n, label: n }))} />
                  <SelectField label="Accent colour" value={h.tone} onChange={(v) => setHighlight(i, 'tone', v)} options={toneNames.map((n) => ({ value: n, label: n[0].toUpperCase() + n.slice(1) }))} />
                  <TextArea className="sm:col-span-2" label="Description" required value={h.description} onChange={(v) => setHighlight(i, 'description', v)} maxLength={240} rows={2} error={errors[`highlights.${i}.description`]} />
                </div>
              </div>
            ))}
            {draft.highlights.length < 8 && (
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => update((d) => ({ ...d, highlights: [...d.highlights, { icon: 'Code2', title: '', description: '', href: '/services', tone: 'primary' }] }))}
              >
                <Plus className="h-4 w-4" aria-hidden="true" /> Add card
              </button>
            )}
          </Section>

          <Section title="Call to action" description="Banner near the bottom of the page.">
            <TextInput label="Title" required value={draft.cta.title} onChange={(v) => setCta('title', v)} maxLength={120} error={errors['cta.title']} />
            <TextArea label="Text" required value={draft.cta.text} onChange={(v) => setCta('text', v)} maxLength={300} rows={2} error={errors['cta.text']} />
          </Section>

          <Section title="FAQ" description="Shown as an accordion. The section is hidden when there are no questions.">
            {draft.faqs.map((f, i) => (
              <div key={i} className="rounded-xl border border-edge p-4">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-foreground">Question {i + 1}</p>
                  <div className="flex gap-1">
                    <IconButton label={`Move question ${i + 1} up`} disabled={i === 0} onClick={() => update((d) => ({ ...d, faqs: moveItem(d.faqs, i, -1) }))}>
                      <ArrowUp className="h-4 w-4" />
                    </IconButton>
                    <IconButton label={`Move question ${i + 1} down`} disabled={i === draft.faqs.length - 1} onClick={() => update((d) => ({ ...d, faqs: moveItem(d.faqs, i, 1) }))}>
                      <ArrowDown className="h-4 w-4" />
                    </IconButton>
                    <IconButton label={`Remove question ${i + 1}`} danger onClick={() => update((d) => ({ ...d, faqs: d.faqs.filter((_, j) => j !== i) }))}>
                      <Trash2 className="h-4 w-4" />
                    </IconButton>
                  </div>
                </div>
                <div className="space-y-4">
                  <TextInput label="Question" required value={f.q} onChange={(v) => setFaq(i, 'q', v)} maxLength={200} error={errors[`faqs.${i}.q`]} />
                  <TextArea label="Answer" required value={f.a} onChange={(v) => setFaq(i, 'a', v)} maxLength={1000} rows={3} error={errors[`faqs.${i}.a`]} />
                </div>
              </div>
            ))}
            <button type="button" className="btn btn-outline btn-sm" onClick={() => update((d) => ({ ...d, faqs: [...d.faqs, { q: '', a: '' }] }))}>
              <Plus className="h-4 w-4" aria-hidden="true" /> Add question
            </button>
          </Section>

          <SaveBar dirty={dirty} saving={saving} onSave={save} onReset={reset} />
        </div>
      )}
    </>
  );
}
