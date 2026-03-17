import { cookies } from 'next/headers';
import { demoUser, users } from '@/lib/mock-data';

const AUTH_COOKIE = 'agilizacrm_session';

export async function createSession(email: string) {
  const store = await cookies();
  store.set(AUTH_COOKIE, email, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 8,
  });
}

export async function clearSession() {
  const store = await cookies();
  store.delete(AUTH_COOKIE);
}

export async function getCurrentUser() {
  const store = await cookies();
  const session = store.get(AUTH_COOKIE)?.value;
  if (!session) return null;

  const found = users.find((user) => user.email.toLowerCase() === session.toLowerCase());
  return found ?? { ...demoUser, email: session };
}

export function validateCredentials(email: string, password: string) {
  const expectedEmail = process.env.AUTH_EMAIL ?? demoUser.email;
  const expectedPassword = process.env.AUTH_PASSWORD ?? 'admin123';
  return email === expectedEmail && password === expectedPassword;
}
