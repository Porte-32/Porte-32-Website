'use client';

import { useEffect, useState } from 'react';
import type { NavLink } from '@/content/hero';
import styles from './SiteNav.module.css';

type SiteNavProps = {
  links: NavLink[];
};

/**
 * Floating pill nav with a frosted-glass ground (Hero v4). Slims down while scrolling down; wakes on scroll up, hover or focus.
 * A link with parts (About) shows them in a small panel beneath it on hover or keyboard focus.
 */
export function SiteNav({ links }: SiteNavProps) {
  const [active, setActive] = useState<string | null>(null);
  const [slim, setSlim] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const dy = y - lastY;
      if (y < 80) setSlim(false);
      else if (dy > 6) setSlim(true);
      else if (dy < -6) setSlim(false);
      if (Math.abs(dy) > 6 || y < 80) lastY = y;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} ${slim ? styles.slim : ''}`}>
        <a href="#" className={styles.home}>
          <img src="/logo-full-ink.png" alt="Porte32" className={styles.logo} />
        </a>
        <div className={styles.links}>
          {links.map(link => {
            const anchor = (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setActive(link.label)}
                className={`${styles.link} ${active === link.label ? styles.active : ''}`}
              >
                {link.label}
              </a>
            );
            if (!link.parts) return anchor;
            // A link with parts opens a small panel of them on hover or keyboard focus.
            return (
              <div key={link.label} className={styles.item}>
                {anchor}
                <div className={styles.panel}>
                  <ul className={styles.parts}>
                    {link.parts.map(part => (
                      <li key={part.href}>
                        <a href={part.href} className={styles.part} onClick={() => setActive(link.label)}>
                          <span className={styles.partTitle}>{part.title}</span>
                          <span className={styles.partLine}>{part.line}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
