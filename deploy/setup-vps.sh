#!/usr/bin/env bash
# ============================================================================
# Bootstrap + endurecimiento del VPS de DukeCrea sobre Ubuntu 24.04 LIMPIO.
# Deja la web arriba (dukecrea.com) con firewall, SSH endurecido, fail2ban,
# SSL y vigilancia anti-malware.
#
# USO (como root en el servidor RECIÉN reinstalado):
#   apt-get update && apt-get install -y git
#   git clone https://github.com/DukeCrea/web-dukecrea.git /var/www/dukecrea
#   bash /var/www/dukecrea/deploy/setup-vps.sh
# ============================================================================
set -euo pipefail

DOMAIN="dukecrea.com"
APPDIR="/var/www/dukecrea"
EMAIL="duque629@gmail.com"
export DEBIAN_FRONTEND=noninteractive

echo "==> 1/9  Actualizando el sistema..."
apt-get update && apt-get -y upgrade

echo "==> 2/9  Instalando Node.js 20 LTS..."
if ! command -v node >/dev/null 2>&1; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi

echo "==> 3/9  Instalando nginx, certbot, ufw, fail2ban, pm2..."
apt-get install -y nginx certbot python3-certbot-nginx ufw fail2ban curl
npm install -g pm2@latest

echo "==> 4/9  Firewall (solo SSH, HTTP, HTTPS)..."
ufw --force reset
ufw default deny incoming
ufw default allow outgoing
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

echo "==> 5/9  Endureciendo SSH (solo llaves, sin contraseñas)..."
# Prefijo 00- para que se lea ANTES de 50-cloud-init (SSH usa el primer valor).
cat > /etc/ssh/sshd_config.d/00-dukecrea-hardening.conf <<'SSHD'
PermitRootLogin prohibit-password
PasswordAuthentication no
PubkeyAuthentication yes
X11Forwarding no
SSHD
sshd -t && (systemctl restart ssh || systemctl restart sshd)

echo "==> 6/9  fail2ban activo para SSH..."
systemctl enable --now fail2ban

echo "==> 7/9  Compilando la web y levantando con PM2..."
cd "$APPDIR"
npm ci --no-audit --no-fund
npm run build
pm2 delete dukecrea 2>/dev/null || true
pm2 start "$APPDIR/node_modules/.bin/next" --name dukecrea -- start -p 3000
pm2 save
pm2 startup systemd -u root --hp /root | tail -n 1 | bash || true

echo "==> 8/9  nginx + certificado SSL..."
cat > /etc/nginx/sites-available/dukecrea.com <<NGINX
server {
    listen 80;
    server_name ${DOMAIN} www.${DOMAIN} panel.${DOMAIN};
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
NGINX
ln -sf /etc/nginx/sites-available/dukecrea.com /etc/nginx/sites-enabled/dukecrea.com
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
certbot --nginx -d "${DOMAIN}" -d "www.${DOMAIN}" -d "panel.${DOMAIN}" \
  --non-interactive --agree-tos -m "${EMAIL}" --redirect || \
  echo "!! certbot falló (revisa que el DNS apunte a este servidor) — la web ya sirve por HTTP."

echo "==> 9/9  Vigilancia (watchdog de la web + guardia anti-malware)..."
bash "$APPDIR/deploy/install-guards.sh"

echo ""
echo "============================================================"
echo " LISTO. Web publicada y servidor endurecido."
echo " Verifica: https://${DOMAIN}"
echo "============================================================"
