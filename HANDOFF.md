# Handoff — conan.sh marketing site

_Updated 2026-06-07 · hero video swap + waitlist→email + launch GTM docs + price drop to $29_

## Goal
Finish launch-readiness housekeeping on the conan.sh marketing site: swap the
hero video, make the "Get notified" form actually work (store + notify), and
stand up the go-to-market plan (competitive/pricing research + Product Hunt &
distribution playbooks). Pricing was revisited and dropped to **$29**.

## Current state — all DONE, verified, BUILDS GREEN, committed + pushed to `main`

### 1. Hero video swapped (`src/components/Hero.astro`)
- Replaced the framed app-capture loop with the user's new clip → compressed
  (H.264, audio stripped, faststart, CRF 24) from 30 MB → **8.4 MB**, 60s,
  1920×1080. Generated a fresh poster. Files: `public/video/conan-hero.mp4` +
  `conan-hero.jpg` (old `conan-hero-new.mp4` source deleted). No markup change —
  Hero already points at those paths. Verified playing in-browser (automate-browser).
- **Keep H.264 mp4 only** — VP9/webm black-frame bug on Mac GPUs [[hero-video-mp4-only-vp9-black]].

### 2. Waitlist / "Get notified" form — now LIVE & persisting
- **Was silently dropping every prod signup** (no env vars set). Fixed by
  connecting the **shared conan-license Vercel KV/Upstash store** to the
  `conan-marketing` project across all envs (user did the dashboard connect).
  Emails persist to the Redis set `waitlist:emails` (SADD dedupes). Verified
  end-to-end on **prod** (POST → confirmed in store → test entry cleaned up).
  See memory [[waitlist-kv-wiring]] — **conan-license secrets are Sensitive /
  unreadable via CLI; connect the store in the dashboard, don't copy creds.**
- Local dev: `vercel env pull .env --environment=development` (gitignored `.env`).
- **Reframed** the form from "Windows/Linux waitlist" → **general Conan news &
  updates** ("Dispatches from the forge" lead, "Send word →" button, "By steel —
  you'll hear from us." success, + "Occasional Conan news. Unsubscribe anytime.").
  Updated `CTA.astro`, `WaitlistForm.tsx`, and `privacy.astro` (named Resend as
  the email processor, fixed retention clause).
- **Forwarding to `hello@conan.sh`** is coded in `src/pages/api/waitlist.ts`
  (Resend, fires on NEW signups only, best-effort, graceful until key set).
  ⬜ **OPEN (user):** create Resend account + API key, **verify conan.sh domain**,
  add `RESEND_API_KEY` to Vercel, redeploy, send a live test. Env vars documented
  in `.env.example` (`RESEND_API_KEY`, `WAITLIST_NOTIFY_TO`, `WAITLIST_FROM`).

### 3. Launch GTM docs (new)
- **`docs/launch-plan.md`** — launch readiness checklist (Resend, icon, favicon,
  OG image, SWOT, PH, distribution + the known Download/Buy/IP stubs). Linked
  from CLAUDE.md "Start here".
- **`docs/research-conan-swot-competitive-pricing.md`** (+ `.html`) — deep-research
  (28 cited sources). **Key finding: the competitive threat is "free," not
  "expensive"** — the wedge is commoditized by free OSS (Claude HUD ~18k installs,
  ccusage 10k+★, opcode — which even ships a FREE cost-analytics dashboard) +
  Anthropic's own desktop context indicator. Differentiate on **always-on native
  experience + unified breadth + brand**, not the "see your agent" claim.
- **`docs/launch-playbook.md`** — copy-ready PH plan (§2: page copy, gallery shot
  list, maker comment, 12:01am-PT/Tue–Thu timing, hour-by-hour runbook) +
  distribution (§3: Show HN, Reddit subs+drafts, X thread, owned email, T/T+
  calendar, PH-underperforms fallback). Voice calibrated per channel.

### 4. Price drop $39 → $29 (this session's last change)
- Owner's call after the research: **$29 one-time** to cut "why pay vs free?"
  friction (under $30, still indie-band). Swept across site + structured data
  (`Hero`, `CTA`, `terms.astro`, `index.astro` JSON-LD `price:"29"`, `llms.txt`)
  and docs (`CLAUDE.md`, `DESIGN.md`, `landing-page-story.md`, launch docs).
  Research doc keeps its original "$39 defensible" analysis + a decision banner.
  Verified $29 in the built `dist/`.

## ⚠️ Open / next (mostly user actions)
1. **PRICE SYNC (cross-repo):** set the **Polar** product to **$29** and update
   the **product repo `../conan`** (CLAUDE.md + app UI) so site/checkout/app
   agree. *User said they'll update the app in another session.* (Low live-risk
   now: Buy button is still a `#` stub — nothing charges yet.)
2. **Resend** — key + domain verify + Vercel env (see §2 above).
3. **Launch P0s (launch-plan):** Conan **icon** (master → favicon + OG + app),
   **favicon** wiring, **OG image** (`/og-image.png` → swap default in
   `Layout.astro`), real **Download** URL (GitHub Release `.dmg`) + **Buy**/Polar
   URL (Header/Hero/CTA are `#`/`#download` stubs), IP review.
4. **Optional next:** define the **Free vs Premium gate** that survives the
   "opcode does cost-analytics free" test (Premium = insight layer: history,
   trends, cost-spike detection — NOT radio).

## Verify / commands
- `npm run dev` → http://localhost:4321/ · `npm run build` (green).
- Browser checks via automate-browser (sample pixels; don't trust paused video).
- KV read/write check: `node --env-file=.env -e '...createClient(...).scard("waitlist:emails")'`.
- Vercel: `vercel env ls` (linked to conan-marketing); store connected all envs.

## Git state
Branch `main` (trunk; auto-deploys to www.conan.sh via Vercel). **Clean** apart
from this handoff commit. Recent: `71ba84c` price→$29, `8a2f343` playbook,
`2fe0bf8`/`cf74aee` research, `b42e743` launch-plan, `23df1c4` waitlist reframe,
`d43b50f` hero video.

## Don't redo
- No VP9/webm video — H.264 mp4 only [[hero-video-mp4-only-vp9-black]].
- Don't `vercel env pull` to copy conan-license secrets — they're Sensitive
  (empty on pull). Connect the store in the dashboard [[waitlist-kv-wiring]].
- Don't commit `.env` (gitignored; holds real KV creds).
- Don't rewrite the research doc's "$39" analysis — it's the dated reasoning
  record; the $29 decision lives in its banner + the live site.
