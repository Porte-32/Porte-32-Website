'use client';

import { useEffect, useRef } from 'react';
import { viewportHeight } from '@/lib/viewport';
import styles from './BrassKey.module.css';

// The key leaves its starting spot over this much scroll from the top, and starts settling into its end spot
// this far before the end of the page (both in screen heights).
const LEAVING = 0.6;
const LANDING = 0.9;
// While it falls it is a faint watermark, a little larger; at either end it is solid at its resting size.
const WATERMARK = { ink: 0.12, scale: 1.3 };
// Whole turns it tumbles through on the way down, on top of turning from its start pose to its end pose.
const TURNS = 3;
const TAU = Math.PI * 2;
const clamp = (v: number) => Math.min(1, Math.max(0, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (t: number) => t * t * (3 - 2 * t);
// A softer ease for the landing: it starts and finishes more gently.
const glide = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);

/** The key's drawing, upright: bow at the top, blade at the bottom. */
function KeyShape() {
  return (
    <svg viewBox="0 0 60 170" width="100%" className={styles.svg} aria-hidden="true">
      <circle cx={30} cy={30} r={22} fill="none" stroke="currentColor" strokeWidth={3.2} />
      <circle cx={30} cy={30} r={12} fill="none" stroke="currentColor" strokeWidth={1.4} />
      <rect x={26} y={50} width={8} height={8} fill="currentColor" />
      <rect x={27.6} y={58} width={4.8} height={104} fill="currentColor" />
      <path d="M32 128 H48 V136 H41 V142 H48 V150 H41 V156 H32 Z" fill="currentColor" />
      <rect x={24} y={66} width={12} height={2.2} fill="currentColor" />
    </svg>
  );
}

/**
 * The key at rest in one of its spots, as part of the page, so it sits perfectly still there.
 * Shown only while the falling key is settled in that spot. Its spot sets its size and pose
 * (--key-w and --key-turn); the falling key reads them so the two match exactly.
 */
export function RestingKey({ at }: { at: 'start' | 'end' }) {
  return (
    <span className={`${styles.resting} ${at === 'start' ? styles.atStart : styles.atEnd}`} data-key-rest={at}>
      <KeyShape />
    </span>
  );
}

/**
 * Decorative bordeaux key. It starts solid, tilted with its blade to the south east, level with the hero's
 * "Behind every door," (`data-key-start`, whichever is shown), and as you scroll it fades to a faint watermark and
 * falls down the page behind the content: only ever downwards, tumbling end over end at a steady rate, with a slight
 * sideways drift; it lags the scroll a little, so it gathers and sheds speed. Over the last stretch it settles into
 * its spot in the closing (`data-key-berth`) and turns solid again. Everything reverses going up.
 * At the very top and bottom the key in the page (RestingKey) takes over, so it can't drift; while the page is
 * pinch-zoomed the falling key hides. Without motion it simply rests in its end spot.
 */
export function BrassKey() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const root = document.documentElement;
    let cur = 0;
    let raf = 0;

    // A resting key's size and pose, so the falling key can match it exactly.
    const pose = (spot: Element) => {
      const rest = spot.querySelector<HTMLElement>('[data-key-rest]');
      const turn = rest ? parseFloat(getComputedStyle(rest).rotate) || 0 : 0;
      return { width: rest?.offsetWidth ?? 0, turn };
    };

    const tick = () => {
      raf = 0;
      const el = ref.current;
      const berth = document.querySelector<HTMLElement>('[data-key-berth]');
      const start = Array.from(document.querySelectorAll<HTMLElement>('[data-key-start]')).find(s => s.getClientRects().length);
      if (!el || !berth || !start) return;
      const vw = root.clientWidth;
      const vh = viewportHeight();
      const max = Math.max(1, root.scrollHeight - vh);

      // The drift follows the scroll well behind, so it floats rather than moves with the page.
      const target = clamp(window.scrollY / max);
      cur += (target - cur) * 0.05;
      if (Math.abs(target - cur) < 0.0005) cur = target;
      else if (!reduce) raf = requestAnimationFrame(tick);
      const p = cur;

      const from = start.getBoundingClientRect();
      const to = berth.getBoundingClientRect();
      const a = pose(start);
      const b = pose(berth);
      const size = el.offsetWidth || 1;

      // Falling: from where it starts (its spot as it sits at the top of the page) it only sinks down the screen
      // while the page passes it, drifting across towards where it will land with a slight sway, and tumbling at a
      // steady rate with a little 3D wobble. On phones it keeps to the right until late in the fall.
      const x0 = from.left + from.width / 2;
      const y0 = from.top + window.scrollY + from.height / 2;
      const across = vw <= 640 ? p ** 3 : p;
      const x = lerp(x0, to.left + to.width / 2, across) + vw * 0.06 * Math.sin(p * TAU);
      const y = lerp(y0, vh * 0.7, ease(clamp(p * 1.15)));
      const endTurn = b.turn + 360 * TURNS;
      const turn = lerp(a.turn, endTurn, p);
      const tilt = 28 * Math.sin(p * TAU * TURNS);

      // Landing follows the same lagging scroll as the fall, so the key glides into its end spot rather than snapping
      // to the page; once the scroll stops it keeps easing in until it is exactly in place.
      const ws = reduce ? 0 : ease(clamp(1 - window.scrollY / (vh * LEAVING)));
      const we = reduce ? 1 : glide(clamp(1 - (max - p * max) / (vh * LANDING)));
      const kx = lerp(x, to.left + to.width / 2, we);
      const ky = lerp(y, to.top + to.height / 2, we);
      const settled = Math.max(ws, we);
      const restScale = (we > ws ? b.width : a.width) / size;
      const scale = lerp(WATERMARK.scale, restScale, settled);
      const rest = we > ws ? endTurn : a.turn;
      el.style.transform = `translate3d(${kx}px, ${ky}px, 0) translate(-50%, -50%) rotate(${lerp(turn, rest, settled)}deg) rotateY(${lerp(tilt, 0, settled)}deg) scale(${scale})`;
      // Solid only near either spot: it fades to a watermark over the first half of leaving, back over the last half of landing.
      el.style.setProperty('--ink', lerp(WATERMARK.ink, 1, ease(clamp(settled * 2 - 1))).toFixed(3));

      // At the very top or bottom, hand over to the key resting in the page; hide the falling key while zoomed in.
      const atEnd = max - window.scrollY <= 0.5 && we > 0.9995;
      const state = reduce || atEnd ? 'end' : window.scrollY <= 0.5 ? 'start' : '';
      if (root.dataset.key !== state) root.dataset.key = state;
      const zoomed = (window.visualViewport?.scale ?? 1) > 1.01;
      el.style.visibility = state || zoomed ? 'hidden' : 'visible';
      el.style.opacity = '1';
    };

    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
    const vv = window.visualViewport;
    tick();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    vv?.addEventListener('resize', onScroll);
    vv?.addEventListener('scroll', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      vv?.removeEventListener('resize', onScroll);
      vv?.removeEventListener('scroll', onScroll);
      delete root.dataset.key;
    };
  }, []);

  return (
    <div ref={ref} aria-hidden className={styles.key}>
      <KeyShape />
    </div>
  );
}
