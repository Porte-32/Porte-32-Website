'use client';

import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { viewportHeight } from '@/lib/viewport';
import styles from './DrawnFrame.module.css';

type DrawnFrameProps = {
  children: ReactNode;
};

// The frame draws while its centre travels from START to END (fractions of the viewport height from the top).
const START = 1.05;
const END = 0.55;
const clamp = (v: number) => Math.min(1, Math.max(0, v));

/**
 * The 1.5px ink frame, drawn as one line with the scroll: from the bottom-left corner up, across the top,
 * down the right and back along the bottom, like the door in the intro. It retracts going back up.
 * Without motion (or before the script runs) the frame is simply there.
 */
export function DrawnFrame({ children }: DrawnFrameProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let current = 0;
    let raf = 0;

    const tick = () => {
      raf = 0;
      const { top, height } = el.getBoundingClientRect();
      const vh = viewportHeight();
      const target = clamp((vh * START - (top + height / 2)) / (vh * (START - END)));
      current += (target - current) * 0.16;
      if (Math.abs(target - current) < 0.001) current = target;
      else raf = requestAnimationFrame(tick);

      // Share the progress out along the perimeter so the line keeps one speed round the corners.
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      const drawn = current * 2 * (w + h);
      const sides: [string, number, number][] = [['--l', 0, h], ['--t', h, w], ['--r', h + w, h], ['--b', 2 * h + w, w]];
      sides.forEach(([name, offset, length]) => {
        el.style.setProperty(name, clamp((drawn - offset) / length).toFixed(4));
      });
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
    <div ref={ref} className={styles.frame}>
      <span className={`${styles.side} ${styles.left}`} aria-hidden="true" />
      <span className={`${styles.side} ${styles.top}`} aria-hidden="true" />
      <span className={`${styles.side} ${styles.right}`} aria-hidden="true" />
      <span className={`${styles.side} ${styles.bottom}`} aria-hidden="true" />
      {children}
    </div>
  );
}
