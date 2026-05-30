# conan.sh — Landing Page Story & Positioning

**Type:** competitive / product-positioning research → copy recommendations
**Date:** 2026-05-30
**For:** designer + copywriter handoff
**Status:** ready to iterate

---

## 0. TL;DR — the recommendation

**Lead with the observability story, not the "GUI for Claude Code" story.**

Conan's sharpest wedge is: *you can't see what your coding agent is actually
doing — Conan shows you, live, without leaving your terminal.* This hooks a
real, currently-felt pain (token spend anxiety, context-window blindness,
"what is it doing right now?") and cleanly separates Conan from the main
free competitor, **opcode**, which positions as a session **manager / command
center** ([opcode README](https://github.com/winfunc/opcode)).

- **Positioning line:** *The cockpit for Claude Code.* (a.k.a. flight recorder
  / mission control — see §1). **In the Hyborian voice:** *A barbarian misses
  nothing — and now, neither do you.* (see §0.5 for the lore kit).
- **Primary CTA:** `Download for Mac` (action-specific, not "Get started") —
  the [Evil Martians study of 100 devtool pages](https://evilmartians.com/chronicles/we-studied-100-devtool-landing-pages-here-is-what-actually-works-in-2025)
  found generic CTAs underperform action-specific ones.
- **Windows:** don't apologize, don't hide it — a small "macOS first ·
  Windows? → join the list" line under the hero CTA (email capture). Honest
  "macOS first" framing + a waitlist is the standard indie pattern
  ([waitlist examples](https://getlaunchlist.com/blog/waitlist-landing-page-examples-that-convert)).
- **Price story:** one-time $39, *"free updates within 1.x"* — sell it as
  *fully delivered value at first launch, no subscription* — the exact framing
  the Setapp monetisation guide says works for one-time apps
  ([Setapp](https://setapp.com/app-reviews/app-monetisation-strategies)).

---

## 0.5 Voice & Lore Kit (the Hyborian register)

The site should *sound* like Conan the Barbarian without cosplaying it. The
rule: **one lore beat per section, always landed by a plain product sentence.**
Wink, then deliver. A developer who has never read a Conan story must still
understand exactly what Conan does from the subhead.

### The one big idea that makes the lore *mean* something
**A barbarian survives by seeing everything first.** Conan is the watchful
warrior — cunning, never caught off guard, reads the whole battlefield and
misses nothing. Howard's Conan is *"a thief, a reaver, a slayer"* who rises
*"by his own hand"*
([Wikipedia](https://en.wikipedia.org/wiki/Conan_the_Barbarian)) — he outlasts
sorcerers and kings because he watches, then strikes. That is *literally
Conan-the-app's architecture:* it **stands watch** over your agent's every move
and **never enters the fight** (it doesn't run the model or sit in the request
path). The character and the product are the same shape — a watcher at the edge
of the battle. Lean on it everywhere: "A barbarian misses nothing. Now neither
do you."

### Vocabulary palette (use sparingly, like seasoning)
- **keep the watch / miss nothing** — the warrior's watchfulness = observability
- **steel / the blade** — clarity, mastery, the work itself ("stay in the steel")
- **the wall** — your rate-limit ceiling (5h/7d windows)
- **tribute** — token cost / spend
- **the campaign / the hunt** — a coding session
- **driven before you** — made visible (your agent's deeds)
- **by your own hand** — self-reliance, command, earned mastery
- **Cimmeria / Hyborian Age / reaver / slayer** — worldbuilding
- Public-domain Howard prose you can adapt: *"a thief, a reaver, a slayer,
  with gigantic melancholies and gigantic mirth"*; *"Hither came Conan…
  sword in hand."*

### Oaths / microcopy (buttons, toasts, 404s, empty states)
`Miss nothing.` · `Keep the watch.` · `By your own hand.` ·
`Strength and steel.` · `Proven by deeds.` · empty Timeline →
*"The battlefield is quiet. Run Claude Code and Conan keeps the watch."*

### Tone guardrails
- **DO** put the lore in eyebrows/headlines and microcopy; keep subheads,
  bento descriptions, and FAQ answers plainspoken.
- **DON'T** bury the product, over-archaic the grammar, or theme the *facts*
  (pricing, privacy, requirements stay literal).
- **IP caution (not legal advice):** "Conan" and "Conan the Barbarian" are
  trademarks of Conan Properties International. Genre voice + public-domain
  Howard prose (1932–36) is low-risk; **avoid** the 1982 film's specific
  protected dialogue, Arnold Schwarzenegger's likeness, official logos/film
  stills, and anything implying a license. Keep a visible "not affiliated"
  line. Worth a quick IP review before launch given the name + heavy theming.

---

## 1. Core narrative — angles evaluated

Four candidate angles, scored on (a) pain intensity, (b) differentiation from
opcode, (c) breadth of the feature set it covers.

| Angle | Hook | Strength | Risk |
|---|---|---|---|
| **A. "See what your agent is doing"** (observability/cockpit) | Trust + token-spend anxiety | **Strongest.** Maps to a pain devs describe in their own words; covers Timeline, Pulse, Usage, Skills, Context | Must avoid sounding like enterprise APM |
| B. "Stop flying blind on token spend" (cost) | FOMO on cost / rate limits | Sharp but **narrow** — only covers Usage/Pulse | Leaves Timeline/Skills/Context on the table |
| C. "DevTools for your AI pair" (developer-tool metaphor) | Familiar mental model | Good supporting line | As a *lead* it's abstract; "DevTools" is borrowed equity |
| D. "A beautiful home for Claude Code" (GUI/comfort) | Aesthetics, Claude Radio | Warm but **weak** — this is opcode's lane (and they're free) | Loses the why-pay argument |

**Recommendation: Angle A, with B and C as supporting sub-stories.**

Why A wins — it's grounded in how developers actually describe the pain:

> "When agents are given the ability to read and modify code autonomously,
> **transparency becomes foundational to trust.**"
> — [tessl.io on Claude Code observability](https://tessl.io/blog/claude-code-hid-file-access-data-a-new-open-source-observability-tool-emerged)

> Developers want "**full observability without the noise**" — to "**steer
> sessions more precisely**" and "**catch mistakes before they propagate
> across a codebase.**" — *ibid.*

> "Every Claude Code session sends the full codebase context, conversation
> history, tool definitions, and system prompts as input tokens. A single
> coding session can consume tens of thousands of input tokens..."
> — [getmaxim.ai, Claude Code cost management](https://www.getmaxim.ai/articles/top-5-tools-for-claude-code-cost-management)

The job-to-be-done: *"I'm running an autonomous agent that spends my money and
edits my code. I want to know what it's doing, what it costs, and how close I
am to a wall — without babysitting verbose logs."* Conan is the answer.

**The differentiation sentence (use it in sales copy and the FAQ):**
> opcode/Claudia *replace* your Claude Code workflow with a GUI. Conan *sits
> beside* it — you keep running real Claude Code in a real terminal, and Conan
> turns its activity into a live cockpit. (Competitor framing: opcode =
> "command center… visual experience," free/AGPL —
> [opcode](https://github.com/winfunc/opcode).)

---

## 2. Hero section

**Layout (from the data):** centered composition, headline that connects to a
*need* (not a feature list), one supporting sentence, a primary + secondary
CTA, and a product screenshot/loop directly below. The Evil Martians study:
problem-oriented storytelling beats feature lists; use **two CTAs** — a bold
action-specific primary and a lighter secondary (GitHub/docs)
([Evil Martians](https://evilmartians.com/chronicles/we-studied-100-devtool-landing-pages-here-is-what-actually-works-in-2025)).
Raycast's hero is the gold-standard concision: *"Your shortcut to everything."*
([raycast.com](https://www.raycast.com)).

### Headline + subhead candidates (Hyborian voice)

Each headline carries the lore; each subhead lands the product in plain words.

**① The watchful warrior (recommended primary) — the character *is* the product**
> # A barbarian misses nothing.
> Conan is the cockpit for Claude Code — a native Mac app that stands watch over
> every move your agent makes: live context, token spend, skills, and a full
> timeline of the campaign. You wield the steel; Conan keeps the watch.

**② By your own hand — self-reliance, swaggering**
> # Command the campaign by your own hand.
> Your agent acts; Conan shows you exactly what it did — live context, cost,
> skills, and a streaming timeline. Command the session instead of guessing at
> it. The cockpit for Claude Code. Native on Mac.

**③ Driven before you — the deeds-made-visible line**
> # See your agent's every deed driven before you.
> A live observability cockpit for Claude Code: context pressure, token spend,
> skills fired, and every tool call as it happens. No more flying blind.

**④ The riddle of steel — cost/context mastery lean** *(IP caveat: "the riddle
of steel" originates in the 1982 film, not Howard's public-domain prose — use
"master your steel" / "the riddle of the blade" to stay clear; see §0.5)*
> # Master the riddle of steel.
> Every Claude Code session burns tokens and reshapes your code. Conan reveals
> the spend and the context as they happen — so you *command* the blade instead
> of guessing at it. The cockpit for Claude Code.

**⑤ Stay in the steel — barbarism-vs-civilization (terminal pride)**
> # Stay in the steel.
> No bloated GUI to replace your workflow — Conan rides beside your terminal
> and turns real Claude Code into a live cockpit: context, cost, skills,
> timeline. Civilization is a thin veneer; the work is done in the terminal.

> **Pick:** ① as primary — it's the one where the character and the architecture
> are the same idea (a watcher that never intervenes), which is both ownable and
> *true*. A/B against ② for personality. Keep ④/⑤ for a secondary section or
> social copy.

### Primary CTA
- Button: **`↓ Download for Mac`** (keep it literal — action-specific beats
  "Get started" ([Evil Martians](https://evilmartians.com/chronicles/we-studied-100-devtool-landing-pages-here-is-what-actually-works-in-2025)).
  Don't theme the button; theme the copy around it.)
- Micro-line beneath: `Free to wield · Premium $39, once · macOS 13+ (Apple silicon)`
- Optional lore tagline above/below the button: *"Take up the steel."*

### Secondary CTA (lighter styling)
- `View on GitHub` or `See the campaign ↓` (scrolls to bento).

### Windows / platform handling (right under the CTA)
One quiet line — honest, not apologetic, with a light Hyborian wink:
> *The Hyborian age comes first to Mac. On Windows or Linux?
> **[Summon me when it lands →]*** *(email capture).*

Plainer fallback if the wink feels like too much: *"macOS first. Windows or
Linux? [Get notified →]."* Either way — capture the email, never show a
greyed-out "Windows" button
([waitlist patterns](https://getlaunchlist.com/blog/waitlist-landing-page-examples-that-convert)).

Rationale: "coming soon / macOS-first + waitlist" is the established indie
pattern and turns an absence into a list-building asset
([coming-soon/waitlist patterns](https://www.convertflow.com/campaigns/coming-soon-landing-pages),
[getlaunchlist](https://getlaunchlist.com/blog/waitlist-landing-page-examples-that-convert)).
Do **not** show a greyed-out "Windows" button — capture the email instead.

### Hero visual
A looping screen capture of the real product: terminal on the left running a
Claude Code task, HUD on the right with Pulse spiking + Timeline rows
streaming in. Let the UI talk — full-screenshot heroes are a top-performing
pattern for tools with real visible UI ([Evil Martians](https://evilmartians.com/chronicles/we-studied-100-devtool-landing-pages-here-is-what-actually-works-in-2025)).

---

## 3. Benefits — 3–4 tile bento

Bento grids are the dominant 2025–26 pattern for SaaS/dev feature sections:
asymmetric blocks where **each tile is one complete idea — headline +
supporting copy + a visual** — and they're explicitly recommended for
"dashboard overviews" where users see multiple data points at once
([SaaSFrame bento guide](https://www.saasframe.io/blog/designing-bento-grids-that-actually-work-a-2026-practical-guide),
[Pravin Kumar / Webflow](https://www.pravinkumar.co/blog/bento-grids-b2b-saas-homepage-design-trend-2026)).
Conan's HUD literally *is* a bento of widgets — the section should mirror it.

**Suggested 5-tile layout** (1 large hero tile + 3 insight tiles + 1 small
delight tile; map each to a real screenshot). In the mosaic, keep Tile 5 (Radio)
visually small — a short wide strip or a corner square — so it reads as a wink,
not a claim:

### Tile 1 — LARGE → **Timeline**
> *eyebrow:* THE CAMPAIGN, AS IT HAPPENS
> ## Every deed, driven before you.
> Prompt → tool call → skill → plan → done. Conan's Timeline streams every step
> of a session as it happens — so you never `tail` a log or wonder what your
> agent just did again.
> *Visual:* Timeline panel mid-stream with PRETOOL/POSTTOOL/SKILL/PLAN rows.

### Tile 2 → **Context + Usage**
> *eyebrow:* KNOW THE WALL BEFORE YOU HIT IT
> ## See the wall before you crash into it.
> A live read on context-window pressure and the exact tribute each session
> costs — per model, with your 5h/7d rate-limit windows. Know the ceiling and
> the spend before they stop you cold.
> *Visual:* Context ProgressCircle + Usage session block.

### Tile 3 → **Pulse**
> *eyebrow:* THE HEARTBEAT OF THE HUNT
> ## Your spend, with a pulse.
> A real-time chart of tokens and cost across the session. Spot the costly
> turns, watch the cache spare you, feel the rhythm of a run.
> *Visual:* Pulse AreaChart with spikes.

### Tile 4 → **Skills + MCP**
> *eyebrow:* WHAT MOVED IN THE SHADOWS
> ## Know which skills answered the call.
> See which Claude Code skills actually fired (and which *nearly* did), when
> each last drew steel, and the health of your MCP servers — the parts of your
> setup that otherwise move unseen.
> *Visual:* Skills widget with last-fired + considered rows.

### Tile 5 — SMALL (delight) → **Claude Radio**
> *eyebrow:* FOR THE LONG MARCH
> ## Lo-fi, built in.
> Ambient focus audio right in the HUD. Press play and ride out the campaign —
> no tab-switching to a music app.
> *Visual:* the RadioBar play/pause + station label.
>
> *Design note:* this is the deliberately-small tile in the bento — a wink, not
> a pillar. It earns its place by adding personality and texture (and nodding to
> the bull), **not** by being a reason to buy. Keep the copy short and the tile
> physically smaller than the four above it; never let it crowd the insight
> tiles. (If the grid ever feels tight, this is the first tile to cut.)

**Copy discipline:** each tile leads with the *outcome* ("Never hit a wall by
surprise"), not the feature name — problem/outcome-first framing outperforms
feature labels ([Evil Martians](https://evilmartians.com/chronicles/we-studied-100-devtool-landing-pages-here-is-what-actually-works-in-2025)).
Put the feature name as the small kicker/eyebrow.

---

## 4. FAQ (accordion, near page end)

FAQ accordions near the page end signal product maturity and should hit the
*practical* concerns — data storage, login, trial, platform
([Evil Martians](https://evilmartians.com/chronicles/we-studied-100-devtool-landing-pages-here-is-what-actually-works-in-2025)).
For a local paid dev tool, lead with the trust questions.

1. **Do I need Claude Code to use Conan?**
   Yes. Conan observes and visualizes Claude Code — it doesn't replace it or
   run the model itself. You run real Claude Code in Conan's terminal; Conan
   adds the cockpit. (Free banner detects if it's not installed.)

2. **Is my code or data sent anywhere?**
   No. Conan runs entirely on your Mac and reads Claude Code's local session
   data (`~/.claude`). Nothing about your code or prompts leaves your machine.
   *(Local-first is table stakes — opcode advertises "All data stays on your
   machine / No telemetry"; match it plainly. [opcode](https://github.com/winfunc/opcode))*

3. **Does it slow Claude Code down?**
   No. Conan keeps the watch — it never enters the fight. It doesn't sit in the
   request path; it reads the activity Claude Code already writes locally, so
   the agent runs at full speed.

4. **Is it really a one-time purchase?**
   Yes — $39, once, by your own hand. No subscription, no tribute every moon,
   no per-device limit; free updates across the entire 1.x line. *(Mirrors the
   proven indie one-time framing: "free updates within a single major version."
   [Setapp](https://setapp.com/app-reviews/app-monetisation-strategies))*

5. **What's free vs. Premium?**
   Free is a genuinely useful live observer — terminal, Context, Usage, and a
   basic Timeline. Premium ($39) unlocks the insight layer: skill-scoring
   rows, Plan/Loop/Build rows, expandable tool payloads, longer Pulse history,
   Skills "last fired," and the MCP auth watchdog. *(Gate is depth of insight,
   never your live data.)*

6. **macOS only? What about Windows/Linux?**
   macOS first (Apple silicon, signed + notarized). Windows/Linux aren't
   available yet — [join the list] and we'll email you when they are.

7. **How do updates work?**
   Conan auto-updates itself (signed). Every 1.x release is included in your
   one-time purchase.

8. **Who's behind it / is it affiliated with Anthropic?**
   Independent. Conan is built by [WhatMatters] and is not affiliated with or
   endorsed by Anthropic. *(opcode carries the same disclaimer — standard and
   expected. [opcode](https://github.com/winfunc/opcode))*

9. **What are the system requirements?**
   macOS 13+ on Apple silicon, and Claude Code installed.

> *No refund FAQ by design — the free tier is the try-before-you-buy, so we
> don't lead with refund talk (it can plant doubt). Refund handling still lives
> quietly in Terms + Polar; see §7.*

---

## 5. Footer (minimal indie-tool footer)

Keep it lean — a final full-width CTA block *above* the footer does the
converting ([Evil Martians](https://evilmartians.com/chronicles/we-studied-100-devtool-landing-pages-here-is-what-actually-works-in-2025)); the footer is just navigation + trust.

**Final CTA band (before footer):**
> ## Take up the steel. `↓ Download for Mac` · *Free to wield · Premium $39, once*
> *(small line under: "Miss nothing.")*

**Footer columns:**
- **Product:** Download · Pricing · Free vs Premium · Changelog · Roadmap
- **Resources:** Docs · GitHub · What is Claude Code? · Status
- **Company / Legal:** About · Privacy · Terms · Contact *(refund policy lives
  inside Terms — no standalone "Refunds" link, by design)*
- **Social:** X/Twitter · GitHub · (Discord if one exists)

**Trust strip (small print row):**
- `© 2026 WhatMatters` · `Not affiliated with Anthropic` ·
  `Not affiliated with Conan Properties Int'l` ·
  `Payments handled by Polar (Merchant of Record)` ·
  `Made for macOS` · a Windows/Linux **[notify me]** link.
- *Optional easter-egg microline (very small, far corner):* `Miss nothing.`

*(Naming Polar as MoR in the footer is good practice — it's who appears on the
customer's card statement and handles VAT/refunds.)*

---

## 6. Competitive notes (for the team, not the page)

- **opcode (winfunc/opcode)** — closest comparable. Free, AGPL-3.0, Tauri 2.
  Positions as a **"command center"** that *manages* sessions, custom agents,
  checkpoints, usage analytics. Touts local storage / no telemetry.
  ([opcode](https://github.com/winfunc/opcode)) → **Conan's counter:** observe,
  don't replace; paid because the *insight depth* is the product; you keep the
  real terminal + real Claude Code.
- **Grafana/OTel and Dynatrace Claude Code monitoring** — exist but are
  heavyweight, infra-team-oriented, dashboards-you-assemble
  ([Grafana writeup](https://prokopov.me/posts/claude-code-observability-grafana-stack),
  [Dynatrace Hub](https://www.dynatrace.com/hub/detail/claude-code-agent-monitoring)).
  → **Conan's counter:** zero-setup, native, for the individual dev, not the
  platform team.
- **tokscale / CLI usage trackers** — terminal cards for token usage
  ([tokscale](https://github.com/junhoyeo/tokscale)). → narrower; Conan is the
  full cockpit, not just a usage card.

**One-liner positioning map:** *opcode manages, Grafana monitors-at-scale,
CLI trackers count tokens — Conan is the native cockpit that lets one developer
see and steer a live Claude Code session.*

---

## 7. Open questions / decisions for you

1. **Headline pick:** ① "A barbarian misses nothing." vs ② "Command the
   campaign by your own hand." — A/B, or designer's call on tone (watchful vs
   swagger)? ①'s edge: the character and the architecture are literally the
   same idea.
2. ~~**Refund window:** 14 or 30 days?~~ **Decided: don't surface refunds at
   all.** The free tier is the try-before-you-buy, so no refund FAQ and no
   standalone footer link — refund handling stays inside Terms + Polar. (Polar
   still processes any refund; EU's non-waivable 14-day withdrawal right applies
   regardless, and Polar's 60-day chargeback backstop is the outer bound.)
3. **Social proof:** any early-user quotes yet? Even one friend/teammate line
   lifts conversion ([Evil Martians](https://evilmartians.com/chronicles/we-studied-100-devtool-landing-pages-here-is-what-actually-works-in-2025)).
   If none, leave the block out rather than fake it.
4. **Windows demand signal:** the waitlist doubles as market research — worth
   adding a one-click "which OS?" on the notify form.
5. **"DevTools for Claude Code" trademark/positioning risk:** fine as a
   metaphor in body copy, avoid as the literal H1.

---

## Sources

- Evil Martians — *We studied 100 devtool landing pages* (hero, CTA, bento,
  FAQ, social proof patterns):
  https://evilmartians.com/chronicles/we-studied-100-devtool-landing-pages-here-is-what-actually-works-in-2025
- opcode (winfunc/opcode) — competitor positioning, privacy, free/AGPL:
  https://github.com/winfunc/opcode
- tessl.io — Claude Code observability narrative & pain language:
  https://tessl.io/blog/claude-code-hid-file-access-data-a-new-open-source-observability-tool-emerged
- Setapp — indie Mac app monetisation / one-time pricing framing:
  https://setapp.com/app-reviews/app-monetisation-strategies
- getmaxim.ai — Claude Code cost/token pain:
  https://www.getmaxim.ai/articles/top-5-tools-for-claude-code-cost-management
- SaaSFrame — practical bento-grid guide (2026):
  https://www.saasframe.io/blog/designing-bento-grids-that-actually-work-a-2026-practical-guide
- Pravin Kumar / Webflow — bento grids on B2B SaaS homepages:
  https://www.pravinkumar.co/blog/bento-grids-b2b-saas-homepage-design-trend-2026
- getlaunchlist — waitlist landing page examples:
  https://getlaunchlist.com/blog/waitlist-landing-page-examples-that-convert
- ConvertFlow — coming-soon landing page patterns:
  https://www.convertflow.com/campaigns/coming-soon-landing-pages
- Raycast — hero concision benchmark: https://www.raycast.com
- Grafana Claude Code observability: https://prokopov.me/posts/claude-code-observability-grafana-stack
- Dynatrace Claude Code Agent monitoring: https://www.dynatrace.com/hub/detail/claude-code-agent-monitoring
- tokscale — CLI token tracker: https://github.com/junhoyeo/tokscale

*Sources: 13 cited (Tavily/Exa sweep ×16 queries, WebFetch ×4 full-content).
Sections: positioning ✓ hero ✓ bento ✓ FAQ ✓ footer ✓ competitive ✓.*
