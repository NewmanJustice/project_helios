import { NextResponse } from 'next/server';

const COOKIE_NAME = 'helios_session';
const COOKIE_VALUE = 'authenticated';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Already going to login — let through
  if (pathname.startsWith('/login') || pathname.startsWith('/_next') || pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  const session = request.cookies.get(COOKIE_NAME);
  if (session?.value !== COOKIE_VALUE) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
