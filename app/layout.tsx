import type { Metadata } from 'next';
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ToastContainer from './components/Toast';
import AiAssistant from './components/ai-assistant';
import { ThemeProvider } from './lib/theme-context';



export const metadata: Metadata = {
  title: {
    default: 'Flxware — Digital Innovation Studio',
    template: '%s | Flxware',
  },
  description:
    'Flxware crafts cutting-edge web applications, mobile solutions, and AI-powered systems that transform businesses. Your vision, our technology.',
  keywords: [
    'web development',
    'mobile apps',
    'AI solutions',
    'digital transformation',
    'software development',
    'Flxware',
  ],
  authors: [{ name: 'Flxware' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Flxware',
    title: 'Flxware — Digital Innovation Studio',
    description:
      'Crafting cutting-edge digital experiences with modern technology.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

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
      className="h-full antialiased"
    >
      <head>
        <script
          id="theme-initializer"
          async
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var storedTheme = localStorage.getItem('theme');
                  var theme = storedTheme || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
                  document.documentElement.setAttribute('data-theme', theme);
                  document.documentElement.style.colorScheme = theme;
                } catch (e) {}
              })();
            `
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1 pt-20">{children}</main>
          <Footer />
          <ToastContainer />
          <AiAssistant />
        </ThemeProvider>
      </body>
    </html>
  );
}
