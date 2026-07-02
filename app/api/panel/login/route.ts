import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { scryptSync, timingSafeEqual } from 'node:crypto';
import { createSession } from '@/lib/session';

const SECRET = process.env.SESSION_SECRET || '';
const CREDS = process.env.PANEL_CREDENTIALS || '';
const TS_SECRET = process.env.TURNSTILE_SECRET_KEY || '';

// PANEL_CREDENTIALS = "usuario:saltHex:hashHex;usuario2:saltHex:hashHex"
function checkPassword(user: string, password: string): boolean {
  for (const entry of CREDS.split(';')) {
    const [u, salt, hash] = entry.split(':');
    if (u === user && salt && hash) {
      const derived = scryptSync(password, salt, 32);
      const expected = Buffer.from(hash, 'hex');
      if (derived.length === expected.length && timingSafeEqual(derived, expected)) {
        return true;
      }
    }
  }
  return false;
}

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  if (!TS_SECRET) return true; // Turnstile aún no configurado → no bloquear el login.
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret: TS_SECRET, response: token, remoteip: ip }),
    });
    const data = (await res.json()) as { success?: boolean };
    return Boolean(data.success);
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  if (!SECRET || !CREDS) {
    return NextResponse.json({ error: 'El login no está configurado en el servidor.' }, { status: 500 });
  }

  const form = await req.formData();
  const user = String(form.get('username') || '').trim();
  const password = String(form.get('password') || '');
  const tsToken = String(form.get('cf-turnstile-response') || '');
  const ip = req.headers.get('cf-connecting-ip') || req.headers.get('x-forwarded-for') || '';

  if (!(await verifyTurnstile(tsToken, ip))) {
    return NextResponse.json({ error: 'Verificación anti-bot fallida. Recarga e intenta de nuevo.' }, { status: 400 });
  }

  if (!user || !password || !checkPassword(user, password)) {
    return NextResponse.json({ error: 'Usuario o contraseña incorrectos.' }, { status: 401 });
  }

  const token = await createSession(user, SECRET);
  const jar = await cookies();
  jar.set('dc_panel', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 12,
  });

  return NextResponse.json({ ok: true });
}
