#!/usr/bin/env bash
# Instala la vigilancia del VPS: watchdog de la web + guardia anti-malware,
# con sus entradas de cron. Idempotente (se puede correr varias veces).
set -euo pipefail

# ── 1) Watchdog de la web: reinicia la app si deja de responder ──
cat > /usr/local/bin/dukecrea-watchdog.sh <<'EOF'
#!/bin/bash
LOG=/var/log/dukecrea-watchdog.log
CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 http://localhost:3000/ || echo 000)
if [ "$CODE" != "200" ]; then
  echo "$(date '+%Y-%m-%d %H:%M:%S') — app no responde (HTTP $CODE), reiniciando" >> "$LOG"
  pm2 restart dukecrea --update-env >> "$LOG" 2>&1
fi
EOF
chmod +x /usr/local/bin/dukecrea-watchdog.sh

# ── 2) Guardia anti-malware: detecta y neutraliza reinfección Diicot ──
cat > /usr/local/bin/dukecrea-ioc-guard.sh <<'EOF'
#!/bin/bash
LOG=/var/log/dukecrea-ioc.log
ts() { date "+%Y-%m-%d %H:%M:%S"; }
hit=0
for f in /usr/bin/gs-dbus /tmp/.x /dev/shm/let /dev/shm/lrt /tmp/let /tmp/lrt; do
  if [ -e "$f" ]; then chattr -iau "$f" 2>/dev/null; rm -f "$f"; echo "$(ts) — REINFECCION: eliminado $f" >> "$LOG"; hit=1; fi
done
for pid in $(ls /proc | grep -E '^[0-9]+$'); do
  exe=$(readlink /proc/$pid/exe 2>/dev/null)
  case "$exe" in
    *"(deleted)"*)
      case "$exe" in
        */tmp/*|*/dev/shm/*|*/var/tmp/*)
          kill -9 "$pid" 2>/dev/null
          echo "$(ts) — REINFECCION: matado pid $pid exe=$exe" >> "$LOG"; hit=1 ;;
      esac ;;
  esac
done
for p in $(pgrep -f "gs-dbus|kdevtmpfsi|xmrig|kinsing|Diicot" 2>/dev/null); do
  kill -9 "$p" 2>/dev/null; echo "$(ts) — REINFECCION: matado minero pid $p" >> "$LOG"; hit=1
done
[ "$hit" = 1 ] && echo "$(ts) — accion tomada" >> "$LOG"
exit 0
EOF
chmod +x /usr/local/bin/dukecrea-ioc-guard.sh

# ── 3) Cron (sin duplicar, tolerante a crontab vacío) ──
EXISTING="$(crontab -l 2>/dev/null | grep -vE 'dukecrea-watchdog|dukecrea-ioc-guard' || true)"
printf '%s\n*/5 * * * * /usr/local/bin/dukecrea-watchdog.sh\n*/3 * * * * /usr/local/bin/dukecrea-ioc-guard.sh\n' "$EXISTING" | grep -vE '^$' | crontab -

echo "Vigilancia instalada: watchdog web (5 min) + guardia anti-malware (3 min)."
