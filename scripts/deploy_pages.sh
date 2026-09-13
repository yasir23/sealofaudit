#!/bin/bash
# deploy_pages.sh — the ONLY safe rebuild+deploy path for sealofaudit.com.
#
# Why this exists: the site has twice gone live as bare, unstyled HTML because
# two files in docs/ are load-bearing and are easy to lose:
#
#   docs/.nojekyll  — GitHub Pages runs Jekyll on branch deploys, and Jekyll
#                     IGNORES any directory starting with "_". Delete this and
#                     docs/_next/ never publishes: every CSS/JS chunk 404s and
#                     the browser gets only the HTML shell. The symptom is
#                     "the site is just HTML" — no styles, no hero, no JS.
#   docs/CNAME      — sealofaudit.com. rsync --delete WIPES it and GitHub Pages
#                     then serves "Site not found" on the custom domain.
#
# This script asserts both exist after the sync and refuses to push without them.
#
# Usage:
#   bash scripts/deploy_pages.sh              # full build + deploy + live verify
#   bash scripts/deploy_pages.sh --verify-only # skip build/push, verify live only
set -euo pipefail
cd /Users/ambusiness/sealofaudit

VERIFY_ONLY=0
[ "${1:-}" = "--verify-only" ] && VERIFY_ONLY=1

if [ "$VERIFY_ONLY" -eq 0 ]; then
  echo "→ build"
  npm run build >/dev/null

  echo "→ sync out/ -> docs/ (in-place copy; never rsync --delete)"
  cp -R out/. docs/

  echo "→ ensure deploy-critical files"
  [ -f docs/CNAME ] || printf 'sealofaudit.com\n' > docs/CNAME
  [ -f docs/.nojekyll ] || : > docs/.nojekyll

  echo "→ assert deploy-critical files"
  fail=0
  [ -s docs/CNAME ] || { echo "  FAIL docs/CNAME empty or missing"; fail=1; }
  [ "$(cat docs/CNAME | tr -d '[:space:]')" = "sealofaudit.com" ] || { echo "  FAIL docs/CNAME is not sealofaudit.com"; fail=1; }
  [ -f docs/.nojekyll ] || { echo "  FAIL docs/.nojekyll missing (Jekyll will strip _next/)"; fail=1; }
  [ -d docs/_next/static/css ] || { echo "  FAIL docs/_next/static/css missing — CSS will 404"; fail=1; }
  css=$(grep -o '/_next/static/css/[^"]*\.css' docs/index.html | head -1 || true)
  [ -n "$css" ] || { echo "  FAIL docs/index.html references no stylesheet"; fail=1; }
  if [ -n "$css" ] && [ ! -f "docs$css" ]; then
    echo "  FAIL docs$css referenced by index.html but not present (docs out of sync)"; fail=1
  fi
  [ "$fail" -eq 0 ] || { echo "REFUSING TO PUSH — fix the above first"; exit 1; }
  echo "  ok: CNAME + .nojekyll + _next + matching CSS"

  echo "→ commit + push"
  git add -A
  git commit -q -m "Deploy: static export $(date +%Y-%m-%d\ %H:%M)" || echo "  (nothing to commit)"
  # plain push times out silently on this network; the low-speed limits land it
  GIT_HTTP_LOW_SPEED_LIMIT=1000 GIT_HTTP_LOW_SPEED_TIME=30 git push origin main
fi

echo "→ verify live (polling up to 5 min for the Pages build)"
git ls-remote origin main | cut -c1-7 | sed 's/^/  origin: /'
git log --oneline -1 | cut -c1-7 | sed 's/^/  local:  /'

# NOTE: every pipe below ends in `|| true`. Under `set -o pipefail`, a grep that
# legitimately matches nothing exits 1 and kills the script BEFORE it reports
# anything — which is exactly how this verification silently lied on its first
# real run: it printed the commits and then died without checking the CSS.
UA='Mozilla/5.0'
css_live=''
ok=0
for i in $(seq 1 10); do
  html=$(curl -s -A "$UA" https://sealofaudit.com/ || true)
  css_live=$(printf '%s' "$html" | grep -o '/_next/static/css/[^"]*\.css' | head -1 || true)
  if [ -z "$css_live" ]; then
    echo "  [$i/10] no stylesheet link in served HTML yet (Pages build may still be running)"
    sleep 30; continue
  fi
  code=$(curl -s -o /dev/null -w '%{http_code}' -A "$UA" "https://sealofaudit.com$css_live" || true)
  first=$(curl -s -A "$UA" "https://sealofaudit.com$css_live" | head -c 1 || true)
  if [ "$code" = "200" ] && [ "$first" != "<" ]; then
    echo "  stylesheet $css_live -> HTTP 200, serving CSS"; ok=1; break
  fi
  echo "  [$i/10] $css_live -> HTTP ${code:-000} (first byte '${first:-none}'), retrying"
  sleep 30
done

if [ "$ok" -ne 1 ]; then
  echo "  ⚠️  CSS not serving on the domain."
  echo "     Ground truth — is it published at all?"
  echo "       curl -sI https://raw.githubusercontent.com/yasir23/sealofaudit/main/docs${css_live}"
  echo "     origin 200 + domain not 200 = Cloudflare 404-poisoning: purge the CF"
  echo "     cache for /_next/static/*, or wait out the 4h max-age on that URL."
  exit 1
fi
echo "✅ live and styled"
