import { useMemo, useState } from "react";

// Pulse / throughput chart for the Bento "Pulse" tile. Mirrors the real Conan
// app HUD chart (see ../conan/ui/src/components/PulseChart.tsx): three activity
// series plotted over a selectable time window (15m/1h/6h/24h), with a
// hover tooltip that snaps to the nearest bucket and lists each series'
// value — exactly like the app's recharts tooltip, warm-translated.
//
// Warm color mapping (mirrors the footer legend already on the tile):
//   Tools → ember · Prompts → gold · Session → chart-5 (oxblood-orange)
//
// Hydration-safe: every value is DETERMINISTIC (no Math.random / Date.now) and
// every label is computed by integer clock arithmetic (no Date object), so the
// SSR markup and the first client paint are byte-identical regardless of the
// server's timezone. The only client state is the active range + hover index,
// both of which render the same on the server (range = 15m, hover = null).

type SeriesKey = "tools" | "prompts" | "session";

// Warm spread chosen for max separation on the dark ground: pale straw (light
// yellow) → ember (orange) → oxblood (deep red). Tools is the primary (ember).
const SERIES: { key: SeriesKey; label: string; color: string }[] = [
  { key: "tools", label: "Tools", color: "var(--ember)" },
  { key: "prompts", label: "Prompts", color: "var(--chart-3)" },
  { key: "session", label: "Session", color: "var(--chart-5)" },
];

interface Range {
  key: string;
  label: string;
  /** bucket count */
  n: number;
  /** minutes per bucket */
  stepMin: number;
  /** shape seed so each window draws a distinct profile */
  seed: number;
  newTok: string;
  cache: string;
}

const RANGES: Range[] = [
  { key: "15m", label: "15m", n: 20, stepMin: 1, seed: 2, newTok: "624.2k", cache: "38.7M" },
  { key: "1h", label: "1h", n: 28, stepMin: 3, seed: 5, newTok: "1.1M", cache: "52.3M" },
  { key: "6h", label: "6h", n: 32, stepMin: 12, seed: 9, newTok: "1.9M", cache: "71.4M" },
  { key: "24h", label: "24h", n: 40, stepMin: 36, seed: 13, newTok: "2.9M", cache: "92.0M" },
];

// Window ends at 06/06 15:03 (anchor = 06/06 00:00, expressed in minutes).
const END_MIN = 15 * 60 + 3;

/** Deterministic, TZ-free clock label `minFromAnchor` minutes past 06/06 00:00.
 *  Negative minutes roll the day back (so a 24h window reads 06/05 → 06/06). */
function clockLabel(minFromAnchor: number): { date: string; time: string } {
  const day = 6 + Math.floor(minFromAnchor / 1440);
  const mins = ((minFromAnchor % 1440) + 1440) % 1440;
  const hh = String(Math.floor(mins / 60)).padStart(2, "0");
  const mm = String(mins % 60).padStart(2, "0");
  return { date: `06/${String(day).padStart(2, "0")}`, time: `${hh}:${mm}` };
}

/** Deterministic spiky throughput profile: a calm baseline with a couple of
 *  tall bursts toward the right, echoing the app's "spikes when Claude works"
 *  shape. Pure function of (index, seed) — identical on server and client. */
function buildRows(r: Range) {
  const rows: { min: number; tools: number; prompts: number; session: number }[] = [];
  for (let i = 0; i < r.n; i++) {
    const base = (Math.sin(i * 0.7 + r.seed) + 1) / 2; // 0..1 gentle wave
    const burst = Math.pow((Math.sin(i * 0.33 + r.seed * 1.7) + 1) / 2, 6); // rare tall
    const tools = Math.round(3 + base * 9 + burst * 88);
    const prompts = Math.max(0, Math.round(tools * 0.1 + ((i * 7 + r.seed) % 5 === 0 ? 2 : 0)));
    const session = Math.max(0, Math.round(tools * 0.16 + ((i * 3 + r.seed) % 4 === 0 ? 3 : 0)));
    const min = END_MIN - (r.n - 1 - i) * r.stepMin;
    rows.push({ min, tools, prompts, session });
  }
  return rows;
}

export default function PulseChart() {
  const [rangeKey, setRangeKey] = useState("15m");
  const [hover, setHover] = useState<number | null>(null);

  const range = RANGES.find((r) => r.key === rangeKey)!;
  const rows = useMemo(() => buildRows(range), [range]);
  const n = rows.length;

  // Y scale across every plotted series so all three fit the box.
  const max = useMemo(() => {
    let m = 1;
    for (const row of rows) m = Math.max(m, row.tools, row.prompts, row.session);
    return m;
  }, [rows]);

  const totals = useMemo(() => {
    const acc = { tools: 0, prompts: 0, session: 0 };
    for (const row of rows) {
      acc.tools += row.tools;
      acc.prompts += row.prompts;
      acc.session += row.session;
    }
    return acc;
  }, [rows]);

  // viewBox is 0..100 in both axes; lines use non-scaling strokes so they stay
  // crisp under the box's non-uniform stretch. Points map index→x, value→y.
  // Y is inset into a [TOP..BASE] band so the peak (and its hover dot/stroke)
  // never touches the top edge and the baseline sits just above the footer.
  const TOP = 14;
  const BASE = 96;
  const x = (i: number) => (n === 1 ? 0 : (i / (n - 1)) * 100);
  const y = (v: number) => TOP + (1 - v / max) * (BASE - TOP);
  const pointsFor = (key: SeriesKey) => rows.map((row, i) => `${x(i)},${y(row[key])}`).join(" ");
  const areaFor = (key: SeriesKey) =>
    `M0,100 L${rows.map((row, i) => `${x(i)},${y(row[key])}`).join(" L")} L100,100 Z`;

  const startLbl = clockLabel(rows[0].min);
  const endLbl = clockLabel(rows[n - 1].min);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const frac = (e.clientX - rect.left) / rect.width;
    setHover(Math.max(0, Math.min(n - 1, Math.round(frac * (n - 1)))));
  };

  const hoveredFrac = hover != null ? x(hover) / 100 : 0;

  return (
    <div className="flex flex-1 flex-col">
      {/* Header — live marker + source + range selector */}
      <div className="mb-2 flex items-center gap-2 text-[10px]">
        <span className="live-dot h-1.5 w-1.5 rounded-full bg-ember" />
        <span className="font-medium uppercase tracking-wider text-ember">Live</span>
        <span className="text-muted-foreground/60">from /usage</span>
        <div className="ml-auto flex gap-0.5">
          {RANGES.map((r) => (
            <button
              key={r.key}
              type="button"
              onClick={() => {
                setRangeKey(r.key);
                setHover(null);
              }}
              className={
                "rounded px-1.5 py-0.5 font-medium transition-colors " +
                (r.key === rangeKey
                  ? "bg-ember/15 text-ember"
                  : "text-muted-foreground hover:bg-muted")
              }
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Plot — SVG lines (clipped reveal) + an unclipped HTML hover layer
          (guide, dots, tooltip). The hud-wipe clip-path lives on the inner SVG
          wrapper ONLY, so the tooltip can extend past the plot bounds. */}
      <div
        className="relative min-h-[72px] flex-1"
        onMouseMove={onMove}
        onMouseLeave={() => setHover(null)}
      >
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="hud-wipe absolute inset-0 h-full w-full"
          style={{ "--d": "260ms" } as React.CSSProperties}
        >
          <defs>
            <linearGradient id="pulseFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--ember)" stopOpacity="0.28" />
              <stop offset="100%" stopColor="var(--ember)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* gridlines */}
          {[25, 50, 75].map((gy) => (
            <line key={gy} x1="0" y1={gy} x2="100" y2={gy} stroke="var(--border)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          ))}
          {/* soft fill under the primary (tools) series */}
          <path d={areaFor("tools")} fill="url(#pulseFill)" />
          {/* one polyline per series, back-to-front so Tools sits on top */}
          {[...SERIES].reverse().map((s) => (
            <polyline
              key={s.key}
              points={pointsFor(s.key)}
              fill="none"
              stroke={s.color}
              strokeWidth={s.key === "tools" ? 2 : 1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              style={s.key === "tools" ? { filter: "drop-shadow(0 0 4px var(--ember))" } : undefined}
            />
          ))}
        </svg>

        {/* Hover guide + per-series dots + tooltip card */}
        {hover != null && (
          <>
            <div
              className="pointer-events-none absolute inset-y-0 w-px bg-border"
              style={{ left: `${hoveredFrac * 100}%` }}
            />
            {SERIES.map((s) => (
              <div
                key={s.key}
                className="pointer-events-none absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-card"
                style={{
                  left: `${hoveredFrac * 100}%`,
                  top: `${y(rows[hover][s.key]) }%`,
                  backgroundColor: s.color,
                }}
              />
            ))}
            <div
              className="pointer-events-none absolute top-1 z-10 w-max rounded-lg border border-border bg-card/95 px-2.5 py-2 text-[10px] shadow-lg backdrop-blur-sm"
              style={{
                left: `${hoveredFrac * 100}%`,
                transform: hoveredFrac > 0.55 ? "translateX(calc(-100% - 8px))" : "translateX(8px)",
              }}
            >
              <div className="mb-1.5 font-mono tabular-nums text-foreground/90">
                {clockLabel(rows[hover].min).date}, {clockLabel(rows[hover].min).time}
              </div>
              <div className="space-y-0.5">
                {SERIES.map((s) => (
                  <div key={s.key} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: s.color }} />
                    <span className="text-muted-foreground">{s.label}</span>
                    <span className="ml-auto pl-3 font-mono tabular-nums text-foreground">
                      {rows[hover][s.key]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* axis end labels — own flow row so they never overlap the baseline */}
      <div className="mt-1.5 flex justify-between font-mono text-[9px] text-muted-foreground/60">
        <span>{startLbl.date}, {startLbl.time}</span>
        <span>{endLbl.date}, {endLbl.time}</span>
      </div>

      {/* Footer legend + totals (update with the range) */}
      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-muted-foreground">
        {SERIES.map((s) => (
          <span key={s.key} className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-sm" style={{ backgroundColor: s.color }} />
            {totals[s.key]} {s.label.toLowerCase()}
          </span>
        ))}
        <span className="ml-auto font-mono">
          {range.newTok} new · {range.cache} cache
        </span>
      </div>
    </div>
  );
}
