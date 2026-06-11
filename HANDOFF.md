# Handoff — conan.sh marketing site

_Updated 2026-06-07 (latest) · **Resend P0 DONE — waitlist forwards live** ·
**`conan_download` GA4 click tracking shipped** · all committed + pushed, tree
clean. Remaining launch items: Polar checkout (P1), OG unfurl validation, IP
review, fuller footer._

## Where things stand
The funnel is fully closed. This session knocked out the **last hard launch
blocker (Resend email forwarding)** and added **per-button Download-for-Mac
analytics**. Both are verified live on prod. Nothing uncommitted.

## This session's work (all in `conan-marketing`, all on `main`, all pushed)

### 1. Resend email forwarding — P0 DONE ✅ (was the only funnel gap)
The forwarding code already existed in `src/pages/api/waitlist.ts`
(`forwardSignup()`); it just needed account + key + verified domain. All done:
- **Resend account created**; domain **`conan.sh` verified** (Vercel DNS, SPF/DKIM
  landed in ~2 min — provider shows as Vercel, region us-east-1).
- **`RESEND_API_KEY`** added to Vercel **Production + Development**.
  ⚠️ **Preview NOT set** — the CLI refused to apply "all branches"
  non-interactively (`git_branch_required`). Non-blocking; add via dashboard if you
  want PR-preview deploys to forward too.
- Defaults kept: `WAITLIST_FROM` = `noreply@conan.sh`, `WAITLIST_NOTIFY_TO` =
  `hello@conan.sh` (both env-overridable; not set, so defaults apply).
- **Redeployed** prod (`vercel redeploy`), aliased to www.conan.sh.
- **Live-tested**: POST to `/api/waitlist` → `200`, email **landed in
  hello@conan.sh** (user confirmed), reply-to = subscriber. ✅
- **Test address purged**: `resend-test-20260607@conan.sh` removed from the
  `waitlist:emails` KV set via `SREM` (verified `SISMEMBER`=0, `SCARD`=0 — set is
  empty, no real signups yet). Temp creds file `/tmp/conan-kv.env` deleted.
- **The Resend key is SEND-ONLY** — can't read logs via API (returns 401
  `restricted_api_key`). Verify future sends in the Resend **dashboard → Emails**
  log, not via curl.
- `hello@conan.sh` confirmed a working inbox (test email arrived there).
- Doc updated: `docs/launch-plan.md` §0 marked done with all sub-steps.

### 2. `conan_download` GA4 event — Download-for-Mac click tracking ✅
GA4 (`G-0S3T6SKY2J`) already auto-captured these as generic outbound clicks; we
added a clean, named, per-button event instead.
- **Delegated listener in `src/layouts/Layout.astro`** (next to the gtag config):
  any `a[data-dl]` click fires `gtag('event','conan_download', {location, link_url,
  transport_type:'beacon'})`. `beacon` flushes the hit as the click navigates to the
  `.dmg`. One listener covers all buttons incl. island-rendered ones.
- **`data-dl` attribute** added to the three download `<a>`s:
  `Header.astro`="header", `Hero.astro`="hero", `CTA.astro`="cta". (All point to
  the same GitHub Release `.dmg`.)
- **Verified live**: curl of www.conan.sh shows the listener + all 3 `data-dl`
  buttons; **user confirmed `conan_download` fired in GA4 Realtime.** ✅
- GA4-side: user **created a custom dimension** (Event scope, parameter
  `location`) so header/hero/cta is a usable breakdown. Could still mark
  `conan_download` as a **Key event** if you want it as a conversion (not done).

## ⚠️ Launch blockers (docs/launch-plan.md) — updated status
1. ~~**Resend**~~ ✅ DONE this session (was P0, the only funnel gap).
2. **OG unfurl validation** via social debuggers (needs user's logged-in accounts).
3. **Polar checkout** (P1) — set product to $29, wire URL. No Buy button until then.
4. **Apply SWOT/scan-trends takeaways** — Premium = insight/cost-spike layer; lead
   on cockpit/always-on + breadth + brand + a defensibility-vs-Anthropic answer.
5. **IP review**; fuller footer columns.
6. **Legal pages = DONE** (prior session) — but still action the 3 product/ops
   risks (license-JWT email leak, manual deletion path, GA4 consent banner).

## Carry-over risks still open (not this session's scope)
- **GA4 runs with NO consent banner** — real EU/UK ePrivacy gap. Adding
  `conan_download` didn't worsen it, but the gate is still missing if you serve EU/UK.
- 3 legal/ops risks from the prior session: license JWT leaks buyer email base64;
  no automated deletion path (Privacy §7 promises erasure → honor manually); GA4
  consent.

## Verify / commands
- `npm run build` → green. Browser checks via **automate-browser**
  (`wait_until="load"`, NOT `networkidle` — GA/video keep network busy).
- Resend forward test: `curl -s -X POST https://www.conan.sh/api/waitlist -H
  'content-type: application/json' -d '{"email":"you@example.com"}'` → expect
  `{"ok":true}`; new addresses forward to hello@conan.sh (dupes don't re-email).
  **Remember to SREM the test address from `waitlist:emails`** afterward.
- KV admin: `vercel env pull <file> --environment=production` gives real
  KV_REST_API_URL/TOKEN (these ARE readable, unlike the Sensitive conan-license
  secrets). Upstash REST: POST the URL with `["SREM","waitlist:emails","<addr>"]`.
- GA4 live check: **Realtime overview** (top of Reports nav) → "Event count by
  event name" card. The plain **Events** report is 24–48h delayed.

## Git state
Branch **`main`** (auto-deploys to www.conan.sh). **Working tree CLEAN, all
pushed.** This session's two commits:
- `a27780b` Analytics: track Download for Mac clicks (conan_download GA4 event)
- `adda7cc` Launch: mark Resend email-forwarding P0 done (waitlist live end-to-end)

## Don't redo
- No VP9/webm video — H.264 mp4 only [[hero-video-mp4-only-vp9-black]].
- Don't `vercel env pull` the conan-license *secrets* (Sensitive/empty); the KV
  REST creds for THIS project, however, pull fine [[waitlist-kv-wiring]].
- Download CTA is LIVE (real `.dmg`) [[cta-waitlist-interim]].
- Don't commit `.env` (gitignored; real KV creds).
- Resend key is send-only by design — verify sends in the dashboard, not curl.
- Resend Preview env intentionally left unset (CLI quirk) — non-blocking.
- Legal pages intentionally NOT lawyer-reviewed; don't re-add DRAFT boxes.
- Nav "Get notified" intentionally uses `spy: "#closing"` — don't drop it.
