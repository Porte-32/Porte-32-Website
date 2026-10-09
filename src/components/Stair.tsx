'use client';

import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import type { AboutLine } from '@/content/about';
import { viewportHeight } from '@/lib/viewport';
import styles from './Stair.module.css';

type StairProps = {
  lines: AboutLine[];
};

// A row's rule draws while its centre travels from START to END (fractions of the viewport height from the top).
const START = 0.98;
const END = 0.76;
const clamp = (v: number) => Math.min(1, Math.max(0, v));

/**
 * "How it works" as a descending stair. Each key phrase starts further in while the details share one column,
 * so the brass rule between them shortens: the room narrows from a world to a group.
 * The rules follow the scroll: they draw out going down and retract going back up.
 */
export function Stair({ lines }: StairProps) {
  const list = useRef<HTMLOListElement>(null);
  const rows = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    list.current?.classList.add(styles.live);
    const current = rows.current.map(() => 0);
    let raf = 0;

    const tick = () => {
      raf = 0;
      const vh = viewportHeight();
      let moving = false;
      rows.current.forEach((el, i) => {
        if (!el) return;
        const { top, height } = el.getBoundingClientRect();
        const target = clamp((vh * START - (top + height / 2)) / (vh * (START - END)));
        current[i] += (target - current[i]) * 0.16;
        if (Math.abs(target - current[i]) < 0.001) current[i] = target;
        else moving = true;
        el.style.setProperty('--draw', current[i].toFixed(4));
        el.classList.toggle(styles.keyOn, current[i] > 0.02);
        el.classList.toggle(styles.detailOn, current[i] > 0.96);
      });
      if (moving) raf = requestAnimationFrame(tick);
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
    <ol ref={list} className={styles.stair}>
      {lines.map((line, i) => (
        <li
          key={line.key}
          ref={el => { rows.current[i] = el; }}
          className={styles.row}
          style={{ '--step': i } as CSSProperties}
        >
          <span className={styles.lead}>
            <span className={styles.key}>{line.key}</span>
            <span className={styles.rule} aria-hidden />
          </span>
          <span className={styles.detail}><span>{line.detail}</span></span>
        </li>
      ))}
    </ol>
  );
}
