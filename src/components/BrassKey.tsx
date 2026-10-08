'use client';

import { useEffect, useRef } from 'react';
import styles from './BrassKey.module.css';

/** Decorative brass key that drifts down the right edge as the page scrolls. */
export function BrassKey() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cur = 0;
    let raf = 0;
    const tick = () => {
      const el = ref.current;
      if (el) {
        const doc = document.documentElement;
        const max = Math.max(1, doc.scrollHeight - window.innerHeight);
        const target = Math.min(1, Math.max(0, window.scrollY / max));
        cur += (target - cur) * 0.06;
        const p = cur;
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const top = Math.max(170, vh * 0.3);
        const y = top + p * (vh * 0.86 - top);
        const x = vw * 0.84 + Math.sin(p * Math.PI * 3.2) * vw * 0.06 - (vw < 700 ? vw * 0.08 : 0);
        const r = Math.sin(p * Math.PI * 4.4) * 28 + p * 40 - 18;
        const tilt = Math.cos(p * Math.PI * 4.4) * 32;
        el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) rotate(${r}deg) rotateY(${tilt}deg)`;
        el.style.opacity = '1';
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
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
