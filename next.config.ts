import path from "path";
import type { NextConfig } from "next";

/*
 * Two build modes.
 *
 *  • Default — runs as a Node.js server (`next start`): the admin panel, API routes
 *    and database-backed pages all work. Deploy with the Dockerfile.
 *  • STATIC_EXPORT=1 — emits a plain `out/` folder for Apache/cPanel shared hosting
 *    (`npm run build:static`). There is no server, so the admin panel, the API routes
 *    and middleware are excluded from the build and page content comes from the
 *    built-in defaults in app/lib/cms/. See docs/STATIC-HOSTING.md.
 */
const isStatic = process.env.STATIC_EXPORT === '1';

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
];

const nextConfig: NextConfig = {
  output: isStatic ? 'export' : 'standalone',
  turbopack: { root: path.resolve(__dirname) },
  poweredByHeader: false,

  // Keep the two builds' intermediates apart. The static build runs with the admin
  // and API routes moved aside, so it regenerates Next's route types without them;
  // sharing .next would leave those behind and break `tsc` and `next dev`.
  ...(isStatic ? { distDir: '.next-static' } : {}),

  // Apache serves `/about/` from `about/index.html` with no rewrite rules;
  // without this, export emits `about.html`, which needs MultiViews to resolve.
  ...(isStatic ? { trailingSlash: true } : {}),

  // The export has no server, so next/image cannot optimise on request.
  ...(isStatic ? { images: { unoptimized: true } } : {}),

  // `headers()` is a server feature and is ignored by `output: 'export'`.
  // The static build writes the same headers into out/.htaccess instead.
  ...(isStatic
    ? {}
    : {
        async headers() {
          return [
            {
              source: '/:path*',
              headers: [...securityHeaders, { key: 'Cache-Control', value: 'no-store, must-revalidate' }],
            },
            {
              source: '/admin/:path*',
              headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
            },
          ];
        },
      }),
};

export default nextConfig;
