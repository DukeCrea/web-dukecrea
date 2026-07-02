// Sesión firmada con HMAC-SHA256 (Web Crypto → funciona en middleware edge y en Node).
// El token es `payload.firma`; el payload lleva usuario y expiración.

const enc = new TextEncoder();
const TTL_MS = 1000 * 60 * 60 * 12; // 12 horas

function b64url(bytes: Uint8Array): string {
  let s = '';
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromB64url(str: string): Uint8Array {
  const norm = str.replace(/-/g, '+').replace(/_/g, '/');
  const pad = norm.length % 4 ? 4 - (norm.length % 4) : 0;
  const bin = atob(norm + '='.repeat(pad));
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function hmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey('raw', enc.encode(secret) as BufferSource, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);
}

export async function createSession(user: string, secret: string): Promise<string> {
  const payload = `${user}|${Date.now() + TTL_MS}`;
  const key = await hmacKey(secret);
  const sig = new Uint8Array(await crypto.subtle.sign('HMAC', key, enc.encode(payload) as BufferSource));
  return `${b64url(enc.encode(payload))}.${b64url(sig)}`;
}

export async function readSession(token: string | undefined, secret: string): Promise<{ user: string } | null> {
  if (!token || !secret) return null;
  const dot = token.indexOf('.');
  if (dot < 0) return null;
  let payloadBytes: Uint8Array;
  let sig: Uint8Array;
  try {
    payloadBytes = fromB64url(token.slice(0, dot));
    sig = fromB64url(token.slice(dot + 1));
  } catch {
    return null;
  }
  const key = await hmacKey(secret);
  const ok = await crypto.subtle.verify('HMAC', key, sig as BufferSource, payloadBytes as BufferSource);
  if (!ok) return null;
  const [user, expStr] = new TextDecoder().decode(payloadBytes).split('|');
  const exp = Number(expStr);
  if (!user || !exp || Date.now() > exp) return null;
  return { user };
}
