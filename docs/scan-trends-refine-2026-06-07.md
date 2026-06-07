# refine-skill findings — scan-trends

- **Target skill:** `scan-trends` (`~/.claude/skills/scan-trends`)
- **Transcript:** `2d053a4f-c6cb-4b51-b7d7-07fe47f3ecaf.jsonl` (conan-marketing project)
- **Date:** 2026-06-07
- **Session:** 30-day sweep of the Claude Code observability community for the conan.sh launch
- **Evidence:** `extract_evidence.py` → 1 skill invocation, 4 signals (Reddit 403 captured twice) + NATIVE reasoning over the run

Verdict: **1 bug fixed + validated, 2 doc fixes, 1 polish fix. 0 routed to memory** (all findings were general skill gaps, not task/user preferences — no n=1 overfitting risk).

---

## 🔴 Finding 1 — Reddit had no web fallback; a 403 block silently kills the source (BUG — fixed + validated)

**Evidence (cited):** transcript msgs 21 & 36 — `reddit.py` returned `[]` with stderr
`403 Client Error: Blocked` on every query. The orchestrator improvised
`web.py "<topic>" GENERAL` as a recovery, which returned `[]` — because
`web.py` lists `reddit.com` in `SKIP_DOMAINS` (`web.py:42`) for every query type
**except** `XFALLBACK`. So there was **no code path** that could recover Reddit
content. X has `XFALLBACK` (`include_domains=["x.com","twitter.com"]`); Reddit had
no equivalent. For a community-sentiment query, that drops the single most
important source.

**Why it violates spec:** A3 (every capability needs a functional fallback path) and
the error table treated this as `Rate limited → retry/skip` (`SKILL.md:415`), but a
`403` block is neither rate-limiting nor user-fixable — it had no real degraded path.

**Classification:** Bug, general (any topic where Reddit blocks this IP/UA). Recurred
twice in one session. Fix mirrors an existing proven pattern → low risk, high confidence.
Not n=1 overfit.

**Fix applied:**
- `scripts/web.py` — added a `REDDITFALLBACK` query type across all three providers
  (Tavily / Exa / DDG), mirroring `XFALLBACK` with `include_domains = ["reddit.com"]`;
  updated the docstring I/O contract; added `REDDIT_DOMAINS`.
- `SKILL.md` — wired `reddit.py` `[]` + stderr `403` → `web.py REDDITFALLBACK`, tagged
  `Reddit (via web)`; split the error-table Reddit row into a `403`-block case (silent
  fallback, no prompt) and a `429` rate-limit case; documented the `(via web)` stats
  rendering.

**Validation (run before this report):**
- `py_compile` clean on all scripts.
- Regression captured at `tests/fixtures/reddit-403-fallback.md`.
- `web.py … GENERAL` → 5 results / **0** reddit hits (reproduces the bug).
- `web.py … REDDITFALLBACK` → 5 results / **5** reddit hits, all on-topic.
- `web.py … XFALLBACK` → 5 results / 5 x.com hits (no regression to the X path).
- `audit-skill` on the change: PASS (one-concern, JSON-stdout, graceful; docstring
  updated) — and it flagged the docs-wiring gap, which this diff then closed
  (`grep -c REDDITFALLBACK SKILL.md`: 0 → 4).

---

## 🟠 Finding 2 — No guidance that the scrapers want SHORT keyword queries (DOC — fixed)

**Evidence:** First-pass queries this session were long natural-language strings;
reddit/x/hackernews all returned `[]`. Shortening HN to `"Claude Code"` instantly
returned 19 rich stories. The scrapers are literal keyword matchers, but `SKILL.md`
only said to pass `"{TOPIC}"`. Cost a full retry round.

**Classification:** Doc gap, general. **Fix:** added a Step-2 note — distill `{TOPIC}`
to a tight 2–5 keyword query; if a source is empty, retry once shorter/broader before
calling it genuinely empty.

---

## 🟡 Finding 3 — Polymarket needs a relevance gate, not just a 0-results gate (DOC — fixed)

**Evidence:** Polymarket returned 10 active markets, all GTA-VI novelty bets, zero
topic relevance. `SKILL.md` said "omit if 0 results" — but it returned junk, not zero,
so the orchestrator had to judge relevance manually. **Fix:** one-line clarification —
omit Polymarket if no returned market is topically relevant, even when non-empty.

---

## 🟡 Finding 4 — Stats header is hardcoded-optimistic (POLISH — fixed)

**Evidence:** The template hardcodes `All sources reported back!` (`SKILL.md:281`) but
this run had Reddit down; the orchestrator improvised `Most sources reported back!`.
**Fix:** documented a partial-run variant of the header line for when any source is
down / omitted / fell to a web fallback.

---

## Not acted on (deliberately)

- **Scratch `.err` files in the skill dir** — this was the orchestrator redirecting
  stderr to files inside the skill repo, then cleaning them up. That's caller behavior,
  not a skill defect, and baking a "use a tmp dir" rule into SKILL.md would add weight
  for a non-recurring issue. Left alone (bloat guard).
- **X posts with empty `text`** — scraper limitation (engagement-only), not a
  doc/logic fix. Noted, not changed.

## Files changed
- `~/.claude/skills/scan-trends/scripts/web.py`
- `~/.claude/skills/scan-trends/SKILL.md`
- `~/.claude/skills/scan-trends/tests/fixtures/reddit-403-fallback.md` (new — regression)
