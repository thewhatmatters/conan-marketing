---
version: alpha
name: Conan — conan.sh
description: A dark pulp dev-tool system — 70s/80s comic-book "ink & fire". Warm near-black grounds, an oxblood-to-ember glow, bronze/gold and parchment accents, tight editorial Geist headlines, film grain. Clean COMPUTE structure underneath; pulp atmosphere on top. Lore in color, light, type, and texture — never cheap fantasy clip-art.
# Canonical theme is DARK (the site ships dark). Light values are a warm
# parchment handoff variant only — see §Colors.
colors:
  background: "#0c0a09"        # warm near-black "ink"
  foreground: "#f0e8d6"        # bone / parchment text
  card: "#1a1512"              # raised warm-dark surface
  card-foreground: "#f0e8d6"
  muted: "#231c18"             # low-emphasis warm fill
  muted-foreground: "#a89a82"  # dusty tan — secondary text, eyebrows
  border: "#2c2521"            # warm hairline
  input: "#2c2521"
  ring: "#d97706"              # focus ring = ember
  primary: "#d97706"           # EMBER — primary CTA, key warm accent
  primary-foreground: "#1c1208"
  accent: "#231c18"            # neutral raised accent
  accent-foreground: "#f0e8d6"
  oxblood: "#7f1d1d"           # blood-red — hero fire grounds, drama, danger
  ember: "#d97706"             # orange fire — energy, hover glows, "live" pulse
  gold: "#c8962b"              # bronze/brass — premium ($39), title shimmer, lore eyebrows
  bone: "#ece3d0"              # parchment — light accents on dark
  destructive: "#ef4444"       # errors/validation — rare, functional
  destructive-foreground: "#1c1208"
typography:
  display:        # hero H1 — Geist Bold, tight tracking; scales fluid, see §Typography
    fontFamily: Geist
    fontSize: 72px
    fontWeight: 600
    lineHeight: 1.0
    letterSpacing: -2px      # grotesque → tighten hard at display sizes
  headline-lg:    # section H2 — Geist
    fontFamily: Geist
    fontSize: 40px
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: -1px
  headline-md:    # sub-section — Geist
    fontFamily: Geist
    fontSize: 28px
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: -0.6px
  headline-sm:    # tile H3 — Geist Medium
    fontFamily: Geist
    fontSize: 20px
    fontWeight: 500
    lineHeight: 26px
    letterSpacing: -0.2px
  body-lg:        # lead paragraphs — Geist
    fontFamily: Geist
    fontSize: 18px
    fontWeight: 400
    lineHeight: 28px
    letterSpacing: 0px
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: 400
    lineHeight: 24px
    letterSpacing: 0px
  body-sm:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: 400
    lineHeight: 20px
    letterSpacing: 0px
  label-lg:       # buttons / prominent labels — Geist
    fontFamily: Geist
    fontSize: 16px
    fontWeight: 500
    lineHeight: 24px
    letterSpacing: 0px
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: 500
    lineHeight: 20px
    letterSpacing: 0px
  eyebrow:        # THE signature mono kicker — uppercase, tracked, often gold
    fontFamily: Geist Mono
    fontSize: 12px
    fontWeight: 400
    lineHeight: 16px
    letterSpacing: 1.6px
    textTransform: uppercase
  mono:           # code, .sh, stat units, terminal bits
    fontFamily: Geist Mono
    fontSize: 14px
    fontWeight: 400
    lineHeight: 20px
    letterSpacing: 0px
rounded:
  none: 0px
  sm: 6px
  md: 10px        # --radius base (0.625rem)
  lg: 16px        # cards / tiles (rounded-2xl)
  xl: 24px
  full: 9999px    # buttons + chips + pills
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  section: 96px   # vertical section rhythm (py-20 → py-32; this is the midpoint)
components:
  button-primary:   # the Download CTA — an ember pill with a faint fire glow
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: 12px 24px
    glow: "0 0 40px -8px {colors.ember}99"
  button-secondary: # ghost / outline ("View on GitHub"); gold on hover
    backgroundColor: transparent
    textColor: "{colors.foreground}"
    border: "1px solid {colors.border}"
    hoverBorder: "{colors.gold}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: 12px 24px
  button-link:      # low-emphasis text nav (footer, legal)
    backgroundColor: transparent
    textColor: "{colors.muted-foreground}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.none}"
    padding: 0px
  card:             # bento tile / surface — heavy comic-panel border
    backgroundColor: "{colors.card}"
    textColor: "{colors.card-foreground}"
    border: "1px solid {colors.border}"
    rounded: "{rounded.lg}"
    padding: 24px
  input:            # waitlist email field
    backgroundColor: "{colors.muted}"
    textColor: "{colors.foreground}"
    border: "1px solid {colors.border}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 12px 14px
  chip:             # eyebrow-as-pill / status label
    backgroundColor: "{colors.muted}"
    textColor: "{colors.gold}"
    typography: "{typography.eyebrow}"
    rounded: "{rounded.full}"
    padding: 6px 12px
  nav-capsule:      # the COMPUTE-style sticky header in its scrolled state
    backgroundColor: "{colors.background}/70"
    border: "1px solid {colors.border}"
    rounded: "{rounded.full}"   # pill — consistent with the buttons
    backdropBlur: 24px
---

# Conan — conan.sh visual system

The design language for the Conan marketing site. Goal: a **fast, modern, dark
dev-tool landing page** with the soul of a **70s/80s pulp Conan comic** —
watchful, precise, strong, cinematic. Pair this with
[docs/landing-page-story.md](docs/landing-page-story.md) (copy) and
[CLAUDE.md](CLAUDE.md) (stack/build).

> **North star:** "A barbarian misses nothing." Watchful, precise, strong. The
> visual equivalent: clean structure lit like a pulp cover — sharp type,
> generous black, one **fire** (oxblood→ember), **gold** for what's earned, and
> motion that reveals rather than decorates.

This system is **token-first**: the YAML frontmatter above is the source of
truth for `src/styles/global.css` (`@theme` + `:root`/`.dark`). Change a token
there, reflect it here.

---

## Overview
The system is **dark, technical, restrained — then lit like a pulp paperback.**
The bones are a clean, modern dev-tool layout (the COMPUTE-style sticky-capsule
nav, asymmetric bento, generous whitespace). Over that structure sits a thin
**pulp skin**: warm near-black grounds, an oxblood-to-ember glow rising behind
the hero like the 1982 poster's flame, bronze/gold for premium and lore, bone
parchment text, and a fixed film-grain wash that gives the whole page one
newsprint tooth. The effect is a credible dev tool that *feels* like it was
torn from a Hyborian comic.

**The product stays the hero.** The Conan app is a precise, cool-toned machine;
this site is the **warm poster that sells it**. We deliberately *don't* match
the app's green — the marketing site owns a distinct pulp identity. The drama
lives in **color, light, type, and grain**, never in cheesy fantasy clip-art or
(critically) any copyrighted Conan art. Lore is seasoning: one Hyborian beat per
section, always landed by a plain product line. The mascot is a **stylized bull**
(`.sh` = shell); the watcher idea rests on **Conan the warrior**.

## Colors
A warm "ink & fire" system. One decisive fire (oxblood→ember), gold for what's
earned, bone for text, deep warm black for everything else.

- **Background (`#0c0a09`):** warm near-black ink. Lets dark-HUD product shots
  bleed in and gives the fire glow something to burn against.
- **Foreground / Bone (`#f0e8d6`):** primary text — warm parchment, never pure
  white. `--bone` (`#ece3d0`) is the brighter accent variant for highlights.
- **Card (`#1a1512`):** slightly-raised warm surface for bento tiles/panels.
  Cadence comes from this tonal step **up**, plus a heavy comic-panel border.
- **Muted (`#231c18`) / Muted-foreground (`#a89a82`):** low fills and secondary
  / dusty-tan text and eyebrows.
- **Border (`#2c2521`):** warm hairline — heavier and more present on bento
  tiles to read as comic-panel gutters.
- **Primary — EMBER (`#d97706`):** the fire. Primary CTAs, focus ring, key
  accents, the "live" pulse. Carries a faint glow on buttons. Use with intent.
- **Oxblood (`#7f1d1d`):** blood-red. The dramatic ground of the hero/CTA fire
  glow, and the danger/error mood. Atmospheric, rarely a fill.
- **Gold (`#c8962b`):** bronze/brass — the *earned* accent: Premium `$39`, lore
  eyebrows, the wordmark/title shimmer, hover state on ghost buttons.
- **Destructive (`#ef4444`):** validation/error only. Brighter than oxblood so
  it reads as functional alarm, not mood.

### Confirmed token values (light + dark)
The site ships **dark**. Light values are a warm-parchment handoff variant for
any optional light surface — not a co-equal theme.

| Token | Light (parchment) | Dark (canonical) |
|---|---|---|
| background | `#f7f1e3` | `#0c0a09` |
| foreground | `#1c1208` | `#f0e8d6` |
| card | `#fffdf7` | `#1a1512` |
| border | `#e2d6bd` | `#2c2521` |
| muted | `#efe7d4` | `#231c18` |
| muted-foreground | `#6b5d49` | `#a89a82` |
| **primary (ember)** | **`#c2410c`** | **`#d97706`** |
| primary-foreground | `#fffaf0` | `#1c1208` |
| oxblood | `#7f1d1d` | `#7f1d1d` |
| gold | `#a67414` | `#c8962b` |
| bone | `#1c1208` | `#ece3d0` |

**Status colors:** "detected / positive / **live**" → ember/gold; warnings or
"missing" → a paler amber or oxblood; errors → destructive. (No green — the
product screenshots carry their own UI colors as imagery, not as page tokens.)

## Texture, grain & atmosphere
This is what turns "dark site" into "pulp comic." Keep all of it **subtle** —
atmosphere, not noise — and degrade for reduced-motion where relevant.

- **Film grain (global):** a fixed fractal-noise wash over the entire page
  (`body::after`, `opacity ~0.045`, `mix-blend: overlay`). One shared tooth so
  type, surfaces, and art feel printed, not rendered. Already wired in
  `global.css`.
- **Fire glow (hero + CTA band):** layered radial gradients — oxblood at the
  core fading through ember to transparent — rising from the lower center, like
  the poster flame. Pair with an **edge vignette** (corners deepened to black).
- **Halftone (accents):** optional ben-day dot fields (CSS repeating radial
  gradients) behind stat numbers or as section dividers. Use sparingly.
- **Comic-panel framing (bento):** heavier borders + deliberate gutters so the
  benefits grid reads like a comic page. Don't overdo line weight.
- **Don't:** animate the grain, stack multiple loud gradients, or let texture
  hurt text contrast. Atmosphere must never cost legibility.

## Typography
Two faces: **Geist** (display + body) and **Geist Mono** (the terminal voice).
Hierarchy comes from **family + size + weight** — not all-caps everywhere. The
one intentional uppercase moment is the mono eyebrow, which reads like
terminal/log output: the recurring dev-tool signature, often tinted **gold** for
lore. With a clean grotesque carrying the type, the pulp character now rides on
**color, light, grain, and motion** (the fire glow, the gold lightning) — the
font stays sharp and modern.

- **Geist — display & headlines + body.** A precise modern grotesque. At display
  sizes (hero H1, section H2/H3, big stat numbers) push it **bold and tightly
  tracked** (`tracking-tight`, ~`-1` to `-2px`) for editorial confidence. For
  body, Regular (400) with relaxed leading; Medium (500) for labels/buttons/tile
  titles; SemiBold (600) for headlines.
- **Geist Mono — eyebrows, code, terminal bits.** The mono kicker
  (`THE CAMPAIGN, AS IT HAPPENS`) — uppercase, letter-spaced `~1.6px`, gold or
  muted — tops each section/tile. Also `conan.sh`, the `npm install` snippet,
  stat units, the price, and the bento timeline rows.

**Scale (fluid — clamp the big sizes, tighten tracking as they grow):**
- Hero H1 (`display`): `clamp(2.75rem, 6vw, 5rem)`, weight 600, `tracking-tight`.
- Section H2 (`headline-lg`): `clamp(1.75rem, 3vw, 2.5rem)`, `tracking-tight`.
- Tile H3 (`headline-sm`): `~1.25rem`, Medium.
- Body (`body-lg`/`body-md`): `1.0–1.125rem`, `leading-relaxed`, usually
  `text-muted-foreground`; max line length `~65ch`.
- Eyebrow (`eyebrow`, Mono): `0.75rem` uppercase, `tracking-[0.1em]`, gold/muted.

Tailwind tokens: `font-display` (Geist) and `font-sans` (Geist, default) resolve
to the same family today; `font-mono` is Geist Mono. `font-display` is kept as a
distinct hook in case a dedicated display face is added later.

## Layout
Centered, fixed-max-width content column with generous outer margins — a focused
stage on a very dark, lit page.

- **One shared container — the `.shell` class** (in `global.css`): `max-width
  1280px`, centered, `px-6` → `lg:px-12` gutters. Every section's inner content
  uses `.shell` so all content shares the same left/right edge (header included).
  Sections stay full-bleed for their backgrounds; only the content is shelled.
- **Generous vertical rhythm:** sections `py-20` → `py-32`. Whitespace is the
  premium signal. Spacing: `4 / 8 / 16 / 24 / 40px` UI clusters, `~96px`
  (`section`) between sections.
- **Cadence without light sections.** Rhythm comes from **tonal steps inside the
  dark range** (`#0c0a09` base ↔ `#1a1512` surfaces), heavier panel borders, and
  the occasional fire glow — *not* from bright sections. The dark is the point.

### Bento spec (benefits section)
Asymmetric grid — each tile is **one complete idea: eyebrow + headline + 1–2
line copy + a real product visual** (screenshot or loop). Five tiles (story §3):

```
┌───────────────────────────┬───────────────┐
│  TILE 1 — Timeline (LARGE) │  TILE 2        │
│  "Every deed, driven       │  Context+Usage │
│   before you"   [big loop] ├───────────────┤
│                            │  TILE 3 Pulse  │
├──────────────┬─────────────┴───────────────┤
│ TILE 4       │ TILE 5 — Radio (SMALL/wink)  │
│ Skills+MCP   │ "Lo-fi, built in"            │
└──────────────┴──────────────────────────────┘
```
- Desktop: CSS Grid, asymmetric (Tile 1 spans 2 cols / 2 rows; Tile 5 smallest).
- Mobile: everything **stacks to one column** in priority order (1→2→3→4→5).
- Tile anatomy: `rounded-2xl border bg-card p-6` with a **heavier comic-panel
  border**, gold mono eyebrow, Geist H3, copy, then a visual that bleeds
  toward an edge. **Hover:** lift `-translate-y-1` + `shadow-xl` + faint **ember**
  glow (see Motion).
- Tile 5 (Radio) is **physically smaller** and copy-light — a wink; first to cut
  if the grid feels tight.

## Elevation & Depth
Hierarchy comes from **tonal contrast, panel borders, and layered light** — not
heavy shadows. A surface reads "raised" by stepping `#0c0a09` → `#1a1512` with a
warm hairline, not by casting a big shadow. Shadows stay soft and low
(`shadow-sm` rest, `shadow-xl` hover). Signature depth moments: the scrolled
**nav capsule** (translucent `background/70`, `24px` blur, hairline) and the
**hero fire glow + vignette** that gives the page a lit, cinematic focal point.

## Shapes
Rounded but product-first, not playful.
- **Buttons, chips, pills, the scrolled nav capsule → `rounded-full`** (the
  ember "Download for Mac" pill; the nav capsule matches it).
- **Cards, tiles → `rounded-2xl` (16px).**
- **Inputs → `rounded-md` (10px)** — the base `--radius`.
- Keep radii consistent per family.

## Components
- **Nav** — sticky, COMPUTE-style. **Top:** full-bleed, transparent, wordmark
  flush left. **On scroll:** collapses into a floating **capsule** — insets,
  narrows (`max-w ~1180px`), `rounded-full` (pill, matching the buttons),
  `background/70` + `backdrop-blur-xl`, hairline border, soft shadow. Layout: `CONAN .sh` wordmark left · centered
  links (Features, Pricing, FAQ) · right `GitHub` (ghost) + `Download for Mac`
  (**ember pill**). No island — a passive scroll listener toggles `data-scrolled`.
- **Buttons** — primary = **ember pill** with a faint fire glow; secondary =
  ghost/outline that warms to **gold** on hover ("View on GitHub"); link = text
  (footer/legal). Action-specific labels, never "Get started". `rounded-full`,
  `label-md`.
- **Hero** — full-bleed background **loop** (`<video>` muted/loop/playsinline,
  **no autoplay**; reduced-motion → poster) behind the headline, calmed by a
  bottom-weighted **subdue scrim** so the foreground reads. A **framed app
  screenshot** (window chrome + ember/gold corner-glow) composites in front,
  bleeding off the bottom into the bento. Headline = "Command the campaign, by
  your own [cycling word]"; metric strip (Free · $39 · macOS 13+) beneath.
  Graceful until assets land (fire-glow / empty chrome frame stand in).
- **FAQ** — shadcn **Accordion** (React island), single-open, near page end.
- **CTA band** — full-width section before the footer, fire glow reprise: H2
  "Take up the steel.", ember download button, micro-line "Miss nothing."
  **Also carries the price** ("Premium $39, once") — the `#pricing` nav/footer
  link anchors here. **No pricing table by design** (one app + a $39 unlock,
  not tiers).
- **Footer** — columns (Product / Resources / Company·Legal / Social) + a trust
  strip (`© WhatMatters` · `Not affiliated with Anthropic` · `Not affiliated with
  Conan Properties Int'l` · `Payments by Polar (MoR)` · Windows/Linux
  `[notify me]`). **No standalone "Refunds" link** (refunds live in Terms).
- **WaitlistForm** (island) — email input + submit → `/api/waitlist`; inline
  success ("By steel — you're on the list.") / error states; honeypot for spam.
- **DownloadButton** — links to latest GitHub Release `.dmg`; caption
  `Free to wield · Premium $39, once · macOS 13+ (Apple silicon)` (price in gold).
- **Card / input / chip** — quiet warm containers: `bg-card`, panel border,
  `rounded-2xl` (card) / `rounded-md` (input). Chips are pill-shaped, gold mono
  eyebrow type. Iconography minimal and monochrome unless color is functional.

## Motion & micro-animation (Motion / Framer Motion)
Principle: **motion reveals, it doesn't decorate.** Fast, subtle, purposeful.
Everything degrades under `prefers-reduced-motion: reduce` (disable
transforms/auto-play; keep the instant final state). The grain is static.

- **Timing:** 150–350ms, `ease-out` (entrances), spring for playful hovers.
- **Hero:** staggered entrance — eyebrow → H1 → subhead → CTA, ~60–80ms stagger,
  fade + 8–12px slide-up. Optional very-slow drift on the fire glow (gentle, not
  flickery) and slow parallax on the product visual.
- **Scroll reveal:** sections/tiles fade + slide-up on `whileInView` (once),
  small stagger across bento tiles.
- **Bento hover:** `-translate-y-1`, shadow raise, faint **ember** ring/glow;
  spring, ~200ms.
- **"Live" product touches:** a Pulse line that **draws in** on view, a
  token/cost number that **counts up** (in gold), Timeline rows that **stream in**
  staggered, a context ring that **fills**. Looping screen-capture for the hero;
  lightweight Motion re-creations in-tile.
- **Nav:** the capsule collapse on scroll.
- **Buttons:** subtle scale/`brightness` on hover, quick press feedback.
- **Don't:** parallax everything, autoplay loud motion, flicker the fire, block
  content on animation, or animate large layout shifts (CLS killer).

## Imagery & product visuals
- Real product screenshots are the hero asset — let the UI talk. Capture clean,
  **dark HUD** (bleeds into the dark page). Frame in subtle device/window chrome.
- **Pulp art, done right:** any illustration must be **original** (commissioned
  or generated), evoking the *era and craft* (painterly light, warm palette,
  grain) — not copying any specific artist's work or character art. Tasteful and
  dev-tool-credible per the "pulp accents on a tech base" direction. When in
  doubt, lean on color/light/grain/type instead of figurative art.
- The hero layers **two** assets (both in `public/hero/`, see its README):
  **(1)** a full-bleed **atmosphere loop** (`hero-loop.mp4`/`.webm` + poster) —
  evocative sword-and-sorcery mood (ember/oxblood, smoke, grain, embers),
  **original / no franchise IP** (no Conan/Arnold/Frazetta); **(2)** a framed
  **app screenshot** (`app-screenshot.webp`) of the dark HUD. Loop ≤ a few
  seconds, muted, `prefers-reduced-motion` → static poster. With a busy loop
  *and* a screenshot on screen, push the subdue scrim darker / soften the frame
  glow so they don't compete.
- OG/social image: bull + "A barbarian misses nothing." + a HUD sliver over the
  fire glow.

## Accessibility
- Semantic HTML (`<header><main><section><footer>`, real heading order).
- Color contrast ≥ WCAG AA — **re-check bone-on-warm-black, gold text, and any
  text over the fire glow.** The grain overlay needs contrast scrutiny.
- Visible focus rings (the ember `ring`) on all interactive elements.
- `prefers-reduced-motion` honored everywhere (see Motion); grain stays static.
- Waitlist form: labeled input, error text tied via `aria-describedby`.

## Lore & IP
- **Voice = "seasoned, not cosplay."** One Hyborian beat per section
  (eyebrow/headline/microcopy), always landed by a plain product sentence.
- **Pulp via craft, not clip-art.** The atmosphere comes from color, light,
  grain, and the fire/lightning — **not** dragons/swords stock or runic
  borders.
- **IP caution (sharper now that we're in pulp territory).** "Conan / Conan the
  Barbarian" are trademarks of Conan Properties International; the Frazetta
  paintings, the 1982 De Laurentiis poster, Arnold's likeness, and Marvel/Dark
  Horse comic art are all **copyrighted** — use them **only** as private mood
  reference, **never** on the site. Evoke the era with original assets. Avoid the
  film's protected dialogue (e.g. "riddle of steel"). Keep a visible **"not
  affiliated"** line. Do **not** put a `™` on the Conan wordmark. Worth an IP
  review before launch.

## Do's and Don'ts
- **Do** keep surfaces warm-dark and let type, light, and space carry hierarchy.
- **Do** use Geist (display + body/labels) and Geist Mono (eyebrows/code)
  consistently; push display sizes bold + tightly tracked.
- **Do** keep **one** fire (oxblood→ember) + **gold** for what's earned; lean on black.
- **Do** layer pulp via grain, fire glow, vignette, and panel framing — subtly.
- **Do** prefer the ember pill for primary actions; gold for premium/lore beats.
- **Do** use the mono uppercase eyebrow as the recurring "terminal/log" signature.
- **Don't** use any copyrighted Conan art, or let the site read as a movie fan-page.
- **Don't** introduce green or bright/light sections — cadence is warm tonal steps.
- **Don't** leave display headlines loosely tracked — Geist wants `tracking-tight` big.
- **Don't** let grain/gradients hurt contrast, or let Radio/motion upstage the
  observability story.
- **Don't** hard-code hex in markup — use the Tailwind tokens.
