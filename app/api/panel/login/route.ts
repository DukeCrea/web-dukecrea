import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { scryptSync, timingSafeEqual } from 'node:crypto';
import { createSession } from '@/lib/session';
import { verifyTOTP } from '@/lib/totp';

const SECRET = process.env.SESSION_SECRET || '';
const CREDS = process.env.PANEL_CREDENTIALS || '';
const TS_SECRET = process.env.TURNSTILE_SECRET_KEY || '';
const TOTP = process.env.PANEL_TOTP || '';

// PANEL_TOTP = "usuario:SECRETO;usuario2:SECRETO2"
function totpSecretFor(user: string): string | null {
  for (const entry of TOTP.split(';')) {
    const i = entry.indexOf(':');
    if (i > 0 && entry.slice(0, i) === user) return entry.slice(i + 1);
  }
  return null;
}

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
  const user = String(form.get('username') || '').trim().toLowerCase();
  const password = String(form.get('password') || '');
  const code = String(form.get('code') || '').trim();
  const tsToken = String(form.get('cf-turnstile-response') || '');
  const ip = req.headers.get('cf-connecting-ip') || req.headers.get('x-forwarded-for') || '';

  if (!(await verifyTurnstile(tsToken, ip))) {
    return NextResponse.json({ error: 'Verificación anti-bot fallida. Recarga e intenta de nuevo.' }, { status: 400 });
  }

  if (!user || !password || !checkPassword(user, password)) {
    return NextResponse.json({ error: 'Correo o contraseña incorrectos.' }, { status: 401 });
  }

  // Segundo factor: si el usuario tiene 2FA configurado, exigir el código.
  const totpSecret = totpSecretFor(user);
  if (totpSecret) {
    if (!code) {
      return NextResponse.json({ error: 'Ingresa el código de 6 dígitos de tu app de autenticación.', needCode: true }, { status: 401 });
    }
    if (!verifyTOTP(code, totpSecret)) {
      return NextResponse.json({ error: 'Código 2FA incorrecto o expirado.', needCode: true }, { status: 401 });
    }
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
