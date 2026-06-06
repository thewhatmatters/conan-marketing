import { useEffect, useRef, useState } from "react";

// Cycling headline word with a per-letter blur-in. Each word blurs in as ONE
// color — ember (--primary), the same orange as the Download CTA — then settles
// to the headline color (--foreground), so it flashes warm and resolves into
// the line. No multi-hue gradient. This is the hero's "unforgettable" moment.
const WORDS = ["hand", "steel", "watch", "eye"];
const STAGGER = 45; // ms between letters
const DURATION = 500; // per-letter blur+fade
const HOLD = 2500; // ms each word is shown

const COLOR_ACTIVE = "var(--primary)"; // ember — matches the Download CTA
const COLOR_SETTLE = "var(--foreground)"; // headline color, once resolved

type LetterState = { opacity: number; blur: number };

function BlurWord({ word, trigger }: { word: string; trigger: number }) {
  const letters = word.split("");
  const [states, setStates] = useState<LetterState[]>(
    letters.map(() => ({ opacity: 0, blur: 20 })),
  );
  // true while the word is ember; flips to settle into the headline color.
  const [active, setActive] = useState(true);
  const frames = useRef<number[]>([]);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    frames.current.forEach(cancelAnimationFrame);
    timers.current.forEach(clearTimeout);
    frames.current = [];
    timers.current = [];

    setStates(letters.map(() => ({ opacity: 0, blur: 20 })));
    setActive(true);

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

    // Once the letters have blurred in (+ a brief beat), settle ember → headline.
    const settleAt = STAGGER * letters.length + DURATION + 250;
    timers.current.push(setTimeout(() => setActive(false), settleAt));

    return () => {
      frames.current.forEach(cancelAnimationFrame);
      timers.current.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  return (
    <>
      {letters.map((char, i) => {
        const st = states[i] ?? { opacity: 0, blur: 20 };
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: st.opacity,
              filter: `blur(${st.blur}px)`,
              color: active ? COLOR_ACTIVE : COLOR_SETTLE,
              transition: "color 0.45s ease",
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
