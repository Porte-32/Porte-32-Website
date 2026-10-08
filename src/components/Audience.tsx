'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Audience.module.css';

type AudienceProps = {
  id?: string;
  /** Fixed start of the line, e.g. "Open to". */
  lead: string;
  audiences: string[];
};

/**
 * Who the events are open to, as one line whose end changes: "Open to students", "Open to founders"…
 * The stage stays pinned while you scroll; each audience replaces the last and a brass rule grows beneath. Scrolling back up runs it in reverse.
 */
export function Audience({ id, lead, audiences }: AudienceProps) {
  const wrap = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [still, setStill] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStill(true);
      return;
    }
    let raf = 0;
    let current = 0;
    const tick = () => {
      raf = 0;
      const el = wrap.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const run = Math.max(1, r.height - window.innerHeight);
      const target = Math.min(1, Math.max(0, -r.top / run));
      current += (target - current) * 0.16;
      if (Math.abs(target - current) < 0.001) current = target;
      el.style.setProperty('--progress', current.toFixed(4));
      setActive(Math.min(audiences.length - 1, Math.floor(target * audiences.length)));
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
  }, [audiences.length]);

  const last = audiences.length - 1;

  return (
    <div id={id} ref={wrap} className={`${styles.wrap} ${still ? styles.still : ''}`}>
      <div className={styles.stage}>
        <p className={styles.line}>
          <span className={styles.lead}>{lead} </span>
          <span className={styles.srOnly}>{audiences.join(', ')}</span>
          <span className={styles.slot} aria-hidden>
            {audiences.map((a, i) => (
              <span
                key={a}
                className={[
                  styles.word,
                  i === last ? styles.emphasis : '',
                  still || i === active ? styles.on : i < active ? styles.past : '',
                ].join(' ')}
              >
                {a}
              </span>
            ))}
          </span>
        </p>

        <span className={styles.rule} aria-hidden />
      </div>
    </div>
  );
}
