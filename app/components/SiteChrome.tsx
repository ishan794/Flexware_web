import type { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import AiAssistant from './ai-assistant';
import ScrollAnimationProvider from './ScrollAnimationProvider';
import { getContent } from '../lib/server/content';

/** Public website frame: skip link, header, main landmark, footer and assistant */
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
      <AiAssistant contactEmail={settings.email} />
      <ScrollAnimationProvider />
    </>
  );
}
