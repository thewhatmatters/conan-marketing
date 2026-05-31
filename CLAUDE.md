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
> (not green)**; fonts are **Geist / Geist Mono**; Motion &
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
- **`FAQ.astro` + `FaqAccordion.tsx`** — 9 trust-first Q&As (copy in `.astro`
  frontmatter from the story doc) in a **shadcn Accordion** island (single-open).
  `#faq`. First shadcn component added (`ui/accordion.tsx`).
- **`CTA.astro`** — final fire-glow band, `id="download"` (the Header's scroll
  target). "Miss nothing." kicker → "Take up the steel." H2 → ember Download +
  pricing line. Hosts the waitlist as the Windows/Linux platform line.
- **`WaitlistForm.tsx` + `/api/waitlist` (`waitlist.ts`)** — accessible email
  capture (honeypot, `role=status/alert`) → KV. Endpoint persists to **Vercel
  KV** (`@vercel/kv`, reuses the conan-license store) and **degrades gracefully**
  when `KV_REST_API_*` env is unset (accepts + logs, doesn't drop). Creds pending.
- **Hero now layers a background loop + framed app screenshot** (see §Hero below).

**Fonts — DECIDED (2026-05-31): Geist + Geist Mono.** Loaded via Fontsource
(`@fontsource-variable/geist`, `geist-mono`) in `global.css`; `--font-sans` +
`--font-display` = Geist, `--font-mono` = Geist Mono. PP Neue (the earlier pulp
default) was **removed entirely** — fonts, `@font-face`, preloads, `fonts-src/`.
Display headlines = Geist bold + `tracking-tight`; pulp character now rides on
color/grain/fire/lightning, not the type.

**Hero (updated):** full-bleed background **`<video>` loop** (muted/loop/
playsinline, **no autoplay** — a script plays it only when motion is allowed,
else the poster shows) behind the headline, calmed by a bottom-weighted subdue
scrim, with a **framed app screenshot** (window chrome + ember/gold corner-glow)
composited in front, bleeding off the bottom. Both assets live in `public/hero/`
(`hero-loop.mp4`/`.webm` + `hero-poster.jpg`, `app-screenshot.webp`) — see the
README there. **Graceful until assets exist**: no video → fire-glow; no shot →
empty chrome frame. Asset loop must be **original/evocative, no franchise IP**.

**Animation stack:** CSS keyframes + IntersectionObserver + `lottie-web`.
`motion` (Framer's successor) **is** installed (`^12.40.0`) but currently
**unused** — CSS/IO/lottie cover present needs. (Aceternity UI Pro was evaluated
for the hero, not adopted; we went with a video loop + app frame instead.)
**shadcn:** in use — **`ui/accordion.tsx`** added (new-york; pulls the unified
`radix-ui` pkg). Add more via the shadcn skill / `npx shadcn@latest add`.
**`frontend-design` + `build-ui` skills** drive UI work; `automate-browser`
verifies in a real browser.

**Not yet built:** **Pricing section** (the `#pricing` nav/footer anchor is
currently DEAD — no `id="pricing"` exists), fuller footer columns, real
Download/Buy URLs (Header/Hero/CTA are `#`/`#download` stubs), the actual hero
**assets** (slots are wired, files pending), favicon (still placeholder), OG/SEO
meta, **Vercel connection + `conan.sh` domain**, and the **KV creds** in env to
make the waitlist actually persist.

## Build plan (scaffold → ship)
1. ~~**Scaffold**~~ ✅ Astro + TS + React + Vercel adapter + Tailwind v4 + lottie.
   (Used `@tailwindcss/vite`, not `@astrojs/tailwind`. Motion/shadcn deferred.)
2. ~~**Layout shell**~~ ✅ base layout + nav + compact footer. (SEO/OG meta TODO.)
3. **Sections** — Hero ✅ (video loop + app frame) · Bento ✅ · **FAQ ✅** ·
   **Final CTA band ✅** · Footer 🟡 (minimal — fuller columns TODO) ·
   **Pricing ⬜** (dead `#pricing` anchor — next up).
4. **Waitlist** 🟡 — `WaitlistForm` + `/api/waitlist` → **Vercel KV** built &
   graceful; ⬜ add `KV_REST_API_*` creds to env (reuse conan-license store).
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
- ~~**Fonts**~~ RESOLVED → **Geist + Geist Mono** (PP Neue removed 2026-05-31).
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
- **One shared content container — the `.shell` class** (`global.css`):
  `max-width 1280px`, `px-6`→`lg:px-12`. Every section's inner content wraps in
  `.shell` so edges align page-wide; sections stay full-bleed for backgrounds.
- **Lore voice = "seasoned, not cosplay"** — one Hyborian beat per section,
  always landed by a plain product sentence. The Crom/god angle was cut; the
  watcher idea rests on **Conan the warrior** ("a barbarian misses nothing").
- **Accessibility:** semantic HTML, visible focus states, color contrast, and
  `prefers-reduced-motion` honored on every animation.
