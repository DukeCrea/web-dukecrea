// Genera una credencial para PANEL_CREDENTIALS.
// Uso: node deploy/gen-credential.mjs <usuario> <contraseña>
// Imprime:  usuario:saltHex:hashHex
import { scryptSync, randomBytes } from 'node:crypto';

const [, , user, password] = process.argv;
if (!user || !password) {
  console.error('Uso: node deploy/gen-credential.mjs <usuario> <contraseña>');
  process.exit(1);
}
const salt = randomBytes(16).toString('hex');
const hash = scryptSync(password, salt, 32).toString('hex');
console.log(`${user}:${salt}:${hash}`);
