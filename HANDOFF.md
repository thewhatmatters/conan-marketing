# Handoff — conan.sh marketing site

_Updated 2026-06-06 · bento HUD buildout + SEO/GEO + hero/footer polish_

## Goal
Polish the landing page: make all five **Bento** tiles mirror the real Conan
app HUD (warm-translated, some interactive), add a plain product summary so the
page actually says *what Conan is*, and stand up a full **SEO + GEO/llms.txt**
layer. This session also tightened the hero word animation and the footer
parallax.

## Current state — everything below is DONE, verified in-browser, BUILDS GREEN, and is being committed+pushed now

### Bento — all 5 tiles (`src/components/Bento.astro` + 3 islands)
1. **Timeline** (`TimelineFeed.tsx`) — live streaming feed. Bottom mask fade
   softened to `#000 84%`; feed wrapper raised to `h-[392px]` so it fills.
2. **Context** — segmented bar with **per-segment hover tooltips** (CSS-only,
   dark pill like the app) + legend `system/tools/memory/skills/messages`. Colors
   mirror app CAT_COLOR (system→chart-4, tools→chart-2, memory→chart-1,
   skills→chart-5, messages→primary). Dropped the Auto/↻ chips.
3. **Pulse** (`PulseChart.tsx`, NEW React island, `client:visible`) — 3 series
   (Tools=ember, Prompts=chart-3, Session=chart-5), **hover tooltip** (guide +
   dots + timestamp/values), **15m/1h/6h/24h range buttons** (15m default).
   **Hydration-safe by construction**: deterministic data (no Math.random/
   Date.now), TZ-free integer clock labels. Y plotted into a `[14..96]` band so
   peaks/dots aren't clipped; axis labels in their own flow row.
4. **Skills & MCP** (`SkillsMcp.tsx`, NEW React island) — **interactive tabs**
   (Skills | MCP, VS Code-style with ember `border-primary` active accent) +
   a **User/System sub-toggle** (pill style) on the Skills tab. Cards: name +
   line-clamp-2 desc + last-fired + path. Panel `h-[268px]` with bottom mask
   fade `#000 68%`. System skills use the real `~/.claude/plugins/cache/
   anthropic-agent-skills/example-skills/...` truncating paths.
5. **Radio** — live "Claude Radio" bar on top + a **faked Claude Code terminal**
   (❯ prompt / ⏺ reply) listing the curated stations + "add your own" answer.
   Terminal fixed `h-[284px]`, caption `mt-auto` so it tethers to the bottom and
   aligns with tile 04's caption (both 488px). Mask fade `#000 70%`.
- **04/05 widths**: walked 8/4 → swapped → 5/7 → **settled on 6/6**.
- **Warm `--chart-1..5` tokens** live in `global.css`.

### Hero (`src/components/Hero.astro`, `HeroWord.tsx`)
- Added a **plain product subhead** under the H1 (feature-forward, "Conan" in
  foreground): *"Conan is a native macOS app that wraps Claude Code in a live
  HUD — every prompt, tool call, skill, and token, surfaced as it happens."*
- **HeroWord** cycling word (hand/steel/watch/eye): now **single color** — blurs
  in **ember (`--primary`)** then **settles to `--foreground`** (headline white).
  Dropped the multi-hue gradient + per-letter interpolation.

### Footer parallax (`src/components/Footer.astro`)
- CONAN wordmark now **rises from +180px (clipped below) → −64px** (settles ~20%
  higher than base). Progress remapped to `(vh-top)/(0.7·vh)` so it fully rises
  while the footer sits at the page bottom (the old full-scroll-through formula
  only reached ~40% there → barely moved). Reduced-motion skips it.

### Section header (`Bento.astro`)
- "Nothing escapes / the watch." forced onto two lines via two `block` spans.

### FAQ (`src/components/FAQ.astro` + NEW `src/data/faqs.ts`)
- Extracted Q&As to **`src/data/faqs.ts`** (shared by FAQ.astro + index JSON-LD,
  so rendered copy and structured data can't drift).
- **Added lead "What is Conan?"**; **removed** "Is it really a one-time purchase?"
  and "How do updates work?" (one-time/no-sub facts still live in hero caption +
  CTA band). 9 questions now.

### SEO + GEO/llms.txt (the big add)
- `astro.config.mjs`: added **`@astrojs/sitemap`** (`package.json` dep) → emits
  `sitemap-index.xml` + `sitemap-0.xml`.
- **`Layout.astro`** rewritten head: title templating (homepage =
  "Conan — a live HUD for Claude Code on macOS"; sub-pages "X — Conan"),
  keyword-rich description, **canonical**, **theme-color**, full **Open Graph +
  Twitter** tags, a `<slot name="head">`, and **sitewide JSON-LD** WebSite +
  Organization (`@id` graph). `image` prop defaults to interim
  `/hero/hero-poster.jpg`.
- **`index.astro`**: homepage JSON-LD **SoftwareApplication** (→ `#org`, `$39`
  Offer) + **FAQPage** (from `faqs.ts`) via the head slot.
- **`public/robots.txt`** (allow all incl. AI crawlers, points at sitemap).
- **`public/llms.txt`** (spec-correct: H1, blockquote, detail, ## Pages links,
  ## Optional). NOTE: research found **no major engine consumes llms.txt today**
  — shipped because it's free + good for coding-agent/MCP consumers, NOT a
  visibility lever. Deliberately skipped `/llms-full.txt`.

## Decisions (and why)
- **Warm, no green** still holds — even MCP "Connected" dots are warm
  (gold = ok, ember = needs-auth), per the user's explicit "Keep warm" choice.
- **GEO ≈ good structured SEO** (per deep-research subagent): the high-impact
  items were schema + answer-first FAQ + allow-all robots + OG meta, all done.
- **Interactive bits = React islands** (Pulse, Skills/MCP) — the sanctioned
  "needs client state" case. Hydration-safe pattern: deterministic data + same
  SSR/first-paint render.
- **Title = keyword-forward** (user picked); lore stays in the H1/eyebrow.

## Next steps / open
1. **OG image** — currently the interim hero poster. User chose "decide later"
   for the real branded 1200×630 (`/og-image.png` is the intended final path;
   swap the `image` default in `Layout.astro` when it lands).
2. **Optional GEO**: a Free-vs-Premium **capability** matrix (not a pricing
   table — respects the no-table rule) is the one suggested item not added.
3. Still pending from before: real **Download/Buy URLs** (Header/Hero/CTA are
   `#`/`#download` stubs → GitHub Release `.dmg` + Polar checkout), **KV creds**
   for the waitlist, **Vercel connect + `conan.sh` domain**, favicon.
4. **CLAUDE.md "Current state"** bento description was refreshed in this commit
   to match the 5 tiles above.

## Verify / commands
- `npm run dev` → http://localhost:4321/ (bento `/#features`, faq `/#faq`).
- `npm run build` (green). Browser checks via `automate-browser` (headless
  Chromium; sample pixels, don't trust paused/currentTime for video).
- Verified head: titles, OG/Twitter, canonical, JSON-LD types
  (WebSite/Organization/SoftwareApplication/Offer/FAQPage), robots.txt,
  sitemap-index.xml all render in `dist/`.

## Don't redo
- No VP9/webm video — H.264 mp4 only (Mac GPU black-frame bug
  [[hero-video-mp4-only-vp9-black]]).
- Don't make the Timeline feed `flex-1` (balloons to ~788px) — fixed height.
- Don't render an animated island branch during SSR without a mounted gate
  (hydration mismatch). Pulse/SkillsMcp avoid this by being fully deterministic.
- `hud-wipe` uses `clip-path` — keep tooltips/overlays OUTSIDE it (Pulse puts
  the hover layer as an unclipped sibling).
- Don't expect llms.txt to drive AI-search visibility (it doesn't, yet).

## Git state
Branch `main` (trunk; auto-deploys to www.conan.sh via Vercel).
**Being committed + pushed now** (user asked). Files:
```
 M astro.config.mjs · package.json · package-lock.json
 M src/components/{Bento,FAQ,Footer,Hero}.astro
 M src/components/{HeroWord,TimelineFeed}.tsx
 M src/layouts/Layout.astro · src/pages/index.astro
?? public/llms.txt · public/robots.txt
?? src/components/{PulseChart,SkillsMcp}.tsx · src/data/faqs.ts
```
(Plus this HANDOFF.md and the CLAUDE.md "Current state" refresh in the same commit.)
