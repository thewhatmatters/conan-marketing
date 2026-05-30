import { useEffect, useRef, useState } from "react";

// Cycling headline word with a per-letter blur-in, colored by a warm fire
// gradient that settles to bone. Ported from the COMPUTE hero, recolored to the
// Conan pulp palette. This is the hero's "unforgettable" micro-moment.
const WORDS = ["hand", "steel", "watch", "eye"];
const STAGGER = 45; // ms between letters
const DURATION = 500; // per-letter blur+fade
const HOLD = 2500; // ms each word is shown

// bone → gold → ember → blood → bone (seamless ends)
const GRADIENT = ["#ece3d0", "#c8962b", "#d97706", "#ef4444", "#ece3d0"];
const SETTLE = "#ece3d0"; // bone — matches the headline once settled

type LetterState = { opacity: number; blur: number };

function hex2rgb(hex: string): [number, number, number] {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}

function BlurWord({ word, trigger }: { word: string; trigger: number }) {
  const letters = word.split("");
  const [states, setStates] = useState<LetterState[]>(
    letters.map(() => ({ opacity: 0, blur: 20 })),
  );
  const [showGradient, setShowGradient] = useState(true);
  const frames = useRef<number[]>([]);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    frames.current.forEach(cancelAnimationFrame);
    timers.current.forEach(clearTimeout);
    frames.current = [];
    timers.current = [];

    setStates(letters.map(() => ({ opacity: 0, blur: 20 })));
    setShowGradient(true);

    letters.forEach((_, i) => {
      const t = setTimeout(() => {
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / DURATION, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setStates((prev) => {
            const next = [...prev];
            next[i] = { opacity: eased, blur: 20 * (1 - eased) };
            return next;
          });
          if (p < 1) frames.current.push(requestAnimationFrame(tick));
        };
        frames.current.push(requestAnimationFrame(tick));
      }, i * STAGGER);
      timers.current.push(t);
    });

    const hold = STAGGER * letters.length + DURATION + 200;
    timers.current.push(setTimeout(() => setShowGradient(false), hold));

    return () => {
      frames.current.forEach(cancelAnimationFrame);
      timers.current.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  return (
    <>
      {letters.map((char, i) => {
        const ci = (i / Math.max(letters.length - 1, 1)) * (GRADIENT.length - 1);
        const lo = Math.floor(ci);
        const hi = Math.min(lo + 1, GRADIENT.length - 1);
        const t = ci - lo;
        const [r1, g1, b1] = hex2rgb(GRADIENT[lo]);
        const [r2, g2, b2] = hex2rgb(GRADIENT[hi]);
        const r = Math.round(r1 + (r2 - r1) * t);
        const g = Math.round(g1 + (g2 - g1) * t);
        const b = Math.round(b1 + (b2 - b1) * t);
        const st = states[i] ?? { opacity: 0, blur: 20 };
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: st.opacity,
              filter: `blur(${st.blur}px)`,
              color: showGradient ? `rgb(${r},${g},${b})` : SETTLE,
              transition: "color 0.4s ease",
            }}
          >
            {char}
          </span>
        );
      })}
    </>
  );
}

export default function HeroWord() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((p) => (p + 1) % WORDS.length), HOLD);
    return () => clearInterval(id);
  }, []);
  return <BlurWord word={WORDS[index]} trigger={index} />;
}
