# Hero background loop — drop assets here

`Hero.astro` references three files in this folder. Until they exist, the hero
falls back to the warm fire-glow gradients (the current look — no broken state).

| File | What it is | Notes |
|---|---|---|
| `hero-loop.mp4` | Primary loop, **H.264 / yuv420p** | Widest browser support. Required. |
| `hero-loop.webm` | Optional smaller VP9 copy | Served first when supported; skip if you only have one file. |
| `hero-poster.jpg` | First/representative frame | Shown before play **and** for reduced-motion users. Optimize < 200 KB. |
| `app-screenshot.webp` | Conan app capture for the **framed mockup** in front of the loop | 16:10, ~1600×1000, < 300 KB. Missing → the empty chrome frame stands in. |

## Specs (keep the page fast — the whole site is built for top Lighthouse)
- **Duration:** 6–12 s, **seamless loop** (last frame matches first).
- **Resolution:** 1920×1080 (1280×720 is fine).
- **Audio:** none — strip the track (the video is muted anyway).
- **Size budget:** target **< 3–4 MB** for the mp4. Compress hard.

## Compress / make the poster (ffmpeg)
```bash
# mp4 (H.264, web-optimized, no audio)
ffmpeg -i source.mov -c:v libx264 -pix_fmt yuv420p -crf 26 -preset slow \
  -an -movflags +faststart -vf "scale=1920:-2" hero-loop.mp4

# optional smaller webm (VP9)
ffmpeg -i source.mov -c:v libvpx-vp9 -crf 34 -b:v 0 -an hero-loop.webm

# poster from the first frame
ffmpeg -i hero-loop.mp4 -frames:v 1 -q:v 3 hero-poster.jpg
```

## ⚠️ IP — evoke, don't infringe
"Conan the Barbarian", the 1982 film, **Arnold Schwarzenegger's likeness**, and
Frazetta/poster art are protected (see `CLAUDE.md` / `DESIGN.md`). The loop must
**evoke** sword-and-sorcery via mood/color/grain — **not** depict the trademarked
character or any recognizable actor. Keep the "not affiliated" line on the page.

## Generation prompt (tool-agnostic — Runway / Kling / Luma / Sora / Pika)
> Cinematic **seamless loop**, dark sword-and-sorcery atmosphere. A lone armored
> warrior in **silhouette**, back to camera, stands on a rocky ridge; cloak and
> embers drift in the wind. Firelight glows from below — deep **ember-orange and
> oxblood red** against near-black. Slow, subtle parallax push-in. Heavy film
> grain, volumetric smoke, rising sparks. Moody low-key lighting. 35mm anamorphic,
> shallow depth of field. Palette: warm near-black, ember `#d97706`, oxblood
> `#7f1d1d`, gold highlights, bone-white sparks. **Loopable** — final frame
> matches the first. No text, no logos.
>
> **Avoid:** Conan, Arnold Schwarzenegger, any recognizable real person, franchise
> logos, on-screen text, modern objects.

Safest variant if a figure feels risky: **no character at all** — just fire,
smoke, embers, and grain drifting over a dark warm field. Pure "ink & fire."
