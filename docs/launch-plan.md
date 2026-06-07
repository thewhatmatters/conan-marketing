# conan.sh — Launch Plan & Readiness Checklist

**Type:** go-to-market / launch readiness tracker
**Created:** 2026-06-07
**Owner:** Randy (WhatMatters)
**Status:** in progress — nearing launch
**Related:** [landing-page-story.md](landing-page-story.md) (copy/positioning) ·
[../CLAUDE.md](../CLAUDE.md) (project state) · [../DESIGN.md](../DESIGN.md) (visual system)

> Living doc. Check items off as they ship. `[ ]` = todo, `[~]` = in progress,
> `[x]` = done. Each task lists concrete sub-steps + an acceptance bar so "done"
> is unambiguous. P0 = launch blocker, P1 = strongly wanted for launch day,
> P2 = fast-follow.

---

## 0. Email forwarding — Resend (P0)

Signups already persist to KV and forward-on-new is **coded and deployed**
(`src/pages/api/waitlist.ts`), but it **no-ops until the Resend key is set**.
Until then every new signup saves to KV but no email reaches `hello@conan.sh`.

- [ ] Create a **Resend account** + an **API key** (resend.com → API Keys).
- [ ] **Verify the `conan.sh` domain** in Resend (add their DNS records — SPF/
      DKIM). Required so `noreply@conan.sh` (the `WAITLIST_FROM` default) can send.
- [ ] Add **`RESEND_API_KEY`** to the `conan-marketing` Vercel env (all envs).
      Optionally override `WAITLIST_FROM` / `WAITLIST_NOTIFY_TO`.
- [ ] **Redeploy** prod so the function picks up the key.
- [ ] **Live test:** submit a real signup → confirm `hello@conan.sh` receives it
      and `reply-to` is the subscriber's address. Remove the test from the KV set.

**Acceptance:** a new signup on www.conan.sh lands an email in `hello@conan.sh`
within seconds; duplicates do not re-email; a Resend outage never breaks signup.

---

## 1. Conan icon — shared source asset (P0) — _do this FIRST_

The single brand mark that feeds the favicon, the OG image, **and** the app.
Upstream of tasks 2 & 3 — settle it first so everything stays consistent.

- [ ] Decide the mark (sword/steel motif? the wordmark glyph? a sigil?). Pull
      direction from [../DESIGN.md](../DESIGN.md) — ember `#d97706`, oxblood/gold/
      bone, warm near-black ground; "dark pulp / ink & fire."
- [ ] Produce a **master vector** (SVG) + a high-res PNG (≥1024×1024) master.
- [ ] Confirm it reads at **16×16** (favicon) and is **IP-safe** (no franchise
      likeness/logos — see CLAUDE.md IP caution).
- [ ] Hand the same master to the **app** repo (`../conan`) so app + site match.

**Acceptance:** one master asset (SVG + 1024px PNG) approved, legible tiny,
checked into both repos, and the visual source for tasks 2 & 3.

---

## 2. Favicon (P0)

- [ ] Generate the full set from the icon master: `favicon.ico` (multi-size),
      `favicon.svg`, `apple-touch-icon.png` (180×180), and a `site.webmanifest`
      with maskable 192/512 PNGs.
- [ ] Drop into `public/`; wire the `<link>` tags in `src/layouts/Layout.astro`
      (currently a placeholder per CLAUDE.md).
- [ ] Verify in a real browser tab + bookmark + iOS "Add to Home Screen."

**Acceptance:** real Conan mark shows in the tab/bookmark on light & dark
Chrome/Safari/Firefox; no 404s for icon assets; Lighthouse PWA icon check passes.

---

## 3. OG / social share image (P0)

Currently the OG `image` default in `Layout.astro` is the interim hero poster;
the intended final path is `/og-image.png` (1200×630).

- [ ] Design a branded **1200×630** OG image (mark + wordmark + one-line value
      prop, on the dark-pulp ground). Keep text legible at small Slack/X sizes.
- [ ] Save as `public/og-image.png`; swap the `image` default in
      `src/layouts/Layout.astro`.
- [ ] Validate the unfurl on **X, Slack, Discord, LinkedIn, iMessage** (use a
      cache-busting URL or the platform debuggers).

**Acceptance:** sharing www.conan.sh produces the branded card (not the poster)
across the major platforms; correct title/description; no clipped text.

---

## 4. SWOT analysis + price-point validation (P1)

Sharpen the positioning before we put it in front of a launch audience. Some
inputs already exist in [landing-page-story.md](landing-page-story.md)
(competitive notes, e.g. **opcode**) and CLAUDE.md ($39 one-time, freemium).

- [ ] **Strengths / Weaknesses / Opportunities / Threats** for Conan as built
      (native macOS HUD over Claude Code; live observability wedge).
- [ ] **Competitor scan:** opcode and any newer Claude Code GUIs / observability
      tools; how each positions + prices; where Conan wins/loses.
- [ ] **Price-point validation:** sanity-check **$39 one-time** vs comparables and
      willingness-to-pay; confirm freemium gate (free functional tier → $39
      Premium insight layer) reads right for the launch audience.
- [ ] Write up findings → feed any copy/pricing changes back into the story doc.

**Acceptance:** a short written SWOT + competitor table + a defensible
price-point recommendation (keep $39 or adjust), with launch-copy implications.

> Tip: the `deep-research` skill can fan-out the competitor/pricing scan; the
> `generate-prd`/`render-html` skills can format the writeup.

---

## 5. Product Hunt launch plan (P1)

- [ ] **Pre-launch:** create the maker account, build the product page draft
      (tagline, description, gallery — reuse OG/hero assets), line up a **hunter**
      if not self-posting, and gather **first-comment** maker story.
- [ ] **Assets:** thumbnail/logo (from task 1), 3–5 gallery images/GIFs (the live
      HUD bento tiles are strong here), optional demo video.
- [ ] **Timing:** pick the launch day (PH resets 12:01am PT; Tue–Thu typically
      strongest). Avoid clashing with major tech-news days.
- [ ] **Day-of:** post early, seed the maker comment, mobilize a notification
      list (the new updates signups!), respond to every comment fast.
- [ ] **Offer:** decide any PH-exclusive (e.g. launch-week note) — keep within the
      no-discount/$39 model unless decided otherwise.
- [ ] **Compliance:** follow PH rules — no vote manipulation; authentic asks only.

**Acceptance:** PH page fully drafted + assets ready + launch date set + a
notify list and day-of runbook in hand, ≥1 week before launch.

---

## 6. Backup / parallel distribution (P1–P2)

Don't rely on a single channel. Sequence these around the PH launch.

- [ ] **Reddit** — identify fit subs (r/ClaudeAI, r/macapps, r/commandline,
      r/programming-adjacent). Read each sub's self-promo rules; lead with value
      (the observability problem), not a pitch. Draft per-sub posts.
- [ ] **Hacker News** — a **Show HN** (title format: "Show HN: Conan – …").
      Author posts; be present for comments; expect technical scrutiny on the
      "reads ~/.claude locally, no telemetry" + pricing.
- [ ] **X/Twitter** — launch thread (problem → demo GIFs → link); tag/ping
      relevant Claude Code / dev-tools voices.
- [ ] **Communities** — relevant Discords/Slacks (Claude/AI-dev), Lobsters,
      Indie Hackers, dev newsletters.
- [ ] **Owned** — email the updates list on launch day (Resend, task 0); link from
      the app if appropriate.
- [ ] Prepare a **fallback plan** if PH underperforms: stagger HN/Reddit on
      following days so momentum isn't spent at once.

**Acceptance:** a channel-by-channel calendar (what posts where, which day, who
authors), draft copy per channel, and each community's rules pre-checked.

---

## Other known launch blockers (from CLAUDE.md — track here too)

- [ ] **Download URL** — Header/Hero/CTA "Download for Mac" are `#`/`#download`
      stubs; point at the latest GitHub Release `.dmg`.
- [ ] **Buy/checkout URL** — wire the **Polar** checkout link when it exists.
- [ ] **IP review** — quick pass before launch (trademark caution in CLAUDE.md).
