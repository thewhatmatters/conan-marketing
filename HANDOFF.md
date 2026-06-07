# Handoff — conan.sh marketing site

_Updated 2026-06-07 · real Mac download wired across nav/hero/CTA · launch-plan
Download item checked off · about to commit the whole session_

## Goal
Wire the **real Mac download link** the user handed over, restoring the
"Download for Mac" CTA and the "Get notified" nav link (both had been routed to
the waitlist as an interim while no `.dmg` existed). Then checkpoint + commit
all the still-uncommitted work from this + the prior session.

The download URL (version-agnostic, always newest release asset):
`https://github.com/thewhatmatters/conan/releases/latest/download/Conan_aarch64.dmg`

## Current state — DONE, BUILDS GREEN (`npm run build`), UNCOMMITTED

### This session — download wiring (the new work)
- **`Header.astro`**: primary button restored to **"Download for Mac"** →
  `downloadHref` (the release `.dmg`). Re-added **"Get notified"** as a nav link
  (`/#waitlist`) → nav is now **Features · FAQ · Get notified**. Renamed the var
  `notifyHref` → `downloadHref`.
- **`Hero.astro`**: primary button back to **"↓ Download for Mac"** → release.
  Added a quiet secondary link beneath it: **"Windows or Linux? Get notified →"**
  → `#waitlist`. Kept the `macOS 13+ · Apple silicon · $29 once` caption.
  Var → `downloadHref`.
- **`CTA.astro`**: re-added a **"↓ Download for Mac"** button above the waitlist
  form (the `#waitlist` form stays beneath it for Win/Linux + news). Context line
  now leads "Free to download · Premium $29, once · lifetime 1.x · macOS 13+".
  Added `downloadHref` const.
- All three resolve to the same release URL — verified in built HTML
  (`grep Conan_aarch64.dmg dist/client/index.html` → 3 hits, all the full URL).
- **`docs/launch-plan.md`**: checked off the **Download URL** launch-blocker (was
  a P0 hard gate in the playbook) with the URL + date.

> NOTE: this intentionally **reverses** the `[[cta-waitlist-interim]]` memory
> ("don't re-add Download until the real .dmg exists"). That condition is now
> met. Consider updating/retiring that memory next session if it causes confusion.

### Prior session (still uncommitted — committing together now)
- **Branding → nav coin + favicon set** from `public/branding/conan.svg`:
  generated `favicon.ico` (16/32/48), `favicon-16/32/96.png`,
  `apple-touch-icon.png` (180²), `icon-192/512.png`, `logo.png` (circular coin).
  `Layout.astro` `<head>` links updated; `public/favicon.svg` deleted.
  `Header.astro` logo = `<img src="/logo.png">` `h-8 w-8`, vertically centered.
- **OG image**: `public/og-image.png` (1200×630) wired as the `image` default in
  `Layout.astro` (was the interim hero poster). **Still needs unfurl validation**
  post-deploy (FB/LinkedIn/X debuggers — scrapers cache hard).
- **$39 → $29 mop-up**: `src/data/faqs.ts` (incl. FAQPage JSON-LD),
  `src/pages/terms.astro`, `src/layouts/Layout.astro` meta, `global.css` comment.
  `grep '\$39' src/` is clean.

## ⚠️ Next — remaining launch blockers (see docs/launch-plan.md)
With the download wired, the funnel's last P0 gaps are:
1. **Resend** (P0) — signups persist to KV but forward-to-`hello@conan.sh`
   no-ops until: create Resend acct + API key, **verify `conan.sh` domain**
   (SPF/DKIM DNS), add `RESEND_API_KEY` to Vercel env (all envs), redeploy,
   live-test. This is the only thing still breaking the funnel.
2. **Polar checkout** (P1) — set Polar product to **$29**, wire the checkout URL
   when it exists. Still **no Buy/Premium button** on the page until then ($29 is
   caption text only). Cross-repo price sync in `../conan` (user doing elsewhere).
3. **Apply SWOT takeaways** — fix the Premium gate to unlock the **insight layer
   / cost-spike detection**, NOT radio; lead copy on always-on + breadth + brand,
   not the (commoditized) "see your agent" claim. See
   `docs/research-conan-swot-competitive-pricing.md`.
4. **IP review** before launch; fuller footer columns.

Execution playbook for PH + distribution is fully drafted in
`docs/launch-playbook.md` (needs a date + demo GIF + scheduling).

## Verify / commands
- `npm run build` → green (static + Vercel adapter). `npm run dev` → :4321/4322.
- Browser checks via **automate-browser** (sample pixels, don't trust paused video).
- Built-HTML href check: `grep -o 'href="[^"]*Conan_aarch64.dmg"' dist/client/index.html`.

## Git state
Branch **`main`** (trunk; auto-deploys to www.conan.sh via Vercel). **DIRTY —
committing this session now** (user asked: "commit this session's work"; commit
only, **do not push** unless asked).
- **Modified:** `src/components/{Header,Hero,CTA}.astro`, `src/layouts/Layout.astro`,
  `src/data/faqs.ts`, `src/pages/terms.astro`, `src/styles/global.css`,
  `docs/launch-plan.md`, `HANDOFF.md`, `.claude/current-task.txt`
- **Deleted:** `public/favicon.svg`
- **Untracked:** `public/branding/`, `public/og-image.png`, `public/logo.png`,
  `public/{favicon.ico,favicon-16,favicon-32,favicon-96,apple-touch-icon,icon-192,icon-512}.png`

## Don't redo
- No VP9/webm video — H.264 mp4 only [[hero-video-mp4-only-vp9-black]].
- Don't `vercel env pull` to copy conan-license secrets (Sensitive/empty);
  connect the store in the dashboard [[waitlist-kv-wiring]].
- Download CTA is now LIVE (real `.dmg`) — the waitlist-interim routing was
  intentionally undone this session [[cta-waitlist-interim]] (memory now stale).
- Don't commit `.env` (gitignored; holds real KV creds).
