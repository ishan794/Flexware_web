import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ToastContainer from './components/Toast';
import { ThemeProvider } from './lib/theme-context';
import { defaultContent } from './lib/cms/defaults';

// Brand-level defaults; per-page titles/descriptions come from Admin → SEO.
const site = defaultContent.settings;

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    'web development',
    'mobile apps',
    'AI solutions',
    'digital transformation',
    'software development',
    'Flxware',
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: 'Crafting cutting-edge digital experiences with modern technology.',
  },
  twitter: {
    card: 'summary',
    title: `${site.name} — ${site.tagline}`,
    description: 'Crafting cutting-edge digital experiences with modern technology.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#050a18' },
  ],
};

// Runs before first paint so the stored/system theme never flashes the wrong colors.
const themeScript = `(function(){try{var p=localStorage.getItem('theme');if(p!=='light'&&p!=='dark')p=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';var d=document.documentElement;d.setAttribute('data-theme',p);d.style.colorScheme=p;}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      data-theme="dark"
      className={`${inter.variable} h-full antialiased`}
    >
      <head>
        {/* `async` silences React 19's inline-script warning; inline scripts still run synchronously */}
        <script id="theme-initializer" async dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        {/* Shared by the public site (app/(site)) and the admin panel (app/admin) */}
        <ThemeProvider>
          {children}
          <ToastContainer />
        </ThemeProvider>
      </body>
    </html>
  );
}
