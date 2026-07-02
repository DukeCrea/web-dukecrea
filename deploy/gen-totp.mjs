// Genera un secreto TOTP (2FA) para un usuario.
// Uso: node deploy/gen-totp.mjs <correo>
// Imprime: el secreto (para PANEL_TOTP), la clave manual y el enlace otpauth.
import { randomBytes } from 'node:crypto';

const B32 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
function generateSecret(bytes = 20) {
  const buf = randomBytes(bytes);
  let bits = '';
  for (const b of buf) bits += b.toString(2).padStart(8, '0');
  let out = '';
  for (let i = 0; i + 5 <= bits.length; i += 5) out += B32[parseInt(bits.slice(i, i + 5), 2)];
  return out;
}

const user = process.argv[2];
if (!user) {
  console.error('Uso: node deploy/gen-totp.mjs <correo>');
  process.exit(1);
}
const secret = generateSecret();
const issuer = 'DukeCrea';
const label = encodeURIComponent(`${issuer}:${user}`);
const params = new URLSearchParams({ secret, issuer, algorithm: 'SHA1', digits: '6', period: '30' });

console.log(`PANEL_TOTP_ENTRY=${user}:${secret}`);
console.log(`CLAVE_MANUAL=${secret}`);
console.log(`OTPAUTH=otpauth://totp/${label}?${params.toString()}`);
