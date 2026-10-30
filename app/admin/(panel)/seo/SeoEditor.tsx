'use client';

import { seoPageKeys, type SeoPageKey } from '@/app/lib/cms/types';
import { useDocEditor } from '../../components/useDocEditor';
import SaveBar from '../../components/SaveBar';
import { ErrorBanner, LoadingRows, PageHeader, Section, TextArea, TextInput } from '../../components/fields';

const pageInfo: Record<SeoPageKey, { label: string; path: string }> = {
  home: { label: 'Home', path: '/' },
  services: { label: 'Services', path: '/services' },
  about: { label: 'About', path: '/about' },
  portfolio: { label: 'Portfolio', path: '/portfolio' },
  careers: { label: 'Careers', path: '/careers' },
  contact: { label: 'Contact', path: '/contact' },
};

/** Search-result preview, like the CreativeFX SEO section */
function SerpPreview({ title, description, path }: { title: string; description: string; path: string }) {
  return (
    <div aria-hidden="true" className="rounded-xl border border-edge bg-surface-light p-4">
      {/* Rendered only after content loads on the client, so window is available */}
      <p className="truncate text-xs text-subtle">{window.location.host}{path === '/' ? '' : path}</p>
      <p className="mt-1 truncate text-base font-medium text-primary-light">{title}</p>
      <p className="mt-1 line-clamp-2 text-sm text-muted">{description || 'No description — search engines will pick text from the page.'}</p>
    </div>
  );
}

export default function SeoEditor() {
  const { draft, update, save, reset, dirty, saving, errors, loadError, reload } = useDocEditor('seo');

  const set = (key: SeoPageKey, field: 'title' | 'description', v: string) =>
    update((d) => ({ ...d, pages: { ...d.pages, [key]: { ...d.pages[key], [field]: v } } }));

  return (
    <>
      <PageHeader
        title="SEO"
        description="Browser-tab titles and search descriptions for each page. Titles get “| Flxware” added automatically."
      />
      {loadError && <ErrorBanner message={loadError} onRetry={reload} />}
      {!draft && !loadError && <LoadingRows />}

      {draft && (
        <div className="space-y-5">
          {seoPageKeys.map((key, i) => {
            const page = draft.pages[key];
            const shownTitle = page.title ? `${page.title} | Flxware` : 'Flxware — Digital Innovation Studio';
            return (
              <Section key={key} title={pageInfo[key].label} description={pageInfo[key].path} defaultOpen={i === 0}>
                <TextInput
                  label="Page title"
                  value={page.title}
                  onChange={(v) => set(key, 'title', v)}
                  maxLength={70}
                  hint={key === 'home' ? 'Leave empty to use “Flxware — Digital Innovation Studio”.' : 'Aim for under 60 characters.'}
                  error={errors[`pages.${key}.title`]}
                />
                <TextArea
                  label="Meta description"
                  value={page.description}
                  onChange={(v) => set(key, 'description', v)}
                  maxLength={170}
                  rows={2}
                  hint="Aim for 120–160 characters."
                  error={errors[`pages.${key}.description`]}
                />
                <SerpPreview title={shownTitle} description={page.description} path={pageInfo[key].path} />
              </Section>
            );
          })}
          <SaveBar dirty={dirty} saving={saving} onSave={save} onReset={reset} />
        </div>
      )}
    </>
  );
}
