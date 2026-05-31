# conan-marketing — project context for Claude Code

This repo is the **public marketing site for conan.sh** — the landing page that
sells **Conan**, a macOS-native desktop app that wraps and observes Claude Code.
It is a separate repo from the product (`../conan`). This file is auto-loaded by
every Claude Code session here — keep it accurate.

> **Start here when resuming:**
> 1. Read [docs/landing-page-story.md](docs/landing-page-story.md) — the
>    canonical copy/positioning (hero, bento, FAQ, footer, voice & lore kit).
> 2. Read [DESIGN.md](DESIGN.md) — the visual system + motion guidelines.
> 3. Then build/iterate per the **Build plan** below.

## What we're building
A single, fast, animated marketing landing page. Structure (from the story doc):
**Hero → Benefits bento (5 tiles) → FAQ → final CTA band → Footer.** Plus a
Windows/Linux **waitlist** email capture (the app is macOS-first).

Primary actions on the page:
- **Download for Mac** → links to the latest GitHub Release `.dmg`.
- **Buy Premium ($39 one-time)** → Polar checkout URL (added when checkout is live).
- **Waitlist** (Windows/Linux) → POST to `/api/waitlist` → Upstash KV.

## Decided tech stack (2026-05-30)
> ⚠ Partly superseded — see **Current state** above. Still true: Astro static +
> React islands + Vercel + Tailwind v4. Changed: design is **warm pulp, ember
> (not green)**; fonts are **PP Neue / Geist (A/B)**, not Geist-only; Motion &
> shadcn not yet added; the conan-icon/theme were NOT lifted from the app.
- **Astro** (static output) — chosen over Next.js because this is a content-first
  marketing page: ~zero JS baseline, top SEO/Lighthouse, and `.astro` files are
  HTML-with-a-frontmatter-block so they're easy to edit by hand (the owner knows
  HTML/CSS well; minimal React tax). Next.js was the runner-up (better if the
  site later grows app-like); a Vite+React SPA was rejected for weaker SEO.
- **Tailwind v4** (CSS-first `@theme`, same setup as the Conan app) — lift the
  app's theme tokens, **Geist / Geist Mono** fonts, and the **conan-icon**.
- **React islands** via `@astrojs/react` — ONLY for interactive/animated bits.
- **Motion** (formerly Framer Motion) — micro-animations (scroll reveals, hover
  lift, hero stagger, "live" product-loop touches). See DESIGN.md §Motion.
- **shadcn/ui** (React) — reuse Button + Accordion (FAQ) primitives.
- **Deploy: Vercel** (same as `conan-license` → `license.conan.sh`), via
  `@astrojs/vercel` adapter. Domain: **conan.sh**.
- **Waitlist storage: Upstash KV** — reuse the instance already attached to
  `conan-license` (zero new infra). `/api/waitlist` is an Astro endpoint /
  Vercel function.

## Relationship to the product repo (`../conan`)
- **Canonical copy** lives here in `docs/landing-page-story.md` (snapshot copied
  from `../conan/docs/landing-page-story.md` on 2026-05-30). If the product team
  edits the story doc in `../conan`, re-sync it here.
- **Brand assets to lift from `../conan/ui`:** `src/assets/conan-icon.png`,
  the Tailwind theme tokens in `ui/src/index.css` (`@theme inline` + `.dark`),
  Geist/Geist Mono font setup. Keep the marketing site visually consistent with
  the app so download→app feels like one product.
- **Pricing / business facts** (keep in sync with `../conan/CLAUDE.md`):
  **$39 one-time, lifetime updates within 1.x, no subscription, no trial, no
  per-device limit.** Sold via **Polar.sh** (Merchant of Record). Free tier is a
  real live Claude observer; Premium unlocks the insight layer.
- **Refunds are NOT surfaced on the page** (decided 2026-05-30) — the free tier
  is the try-before-you-buy; refund handling lives in Terms + Polar only. Do not
  add a refund FAQ or a standalone footer "Refunds" link.

## Current state (2026-05-31) — READ THIS FIRST

**The design pivoted to "dark pulp / ink & fire"** (70s/80s Conan comic — Frazetta
/ '82 poster mood). DESIGN.md has been fully rewritten to a token-doc format; it
is the source of truth. Major changes from the original plan below:
- **Dark is canonical. NO green.** The app's emerald was intentionally dropped —
  the marketing site owns its own *warm* identity (the app stays the cool tool;
  the site is the warm poster that sells it). Palette: **ember `#d97706`** (primary
  CTA / accent), **oxblood / gold / bone**, warm near-black ground `#0c0a09`, plus
  a global **film-grain** overlay. Tokens live in `src/styles/global.css`
  (`@theme` + `:root`/`.dark`), sourced from DESIGN.md frontmatter.

**Built & pushed to `main`** (single page, `src/pages/index.astro`):
- **`Header.astro`** — COMPUTE-style sticky nav; on scroll it collapses into a
  `rounded-full` blurred pill, firing an *overflowing* **gold lightning Lottie**
  (`public/animations/lightning.json` via `lottie-web`; reduced-motion aware).
- **`Hero.astro` + `HeroWord.tsx`** (React island) — fire-glow + warm-grid bg;
  display headline "Command the campaign, / by your own [hand·steel·watch·eye]"
  where the last word cycles with a per-letter blur-in colored by a warm fire
  gradient. Pricing facts as the metric strip.
- **`Bento.astro`** — 5-tile **comic-panel grid** (numbered 01–05), hand-built
  "live" visuals (timeline stream, context ring, pulse line, tool chips, radio
  EQ), scroll-revealed via IntersectionObserver. id=`features`.
- **`Footer.astro`** — compact; carries the required "not affiliated" trust line.

**Fonts — DECISION OPEN (A/B in progress).** Currently **Geist / Geist Mono**
(experiment). The pulp default is **PP Neue Bit** (display) / **Montreal** (body)
/ **Montreal Mono** (mono) — self-hosted woff2 in `public/fonts/`, sources in
gitignored `fonts-src/`. Both are wired in `global.css`; flip via the three
`--font-*` tokens. ⚠ PP Neue is **commercial (Pangram Pangram)** — confirm a
webfont/self-host license before real launch. If Geist wins, drop the now-unused
PP Neue `<link rel=preload>`s in `Layout.astro`.

**Animation stack:** CSS keyframes + IntersectionObserver + `lottie-web`.
**Motion (Framer) is NOT installed** despite DESIGN.md mentioning it.
**shadcn:** `components.json` is configured but **no components added yet**.
**`frontend-design` skill** is vendored at `.claude/skills/frontend-design/` —
use it for UI work.

**Not yet built:** FAQ (shadcn accordion island), final CTA band, full footer
columns, **waitlist** (`/api/waitlist` → Upstash KV), real Download/Buy URLs,
product screenshots / hero loop, favicon (still placeholder), OG/SEO meta, and
**Vercel connection + `conan.sh` domain** (push currently hits GitHub only).

## Build plan (scaffold → ship)
1. ~~**Scaffold**~~ ✅ Astro + TS + React + Vercel adapter + Tailwind v4 + lottie.
   (Used `@tailwindcss/vite`, not `@astrojs/tailwind`. Motion/shadcn deferred.)
2. ~~**Layout shell**~~ ✅ base layout + nav + compact footer. (SEO/OG meta TODO.)
3. **Sections** — Hero ✅ · Bento ✅ · Footer ✅ (minimal) · **FAQ ⬜** (shadcn
   accordion island) · **Final CTA band ⬜**.
4. **Waitlist** ⬜ — `WaitlistForm` island → `POST /api/waitlist` → Upstash KV.
5. **Download/Buy wiring** ⬜ — DMG link to GitHub Release; Buy → Polar URL (both
   currently `#` stubs in Header/Hero).
6. **Motion polish** 🟡 — scroll reveals + hover lift + "live" touches done via
   CSS/IO/lottie; respect `prefers-reduced-motion` (honored). Refine later.
7. **Ship** 🟡 — pushed to GitHub `main`. **Connect Vercel + point `conan.sh`** ⬜.

## Commands (after scaffold)
```bash
npm install
npm run dev        # Astro dev server (default :4321)
npm run build      # static build → dist/
npm run preview    # preview the production build
```

## Open decisions
- **Fonts (active A/B):** Geist/Geist Mono (current) vs PP Neue Bit/Montreal/Mono
  (pulp default) vs a hybrid (Bit for big display only, Geist for body/mono).
- **Headline:** the hero currently runs ② "Command the campaign, by your own
  [hand·steel·watch·eye]" (cycling). ① "A barbarian misses nothing." still lives
  in the footer/eyebrows. Final pick TBD.
- **Pill color:** RESOLVED → **ember** (was the green-vs-light fork in DESIGN.md).
- **Buy/checkout URL** — fill in once the Polar checkout link exists (Header +
  Hero CTAs are `#` stubs; Download should point at the latest GitHub Release).
- **IP caution:** "Conan / Conan the Barbarian" are trademarks of Conan
  Properties International. Genre voice + public-domain Howard prose is low-risk;
  avoid the 1982 film's protected dialogue (e.g. "riddle of steel"), Arnold's
  likeness, official logos/stills. Keep a visible "not affiliated" line. Worth a
  quick IP review before launch.
- **Buy/checkout URL** — fill in once the Polar checkout link exists.

## Conventions
- **Edit copy in `.astro` markup directly** (plain HTML + Tailwind); reach for a
  React island only when something needs Motion or client state.
- **Semantic Tailwind tokens** (`bg-background`, `text-foreground`, `bg-card`,
  `border-border`, `text-muted-foreground`, `primary`) plus the warm pulp lore
  tokens **`ember` / `oxblood` / `gold` / `bone`** — see DESIGN.md. No hard-coded
  hex in markup (background gradients/glows are the documented exception).
- **Lore voice = "seasoned, not cosplay"** — one Hyborian beat per section,
  always landed by a plain product sentence. The Crom/god angle was cut; the
  watcher idea rests on **Conan the warrior** ("a barbarian misses nothing").
- **Accessibility:** semantic HTML, visible focus states, color contrast, and
  `prefers-reduced-motion` honored on every animation.
