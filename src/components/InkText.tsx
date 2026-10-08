'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './InkText.module.css';

type InkTextProps = {
  text: string;
  className?: string;
};

/** Paragraph whose words darken one by one as it scrolls up into reading position. */
export function InkText({ text, className = '' }: InkTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(' ');
  const [inked, setInked] = useState(words.length);
  const [live, setLive] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setLive(true);
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Starts inking when the paragraph's top reaches 85% of the screen, done by the time its bottom reaches 55%.
      const start = vh * 0.85;
      const end = vh * 0.55 - height;
      const p = Math.min(1, Math.max(0, (start - top) / (start - end)));
      setInked(Math.round(p * words.length));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [words.length]);

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={i} className={live && i >= inked ? styles.faint : styles.word}>
          {w}{i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </p>
  );
}
