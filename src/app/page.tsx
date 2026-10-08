import { About } from '@/components/About';
import { BrassKey } from '@/components/BrassKey';
import { Hero } from '@/components/Hero';
import { SiteNav } from '@/components/SiteNav';
import { about } from '@/content/about';
import { heroActions, heroWords, navLinks, pillars } from '@/content/hero';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <SiteNav links={navLinks} />
      <Hero words={heroWords} pillars={pillars} primary={heroActions.primary} secondary={heroActions.secondary} />
      <About content={about} />
      <BrassKey />
    </div>
  );
}
