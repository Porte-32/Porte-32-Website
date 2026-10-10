'use client';

import { useEffect, useRef } from 'react';
import type { contact as contactContent } from '@/content/contact';
import { viewportHeight } from '@/lib/viewport';
import { RestingKey } from './BrassKey';
import { Curtain } from './Curtain';
import { InkText } from './InkText';
import { MailIcon } from './MailIcon';
import styles from './Closing.module.css';

type ClosingProps = {
  content: typeof contactContent;
};

// The page deepens while the closing's top travels from START to END (fractions of the viewport height).
const START = 0.9;
const END = 0.4;
const clamp = (v: number) => Math.min(1, Math.max(0, v));

/**
 * The end of the page as one last full screen, a shade deeper than the rest: the page deepens with the scroll as it
 * arrives, and lightens again going back up. The question inks in on the left, like the founders' quote that opens
 * About. Level with it on the right, the key that has been falling down the page comes to rest, upright (BrassKey
 * finds the `data-key-berth` spot). Beneath them, one quiet line in small capitals: how to reach us (email and
 * LinkedIn, each with its icon) under the question, and the way on to the events under the key; hovering that turns
 * the key.
 * Under all that, the fields we're thinking of opening drift past (Curtain). The logo and copyright sit at the foot
 * of the screen.
 */
export function Closing({ content }: ClosingProps) {
  const footer = useRef<HTMLElement>(null);
  const dusk = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let current = 0;
    let raf = 0;
    const tick = () => {
      raf = 0;
      if (!footer.current || !dusk.current) return;
      const vh = viewportHeight();
      const target = clamp((vh * START - footer.current.getBoundingClientRect().top) / (vh * (START - END)));
      current += (target - current) * 0.16;
      if (Math.abs(target - current) < 0.001) current = target;
      else raf = requestAnimationFrame(tick);
      dusk.current.style.opacity = current.toFixed(4);
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
    <>
      <div ref={dusk} className={styles.dusk} aria-hidden="true" />
      <footer ref={footer} id="contact" className={styles.closing}>
        <div className={styles.stage}>
          <InkText as="h2" text={content.heading} className={styles.heading} />

          <div className={styles.landing}>
            <span className={styles.berth} data-key-berth aria-hidden="true"><RestingKey at="end" /></span>
            <a href={content.cta.href} className={styles.next} data-intro>
              {content.cta.label}
            </a>
          </div>

          <div className={styles.reach}>
            <a href={`mailto:${content.email}`} className={styles.contact}>
              <MailIcon className={styles.icon} />
              {content.email}
            </a>
            <a href={content.linkedin.href} className={styles.contact} target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.icon}>
                <rect x="1.75" y="1.75" width="20.5" height="20.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <path
                  transform="translate(3 3) scale(0.756)"
                  fill="currentColor"
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"
                />
              </svg>
              {content.linkedin.label}
            </a>
          </div>
        </div>

        <Curtain label={content.doors.label} items={content.doors.items} className={styles.curtain} />

        <div className={styles.bar}>
          <a href="#" className={styles.home}>
            <img src="/logo-full-ink.png" alt="Porte 32" className={styles.logo} />
          </a>
          <span className={styles.copyright}>{content.copyright}</span>
        </div>
      </footer>
    </>
  );
}
