import type { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Script from 'next/script';
import ScrollAnimationProvider from './ScrollAnimationProvider';
import { getContent } from '../lib/server/content';

/** Public website frame: skip link, header, main landmark, footer and chat widget */
export default async function SiteChrome({ children }: { children: ReactNode }) {
  const settings = await getContent('settings');

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1 pt-16 focus:outline-none sm:pt-20">
        {children}
      </main>
      <Footer settings={settings} />
      <Script
        src="https://app.worksuite.lk/widget.js"
        data-widget-id="iUJe9YMgg0Ju_j_Vfw2MoxHA"
        charSet="utf-8"
        strategy="afterInteractive"
      />
      <ScrollAnimationProvider />
    </>
  );
}
