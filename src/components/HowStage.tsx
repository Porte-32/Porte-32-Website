'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './HowStage.module.css';

type HowStageProps = {
  title: string;
  /** Three sentences; **marked** words become the step's jump link. */
  steps: string[];
};

const N = 96; // dots in "one world"
const GROUP = 10; // dots that stay for "a small group"
const C = 300; // centre of the 600 × 600 viewBox

type Dot = { x: number; y: number; r: number; o: number };

// Rounded so server and browser render identical numbers (trig can differ in the last digits).
const round = (v: number) => Math.round(v * 10) / 10;

// Phyllotaxis spiral: an even, organic field of people and roles.
const field: Dot[] = Array.from({ length: N }, (_, i) => {
  const a = i * 2.39996; // golden angle
  const d = 250 * Math.sqrt((i + 0.5) / N);
  return { x: round(C + Math.cos(a) * d), y: round(C + Math.sin(a) * d), r: 3, o: 0.55 };
});

// Step 2: dot 0 takes the centre in brass; the rest drift back and fade.
const speaker: Dot[] = field.map((p, i) => i === 0
  ? { x: C, y: C, r: 10, o: 1 }
  : { x: C + (p.x - C) * 1.12, y: C + (p.y - C) * 1.12, r: 2.6, o: 0.16 });

// Step 3: ten dots form a ring around the speaker; everything else goes.
const group: Dot[] = field.map((p, i) => {
  if (i === 0) return { x: C, y: C, r: 10, o: 1 };
  if (i <= GROUP) {
    const a = ((i - 1) / GROUP) * Math.PI * 2 - Math.PI / 2;
    return { x: C + Math.cos(a) * 96, y: C + Math.sin(a) * 96, r: 5, o: 1 };
  }
  return { x: C + (p.x - C) * 1.25, y: C + (p.y - C) * 1.25, r: 2, o: 0 };
});

const states = [field, speaker, group];

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

// Scroll progress → step position, with a pause on each step so it can be read.
const STOPS = [0.1, 0.5, 0.9];
function stepAt(p: number) {
  if (p < 0.22) return 0;
  if (p < 0.42) return (p - 0.22) / 0.2;
  if (p < 0.58) return 1;
  if (p < 0.78) return 1 + (p - 0.58) / 0.2;
  return 2;
}

/** "How it works", told by a field of dots that narrows to one speaker and a small group. */
export function HowStage({ title, steps }: HowStageProps) {
  const wrap = useRef<HTMLDivElement>(null);
  const dots = useRef<(SVGCircleElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    let shown = -1;
    let current = reduce ? 2 : 0;

    const draw = (t: number) => {
      const k = Math.min(1, Math.floor(t));
      const f = ease(Math.min(1, t - k));
      const from = states[k];
      const to = states[Math.min(2, k + 1)];
      dots.current.forEach((el, i) => {
        if (!el) return;
        el.setAttribute('cx', mix(from[i].x, to[i].x, f).toFixed(1));
        el.setAttribute('cy', mix(from[i].y, to[i].y, f).toFixed(1));
        el.setAttribute('r', mix(from[i].r, to[i].r, f).toFixed(2));
        el.style.opacity = mix(from[i].o, to[i].o, f).toFixed(3);
      });
    };

    if (reduce) {
      setStill(true);
      draw(2);
      return;
    }

    const tick = () => {
      raf = 0;
      const el = wrap.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const run = Math.max(1, r.height - window.innerHeight);
      const target = stepAt(Math.min(1, Math.max(0, -r.top / run)));
      current += (target - current) * 0.14;
      if (Math.abs(target - current) < 0.001) current = target;
      draw(current);
      const step = Math.round(current);
      if (step !== shown) { shown = step; setActive(step); }
      if (current !== target) raf = requestAnimationFrame(tick);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
    tick();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const jump = (i: number) => {
    const el = wrap.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const run = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + run * STOPS[i], behavior: 'smooth' });
  };

  return (
    <div ref={wrap} className={`${styles.wrap} ${still ? styles.still : ''}`}>
      <div className={styles.stage}>
        <h3 className={styles.srOnly}>{title}</h3>

        <svg className={styles.field} viewBox="0 0 600 600" aria-hidden>
          {field.map((p, i) => (
            <circle
              key={i}
              ref={el => { dots.current[i] = el; }}
              cx={p.x}
              cy={p.y}
              r={p.r}
              className={i === 0 ? styles.speakerDot : styles.dot}
              style={{ opacity: p.o }}
            />
          ))}
        </svg>

        <p className={styles.text}>
          {steps.map((s, i) => (
            <span key={i} className={`${styles.step} ${active === i || still ? styles.on : ''}`}>
              {s.split('**').map((part, j) =>
                j % 2
                  ? <button key={j} type="button" className={styles.caps} onClick={() => jump(i)}>{part}</button>
                  : part,
              )}{' '}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
