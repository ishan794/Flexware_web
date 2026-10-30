import 'server-only';
import type { Metadata } from 'next';
import type { SeoPageKey } from '../cms/types';
import { getContent } from './content';
import { defaultContent } from '../cms/defaults';

/** Page metadata from Admin → SEO; blank fields fall back to the built-in defaults */
export async function pageMetadata(key: SeoPageKey): Promise<Metadata> {
  const [seo, settings] = await Promise.all([getContent('seo'), getContent('settings')]);
  const page = seo.pages[key];
  const fallback = defaultContent.seo.pages[key];

  const title = page?.title || fallback.title;
  const description = page?.description || fallback.description || settings.description;

  return {
    // The home page uses the layout's default "Name — Tagline" title when blank
    ...(title ? { title } : { title: { absolute: `${settings.name} — ${settings.tagline}` } }),
    description,
    openGraph: { title: title || `${settings.name} — ${settings.tagline}`, description },
  };
}
