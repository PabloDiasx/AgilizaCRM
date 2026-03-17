import { createSession, validateCredentials } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const email = String(body.email ?? '');
  const password = String(body.password ?? '');

  if (!validateCredentials(email, password)) {
    return NextResponse.json({ error: 'Credenciais invalidas' }, { status: 401 });
  }

  await createSession(email);
  return NextResponse.json({ ok: true });
}
