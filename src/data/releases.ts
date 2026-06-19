// Release history for the public changelog (/changelog). Hand-curated from the
// GitHub Releases on thewhatmatters/conan — distilled to a headline + a few
// user-facing highlights per version (the release notes themselves are the
// source of truth). Newest FIRST; the page renders them top-to-bottom as a
// vertical timeline and badges index 0 as "Latest".
//
// When you cut a new release: add an entry at the TOP. `date` is ISO
// (YYYY-MM-DD); it renders as a long date. Keep `summary` to one sentence and
// `highlights` to the things a user would actually notice.

export interface Release {
  version: string; // e.g. "1.0.5" (no leading "v")
  date: string; // ISO YYYY-MM-DD
  title: string; // short headline for the release
  summary: string; // one-sentence framing
  highlights: string[]; // user-facing bullets
  /** Optional tag for the node label: "feature" | "fix" | "launch". */
  kind?: "feature" | "fix" | "launch";
}

const GH = "https://github.com/thewhatmatters/conan/releases/tag";

/** Link to a release's GitHub tag page. */
export const releaseUrl = (version: string) => `${GH}/v${version}`;

export const releases: Release[] = [
  {
    version: "1.0.5",
    date: "2026-06-14",
    title: "One-click upgrade",
    summary:
      "Upgrading is now a single click — the paywall buttons go straight to checkout.",
    highlights: [
      "The “Upgrade” buttons in the Timeline, Pulse, and Radio now open the Polar checkout directly instead of routing through Settings.",
      "Settings ▸ License stays the place to paste your license after purchase.",
    ],
    kind: "feature",
  },
  {
    version: "1.0.4",
    date: "2026-06-13",
    title: "Buy Premium checkout fix",
    summary:
      "Fixed the Settings ▸ License “Buy Premium” button so it opens the real checkout.",
    highlights: [
      "Previously an internal default shadowed the checkout link and sent the button to the homepage; it now lands on the Polar checkout.",
    ],
    kind: "fix",
  },
  {
    version: "1.0.3",
    date: "2026-06-12",
    title: "Checkout link + new model families",
    summary:
      "Wired the live checkout and taught Context/Usage capture about new Claude model families.",
    highlights: [
      "“Buy Premium” points at the live Polar checkout.",
      "Context and Usage now parse new model families (e.g. Claude Fable 5) — model name and per-model rows render correctly where they were blank before.",
    ],
    kind: "fix",
  },
  {
    version: "1.0.2",
    date: "2026-06-11",
    title: "Session correlation restored",
    summary:
      "Restored the link between the terminal and its Claude Code session after an upstream change removed session markers.",
    highlights: [
      "Marker-independent correlation — Conan now matches the live session by process, so the Timeline, ↻ Context / ↻ Usage buttons, and the Compact bar all work again.",
      "The Usage probe is hardened: it retries once and surfaces errors instead of silently showing nothing.",
      "The Sonnet weekly rate-limit window is captured reliably.",
    ],
    kind: "fix",
  },
  {
    version: "1.0.1",
    date: "2026-06-11",
    title: "Seven observability fixes",
    summary:
      "A maintenance pass tightening per-tab state and the live widgets.",
    highlights: [
      "Per-tab working directory — background tabs no longer hijack the app-wide folder, and the footer’s cwd + git branch follow the active tab.",
      "Tabs name themselves from their folder; manual renames still win.",
      "The Timeline’s Build chip survives a full build-loop iteration instead of vanishing.",
      "The “waiting for your input” nudge is filtered everywhere; real permission prompts still come through.",
      "Account-global Usage rate-limit windows show on every tab.",
    ],
    kind: "fix",
  },
  {
    version: "1.0.0",
    date: "2026-06-07",
    title: "Conan 1.0 — first public release",
    summary:
      "A terminal-primary native macOS app that wraps and observes Claude Code, with a live DevTools-style HUD.",
    highlights: [
      "A full terminal running your normal Claude Code login, in your working directory.",
      "The HUD — Context, Usage, Pulse, Skills, and MCP, live beside the terminal.",
      "The Timeline (⌘\\) surfaces session activity as it happens: hook events, skills fired, the “skills considered” heuristic, plan/loop rows, and build trails.",
      "Claude Radio for background audio, plus a signed built-in auto-update channel.",
      "Free to run as a live observer; Premium ($29 once, lifetime of 1.x, unlimited Macs) unlocks the full insight layer.",
    ],
    kind: "launch",
  },
];
