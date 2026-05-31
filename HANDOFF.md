# Handoff — conan.sh marketing site (dark-pulp landing page)

_Updated 2026-05-31 · session refresh checkpoint_

## Goal
Build the public marketing landing page for **conan.sh** (sells Conan, the macOS
app that wraps/observes Claude Code). Single fast Astro page, **"dark pulp / ink
& fire"** aesthetic (70s/80s Conan comic). See CLAUDE.md §Current state + DESIGN.md.

## Current state
Built, verified (`npm run build` green, served HTML checked), and pushed to `main`:
- **Header.astro** — sticky COMPUTE-style nav → collapses to a `rounded-full`
  blurred pill on scroll, firing an overflowing **gold lightning Lottie**.
- **Hero.astro + HeroWord.tsx** (island) — fire-glow/grid bg, display headline
  with a **cycling last word** (`hand·steel·watch·eye`) that blur-ins per letter
  in a warm fire gradient; pricing metric strip.
- **Bento.astro** — 5-tile **comic-panel grid** (numbered 01–05) with hand-built
  live visuals (timeline / context ring / pulse line / tool chips / radio EQ),
  IntersectionObserver scroll reveal.
- **Footer.astro** — compact, has the "not affiliated" line.
- Theme tokens (warm pulp, ember/oxblood/gold/bone, grain overlay) in `global.css`.

**Fonts DECIDED:** Geist / Geist Mono (Fontsource) — PP Neue fully removed
(files, `@font-face`, preloads, `fonts-src/`). **Sections now share a `.shell`
container** (max-width 1280px, `px-6`→`lg:px-12`) so all content aligns.

## Next steps
1. Build remaining sections: **FAQ** (shadcn accordion island — first shadcn add),
   **final CTA band**, fuller footer columns.
3. **Waitlist**: `WaitlistForm` island → `POST /api/waitlist` → Upstash KV
   (`export const prerender = false`).
4. Wire real **Download** (latest GitHub Release .dmg) + **Buy** (Polar) URLs —
   currently `#` stubs in Header/Hero.
5. Real favicon (still the placeholder "C"), OG/SEO meta in Layout.
6. **Connect Vercel + point conan.sh** (push currently hits GitHub only).

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
- Page: `src/pages/index.astro` (Header → Hero → Bento → Footer).
- Components: `src/components/{Header,Hero,Bento,Footer}.astro`, `HeroWord.tsx`.
- Theme/anim: `src/styles/global.css`. Lottie: `public/animations/lightning.json`.
- Fonts: Geist via Fontsource (`@import` in `global.css`); no local font files.
- Skill: `.claude/skills/frontend-design/` (use for UI work).
- Commands: `npm run dev` (:4321, currently running) · `npm run build` · `npm run preview`.

## Git state
Branch `main`, **clean** — all work committed & pushed. Latest batch: the
`.shell` alignment refactor (all sections share one 1280px container) + the PP
Neue→Geist font swap (PP Neue removed entirely) + these doc updates. Build green.

## Don't redo
- Don't re-add Framer Motion expecting DESIGN.md needs it — CSS/lottie covers it.
- Don't lift the app's cool/green tokens or conan-icon — design intentionally diverged.
- Don't use the COMPUTE hero video URL or any Frazetta/'82-poster/Arnold art.
- Folder is `public/animations/` (the earlier `animatons` typo is fixed).
