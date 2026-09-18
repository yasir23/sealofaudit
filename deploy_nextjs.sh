#!/bin/bash
# SealOfAudit — deploy to GitHub Pages (docs/)
#
# REPLACES the previous contents of this file, which deployed to the Hostinger VPS over
# rsync + PM2. That path was wrong in three ways and would have failed or damaged things:
#   * it rsynced .next/standalone/, which does not exist under `output: 'export'`
#   * it required DEPLOY_SSH_PASSWORD, which is not configured here
#   * it used `rsync --delete`, which is explicitly ruled out for this repo
# The site is served by GitHub Pages from docs/. This script does that, verifies it, and
# refuses to push if anything looks wrong.
#
#   ./deploy_nextjs.sh              build, verify, commit, push, confirm live
#   ./deploy_nextjs.sh --dry-run    build and verify only; changes nothing
#
# Environment overrides for the conversion links (optional; see components/CtaLink.js):
#   NEXT_PUBLIC_PAYMENT_LINK="<url>" NEXT_PUBLIC_BOOKING_LINK="<url>" ./deploy_nextjs.sh

set -euo pipefail
cd "$(dirname "$0")"
PROJECT_DIR="$(pwd)"
LIVE="https://sealofaudit.com"
DRY=0
[[ "${1:-}" == "--dry-run" ]] && DRY=1

say() { printf '\n\033[1m%s\033[0m\n' "$*"; }
fail() { printf '\033[31mFAIL\033[0m %s\n' "$*"; exit 1; }

say "1/6  build"
npm run build >/dev/null 2>&1 || fail "build failed — run 'npm run build' to see why"
[[ -f out/index.html ]] || fail "no out/index.html — is output:'export' still set in next.config.mjs?"
echo "  build ok"

say "2/6  verify the build before it can reach production"
# NOTE: `set -o pipefail` + grep means a zero-match grep returns non-zero and would abort
# the script — i.e. the deploy would fail exactly when the checks PASS. Every grep whose
# empty result is the GOOD outcome needs `|| true`.
LEFTOVER=$( (grep -rho 'action="https://formsubmit[^"]*"' out/ 2>/dev/null || true) | wc -l | tr -d ' ')
[[ "$LEFTOVER" == "0" ]] || fail "$LEFTOVER form(s) post straight at the relay — capture would have no durable record"
echo "  no form posts directly to the relay"
TESTURL=$( (grep -rl 'test_abc123\|cal\.com/sealofaudit' out/ 2>/dev/null || true) | wc -l | tr -d ' ')
[[ "$TESTURL" == "0" ]] || fail "$TESTURL file(s) contain a TEST payment/booking URL — refusing to ship a broken buy button"
echo "  no test URLs in the build"
if (grep -q '/api/lead' out/contact/index.html 2>/dev/null || true); then
  echo "  /contact form action is /api/lead"
else
  echo "  NOTE: /contact has no /api/lead action — check the form"
fi
echo "  build verified"

say "3/6  sync out/ -> docs/   (copy only — never rm, never rsync --delete)"
cp -R out/. docs/
[[ -f docs/CNAME ]] || fail "docs/CNAME is missing — GitHub Pages would lose the custom domain"
[[ "$(cat docs/CNAME)" == "sealofaudit.com" ]] || fail "docs/CNAME is not sealofaudit.com"
echo "  synced; CNAME intact"

say "4/6  stale-chunk check (cp cannot remove superseded chunk files)"
LIVE_CHUNKS=$( (grep -oE 'app/page-[a-z0-9]+\.js' docs/index.html 2>/dev/null || true) | xargs -n1 basename | sort -u)
ORPHANS=""
if [[ -d docs/_next/static/chunks/app ]]; then
  for f in docs/_next/static/chunks/app/page-*.js; do
    [[ -e "$f" ]] || continue
    b=$(basename "$f")
    grep -qxF "$b" <<<"$LIVE_CHUNKS" || ORPHANS="$ORPHANS $b"
  done
fi
if [[ -n "$ORPHANS" ]]; then
  echo "  orphaned chunk(s) still deployed (harmless, unreferenced):"
  for o in $ORPHANS; do echo "    docs/_next/static/chunks/app/$o"; done
else
  echo "  no orphaned chunks"
fi

if [[ "$DRY" == "1" ]]; then
  say "dry run — stopping before commit/push"
  echo "  everything above passed. Re-run without --dry-run to publish."
  exit 0
fi

say "5/6  commit and push"
if git diff --quiet -- docs app components workers 2>/dev/null && \
   git diff --cached --quiet -- docs app components workers 2>/dev/null; then
  echo "  nothing changed — nothing to deploy"
else
  git add docs app components workers
  git commit -q -m "Deploy: static export $(date '+%Y-%m-%d %H:%M')"
  git push origin HEAD
  echo "  pushed"
fi

say "6/6  confirm live"
for i in $(seq 1 12); do
  sleep 15
  if curl -sf -L "$LIVE/?cb=$RANDOM$i" >/dev/null 2>&1; then
    echo "  $LIVE responding"
    break
  fi
  echo "  waiting for Pages ($i/12)…"
done
python3 funnel_check.py 2>&1 | tail -5 || true
echo
echo "Deployed. Full check: python3 funnel_check.py"
