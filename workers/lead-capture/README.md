# lead-capture Worker — a verifiable capture layer

## Why this exists

The whole site — 35 pages — funnels into one third-party relay (formsubmit.co) whose
activation **cannot be verified from outside**. Formsubmit rejects any request that does not
look like a real page submit, so there is no way to test whether the destination address was
ever confirmed. If it never was, every submission is discarded and nothing anywhere records
that it happened.

This Worker is a redundant capture layer. Every lead is written to Cloudflare KV **and** then
forwarded to formsubmit, so:

  * the email notification keeps working exactly as before, and
  * a lead survives even if the relay is dead,
  * and the capture becomes readable, so it can actually be verified.

KV is written **before** the forward is attempted. That ordering is the entire point — a
relay failure must not be able to lose a lead. Do not reorder it.

## Current state (2026-09-18)

  Worker      sealofaudit-lead-capture      DEPLOYED and live
  Route       sealofaudit.com/api/*          active (verified: Cloudflare serves it)
  KV          LEADS (namespace c4a271e9b204…) created
  Secret      LEADS_KEY → /Users/ambusiness/.sealofaudit-leads-key (mode 0600)
  Forms       STILL POINT AT formsubmit — nothing on the live site changed yet

Proven: `GET /api/leads?key=wrong` → 401 and `GET /api/lead` → 405, both the Worker's own
responses, with `cf-ray` confirming Cloudflare rather than GitHub Pages.

NOT proven: the KV write→read cycle. No lead has been captured through it yet.

Note it took a minute or two for the route to propagate — if `/api/*` returns a GitHub Pages
404 immediately after deploying, wait and retry rather than assuming a failure.

## Redeploy / inspect

    cd /Users/ambusiness/sealofaudit/workers/lead-capture
    python3 deploy_leads_worker.py --status     # what exists (deploys nothing)
    python3 deploy_leads_worker.py              # idempotent deploy

## Verify it yourself, then switch the forms

1. Capture a lead through the Worker and read it back:

       curl -s "https://sealofaudit.com/api/leads?key=$(cat ~/.sealofaudit-leads-key)"

2. Submit the live contact form once by hand. Then re-run the command above — your own
   submission should appear. **That is the test that proves email capture works end to end**,
   and it is the one thing that cannot be done from a script without creating a fake lead.

3. Once a real submission appears in the feed, point the forms at the Worker. In
   `app/contact/page.js` and `components/InstantCheck.js`, change:

       action="https://formsubmit.co/sales@sealofaudit.com"
   to
       action="/api/lead"

   Then rebuild and deploy as usual (see the main skill for the deploy sequence). Keep the
   hidden fields — `_next` is no longer used by the Worker (it redirects itself), but the
   rest are forwarded verbatim, so removing them changes the email format for no reason.

4. Verify after switching: submit the live form again and confirm the lead appears in the
   feed. If it does, the funnel no longer depends on an unverifiable relay.

## Reading leads

    # JSON, newest first, last 200
    curl -s "https://sealofaudit.com/api/leads?key=$(cat ~/.sealofaudit-leads-key)"

    # CSV, opens in a spreadsheet
    curl -s "https://sealofaudit.com/api/leads.csv?key=$(cat ~/.sealofaudit-leads-key)"

The key is required for every read. Losing `/Users/ambusiness/.sealofaudit-leads-key` means
the leads are unreadable (the KV data still exists; only the read path is lost), so back it
up somewhere safe. It is deliberately NOT committed and NOT printed.

## Behaviour worth knowing

  * A submission without a valid email returns **400**, not a success page. A lead you cannot
    reply to is not a lead — that exact defect shipped on the homepage and every lead from it
    was unanswerable.
  * The visitor always lands on /thank-you; the redirect carries `?captured=1` or `?captured=0`
    so a capture failure is visible in the URL rather than silent.
  * Body size is capped at 64 KB.
  * Readings are authenticated; an unauthenticated request gets 401.

## If you do not want it

Nothing on the live site uses it yet, so removing it changes nothing:

    curl -X DELETE "https://api.cloudflare.com/client/v4/zones/<zone_id>/workers/routes/<route_id>" \
         -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
    curl -X DELETE "https://api.cloudflare.com/client/v4/accounts/<account_id>/workers/scripts/sealofaudit-lead-capture" \
         -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
    # plus the LEADS KV namespace, via the dashboard or
    # DELETE /accounts/<account_id>/storage/kv/namespaces/c4a271e9b204…

Free plan includes Workers (100k requests/day), so this costs nothing while idle.
