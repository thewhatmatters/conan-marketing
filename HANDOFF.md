# Handoff — conan.sh marketing site

_Last updated: 2026-06-03 (session 2)_

## Goal
Polish pass on the landing page: hero cleanup, asset/video hygiene, a Terms +
Privacy legal section, and a reworked closing section (barbarian footer graphic
+ final CTA). Baseline system: `CLAUDE.md` + `DESIGN.md`. Prior session notes
preserved under "Previous handoff" sections below.

## Git state
- Branch `main` (trunk-based; `main` auto-deploys to www.conan.sh via Vercel).
- This session's work is being committed + pushed now (per user request).
- Dev server: `npm run dev` → http://localhost:4321/ . `npm run build` is green;
  `/`, `/terms`, `/privacy` all prerender.

## What got done this session (all verified in-browser via automate-browser)

### 1. Hero (`src/components/Hero.astro`)
- **Brightened the video** — removed the hero-veil (radial 0.38), edge vignette
  (0.65), left readability scrim (0.85), and the faint warm grid overlay.
  **Kept** the subdue scrim + bottom blend + edge feather (the graceful
  bottom-dissolve into the next section). The footage now reads clearly.
- `.hero-veil` keyframes in `global.css` are now **dead CSS** (harmless; can be
  cleaned in a pass).
- Tried a halftone overlay (`public/halftone.png`) over the video — **abandoned**:
  a dot sheet over footage just adds noise; halftone only reads as print over a
  light ground / when authored into art. `halftone.png` left in `public/` unused.

### 2. Video folder cleanup + mobile fallback
- `public/video/` trimmed 8→4 files. Deleted (tracked, recoverable via
  `git checkout`): `conan-battle-dark.mp4`, `conan-horse-dark.mp4`,
  `conan-battle-dark-new.mp4`. Deleted (untracked) the 6.3MB
  `conan-horse-dark-to-gif.mp4`. **Kept:** `conan-battle-dark-new-keyed.mp4`+`.jpg`
  (hero), `conan-horse.mp4`+`.png` (FAQ rider).
- **Mobile poster fallback** (Hero + FAQ): videos now have NO `autoplay` and
  `preload="none"`; a script plays them only on `≥768px` + motion-allowed. On
  phones the `.mp4` is never fetched (verified: 0 mp4 requests at 390px) — poster
  image stands in. Reduced-motion still gets the poster.

### 3. Legal pages — NEW
- **`src/layouts/LegalLayout.astro`** — shared shell: mounts the global
  `<Header />` + a sticky sidebar **Terms↔Privacy switcher** + `<Footer />`.
  Two real routes share it (cohesive UX, but distinct linkable/SEO/compliance
  URLs — Apple/Polar can link `/privacy` directly). Active doc = square (no
  rounded) tab w/ ember left-bar + flat card fill. In-doc TOC was added then
  **removed** per request. Body typography via `is:global` scoped to `.legal-body`.
- **`src/pages/terms.astro`** + **`src/pages/privacy.astro`** — scaffolded with
  real facts (Polar = Merchant of Record, $39 one-time/freemium/lifetime-1.x,
  not-affiliated, app=local/no-telemetry vs site=waitlist-email+Polar). Every spot
  needing binding legal text is a `DRAFT ·` ember-bordered `.todo` block — **must
  be replaced with counsel-reviewed copy before launch.**
- FAQ has a "Where are the Terms and Privacy Policy?" item linking to both
  (verified: links resolve to `/terms`, `/privacy`).

### 4. Header made page-aware (`src/components/Header.astro`)
- Nav hrefs are now absolute (`/#features`, `/#faq`, `/#waitlist`, download
  `/#download`) so they work from the legal pages too.
- Scroll-spy derives the `#hash` from each href and **no-ops** on pages without
  those sections (legal pages) — no errors. Scoped to `a[href*="#"]`.
- A "Legal" nav link + render-time active state were added then **removed** ("just
  doesn't flow well"). Legal is reachable via the FAQ item only now.

### 5. Closing section: footer graphic + CTA (the big rework)
- **`Footer.astro`** is now a **pure barbarian graphic** (no nav, no brand mark,
  no trust strip — all removed per request). It renders the figure (in normal
  flow, sets the height) + the giant **CONAN** wordmark behind it
  (`from-ember/60`) + a bottom-blend gradient that dissolves into `#0c0a09`.
- **Asset:** user dropped `public/footer/conan-footer.png` (first version had the
  editor's transparency **checkerboard** baked into the semi-transparent base
  dust — same failure mode as the keyed videos). User re-exported a clean PNG.
  Processed via ImageMagick → **`public/footer/conan-footer-web.webp`** (trimmed
  margins + resized 1600w, **158KB** from a 10MB source). The footer `<img>` uses
  the `.webp`; the original `.png` is left untouched (no-overwrite rule).
- **Order swapped** (`index.astro`): the barbarian graphic (`<Footer />`) now
  renders **above** the final CTA (`<CTA />`), so the page closes with: graphic →
  "Miss nothing" → "Take up the steel" → Download → waitlist.
- **No glow anywhere** in this closing area — CTA fire glow, CTA vignette, and the
  footer's top ember glow were ALL removed (user: "NO GLOW EFFECT"). CTA top
  border removed too. The graphic + CTA read as one seamless dark section.

## Open threads / next steps
- **Legal copy is placeholder** — replace all `.todo` DRAFT blocks with real
  counsel/Polar-template text before launch; set the "Last updated" dates.
- **"Not affiliated" disclaimer** — removing the footer trust strip removed the
  at-a-glance affiliation/copyright line that `CLAUDE.md`/`DESIGN.md` ask to keep
  visible. It now lives only in the FAQ answer + Terms page. Confirm that's
  acceptable or reinstate a slim disclaimer somewhere.
- **`Footer.astro` is a misnomer** now (it's a graphic banner above the CTA, and
  there's no semantic page-footer at the very bottom). Optional tidy: fold the
  graphic into the CTA as one component.
- **Dead CSS:** `.hero-veil` keyframes in `global.css` are unused.
- **Carried over:** real circular logo (swap the "C" `<span>` in `Header.astro`);
  wire real Download `.dmg` / Polar checkout URLs (still `/#download` stubs);
  favicon, OG/SEO meta, KV creds for the waitlist.

## Don't redo
- **Halftone-over-video / dot-sheet-as-texture is a dead end** — needs a light
  ground or authored-into-art; don't re-overlay `public/halftone.png`.
- **No alpha/transparent video or baked-checkerboard assets** — flatten/key onto
  `#0c0a09` and feather, or crop the checker band out (as done for the footer PNG).
- **Never overwrite a user-dropped source** — process to NEW filenames
  (`conan-footer.png` → `conan-footer-web.webp`).
- **No glow** in the CTA/footer closing section (explicitly rejected, repeatedly).

---

## Previous handoff (2026-06-03, session 1)

Goal: hero battle-clip keying + nav "Get notified" + scroll-spy fix. HEAD then
`f341809`. Key context: the dropped `conan-battle-dark-new.mp4` had the editor's
transparency checkerboard + dark side-bars baked in; keyed to `…-new-keyed.mp4`
via ffmpeg + ImageMagick edge flood-fill + a numpy pocket-clear pass. (That source
mp4 was deleted in session 2's cleanup — recoverable from git history if re-keying
is ever needed.) Toolbox: numpy + ImageMagick + ffmpeg, no PIL/scipy/cv2.

## Previous handoff (2026-06-02)

Public marketing landing page for conan.sh (sells Conan, the macOS app observing
Claude Code). Single Astro page, dark "ink & fire" pulp aesthetic. Decisions
(durable): video backgrounds = opaque keyed onto `#0c0a09` + CSS feather, NOT
alpha (cross-browser transparent video unreliable); nav compacts on scroll to a
JS-measured `--nav-hug` width with a sliding pill. Components:
`src/components/{Header,Hero,Bento,FAQ,CTA,Footer}.astro`. `npm run dev` (:4321);
verify with the automate-browser skill.
