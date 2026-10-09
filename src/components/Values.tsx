'use client';

import { useEffect, useRef } from 'react';
import type { AboutLine } from '@/content/about';
import { viewportHeight } from '@/lib/viewport';
import styles from './Values.module.css';

type ValuesProps = {
  id?: string;
  title: string;
  /** In the order they happen over an evening. */
  items: AboutLine[];
};

// The line draws while the list's top travels from START to END (fractions of the viewport height from the top).
const START = 0.95;
const END = 0.45;
const clamp = (v: number) => Math.min(1, Math.max(0, v));

/**
 * What we care about, told as the arc of one evening: a brass line draws along a faint track as you scroll and each value
 * appears as the line reaches its mark. The values are spread with equal gaps between them.
 * Scrolling back up retracts the line and the values leave in reverse.
 */
export function Values({ id, title, items }: ValuesProps) {
  const list = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = list.current;
    if (!el) return;
    const rows = Array.from(el.querySelectorAll<HTMLLIElement>(`.${styles.item}`));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Where each value's mark sits along the line (0 to 1): across on desktop, down on phones.
    let stops: number[] = [];
    const measure = () => {
      const down = rows[1]?.offsetLeft === rows[0]?.offsetLeft; // stacked on phones
      const size = down ? el.offsetHeight : el.offsetWidth;
      stops = rows.map(r => (down ? r.offsetTop : r.offsetLeft) / size);
    };
    const set = (draw: number) => {
      el.style.setProperty('--draw', draw.toFixed(4));
      rows.forEach((r, i) => r.classList.toggle(styles.on, draw >= stops[i] + 0.02));
    };
    measure();
    el.classList.add(styles.live);
    if (reduce) {
      set(1);
      return;
    }

    let raf = 0;
    let current = 0;
    const tick = () => {
      raf = 0;
      const vh = viewportHeight();
      const target = clamp((vh * START - el.getBoundingClientRect().top) / (vh * (START - END)));
      current += (target - current) * 0.16;
      if (Math.abs(target - current) < 0.001) current = target;
      set(current);
      if (current !== target) raf = requestAnimationFrame(tick);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
    const onResize = () => { measure(); onScroll(); };
    tick();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div id={id} className={styles.values}>
      <h3 className={styles.srOnly}>{title}</h3>
      <ol ref={list} className={styles.list}>
        {items.map(item => (
          <li key={item.key} className={styles.item}>
            <span className={styles.key}>{item.key}</span>
            <span className={styles.mark} aria-hidden />
            <span className={styles.detail}>{item.detail}</span>
          </li>
        ))}
        <li className={styles.line} aria-hidden />
      </ol>
    </div>
  );
}
