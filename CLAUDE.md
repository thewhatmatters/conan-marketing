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

## Build plan (scaffold → ship)
1. **Scaffold** Astro + TS, add `@astrojs/react` + `@astrojs/vercel` + Tailwind v4
   + Motion + shadcn. Wire theme tokens + fonts + favicon (conan-icon).
2. **Layout shell** — base layout, `<head>` SEO/OG meta, minimal nav, footer.
3. **Sections** (all copy from the story doc):
   - Hero (animated island: staggered headline/subhead/CTA; product loop visual)
   - Benefits bento (5 tiles; Tile 1 large, Tile 5 = Radio, small)
   - FAQ (shadcn accordion island)
   - Final CTA band
   - Footer (cols + trust strip; **no Refunds link**)
4. **Waitlist** — `WaitlistForm` island → `POST /api/waitlist` → Upstash KV;
   success/error states.
5. **Download/Buy wiring** — DMG link to GitHub Release; Buy → Polar URL (stub
   until checkout is live).
6. **Motion polish** — scroll reveals, hover lift, "live" touches (see DESIGN.md).
   Respect `prefers-reduced-motion`.
7. **Ship** — `git init` + push, connect Vercel, point `conan.sh`.

## Commands (after scaffold)
```bash
npm install
npm run dev        # Astro dev server (default :4321)
npm run build      # static build → dist/
npm run preview    # preview the production build
```

## Open decisions (carry-over from the story doc §7)
- **Headline pick:** ① "A barbarian misses nothing." vs ② "Command the campaign
  by your own hand." — A/B or designer's call.
- **IP caution:** "Conan / Conan the Barbarian" are trademarks of Conan
  Properties International. Genre voice + public-domain Howard prose is low-risk;
  avoid the 1982 film's protected dialogue (e.g. "riddle of steel"), Arnold's
  likeness, official logos/stills. Keep a visible "not affiliated" line. Worth a
  quick IP review before launch.
- **Buy/checkout URL** — fill in once the Polar checkout link exists.

## Conventions
- **Edit copy in `.astro` markup directly** (plain HTML + Tailwind); reach for a
  React island only when something needs Motion or client state.
- **Semantic Tailwind tokens** mirroring the app (`bg-background`, `text-foreground`,
  `bg-card`, `border-border`, `text-muted-foreground`, `primary`, plus the lore
  `accent` — see DESIGN.md). No hard-coded hex in markup.
- **Lore voice = "seasoned, not cosplay"** — one Hyborian beat per section,
  always landed by a plain product sentence. The Crom/god angle was cut; the
  watcher idea rests on **Conan the warrior** ("a barbarian misses nothing").
- **Accessibility:** semantic HTML, visible focus states, color contrast, and
  `prefers-reduced-motion` honored on every animation.
