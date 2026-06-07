# Handoff — conan.sh marketing site

_Updated 2026-06-07 (latest) · legal pages FINALIZED (no lawyer) · nav active-state
bug fixed · scan-trends skill refined · still pending: Resend (P0), Polar, OG
validation. About to commit + push this session's work to `main`._

## Where things stand
The site is launch-ready on the funnel basics and **the Terms/Privacy pages are now
finalized** (DRAFT boxes gone). This session did four things: (1) a scan-trends
research sweep of the Claude Code observability community, (2) a refine-skill pass
that fixed a real bug in the scan-trends skill, (3) finalized the legal pages, and
(4) fixed a nav scroll-spy regression. Remaining launch blockers are unchanged at
the top: **Resend** (waitlist email forwarding) is still the only hard funnel gap.

## This session's work (all in `conan-marketing` unless noted)

### 1. Legal pages — FINALIZED (P0 item done; owner opted OUT of a lawyer)
`/terms` + `/privacy` had ~20 deliberately-visible **DRAFT callouts** (`.todo` spans
→ ember "DRAFT ·" boxes) + `updated="[DRAFT …]"`. **All removed; dates = "June 7,
2026"; build green.** These are **best-effort, conservative boilerplate, NOT
counsel-reviewed** — the owner explicitly declined a lawyer ("generic is fine").
Decisions baked in:
- Entity **WhatMatters LLC** (`legalName` also added to schema.org Org in `Layout.astro`).
- Contact unified to **hello@conan.sh** (was inconsistently `hello@whatmatters.so`
  in FAQ + legal; infra already used conan.sh).
- **18+**, single-user **personal + commercial** license, no per-device limit.
- **Non-refundable** (free tier is the trial) + EU/UK **statutory-rights carve-out**.
- **Texas** governing law + venue. Liability capped at amounts-paid-in-12-mo / $29.
- System reqs: **Apple-silicon (M-series), macOS 11 Big Sur+, no Intel**, Claude Code required.
- **GA4 disclosed** (Privacy §8 + processors §5).
- **App outbound traffic audited** vs `../conan` (Rust shell + Node gateway +
  webview) and disclosed honestly in §3: GitHub update check; no-data license-
  **revocation** download (verify is fully OFFLINE via bundled Ed25519 key — NOT a
  phone-home); **Claude Radio streams from YouTube** when started (Google gets IP +
  cookies). Gateway binds **127.0.0.1:3747 loopback-only**, token-auth'd. No
  telemetry/analytics SDKs anywhere. FAQ privacy claims ("code/prompts never leave
  your Mac", "no telemetry") verified accurate.

⚠️ **THREE real risks the policy TEXT does not cure — fix in `../conan` / ops:**
1. **License JWT embeds the buyer email base64-readable** — a customer who shares
   their license publicly leaks their email. The `sub` alone would suffice as the
   support handle. → product fix.
2. **No automated deletion path** — Privacy §7 now promises erasure on request, so
   until automation exists you MUST honor it **manually**: purge the `license:<sub>`
   KV record + scrub the plaintext email from Vercel function logs. → ops commitment.
3. **GA4 loads with NO consent banner** — real EU/UK ePrivacy exposure a policy
   doesn't fix; needs a consent gate (code) if you serve EU/UK.

The `.todo` / "DRAFT ·" CSS in `LegalLayout.astro` is now **dormant** (kept for
future edits). Re-derive any inventory: `grep -c 'class="todo"' src/pages/{terms,privacy}.astro` (now 0/0).

### 2. Nav active-state bug — FIXED
"Get notified" stopped highlighting at the footer. Root cause (git blame): commit
`e5f78ac` added `spy: "#closing"` to that nav link; the download-CTA swap `98adee2`
**accidentally deleted it**, so it fell back to `#waitlist` and never lit at the
footer. Restored `spy: "#closing"` + its comment in `Header.astro`. Build green.
NOT yet browser-verified (high-confidence verbatim restore) — offered, user can
check live after deploy.

### 3. scan-trends research sweep (launch intel)
30-day Claude Code observability sweep. Outputs in repo:
`docs/scan-trends-claude-code-observability.html`. **Key takeaways for the launch
kit:** lead on **cost/token-spend insight + native always-on Mac cockpit**, NOT the
now-commoditized "see what your agent is doing" (Anthropic shipped agent view, 137K
views). HN/Show HN is the #1 channel and *demands a defensibility-vs-Anthropic
answer*. Competitors surfaced via the Reddit fallback: Usage4Claude (macOS menu-bar
tracker), Grafana-for-CC dashboards, costhawk leaderboard.

### 4. refine-skill on scan-trends — fix lives in `~/.claude/skills/scan-trends/` (NOT this repo)
Found + fixed a real bug: Reddit had no web fallback, and `web.py` excluded
reddit.com from every query type, so a Reddit 403 (which happened this run) was
unrecoverable. Added a `REDDITFALLBACK` query type (mirrors `XFALLBACK`) across
Tavily/Exa/DDG + wired the 403→fallback in SKILL.md. Validated (GENERAL=0 reddit
hits, REDDITFALLBACK=5). **These edits are UNCOMMITTED in `~/.claude/skills/` — a
different location; `git -C conan-marketing` won't see them.** Findings report:
`docs/scan-trends-refine-2026-06-07.md` (in this repo). Regression fixture:
`~/.claude/skills/scan-trends/tests/fixtures/reddit-403-fallback.md`.

## ⚠️ Launch blockers (docs/launch-plan.md)
1. **Resend** (P0, user-owned, ONLY funnel gap) — create acct + key, verify
   `conan.sh` (SPF/DKIM), add `RESEND_API_KEY` to Vercel (all envs), redeploy,
   live-test → signups forward to hello@conan.sh.
2. **OG unfurl validation** via social debuggers (needs user's logged-in accounts).
3. **Polar checkout** (P1) — set product to $29, wire URL. No Buy button until then.
4. **Apply SWOT/scan-trends takeaways** — Premium = insight/cost-spike layer; lead
   on cockpit/always-on + breadth + brand + a defensibility answer, not "see your agent".
5. **IP review**; fuller footer columns.
6. **Legal pages = DONE** (this session) — but action the 3 product/ops risks above.

## Already shipped & verified on PROD (earlier sessions)
Real Mac `.dmg` download (Header/Hero/CTA → GitHub Release, version-agnostic) ·
GA4 `G-0S3T6SKY2J` in `Layout.astro` · OG card markup (debuggers still TODO) ·
rounded favicon · **waitlist persists for real** (Vercel KV/Upstash from
conan-license, all envs). PH listing copy (name/tagline "A native Mac cockpit for
Claude Code"/first-comment/investor answers) drafted, not in repo.

## Verify / commands
- `npm run build` → green. Browser checks via **automate-browser** (`wait_until="load"`,
  NOT `networkidle` — GA/video keep network busy).
- Legal todo sweep: `grep -c 'class="todo"' src/pages/{terms,privacy}.astro` → 0/0.

## Git state
Branch **`main`** (auto-deploys to www.conan.sh). **Committing + pushing this session
now** (legal pages + nav fix + Layout/FAQ + HANDOFF + scan-trends docs). Pre-commit
working tree (`git status --short`):
- M `src/pages/terms.astro`, `src/pages/privacy.astro` (finalized)
- M `src/components/Header.astro` (nav spy fix), `src/components/FAQ.astro`,
  `src/layouts/Layout.astro` (email + legalName)
- M `HANDOFF.md`, `.claude/current-task.txt`
- ?? `docs/scan-trends-claude-code-observability.html`, `docs/scan-trends-refine-2026-06-07.md`
- **Separate location, NOT in this commit:** `~/.claude/skills/scan-trends/` (web.py,
  SKILL.md, fixture) — commit there separately if you keep skills under git.

## Don't redo
- No VP9/webm video — H.264 mp4 only [[hero-video-mp4-only-vp9-black]].
- Don't `vercel env pull` conan-license secrets (Sensitive/empty); connect the
  store in the dashboard [[waitlist-kv-wiring]].
- Download CTA is LIVE (real `.dmg`) [[cta-waitlist-interim]].
- Don't commit `.env` (gitignored; real KV creds).
- Favicon tab icon intentionally rounded; apple-touch + maskable intentionally square.
- Legal pages are intentionally NOT lawyer-reviewed (owner's call) — don't re-add
  DRAFT boxes; the dormant `.todo` CSS is fine to leave.
- Nav "Get notified" intentionally uses `spy: "#closing"` (lights at footer) — don't drop it again.
