// Canonical FAQ copy — shared by the FAQ section (FAQ.astro) and the homepage's
// FAQPage JSON-LD (index.astro), so the rendered Q&As and the structured data
// can never drift. Source: docs/landing-page-story.md §4 (trust questions
// first). `aHtml` renders rich (links); `a` is the plain-text form used for
// structured data and as the rendered fallback.
export interface Faq {
  q: string;
  a?: string;
  aHtml?: string;
}

export const faqs: Faq[] = [
  {
    q: "What is Conan?",
    a: "Conan is a native macOS app that wraps Claude Code in a live HUD — a cockpit around the agent. You run real Claude Code in its terminal, and Conan surfaces the whole session as it happens: a streaming timeline of every prompt, tool call, and skill; live context and token usage; a throughput pulse; the skills and MCP servers in play; even built-in radio. Instead of squinting at a scrolling terminal, you watch the campaign unfold — a barbarian misses nothing.",
  },
  {
    q: "Do I need Claude Code to use Conan?",
    a: "Yes. Conan observes and visualizes Claude Code — it doesn't replace it or run the model itself. You run real Claude Code in Conan's terminal; Conan adds the cockpit around it.",
  },
  {
    q: "Is my code or data sent anywhere?",
    a: "No. Conan runs entirely on your Mac and reads Claude Code's local session data in ~/.claude. Nothing about your code or your prompts ever leaves your machine. No telemetry.",
  },
  {
    q: "Does it slow Claude Code down?",
    a: "No. Conan keeps the watch — it never enters the fight. It doesn't sit in the request path; it reads the activity Claude Code already writes to disk, so the agent runs at full speed.",
  },
  {
    q: "What do I get before I buy?",
    a: "The download is a genuinely useful live observer out of the box — terminal, Context, Usage, and a basic Timeline. Premium ($39) unlocks the insight layer: skill-scoring rows, Plan/Loop/Build rows, expandable tool payloads, longer Pulse history, Skills' last-fired times, the MCP auth watchdog, and Claude Radio. The gate is depth of insight, never your live data.",
  },
  {
    q: "macOS only? What about Windows and Linux?",
    a: "macOS first — Apple silicon, signed and notarized. Windows and Linux aren't available yet; join the waitlist and we'll email you the moment they are.",
  },
  {
    q: "Who's behind it — is it affiliated with Anthropic?",
    a: "Independent. Conan is built by WhatMatters and is not affiliated with or endorsed by Anthropic, or with Conan Properties International.",
  },
  {
    q: "What are the system requirements?",
    a: "macOS 13 or later on Apple silicon, with Claude Code installed.",
  },
  {
    q: "Where are the Terms and Privacy Policy?",
    a: "Read the Terms of Service (/terms) and Privacy Policy (/privacy) in full. The short of it: your work stays on your Mac — Conan sends no telemetry — and the site collects only what it needs to run the waitlist and your purchase.",
    aHtml:
      'Read the <a href="/terms" class="text-gold underline underline-offset-4 hover:no-underline">Terms of Service</a> and <a href="/privacy" class="text-gold underline underline-offset-4 hover:no-underline">Privacy Policy</a> in full. The short of it: your work stays on your Mac — Conan sends no telemetry — and the site collects only what it needs to run the waitlist and your purchase.',
  },
];
