import { NextResponse } from 'next/server';

const COOKIE_NAME = 'helios_session';
const COOKIE_VALUE = 'authenticated';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  const session = request.cookies.get(COOKIE_NAME);
  if (session?.value !== COOKIE_VALUE) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/portal/:path*'],
};
