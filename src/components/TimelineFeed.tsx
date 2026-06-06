import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

// Live timeline feed for the Bento "Timeline" tile. Mirrors the real Conan app
// HUD timeline (see ../conan/ui/src/components/Timeline.tsx + the reference
// screenshot): events arrive at the TOP, push older rows down, and the oldest
// falls off the bottom — "the whole campaign, as it happens." Warm-translated:
// hook/event rows ride ember (--chart-2), skill-fired rides gold (--chart-1)
// with a ⚡, skill-considered is muted. Honors prefers-reduced-motion by
// rendering a calm static list with no streaming. The visible row count is
// MEASURED from the tile height so the feed fills it (no dead whitespace).

type Kind =
  | "PROMPT"
  | "PRETOOL"
  | "POSTTOOL"
  | "STOP"
  | "NOTIF"
  | "EVENT"
  | "SKILL"
  | "SKILL?";

type Ev = { t: string; k: Kind; d: string; sub?: string; trail?: string };

// Badge styling per kind — literal class strings so Tailwind picks them up.
// Hooks/events share one treatment (as the app does); SKILL pops gold; SKILL?
// is muted (considered-but-not-fired).
const BADGE: Record<Kind, { dot: string; pill: string }> = {
  PROMPT: { dot: "bg-chart-2", pill: "bg-chart-2/15 text-chart-2" },
  PRETOOL: { dot: "bg-chart-2", pill: "bg-chart-2/15 text-chart-2" },
  POSTTOOL: { dot: "bg-chart-2", pill: "bg-chart-2/15 text-chart-2" },
  STOP: { dot: "bg-chart-2", pill: "bg-chart-2/15 text-chart-2" },
  NOTIF: { dot: "bg-chart-2", pill: "bg-chart-2/15 text-chart-2" },
  EVENT: { dot: "bg-chart-2", pill: "bg-chart-2/15 text-chart-2" },
  SKILL: { dot: "bg-chart-1", pill: "bg-chart-1/15 text-chart-1" },
  "SKILL?": { dot: "bg-muted-foreground", pill: "bg-muted text-muted-foreground" },
};

// Event pool — cycles forever. Flavour lifted from the real timeline screenshot.
// Kept long enough (20) that even a tall feed window never shows a repeat.
const POOL: Ev[] = [
  { t: "13:55:38", k: "PRETOOL", d: "Skill · handoff" },
  { t: "13:55:38", k: "SKILL", d: "handoff fired" },
  { t: "13:55:28", k: "SKILL?", d: "docx considered", sub: "partial match (terms: skill)" },
  { t: "13:55:28", k: "PROMPT", d: "Awesome, run the /handoff skill" },
  { t: "13:23:37", k: "EVENT", d: "SubagentStop" },
  { t: "13:21:31", k: "NOTIF", d: "Claude is waiting for your input" },
  { t: "13:20:31", k: "STOP", d: "turn ended", trail: "+392k" },
  { t: "13:20:09", k: "PRETOOL", d: "Bash · cd ~/Development/conan" },
  { t: "13:19:25", k: "SKILL?", d: "xlsx considered", sub: "strong description match (terms: sources)" },
  { t: "13:19:25", k: "PROMPT", d: "It's ok, where are the sources?" },
  { t: "13:10:53", k: "NOTIF", d: "Claude is waiting for your input" },
  { t: "13:09:53", k: "STOP", d: "turn ended", trail: "+391k" },
  { t: "13:09:44", k: "POSTTOOL", d: "Edit · src/components/Bento.astro" },
  { t: "13:09:44", k: "PRETOOL", d: "Edit · src/styles/global.css" },
  { t: "13:09:41", k: "POSTTOOL", d: "Read · ui/src/components/Timeline.tsx" },
  { t: "13:09:38", k: "PRETOOL", d: "Bash · npm run build" },
  { t: "13:08:55", k: "EVENT", d: "SessionStart" },
  { t: "13:08:31", k: "SKILL", d: "automate-browser fired" },
  { t: "13:08:12", k: "PROMPT", d: "Verify the bento in a browser" },
  { t: "13:07:55", k: "POSTTOOL", d: "Edit · src/components/Hero.astro" },
];

const TICK_MS = 2400;
const ROW_H = 34; // ~ one simple row (px); used to estimate how many rows fit
const FALLBACK = 12; // rows before the height is measured (SSR / first paint)

function buildSeed(n: number) {
  // Seeded rows are "historical" (live: false) — they render the static glyph
  // immediately, matching the app (replaying the lottie for backlog rows would
  // be obnoxious). Only rows that stream in after mount animate.
  return Array.from({ length: n }, (_, i) => ({
    id: i,
    ev: POOL[i % POOL.length],
    live: false,
  }));
}

function Zap() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3 w-3 text-chart-1"
      fill="currentColor"
      aria-hidden="true"
      style={{ filter: "drop-shadow(0 0 4px var(--chart-1))" }}
    >
      <path d="M13 2L4.5 13.5H11l-1 8.5L19.5 10H13l0-8z" />
    </svg>
  );
}

// Skill-fired indicator. The static ⚡ glyph is ALWAYS the base; for a row that
// streamed in LIVE, the app's lightning.json (lottie-web, one-shot) plays
// OVER it — absolutely-centered, slightly oversized, higher z, transparent
// background — then fades, leaving the static glyph. Historical /
// reduced-motion rows just show the static glyph. (Matches the app, where the
// lottie fires on top of the lightning icon rather than replacing it.)
function SkillBolt({ live }: { live: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [playing, setPlaying] = useState(live);

  useEffect(() => {
    if (!live) return;
    let anim: { destroy: () => void } | undefined;
    let cancelled = false;
    import("lottie-web/build/player/lottie_light").then((m) => {
      if (cancelled || !ref.current) return;
      anim = m.default.loadAnimation({
        container: ref.current,
        renderer: "svg",
        loop: false,
        autoplay: true,
        path: "/animations/lightning.json",
      });
      anim.addEventListener("complete", () => setPlaying(false));
    });
    return () => {
      cancelled = true;
      anim?.destroy();
    };
  }, [live]);

  return (
    <>
      {/* persistent base icon */}
      <Zap />
      {/* lottie burst layered on top, only while it plays */}
      {playing && (
        <span
          ref={ref}
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 z-20 h-7 w-7 -translate-x-1/2 -translate-y-1/2"
        />
      )}
    </>
  );
}

function Row({ ev, live }: { ev: Ev; live: boolean }) {
  const b = BADGE[ev.k];
  return (
    <div className="flex items-start gap-2.5 rounded-md px-2 py-1.5">
      <span className="w-[52px] shrink-0 pt-px text-right font-mono text-[11px] tabular-nums text-muted-foreground">
        {ev.t}
      </span>
      <span className="relative z-10 mt-px grid h-3.5 w-3.5 shrink-0 place-items-center">
        {ev.k === "SKILL" ? (
          <SkillBolt live={live} />
        ) : (
          <span className={`h-2 w-2 rounded-full ring-2 ring-card ${b.dot}`} />
        )}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span
            className={`shrink-0 rounded px-1.5 py-px text-[9px] font-semibold tracking-wider ${b.pill}`}
          >
            {ev.k}
          </span>
          <span className="flex-1 truncate text-[12px] text-foreground/85">{ev.d}</span>
          {ev.trail && (
            <span className="shrink-0 font-mono text-[10px] text-muted-foreground">
              {ev.trail}
            </span>
          )}
        </div>
        {ev.sub && (
          <p className="mt-0.5 truncate text-[11px] text-muted-foreground/70">{ev.sub}</p>
        )}
      </div>
    </div>
  );
}

export default function TimelineFeed() {
  const reduce = useReducedMotion();
  // Gate the animated branch on a post-mount flag so SSR and the first client
  // paint render the SAME (static) inner list — otherwise a reduced-motion
  // client, or motion's SSR-injected inline styles, diverge from the server
  // HTML and React throws a hydration mismatch. We upgrade after hydration.
  const [mounted, setMounted] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const countRef = useRef(FALLBACK);
  const idRef = useRef(FALLBACK);
  const ptrRef = useRef(FALLBACK);
  const [rows, setRows] = useState(() => buildSeed(FALLBACK));

  // Measure the tile and fill it with as many rows as fit (re-measures on
  // resize). Re-seeds only when the fitting count actually changes.
  useEffect(() => {
    setMounted(true);
    const el = wrapRef.current;
    const apply = () => {
      const h = el?.clientHeight ?? FALLBACK * ROW_H;
      const n = Math.max(8, Math.min(POOL.length, Math.ceil(h / ROW_H) + 1));
      if (n === countRef.current) return;
      countRef.current = n;
      idRef.current = n;
      ptrRef.current = n;
      setRows(buildSeed(n));
    };
    apply();
    let ro: ResizeObserver | undefined;
    if (el && "ResizeObserver" in window) {
      ro = new ResizeObserver(apply);
      ro.observe(el);
    }
    return () => ro?.disconnect();
  }, []);

  useEffect(() => {
    if (!mounted || reduce) return;
    const id = setInterval(() => {
      if (document.hidden) return; // don't stream offscreen
      const ev = POOL[ptrRef.current % POOL.length];
      ptrRef.current += 1;
      const key = idRef.current++;
      setRows((prev) => [{ id: key, ev, live: true }, ...prev].slice(0, countRef.current));
    }, TICK_MS);
    return () => clearInterval(id);
  }, [mounted, reduce]);

  const animate = mounted && !reduce;

  // One constant wrapper (ref + clip + bottom fade + rail) so the layout is
  // identical pre/post hydration; only the inner list swaps to motion rows.
  return (
    <div
      ref={wrapRef}
      className="relative h-full overflow-hidden"
      style={{
        maskImage: "linear-gradient(to bottom, #000 88%, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, #000 88%, transparent)",
      }}
    >
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-[77px] top-2 w-px bg-border"
      />
      {animate ? (
        <AnimatePresence initial={false} mode="popLayout">
          {rows.map((r) => (
            <motion.div
              key={r.id}
              layout
              initial={{ opacity: 0, y: -12, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <Row ev={r.ev} live={r.live} />
            </motion.div>
          ))}
        </AnimatePresence>
      ) : (
        <div>
          {rows.map((r) => (
            <Row key={r.id} ev={r.ev} live={false} />
          ))}
        </div>
      )}
    </div>
  );
}
