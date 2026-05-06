import { NextResponse } from 'next/server';
import { checkPassword, getSessionCookie } from '@/lib/auth';

export async function POST(request) {
  const { password } = await request.json();

  if (!checkPassword(password)) {
    return NextResponse.json({ error: 'Incorrect access code.' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  const cookie = getSessionCookie();
  response.cookies.set(cookie);
  return response;
}
