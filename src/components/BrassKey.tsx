'use client';

import { useEffect, useRef } from 'react';
import { viewportHeight } from '@/lib/viewport';
import styles from './BrassKey.module.css';

// The key leaves its starting spot over this much scroll from the top, and starts settling into its end spot
// this far before the end of the page (both in screen heights).
const LEAVING = 0.6;
const LANDING = 0.7;
// While it falls it is a faint watermark, a little larger; at either end it is solid at its own size.
const WATERMARK = { ink: 0.12, scale: 1.3 };
// Its pose at the start: tilted, blade pointing to the bottom right (south east). At the end it stands upright.
const START_TILT = -45;
// Whole turns it tumbles through on the way down, on top of turning from its start tilt to upright.
const TURNS = 3;
const TAU = Math.PI * 2;
const clamp = (v: number) => Math.min(1, Math.max(0, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (t: number) => t * t * (3 - 2 * t);

/**
 * Decorative bordeaux key. It starts solid, tilted with its blade to the south east, level with the hero's
 * "Behind every door," (`data-key-start`, whichever is shown), and as you scroll it fades to a faint watermark and
 * falls down the page behind the content: only ever downwards, tumbling end over end at a steady rate, with a slight
 * sideways drift; it lags the scroll a little, so it gathers and sheds speed. Over the last stretch it settles upright
 * into its spot in the closing (`data-key-berth`) and turns solid again. Everything reverses going up.
 * Without motion it simply waits, solid, in its end spot.
 */
export function BrassKey() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let cur = 0;
    let raf = 0;

    const tick = () => {
      raf = 0;
      const el = ref.current;
      const berth = document.querySelector<HTMLElement>('[data-key-berth]');
      const start = Array.from(document.querySelectorAll<HTMLElement>('[data-key-start]')).find(s => s.getClientRects().length);
      if (!el || !berth || !start) return;
      const vw = document.documentElement.clientWidth;
      const vh = viewportHeight();
      const max = Math.max(1, document.documentElement.scrollHeight - vh);

      // The drift follows the scroll well behind, so it floats rather than moves with the page.
      const target = clamp(window.scrollY / max);
      cur += (target - cur) * 0.05;
      if (Math.abs(target - cur) < 0.0005) cur = target;
      else if (!reduce) raf = requestAnimationFrame(tick);
      const p = cur;

      // Falling: from where it starts (its spot as it sits at the top of the page) it only sinks down the screen
      // while the page passes it, drifting across towards where it will land with a slight sway, and tumbling at a
      // steady rate with a little 3D wobble.
      const from = start.getBoundingClientRect();
      const to = berth.getBoundingClientRect();
      const x0 = from.left + from.width / 2;
      const y0 = from.top + window.scrollY + from.height / 2;
      // On phones it keeps to the right (clear of the left-hand text) until late in the fall.
      const across = vw <= 640 ? p ** 3 : p;
      const x = lerp(x0, to.left + to.width / 2, across) + vw * 0.06 * Math.sin(p * TAU);
      // How the end spot wants the key to lie, relative to upright (its --key-turn; e.g. flat on phones).
      const endTurn = 360 * TURNS + (parseFloat(getComputedStyle(berth).getPropertyValue('--key-turn')) || 0);
      const y = lerp(y0, vh * 0.7, ease(clamp(p * 1.15)));
      const turn = lerp(START_TILT, 360 * TURNS, p);
      const tilt = 28 * Math.sin(p * TAU * TURNS);

      // Landing follows the scroll exactly, so the key sits precisely in its end spot; the page rising to meet it.
      const ws = reduce ? 0 : ease(clamp(1 - window.scrollY / (vh * LEAVING)));
      const we = reduce ? 1 : ease(clamp(1 - (max - window.scrollY) / (vh * LANDING)));
      const kx = lerp(reduce ? to.left + to.width / 2 : x, to.left + to.width / 2, we);
      const ky = lerp(y, to.top + to.height / 2, we);
      const settled = Math.max(ws, we);
      const scale = lerp(WATERMARK.scale, 1, settled);
      el.style.transform = `translate3d(${kx}px, ${ky}px, 0) translate(-50%, -50%) rotate(${lerp(turn, we > ws ? endTurn : START_TILT, settled)}deg) rotateY(${lerp(tilt, 0, settled)}deg) scale(${scale})`;
      // Solid only near either spot: it fades to a watermark over the first half of leaving, back over the last half of landing.
      el.style.setProperty('--ink', lerp(WATERMARK.ink, 1, ease(clamp(settled * 2 - 1))).toFixed(3));
      el.style.opacity = '1';
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

  return (
    <div ref={ref} aria-hidden className={styles.key}>
      <svg viewBox="0 0 60 170" width="100%" className={styles.svg}>
        <circle cx={30} cy={30} r={22} fill="none" stroke="currentColor" strokeWidth={3.2} />
        <circle cx={30} cy={30} r={12} fill="none" stroke="currentColor" strokeWidth={1.4} />
        <rect x={26} y={50} width={8} height={8} fill="currentColor" />
        <rect x={27.6} y={58} width={4.8} height={104} fill="currentColor" />
        <path d="M32 128 H48 V136 H41 V142 H48 V150 H41 V156 H32 Z" fill="currentColor" />
        <rect x={24} y={66} width={12} height={2.2} fill="currentColor" />
      </svg>
    </div>
  );
}
