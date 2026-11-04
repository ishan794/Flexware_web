import { NextResponse, type NextRequest } from 'next/server';

const SESSION_COOKIE = 'flx_admin';

/**
 * Fast gate for admin pages: no session cookie → send to the login page.
 * The cookie itself is validated against the database in the admin layout
 * and in every /api/admin route, so this is only a UX shortcut, not the check.
 */
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === '/admin/login') return NextResponse.next();

  if (!req.cookies.has(SESSION_COOKIE)) {
    const url = req.nextUrl.clone();
    url.pathname = '/admin/login';
    url.search = pathname === '/admin' ? '' : `?next=${encodeURIComponent(pathname)}`;
    return NextResponse.redirect(url);
  }

  const res = NextResponse.next();
  // Admin screens must never be cached or indexed
  res.headers.set('Cache-Control', 'no-store');
  res.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return res;
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
