// 2FA TOTP (RFC 6238) compatible con Google Authenticator / Authy.
// Implementado con node:crypto, sin dependencias externas. Solo servidor.
import { createHmac, randomBytes } from 'node:crypto';

const B32 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

export function generateSecret(bytes = 20): string {
  const buf = randomBytes(bytes);
  let bits = '';
  for (const b of buf) bits += b.toString(2).padStart(8, '0');
  let out = '';
  for (let i = 0; i + 5 <= bits.length; i += 5) {
    out += B32[parseInt(bits.slice(i, i + 5), 2)];
  }
  return out;
}

function base32Decode(secret: string): Buffer {
  const clean = secret.toUpperCase().replace(/=+$/, '').replace(/\s+/g, '');
  let bits = '';
  for (const c of clean) {
    const idx = B32.indexOf(c);
    if (idx >= 0) bits += idx.toString(2).padStart(5, '0');
  }
  const bytes: number[] = [];
  for (let i = 0; i + 8 <= bits.length; i += 8) {
    bytes.push(parseInt(bits.slice(i, i + 8), 2));
  }
  return Buffer.from(bytes);
}

function hotp(secret: Buffer, counter: number): string {
  const buf = Buffer.alloc(8);
  buf.writeBigUInt64BE(BigInt(counter));
  const hmac = createHmac('sha1', secret).update(buf).digest();
  const offset = hmac[hmac.length - 1] & 0xf;
  const code =
    ((hmac[offset] & 0x7f) << 24) |
    ((hmac[offset + 1] & 0xff) << 16) |
    ((hmac[offset + 2] & 0xff) << 8) |
    (hmac[offset + 3] & 0xff);
  return (code % 1_000_000).toString().padStart(6, '0');
}

// Verifica el código con tolerancia de ±1 ventana (30s) por desfase de reloj.
export function verifyTOTP(token: string, secretB32: string, window = 1): boolean {
  if (!/^\d{6}$/.test(token)) return false;
  const secret = base32Decode(secretB32);
  const step = Math.floor(Date.now() / 1000 / 30);
  for (let w = -window; w <= window; w++) {
    if (hotp(secret, step + w) === token) return true;
  }
  return false;
}

export function otpauthURI(user: string, secretB32: string, issuer = 'DukeCrea'): string {
  const label = encodeURIComponent(`${issuer}:${user}`);
  const params = new URLSearchParams({ secret: secretB32, issuer, algorithm: 'SHA1', digits: '6', period: '30' });
  return `otpauth://totp/${label}?${params.toString()}`;
}
