# Handoff — conan.sh marketing site (dark-pulp landing page)

_Updated 2026-05-31 · session: FAQ + CTA + waitlist/KV + video-hero checkpoint_

## Goal
Build the public marketing landing page for **conan.sh** (sells Conan, the macOS
app that wraps/observes Claude Code). Single fast Astro page, **"dark pulp / ink
& fire"** aesthetic (70s/80s Conan comic). See CLAUDE.md §Current state + DESIGN.md.

## Current state
Page is **content-complete** (Hero → Bento → FAQ → CTA → Footer), build green,
browser-verified, pushed to `main`. New this session on top of the prior
Header/Hero/Bento/Footer + Geist + `.shell` baseline:
- **FAQ** (`FAQ.astro` + `FaqAccordion.tsx`) — 9 trust-first Q&As (copy in
  `.astro` frontmatter) in a **shadcn Accordion** island, single-open. `#faq`.
  **First shadcn component** added (`ui/accordion.tsx`, new-york → pulls unified
  `radix-ui`; dropped the redundant `@radix-ui/react-accordion`).
- **CTA band** (`CTA.astro`) — fire-glow reprise, `id="download"` (Header's
  scroll target). "Miss nothing." kicker → "Take up the steel." H2 → ember
  Download + pricing line. Hosts the waitlist as the Windows/Linux platform line.
- **Waitlist** (`WaitlistForm.tsx` + `src/pages/api/waitlist.ts`) — accessible
  capture (honeypot, `role=status/alert`) → **Vercel KV** (`@vercel/kv`,
  `kv.sadd("waitlist:emails", …)`, reuses the conan-license store). Reads
  `KV_REST_API_URL`/`_TOKEN` from Vite env or `process.env`; **degrades
  gracefully** when unset (accepts + logs, doesn't drop). `prerender = false`.
- **Hero reworked** — full-bleed background `<video>` loop (no-autoplay,
  reduced-motion → poster) + subdue scrim + a **framed app screenshot** (window
  chrome, ember/gold corner-glow) composited in front, bleeding off the bottom.
  Graceful until assets exist (fire-glow / empty chrome frame stand in).

**Carried baseline:** Geist/Geist Mono (PP Neue gone); shared `.shell` (1280px,
`px-6`→`lg:px-12`); warm-pulp tokens + grain in `global.css`. `motion` is
installed but unused (CSS/IO/lottie cover current needs).

## Next steps
1. **Pricing section** (`#pricing` is a **DEAD ANCHOR** — Header nav + Footer
   link to it but no `id="pricing"` exists). Free vs Premium ($39) comparison.
   Self-contained like FAQ/CTA — recommended next.
2. **Hero assets** — create + drop into `public/hero/` (see README there):
   `hero-loop.mp4`/`.webm` + `hero-poster.jpg` (original/evocative barbarian
   loop, **no franchise IP**) and `app-screenshot.webp` (dark HUD capture). Then
   tune the subdue scrim/frame-glow against the real footage.
3. **KV creds** — add `KV_REST_API_URL` + `KV_REST_API_TOKEN` to a local `.env`
   (and to Vercel) from the conan-license store, so the waitlist actually
   persists. Until then it accepts + logs but doesn't store.
4. **Fuller footer columns** (Product / Resources / Company·Legal / Social +
   trust strip + Windows/Linux notify link) — currently minimal.
5. Wire real **Download** (latest GitHub Release .dmg) + **Buy** (Polar) URLs —
   currently `#`/`#download` stubs in Header/Hero/CTA.
6. Real favicon (still placeholder "C"), OG/SEO meta in Layout.
7. **Connect Vercel + point conan.sh** (push currently hits GitHub only).

## Key decisions (and why)
- **Dark pulp, NO green** — dropped the app's emerald so the site has its own warm
  identity (app = cool tool, site = warm poster). Ember `#d97706` is primary.
- **Pill color = ember** (resolved the green-vs-light fork).
- **Nav lightning overflows** the capsule (not clipped), screen-blended, plays
  once per compaction — user loved it.
- **No external assets from the COMPUTE reference** (their hero video) — used our
  own fire-glow/grid instead. **No copyrighted Conan art** — evoke era via
  color/grain/type only (IP caution in DESIGN.md).
- **Animations are CSS + IntersectionObserver + lottie-web**, not Framer Motion
  (not installed) — keeps islands minimal per the "island only when needed" rule.
- DESIGN.md was rewritten into a **token-doc format** (YAML frontmatter = source
  of truth for `global.css`).

## Open questions / risks
- Headline final pick (① "A barbarian misses nothing." vs ② the cycling "Command
  the campaign…" currently live).
- Nav wordmark hugs the left curve of the pill (cosmetic; parked — fix with
  asymmetric padding, e.g. `px-4 py-3`).
- `npm audit`: 3 high (transitive `path-to-regexp` via `@astrojs/vercel`) — left
  as-is; the "fix" downgrades the adapter. Not runtime-exploitable for a static site.

## Files & commands in play
- Page: `src/pages/index.astro` (Header → Hero → Bento → FAQ → CTA → Footer).
- Components: `src/components/{Header,Hero,Bento,FAQ,CTA,Footer}.astro` +
  islands `HeroWord.tsx`, `FaqAccordion.tsx`, `WaitlistForm.tsx`; shadcn
  `components/ui/accordion.tsx`.
- Server route: `src/pages/api/waitlist.ts` (`prerender = false` → Vercel fn).
- Theme/anim: `src/styles/global.css`. Lottie: `public/animations/lightning.json`.
- Hero asset slots + specs/IP/prompt: `public/hero/README.md`.
- Env: `.env.example` documents `KV_REST_API_URL`/`_TOKEN`; real `.env` gitignored.
- Skills: `build-ui` + `frontend-design` (UI), `shadcn` (components),
  `automate-browser` (browser verify).
- Commands: `npm run dev` (:4321) · `npm run build` · `npm run preview`. Typecheck
  via `npx tsc --noEmit --ignoreDeprecations 6.0` (no `@astrojs/check` installed).

## Git state
Branch `main`. This session pushed: FAQ (shadcn accordion), CTA band, waitlist
UI, Vercel KV wiring, the video-hero scaffold, then the hero app-frame rework —
plus these doc updates (CLAUDE.md / DESIGN.md / HANDOFF.md). Build green,
browser-verified. Commit the hero rework + doc updates if not already done.

## Don't redo
- `motion` IS installed but intentionally unused — CSS/IO/lottie cover current
  needs; reach for it only when those genuinely can't.
- **Aceternity UI Pro was evaluated for the hero and declined** — we chose a
  video loop + framed app screenshot. Don't re-introduce the flickering-bulb hero.
- Don't lift the app's cool/green tokens or conan-icon — design intentionally diverged.
- Don't use the COMPUTE hero video URL or any Frazetta/'82-poster/Arnold art.
  The hero loop must be original/evocative — **no Conan/Arnold/franchise IP**.
- Folder is `public/animations/` (the earlier `animatons` typo is fixed).
