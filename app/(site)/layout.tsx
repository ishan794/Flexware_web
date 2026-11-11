import type { ReactNode } from 'react';
import SiteChrome from '@/app/components/SiteChrome';

// Public pages read live CMS content (cached per tag and invalidated on every admin
// save), so they render on request instead of being frozen at build time.
// Next requires this to be a literal string, so `npm run build:static` rewrites the
// line below to 'force-static' for the duration of the export build.
export const dynamic = 'force-dynamic';

export default function SiteLayout({ children }: { children: ReactNode }) {
  return <SiteChrome>{children}</SiteChrome>;
}
