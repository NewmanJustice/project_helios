import { cookies } from 'next/headers';

const PASSWORD = process.env.HELIOS_PASSWORD ?? 'helios2025';
const COOKIE_NAME = 'helios_session';
const COOKIE_VALUE = 'authenticated';

export function checkPassword(attempt) {
  return attempt === PASSWORD;
}

export function isAuthenticated() {
  const cookieStore = cookies();
  return cookieStore.get(COOKIE_NAME)?.value === COOKIE_VALUE;
}

export function getSessionCookie() {
  return {
    name: COOKIE_NAME,
    value: COOKIE_VALUE,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 8, // 8 hours
  };
}
