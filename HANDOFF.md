# Handoff — conan.sh marketing site (hero video · nav · FAQ rider)

_Updated 2026-06-02 · session refresh checkpoint_

## Goal
Public marketing landing page for **conan.sh** (sells Conan, the macOS app that
observes Claude Code). Single Astro page, dark "ink & fire" pulp aesthetic.
This session was a polish pass: hero background video, a heavily-reworked nav,
and the FAQ rider cut-out. See `CLAUDE.md` + `DESIGN.md` for the baseline system.

## Current state
All committed **and pushed to `main`** (HEAD `645ae49`); build green;
www.conan.sh auto-deploys from `main` (push → Vercel). Highlights:
- **Hero** (`Hero.astro`) — full-bleed background loop `conan-battle-dark.mp4`
  (keyed onto `#0c0a09`). `autoplay muted playsinline loop` + real
  `hero-poster.jpg` for reliable iOS autoplay. Sequenced reveal: clean video on
  load → `hero-veil` radial darken fades in after the headline rises. Radial is
  light (0.05→0.38). Fire-glow removed. Edge feather (inset `#0c0a09`) hides the
  baked-black seam. Bottom-blend ramps to `#0c0a09` into the next section.
- **Header/nav** (`Header.astro`) — compacts on scroll into a content-hugging
  pill that **animates smoothly** (`max-width` → measured `--nav-hug`, links
  stay inline via equal `flex-1` sides). **Scroll-spy** with a single **shared
  sliding highlight pill** (`#nav-pill`, driven by IntersectionObserver +
  `movePill()`). **Circular logo placeholder** ("C" in a ring — swap for an
  `<img class="h-9 w-9 rounded-full object-cover">`). 44px gaps; chip matches the
  Download button (36px, px-4). Lightning lottie only on scroll/nav-click.
- **FAQ** (`FAQ.astro`) — rider cut-out (`conan-horse.mp4`, opaque keyed
  `#0c0a09`) under the headline, `aspect-square max-w-[480px]`, lifted behind the
  copy. Edge feather + bottom-fade so the hooves dissolve into the page. Poster
  `conan-horse.png` (transparent). Contact link is `mailto:hello@whatmatters.so`.
- **GitHub fully removed** from the site (no public source). **Geist Mono
  dropped** — Geist throughout.

## Next steps
1. **Real circular logo** → replace the `<span>C</span>` placeholder in
   `Header.astro` with `<img class="h-9 w-9 rounded-full object-cover" src="…">`.
2. **Confirm the FAQ contact email** — `hello@whatmatters.so` is a placeholder.
3. **Mobile hero scrim** — the desktop left→right readability scrim blankets most
   of a phone's width, hiding the video. Make it responsive (top/bottom scrim on
   mobile) so the loop reads. (Known, not yet done.)
4. **Wire real URLs** — Download (`#download`) and any Buy still point at the CTA
   band; swap for the latest Release `.dmg` / Polar when published.
5. **Cleanup** — unused `~/Desktop/archive/*.mp4` variants + untracked
   `public/video/conan-horse-dark-to-gif.mp4` (the FAQ source); old
   `public/video/conan-battle.mp4`/`-1` if still around.

## Key decisions (and why)
- **Video backgrounds = opaque, keyed onto `#0c0a09` + a CSS edge feather — NOT
  alpha.** Cross-browser transparent video is unreliable: Safari's
  `hevc_videotoolbox` alpha silently encodes **opaque yuv420p** (→ black box),
  and VP9-alpha webm is Chrome/Firefox-only. On the flat-dark sections the
  keyed+feather clip looks identical and plays everywhere.
- **NEVER overwrite a user-dropped asset.** I destroyed a dropped source with
  `mv` this session — process to NEW filenames, leave the source. (Saved to the
  memory system: `no-overwrite-dropped-assets`.)
- **Nav smoothness** — can't transition `width:max-content`/`max-width:0`; the
  fix is animating `max-width` to a JS-**measured** content width (`--nav-hug`),
  with links inline in both states so there's no layout-reflow snap.
- **Sliding pill** beats per-chip fades for the active state (one element,
  position/width transition).

## Files & commands in play
- Components: `src/components/{Header,Hero,FAQ,CTA,Footer}.astro`.
- Assets: `public/video/conan-horse.{mp4,png}`, `public/video/conan-battle-dark.mp4`,
  `public/hero/hero-poster.jpg`. Source (untracked): `conan-horse-dark-to-gif.mp4`.
- Run: `npm run dev` (:4321) · `npm run build`. Verify visually with the
  **automate-browser** skill (headless Chromium screenshots).
- ffmpeg recipe (key checkerboard → `#0c0a09`, the working pattern):
  `color=0x0c0a09…[bg];[0:v]colorkey=0xe6e6e6:0.30:0.12[fg];[bg][fg]overlay,format=yuv420p`.

## Git state
Branch `main`, **clean** except untracked `public/video/conan-horse-dark-to-gif.mp4`
(user's FAQ source — intentionally not committed). Everything else committed +
pushed this session.

## Don't redo
- **Alpha/transparent video** for these sections — Safari HEVC-alpha = opaque
  yuv420p; VP9-alpha = Chrome/FF only. Use keyed-`#0c0a09` + feather.
- **GIF** for the rider — larger, 256-colour, 1-bit jagged transparency; worse
  than the mp4 on every axis.
- Don't re-introduce the fire-glow hero layer or the per-chip nav background.
- Don't `mv`/overwrite dropped source files.
