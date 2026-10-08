'use client';

import { useEffect, useState } from 'react';
import type { NavLink } from '@/content/hero';
import styles from './SiteNav.module.css';

type SiteNavProps = {
  links: NavLink[];
};

/** Floating pill nav with a frosted-glass ground (Hero v4). Slims down while scrolling down; wakes on scroll up, hover or focus. */
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
          {links.map(link => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setActive(link.label)}
              className={`${styles.link} ${active === link.label ? styles.active : ''}`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
