'use client';

import { useEffect, useState } from 'react';
import type { Pillar } from '@/content/hero';
import { RestingKey } from './BrassKey';
import styles from './Hero.module.css';

type HeroProps = {
  words: string[];
  pillars: Pillar[];
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
};

const WORD_MS = 3000;

/** Homepage hero (Hero v4): rotating headline word, pillar tabs, two actions. */
export function Hero({ words, pillars, primary, secondary }: HeroProps) {
  const [word, setWord] = useState(0);
  const [pillar, setPillar] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setWord(i => (i + 1) % words.length), WORD_MS);
    return () => clearInterval(t);
  }, [words.length]);

  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        {/* Where the key starts, before it falls down the page (BrassKey): far right, level with the first line; above it on phones. */}
        <span className={styles.keyAbove} data-key-start aria-hidden="true"><RestingKey at="start" /></span>
        <h1 className={styles.title}>
          Behind every door,
          <span className={styles.keyBeside} data-key-start aria-hidden="true"><RestingKey at="start" /></span>
          <br />
          <span className={styles.slot}>
            <span key={word} className={styles.word}>{words[word]}</span>
          </span>
        </h1>

        <div className={styles.row}>
          <div className={styles.pillars}>
            <div className={styles.tabs}>
              {pillars.map((p, k) => (
                <button
                  key={p.title}
                  type="button"
                  onClick={() => setPillar(k)}
                  onMouseEnter={() => setPillar(k)}
                  className={`${styles.tab} ${pillar === k ? styles.tabOn : ''}`}
                >
                  {p.title}
                </button>
              ))}
            </div>
            <div className={styles.detailSlot}>
              <p key={pillar} className={styles.detail}>{pillars[pillar].detail}</p>
            </div>
          </div>

          <div className={styles.actions}>
            <a href={primary.href} className={styles.primary}>{primary.label}</a>
            <a href={secondary.href} className={styles.secondary}>{secondary.label}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
