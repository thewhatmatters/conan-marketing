# Handoff — conan.sh marketing site

_Updated 2026-06-06 · session refresh checkpoint_

## Goal
Polish the landing page's **Bento** section so each tile mirrors the real Conan
app HUD (warm-translated to the site palette), and bring the tiles to life with
animation — starting with the **Timeline** tile (a live streaming event feed).
Also shipped a hero-video swap earlier this session.

## Current state

**Shipped & pushed earlier this session** (HEAD `65d17bd`):
- Hero app-window frame now plays the **`conan-hero` screencast** (H.264 mp4
  only — VP9 webm was dropped because it hardware-decodes to BLACK on some Mac
  GPUs while reporting "playing"; see [[hero-video-mp4-only-vp9-black]]). 16:9
  panel, all-4-corners rounded, faux chrome removed.

**Done & verified in-browser, NOT yet committed** (working tree dirty):
- **Full Bento redesign** (`src/components/Bento.astro`) — 5 tiles rebuilt from
  the app's real components in `../conan/ui/src`, warm-translated:
  1. **Timeline** (col-span-7) — now a **live streaming React island**
     (`src/components/TimelineFeed.tsx`, `client:visible`): events arrive at top,
     push the rest down, oldest fades off. Badge kinds PROMPT/PRETOOL/POSTTOOL/
     STOP/NOTIF/EVENT/SKILL/SKILL?, subtext lines, `+392k` token tails. **Skill-
     fired rows play the app's `lightning.json` lottie OVER a persistent static
     ⚡** (overlay, not swap) via `lottie-web`; only LIVE rows animate, historical
     + reduced-motion show the static glyph.
  2. **Context** (col-span-5) — segmented multi-color usage bar + `62% ·
     claude-opus-4-8 · 621k/1.0M` + legend + `Auto ✓`. **STILL STATIC — this is
     the next animation target.**
  3. **Pulse** (col-span-5) — stacked gradient area chart + LIVE legend.
  4. **Skills & MCP** (col-span-7) — two columns of status rows.
  5. **Radio** (col-span-4) — play icon + warm 5-bar EQ + station.
- **Warm `--chart-1..5` tokens** added to `src/styles/global.css` (straw → gold
  → ember → burnt → oxblood) so tiles use `chart-N` classes like the app.
- **Layout tuned**: `auto-rows` is `minmax(210px,auto)` (was `1fr`, which
  inflated every tile). Timeline feed is a **fixed `h-[344px]`** (≈12 rows) with
  a **16px gap** (`mt-4`) above the `01 · TIMELINE` header; inner container is
  `flex flex-col` (NOT `flex-1`). Timeline tile measures ~563px, balanced
  against Context+Pulse stacked.
- Build green (`npm run build`); reduced-motion + hydration verified clean
  (zero console errors); dev server restarted clean after a Vite re-optimize.

## Next steps
1. **Animate the Context tile** — user asked for this next, then said "Wait" (no
   style chosen yet). Re-offer the 3 options: (a) **live fill + compact loop**
   [recommended] — % climbs & bar grows, then snaps back on a `/context compact`
   with a flash, loops; (b) gentle breathing fill; (c) one-shot fill on scroll.
   Build as an island mirroring TimelineFeed (mounted-gate for hydration safety,
   reduced-motion → static).
2. **Commit the uncommitted stack** (see Git state) when the user says so — and
   in the SAME commit, **update `CLAUDE.md`'s "Current state" bento description**
   (it still says "context ring, pulse line, tool chips, radio EQ" — now stale).
3. Optionally animate the other tiles (Pulse scroll-in spikes, Skills blink-fire).

## Key decisions (and why)
- **Warm-translated, not faithful emerald.** User kept CLAUDE.md's "NO green /
  site is the warm poster" rule — recreate app *patterns* but tint warm.
- **No Remotion for bento.** Tiles stay hand-built HTML/CSS/SVG + React islands:
  instant, themeable, hover-interactive. Remotion is for video deliverables only.
- **Source of truth = `../conan/ui/src` components on disk**, not asking the
  Conan agent (the real tokens/structure are right there).
- **Timeline streaming uses a React island + Motion** (`AnimatePresence`,
  `popLayout`, `layout`) — the sanctioned "needs motion + client state" case.
- **Hydration safety pattern**: gate the animated branch on a post-mount flag so
  SSR + first client paint render the SAME static list (else reduced-motion or
  motion's inline styles diverge → hydration mismatch). Reuse for any new island.
- **Feed height is FIXED, not `flex-1`.** `flex-1` lets the feed balloon to fill
  the row-span and made the tile 788px. Fixed height is the controllable lever.

## Files & commands in play
- `src/components/Bento.astro` — the 5-tile grid (modified, uncommitted).
- `src/components/TimelineFeed.tsx` — live feed island (new, uncommitted).
- `src/styles/global.css` — `--chart-1..5` tokens + bento reveal CSS (`hud-wipe`,
  `live-dot`); dropped dead `ring-fill`/`pulse-travel` keyframes (modified).
- Reference: `../conan/ui/src/components/{Timeline,ContextHeader,PulseChart,
  SkillsWidget,McpWidget,RadioBar,SkillFiredLottie}.tsx`.
- Asset: `public/animations/lightning.json` (shared with Header).
- `npm run dev` → http://localhost:4321/ (bento at `/#features`); `npm run build`.
- Browser verify via the `automate-browser` skill (WebKit engine now installed
  for Safari emulation). Headless Chromium software-decodes video — sample pixel
  brightness, don't trust `paused`/`currentTime` (VP9-black lesson).

## Git state
Branch `main` (trunk-based; auto-deploys to www.conan.sh via Vercel). Uncommitted:
```
 M src/components/Bento.astro
 M src/styles/global.css
?? src/components/TimelineFeed.tsx
```
**Left uncommitted on purpose** — user hasn't asked to commit yet. Commit (with
the CLAUDE.md doc fix) only on explicit ask; do NOT push beyond a normal `main`
commit without confirmation.

## Don't redo
- **No VP9/webm video** anywhere — H.264 mp4 only (Mac GPU black-frame bug).
- **Don't make the timeline feed `flex-1`** — it balloons the tile to ~788px.
  Use a fixed `h-[…]`.
- **Don't render the animated island branch during SSR** — gate on a mounted
  flag or you get hydration mismatches.
- The Context bar's signature is the **segmented multi-color bar**, NOT a ring
  (the ring was the old design, already replaced).
