'use client';

import { useEffect, useRef, useState } from 'react';
import { introPlays } from '@/lib/intro';
import { KEYHOLE, LOGO_GROUPS, LOGO_SIZE } from './introLogo';
import styles from './Intro.module.css';

// The door frame as one line along its centre: from the keyhole up, left along the top, down, right along the bottom,
// and back up to the keyhole. Segment lengths give where along the line the bottom edge runs.
const FRAME_PATH = 'M867.5 122 V24.5 H24.5 V315 H867.5 V222';
const FRAME_WIDTH = 3; // the frame's weight in the logo
const FRAME_LEN = 97.5 + 843 + 290.5 + 843 + 93;
const BOTTOM_START = 97.5 + 843 + 290.5; // where the line turns onto the bottom edge, at x = 24.5

const MIN_TRACE = 2500; // ms: the line never draws faster than this
const LOADING_CAP = 0.9; // and waits around here until the page has loaded
const FOLLOW = 0.09; // how softly the drawn line follows the loading progress (per frame)
const ARRIVE = 540; // ms for a mark to fade up
const NUMERALS = [0, 150]; // ms after the line closes that 3 and 2 arrive
const HOLD = 375; // ms with the finished logo before it leaves
const EXIT = { logo: [0, 625], screen: [585, 1165] }; // the logo fades away, then the linen gives way to the site

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const span = (t: number, [a, b]: number[]) => clamp((t - a) / (b - a));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

// PORTE's letters arrive as the line passes beneath them along the bottom edge.
const letters = LOGO_GROUPS.map((g, i) => i).filter(i => i > 0 && i < KEYHOLE);
const letterAt = (i: number) => (BOTTOM_START + (LOGO_GROUPS[i].x - 24.5)) / FRAME_LEN;
const numerals = LOGO_GROUPS.map((g, i) => i).filter(i => i > KEYHOLE);

/**
 * Opening sequence: one smooth line draws the door frame of the logo, starting at the keyhole and travelling round;
 * it follows the page's loading, so it doubles as the loader. PORTE's letters fade up as the line passes beneath them,
 * the keyhole and 32 arrive as it closes. Then the logo fades away, and the linen gives way to the site.
 * Plays on the first page of a visit, on any reload, and after the nav logo or the closing's "Upcoming events" is
 * pressed; other pages open straight away (lib/intro.ts, whose head script hides the screen before first paint).
 * Skipped for reduced motion; a CSS fail-safe hides it if script never runs.
 */
export function Intro() {
  const [done, setDone] = useState(false);
  const [ready, setReady] = useState(false);
  const screen = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const logo = useRef<SVGGElement>(null);
  const frame = useRef<SVGPathElement>(null);
  const marks = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    if (!introPlays() || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDone(true);
      return;
    }
    const root = document.documentElement;
    const overflow = root.style.overflow;
    root.style.overflow = 'hidden';

    let loaded = document.readyState === 'complete';
    const onLoad = () => { loaded = true; };
    window.addEventListener('load', onLoad);

    const measure = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const k = Math.min(vw * 0.56, 380) / LOGO_SIZE.w;
      const x0 = (vw - LOGO_SIZE.w * k) / 2;
      const y0 = (vh - LOGO_SIZE.h * k) / 2;
      svg.current?.setAttribute('viewBox', `0 0 ${vw} ${vh}`);
      logo.current?.setAttribute('transform', `translate(${x0} ${y0}) scale(${k})`);
    };

    // A mark fades up and settles from a few units below.
    const arrive = (i: number, since: number) => {
      const a = easeOut(clamp(since / ARRIVE));
      marks.current[i]?.setAttribute('fill-opacity', String(a));
      marks.current[i]?.setAttribute('transform', `translate(0 ${(1 - a) * 10})`);
    };

    // The logo softly fades, then the screen itself fades to reveal the site.
    const exit = (t: number) => {
      logo.current?.setAttribute('opacity', String(1 - easeInOutSine(span(t, EXIT.logo))));
      if (screen.current) screen.current.style.opacity = String(1 - easeInOutSine(span(t, EXIT.screen)));
    };

    let raf = 0;
    let last = 0;
    let target = 0; // loading progress, linear in time, held back until load
    let drawn = 0; // what the line shows: softly following target
    const born: number[] = [];
    let closedAt = 0;

    const tick = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      target = Math.min(loaded ? 1 : LOADING_CAP, target + dt / MIN_TRACE);
      drawn += (target - drawn) * (1 - Math.pow(1 - FOLLOW, dt / 16.7));
      if (target === 1 && 1 - drawn < 0.0015) drawn = 1;
      frame.current?.setAttribute('stroke-dashoffset', String(1 - easeInOut(drawn)));

      // Letters, as the line passes under them; the keyhole as it closes.
      const at = easeInOut(drawn);
      letters.forEach(i => { if (born[i] === undefined && at >= letterAt(i)) born[i] = now; });
      if (born[KEYHOLE] === undefined && at >= 0.985) born[KEYHOLE] = now;
      if (drawn === 1 && !closedAt) {
        closedAt = now;
        numerals.forEach((i, n) => { born[i] = now + NUMERALS[n]; });
      }
      born.forEach((b, i) => { if (b !== undefined) arrive(i, now - b); });

      if (closedAt) {
        const t = now - closedAt - NUMERALS[NUMERALS.length - 1] - ARRIVE - HOLD;
        if (t > 0) exit(t);
        if (t >= EXIT.screen[1]) {
          root.style.overflow = overflow;
          setDone(true);
          return;
        }
      }
      raf = requestAnimationFrame(tick);
    };

    measure();
    setReady(true);
    raf = requestAnimationFrame(t => { last = t; raf = requestAnimationFrame(tick); });

    window.addEventListener('resize', measure);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', measure);
      window.removeEventListener('load', onLoad);
      root.style.overflow = overflow;
    };
  }, []);

  if (done) return null;

  const mark = (i: number) => (
    <path
      key={i}
      ref={el => { marks.current[i] = el; }}
      className={styles.ink}
      d={LOGO_GROUPS[i].d.join(' ')}
      fillRule="evenodd"
      fillOpacity={0}
    />
  );

  return (
    <div ref={screen} className={`${styles.intro} ${ready ? styles.ready : ''}`} aria-hidden>
      <svg ref={svg} className={styles.stage} preserveAspectRatio="none">
        <g ref={logo}>
          <path
            ref={frame}
            className={styles.line}
            d={FRAME_PATH}
            strokeWidth={FRAME_WIDTH}
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1}
          />
          {letters.map(mark)}
          {mark(KEYHOLE)}
          {numerals.map(mark)}
        </g>
      </svg>
    </div>
  );
}
