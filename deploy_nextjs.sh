#!/bin/bash
# SealOfAudit — Next.js deployment to Hostinger VPS
# Usage: DEPLOY_SSH_PASSWORD='<root password>' ./deploy_nextjs.sh
set -euo pipefail

REMOTE_HOST="${REMOTE_HOST:-187.124.116.227}"
REMOTE_USER="${REMOTE_USER:-root}"
APP_DIR="/opt/sealofaudit"
PROJECT_DIR="/Users/ambusiness/sealofaudit"

if ! command -v sshpass >/dev/null 2>&1 && [[ -n "${DEPLOY_SSH_PASSWORD:-}" ]]; then
  echo "ERROR: sshpass not installed. brew install sshpass"
  exit 1
fi

ssh_cmd() {
  if [[ -n "${DEPLOY_SSH_PASSWORD:-}" ]]; then
    SSHPASS="$DEPLOY_SSH_PASSWORD" sshpass -e ssh -o StrictHostKeyChecking=accept-new -o ConnectTimeout=10 "$@"
  else
    ssh -o StrictHostKeyChecking=accept-new -o ConnectTimeout=10 "$@"
  fi
}

echo "→ Preflight SSH ${REMOTE_USER}@${REMOTE_HOST}"
if ! ssh_cmd -o BatchMode=yes "${REMOTE_USER}@${REMOTE_HOST}" "true" 2>/dev/null; then
  echo "SSH failed. Use: DEPLOY_SSH_PASSWORD='<pw>' $0"
  exit 1
fi

echo "→ Installing Node 20 + nginx + pm2 on server"
ssh_cmd "${REMOTE_USER}@${REMOTE_HOST}" bash -s << 'REMOTE'
set -euo pipefail
export DEBIAN_FRONTEND=noninteractive
# Node 20
if ! command -v node >/dev/null 2>&1 || ! node -v | grep -q v20; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash - >/dev/null 2>&1
  apt-get install -y -qq nodejs
fi
# nginx
if ! command -v nginx >/dev/null 2>&1; then
  apt-get update -qq && apt-get install -y -qq nginx
fi
# pm2
if ! command -v pm2 >/dev/null 2>&1; then
  npm install -g pm2 >/dev/null 2>&1
fi
mkdir -p /opt/sealofaudit
node -v; nginx -v 2>&1; pm2 -v
REMOTE

echo "→ Syncing standalone build"
cd "$PROJECT_DIR"
npm run build >/dev/null 2>&1
rsync -avz --delete -e "ssh -o StrictHostKeyChecking=accept-new" \
  .next/standalone/ "${REMOTE_USER}@${REMOTE_HOST}:${APP_DIR}/" \
  --exclude node_modules
rsync -avz -e "ssh -o StrictHostKeyChecking=accept-new" \
  .next/static/ "${REMOTE_USER}@${REMOTE_HOST}:${APP_DIR}/.next/static/"
rsync -avz -e "ssh -o StrictHostKeyChecking=accept-new" \
  public/ "${REMOTE_USER}@${REMOTE_HOST}:${APP_DIR}/public/" 2>/dev/null || true

echo "→ Installing prod deps + starting PM2"
ssh_cmd "${REMOTE_USER}@${REMOTE_HOST}" bash -s << 'REMOTE'
set -euo pipefail
cd /opt/sealofaudit
export NODE_ENV=production
if [ ! -d node_modules ]; then
  npm install --omit=dev --no-audit --no-fund >/dev/null 2>&1 || true
fi
pm2 delete sealofaudit 2>/dev/null || true
PORT=3000 pm2 start server.js --name sealofaudit
pm2 save
pm2 startup systemd 2>/dev/null | tail -1 || true
REMOTE

echo "→ Configuring nginx reverse proxy"
ssh_cmd "${REMOTE_USER}@${REMOTE_HOST}" bash -s << 'REMOTE'
set -euo pipefail
cat > /etc/nginx/sites-available/sealofaudit << 'NGINX'
server {
    listen 80;
    listen [::]:80;
    server_name sealofaudit.com www.sealofaudit.com;

    client_max_body_size 10m;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    gzip on;
    gzip_types text/css application/javascript application/json image/svg+xml text/plain;
}
NGINX
ln -sf /etc/nginx/sites-available/sealofaudit /etc/nginx/sites-enabled/sealofaudit
rm -f /etc/nginx/sites-enabled/default
nginx -t && (systemctl reload nginx 2>/dev/null || service nginx reload)
echo "→ nginx configured"
REMOTE

echo ""
echo "✅ DEPLOYED — http://sealofaudit.com (once DNS points to ${REMOTE_HOST})"
echo "   Next.js + PM2 on port 3000, nginx reverse proxy"
echo "   HTTPS: certbot --nginx -d sealofaudit.com -d www.sealofaudit.com"
