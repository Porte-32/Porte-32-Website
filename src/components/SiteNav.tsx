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
 * On phones the links give way to a menu button that opens a full-screen menu.
 */
export function SiteNav({ links }: SiteNavProps) {
  const [active, setActive] = useState<string | null>(null);
  const [slim, setSlim] = useState(false);
  const [open, setOpen] = useState(false);

  // While the phone menu is open: the page stays still and Escape closes it.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const overflow = root.style.overflow;
    root.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => {
      root.style.overflow = overflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const go = (label: string) => {
    setActive(label);
    setOpen(false);
  };

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
      <nav className={`${styles.nav} ${slim && !open ? styles.slim : ''}`}>
        <a href="#" className={styles.home} onClick={() => setOpen(false)}>
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

        <button
          type="button"
          className={`${styles.toggle} ${open ? styles.toggleOpen : ''}`}
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(o => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Phones: the full-screen menu. */}
      <div id="site-menu" className={`${styles.menu} ${open ? styles.menuOpen : ''}`} aria-hidden={!open}>
        <ul className={styles.menuList}>
          {links.map((link, i) => (
            <li key={link.label} className={styles.menuItem} style={{ transitionDelay: open ? `${120 + i * 60}ms` : '0ms' }}>
              <a href={link.href} className={styles.menuLink} tabIndex={open ? 0 : -1} onClick={() => go(link.label)}>
                {link.label}
              </a>
              {link.parts && (
                <ul className={styles.menuParts}>
                  {link.parts.map(part => (
                    <li key={part.href}>
                      <a href={part.href} className={styles.menuPart} tabIndex={open ? 0 : -1} onClick={() => go(link.label)}>
                        {part.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
