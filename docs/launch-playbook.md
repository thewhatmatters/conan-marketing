# Conan — Launch Playbook (Product Hunt + Distribution)

**Type:** go-to-market execution playbook (launch-plan.md tasks #5 + #6)
**Created:** 2026-06-07
**Owner:** Randy (WhatMatters)
**Status:** draft — ready to execute once a launch date is set
**Inputs:** [research-conan-swot-competitive-pricing.md](research-conan-swot-competitive-pricing.md)
(positioning) · [landing-page-story.md](landing-page-story.md) (voice) ·
[launch-plan.md](launch-plan.md) (tracker)

> **How to read this:** the calendar is **T-minus / T+** relative to **Launch
> Day = T** (the Product Hunt go-live). Pick a **Tuesday–Thursday** and
> everything else hangs off it. All copy below is **draft** — refine in your
> voice before posting.

---

## 0. Decisions to lock first (drive everything else)

| Decision | Recommendation | Why |
|----------|----------------|-----|
| **Launch date** | A **Tue–Thu**, ~3–4 weeks out (lets the updates list grow + assets land) | Mon/Fri underperform on PH ([Demand Curve](https://www.demandcurve.com/playbooks/product-hunt-launch)) |
| **Self-hunt vs hunter** | **Self-hunt** unless a well-followed hunter volunteers | Hunter prestige matters less in 2026; maker authenticity matters more |
| **Demo video** | **Yes — a 30–60s screen capture** of the live HUD | Demo videos are the single biggest converter on PH + r/SideProject ([SaaSCity](https://saascity.io/blog/best-subreddits-promote-startup-2026)) |
| **Launch offer** | Optional **"launch price $29 → $39"** anchor (no discount below $29) | Preserves the $29 price; adds urgency without cheapening |
| **Blocking pre-reqs** | Real **Download URL**, **OG image**, **favicon**, **Resend** live | Don't launch with `#` stubs — see launch-plan P0s |

**Hard gate:** do **not** launch until the Download link works, the site has a
real OG image/favicon, and the waitlist→`hello@conan.sh` forward is live. A PH/HN
spike on a broken funnel is a wasted, unrepeatable shot.

---

## 1. Positioning for launch (from the research — read before writing copy)

The wedge "see what your agent is doing" is **commoditized** (free OSS: Claude
HUD, ccusage, opcode; plus Anthropic's own context indicator). So **do not lead
with that claim** — you'll get "isn't this just Claude HUD / opcode but paid?"
in the comments. Lead instead with what's defensible:

- **Always-on, ambient, native.** A beautiful second-screen HUD that lives
  open — not a hover indicator (official app) or a cramped statusline (Claude HUD).
- **Unified breadth in one designed surface** — timeline + context + cost/pulse +
  skills/MCP together, not five CLIs.
- **The money angle** — catch a Claude Code **cost spike** (can run 10–500×)
  before it bites. Concrete and monetizable.
- **Taste / brand** — the dark-pulp identity is the moat OSS clones won't copy.

**Have answers ready** (you WILL get these, especially on HN/Reddit):
- *"Why pay when Claude HUD/ccusage/opcode are free?"* → honest: those are great
  CLIs/plugins; Conan is a native, always-on, designed HUD; free tier to judge
  for yourself; $29 one-time, no sub.
- *"Isn't this just a wrapper?"* → it's an observer over your local `~/.claude`;
  no telemetry, your data never leaves the Mac.
- *"macOS only?"* → yes, today; Windows/Linux on the waitlist.

---

## 2. Product Hunt launch (#5)

### 2a. Page assets (draft)

**Name:** Conan

**Tagline (≤60 chars) — pick one:**
- `The always-on HUD for Claude Code on your Mac`
- `See what Claude Code is doing — live, on macOS`
- `A native macOS HUD for your Claude Code sessions`

**Topics/tags:** Developer Tools · Artificial Intelligence · Mac · Productivity

**Description (≤260 chars):**
> Conan is a native macOS app that wraps Claude Code in a live HUD — every
> prompt, tool call, skill, and token, surfaced as it happens. Watch context
> fill, catch cost spikes, and see what your agent is actually doing. Free to
> use; $29 once unlocks Premium. No subscription.

**Gallery shot list (5–6, first one is the thumbnail):**
1. Hero — the full HUD over a live session (the money shot).
2. **Animated GIF** — events streaming into the timeline in real time.
3. Pulse/usage chart — tools/prompts/session cost over time.
4. Context breakdown — the segmented context-window bar.
5. Skills & MCP browser.
6. The "framed app" hero composition from the site (brand consistency).

**Maker's first comment (draft — post immediately on go-live):**
> Hey PH 👋 I'm Randy, I built Conan.
>
> I use Claude Code all day, and I kept losing the thread of what it was
> *actually* doing — which tools it fired, how full the context was, and how
> much a session was quietly costing me. The terminal hides all of it.
>
> Conan is a native macOS app that sits beside Claude Code and turns its local
> session data into a live HUD: a streaming timeline of every prompt/tool/skill,
> a context-window gauge, a usage+cost pulse, and a skills/MCP browser. It reads
> `~/.claude` on-device — no telemetry, nothing leaves your Mac.
>
> It's free to use; a one-time $29 unlocks Premium (no subscription, lifetime
> 1.x updates). macOS-first — Windows/Linux folks can grab the waitlist.
>
> There are great free CLI tools in this space (ccusage, Claude HUD) — Conan's
> bet is that an always-on, *native* HUD you glance at on a second screen is
> worth it. I'd genuinely love your feedback on whether it earns its place.
>
> Download: https://www.conan.sh

> Voice note: PH tolerates a little personality, but the maker comment should be
> **honest and human**, not pulp cosplay. Save the Hyborian flourish for the
> site/X.

### 2b. Timing & mechanics

- **Schedule 7 days ahead** in the PH dashboard; set timezone to **PT** (PH
  doesn't localize) ([Mayday](https://mayday.am/blog/how-to-successfully-launch-on-product-hunt-on-the-same-day-as-your-competitor.html)).
- **Go live 12:01 AM PT** to get the full 24h on the homepage; the front page
  resets at midnight PT ([Swipe Files](https://www.swipefiles.com/articles/how-to-launch-on-product-hunt),
  [getlaunchlist](https://getlaunchlist.com/checklists/producthunt)).
- **Plan 3 outreach pushes** across the day to keep a steady upvote stream (PH's
  algorithm rewards consistency, not one spike) — morning PT, midday EU overlap,
  evening ([Lenny's](https://www.lennysnewsletter.com/p/how-to-successfully-launch-on-product)).
- **Reply to every comment**, all day — it enriches the page and pulls visitors
  ([Tom Dekan](https://tomdekan.com/articles/product-hunt-launch-guide)).

### 2c. Day-of runbook (times in PT)

- **12:01 AM** — confirm live; post the maker's first comment; sanity-check the
  Download link + OG unfurl one more time.
- **12:05 AM** — notify your warmest, PH-savvy contacts first (DMs, not a blast).
- **6–7 AM** — Push #1: email the **updates list** (Resend), post the **X thread**,
  post to **r/ClaudeAI**.
- **9–10 AM** — Push #2: personal network, relevant Slacks/Discords; reply to all
  comments so far.
- **12–1 PM** — Push #3: catch EU/East-coast; share progress ("we're #N").
- **All day** — reply to every comment within minutes; thank upvoters; fix any
  bug reports live.
- **Next morning** — thank-you comment + recap; roll into the distribution wave.

### 2d. Pre-launch (T-7 to T-1)
- T-7: draft + schedule the PH post; finalize gallery + GIF.
- T-7..T-2: line up advocates (share the scheduled link for *feedback*, not votes
  — votes only count once live).
- T-3: dry-run the funnel (click Download, submit waitlist, check the email).
- T-1: write all distribution copy (below); queue the X thread; final asset pass.

---

## 3. Backup / parallel distribution (#6)

**Sequencing principle:** don't spend every channel on T. PH + owned + X +
r/ClaudeAI on **T**; stagger **Show HN** and the other subreddits across **T+1
to T+4** so you get multiple bites and a fallback if PH stalls.

### 3a. Show HN (target T+1, ~8–10 AM ET)
HN punishes marketing voice — be **plain, technical, first-person**.

- **Title (≤80 chars):** `Show HN: Conan – a native macOS HUD for watching Claude Code work`
- **URL:** https://www.conan.sh
- **First comment (draft):**
  > I built Conan because I couldn't tell what Claude Code was doing mid-session —
  > which tools it ran, how full the context was, what it was costing. It's a
  > native macOS app that reads Claude Code's local `~/.claude` session data and
  > renders it as a live HUD: streaming event timeline, context-window gauge,
  > usage/cost pulse, and a skills/MCP browser. All on-device, no telemetry.
  >
  > It's free to use; $29 one-time unlocks the deeper views (no subscription).
  > macOS-only right now. Known neighbors: ccusage and the Claude HUD plugin (both
  > great, both CLI/terminal) — Conan's angle is an always-on native GUI.
  >
  > Happy to answer anything about how it reads the session data, the privacy
  > model, or the pricing. Feedback welcome — especially what'd make it a daily
  > driver.
- **Checklist before posting** ([Syften](https://syften.com/blog/hacker-news-marketing)):
  title starts `Show HN:` · you made it · others can try it · non-trivial · ready
  for feedback · pricing page clear · everything works.
- **Be present** for 3–4 hrs to answer; expect scrutiny on privacy + "why not the
  free tools."

### 3b. Reddit (stagger T+1 … T+4 — one sub/day, never copy-paste)
Disclose you're the maker **up front**. Tailor each post; lead with value.

| Subreddit | Angle / format | Notes |
|-----------|----------------|-------|
| **r/ClaudeAI** | Primary. "I built a native macOS HUD for Claude Code" + GIF | The core audience — post on **T** morning |
| **r/SideProject** (~250–600K) | "I built this…" + 30s demo + honest "rough edges" disclaimer | Most self-promo-friendly ([SaaSCity](https://saascity.io/blog/best-subreddits-promote-startup-2026)) |
| **r/macapps** | Native-Mac-app angle; screenshots; price up front | Mac crowd rewards polish |
| **r/AgentLLM** (~40K, open) | Agent-observability angle | Agent builders ([Linkeddit](https://linkeddit.com/blog/best-subreddits-for-ai-marketing-2026)) |
| **r/LocalLLaMA** | **Use-case writeup** (600–1200 words), local/no-telemetry focus | Writeups win here ([FORKOFF](https://forkoff.xyz/blog/founder-growth/reddit-for-ai-startups-2026-stack)); avoid pure promo |
| **r/SaaS** | Weekly self-promo thread only | Founder audience, not buyers |

**r/ClaudeAI post (draft):**
> **I built Conan — a native macOS HUD that shows what Claude Code is doing, live**
> (maker here). I kept losing track of which tools Claude Code fired, how full my
> context was, and what a session cost. Conan reads your local `~/.claude` data
> and shows it as a live HUD — timeline, context gauge, usage/cost pulse,
> skills/MCP — all on-device, no telemetry. Free to use; $29 one-time for the
> deeper views. macOS-only for now (Windows/Linux waitlist on the site). Would
> love feedback from people who live in Claude Code: what's missing? [demo GIF]

> **Rules first:** check each sub's self-promo policy; respond to every comment;
> never cross-post the identical text (filters + mods flag it).

### 3c. X/Twitter thread (post on T, ~7 AM PT)
Voice can carry the brand here. 5 tweets:
1. **Hook:** "Claude Code hides what it's actually doing. Conan shows you — live."
   + the hero GIF.
2. The pain → the HUD (timeline / context / cost / skills) — one line each.
3. The money line: "Catch a 10–500× cost spike before it bites." + pulse shot.
4. Honesty + model: "Local, no telemetry. Free to use, $29 once, no subscription."
5. **CTA:** "macOS today, Windows/Linux on the waitlist → conan.sh" + PH link +
   "we're live on Product Hunt, an upvote helps 🙏".
- Tag/reply relevant Claude Code & Mac-dev-tool voices (genuinely, not spammy).

### 3d. Owned + communities
- **Email the updates list** (Resend) on T morning — your warmest traffic.
- **Discords/Slacks:** Claude/AI-dev communities, Indie Hackers, Lobsters
  (`Show Lobsters` if you have an invite). Post where you're already a member;
  don't drive-by.
- **Dev newsletters:** pitch a one-liner to relevant roundups a week ahead.

### 3e. Fallback plan (if PH underperforms by midday T)
- Don't panic-blast every channel. **Hold Show HN + the remaining subreddits** —
  they're independent of PH and can carry the launch on their own.
- Re-aim energy at **HN + r/ClaudeAI**, where substance beats vote-mechanics.
- A modest PH placement is fine — the durable wins here are HN front page and the
  subreddit threads, which keep sending traffic for weeks. Treat PH as one shot
  among several, not the whole launch.

---

## 4. Post-launch (T+1 … T+7)
- Reply to every comment everywhere for 48h.
- Capture testimonials/quotes for the site.
- Log what converted (PH vs HN vs which sub) — informs the next push.
- Send a "we launched" follow-up to the updates list with what's next.
- Feed objections heard ("why not free", feature gaps) back into copy + roadmap.

---

## Sources
[Demand Curve PH guide](https://www.demandcurve.com/playbooks/product-hunt-launch) ·
[Lenny's PH guide](https://www.lennysnewsletter.com/p/how-to-successfully-launch-on-product) ·
[Swipe Files PH playbook](https://www.swipefiles.com/articles/how-to-launch-on-product-hunt) ·
[getlaunchlist PH checklist](https://getlaunchlist.com/checklists/producthunt) ·
[Mayday PH scheduling](https://mayday.am/blog/how-to-successfully-launch-on-product-hunt-on-the-same-day-as-your-competitor.html) ·
[Tom Dekan PH](https://tomdekan.com/articles/product-hunt-launch-guide) ·
[Syften HN guide](https://syften.com/blog/hacker-news-marketing) ·
[SaaSCity subreddits](https://saascity.io/blog/best-subreddits-promote-startup-2026) ·
[Linkeddit AI subreddits](https://linkeddit.com/blog/best-subreddits-for-ai-marketing-2026) ·
[FORKOFF Reddit stack](https://forkoff.xyz/blog/founder-growth/reddit-for-ai-startups-2026-stack)
