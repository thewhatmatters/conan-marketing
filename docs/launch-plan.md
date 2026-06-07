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
(competitive notes, e.g. **opcode**) and CLAUDE.md ($29 one-time, freemium).

- [x] **Strengths / Weaknesses / Opportunities / Threats** for Conan as built
      (native macOS HUD over Claude Code; live observability wedge).
- [x] **Competitor scan:** opcode and newer Claude Code GUIs / observability
      tools; how each positions + prices; where Conan wins/loses.
- [x] **Price-point validation:** sanity-checked pricing vs comparables and
      willingness-to-pay; confirmed the freemium gate reads right.
- [x] **Decision (2026-06-07): price set to $29 one-time** (down from $39) — see
      note below. Site + docs updated.
- [ ] **Sync the price everywhere else** — set the **Polar** product to $29 and
      update the **product repo** (`../conan`) so site/checkout/app all agree.
- [ ] **Act on remaining findings** — apply the positioning/gate takeaways below.

**Research:** ✅ done 2026-06-07 →
[research-conan-swot-competitive-pricing.md](research-conan-swot-competitive-pricing.md)
(28 cited sources, deep-research exhaustive).

**Key takeaways (act on these):**
- The competitive threat is **"free," not "expensive"** — the core wedge is
  commoditized by free OSS (Claude HUD ~18k installs, ccusage 10k+★, opcode) and
  Anthropic's own desktop context indicator. The research found $39 defensible,
  but given the free competition the owner chose **$29 one-time** to lower the
  "why pay vs free?" friction (under the $30 threshold, still in the indie band).
  The decisive lever remains free-tier strength + Premium framing, not the price.
- **Differentiate on experience + brand**, not the (now table-stakes) "see your
  agent" claim or "local/no-telemetry" (rivals say the same). Lead on
  **always-on** (vs official hover-only indicator) + **unified breadth** + taste.
- **Fix the gate:** Premium should unlock the **insight layer** (history, trends,
  **cost-spike detection** — Claude Code spend can spike 10–500×), NOT radio.
- Price **decided: $29** (poll no longer needed; revisit post-launch if data warrants).

**Acceptance:** ✅ SWOT + competitor table + defensible price recommendation with
launch-copy implications — delivered. Remaining: apply the takeaways to copy/gating.

---

## 5. Product Hunt launch plan (P1)

**Plan drafted** → [launch-playbook.md §2](launch-playbook.md) — page copy
(tagline/description/topics), gallery shot list, maker's first comment, timing
mechanics (12:01am PT, Tue–Thu), and an hour-by-hour day-of runbook.

- [x] **Pre-launch plan** drafted — page copy, maker story, schedule-7-days steps.
- [x] **Asset list** specified — thumbnail + 3–5 gallery shots + 30–60s demo GIF.
- [x] **Timing** approach set (12:01am PT, Tue–Thu, 3 outreach pushes).
- [x] **Day-of runbook** written (hour-by-hour, PT).
- [x] **Offer** decision captured — optional "launch $39 → $49" anchor (no sub-$39).
- [ ] **Execute:** create maker account, pick the date, produce assets (needs the
      icon #1 + demo recording), schedule the post, line up advocates.

**Acceptance:** ✅ PH page drafted + assets specced + timing + day-of runbook in
hand. Remaining: set the date + produce assets + schedule (execution).

---

## 6. Backup / parallel distribution (P1–P2)

**Plan drafted** → [launch-playbook.md §3](launch-playbook.md) — per-channel
**draft copy** + a T/T+ sequencing calendar + a PH-underperforms fallback.

- [x] **Reddit** — sub list w/ rules + tailored drafts (r/ClaudeAI primary,
      r/SideProject, r/macapps, r/AgentLLM, r/LocalLLaMA, r/SaaS).
- [x] **Show HN** — title + plain first-comment draft + pre-post checklist.
- [x] **X/Twitter** — 5-tweet launch-thread outline.
- [x] **Communities + Owned** — Discords/Slacks/Lobsters/IH + email-the-list (Resend).
- [x] **Fallback plan** — stagger Show HN + remaining subs T+1…T+4; treat PH as one
      shot among several, not the whole launch.
- [ ] **Execute:** post per the calendar on/after launch day.

**Sequencing:** PH + owned email + X + r/ClaudeAI on **T**; Show HN **T+1**;
other subreddits spread **T+1…T+4** (one/day, never copy-pasted).

**Acceptance:** ✅ channel-by-channel calendar + draft copy + rules pre-checked.
Remaining: post it when you launch.

**Acceptance:** a channel-by-channel calendar (what posts where, which day, who
authors), draft copy per channel, and each community's rules pre-checked.

---

## Other known launch blockers (from CLAUDE.md — track here too)

- [ ] **Download URL** — Header/Hero/CTA "Download for Mac" are `#`/`#download`
      stubs; point at the latest GitHub Release `.dmg`.
- [ ] **Buy/checkout URL** — wire the **Polar** checkout link when it exists.
- [ ] **IP review** — quick pass before launch (trademark caution in CLAUDE.md).
