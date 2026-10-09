import { About } from '@/components/About';
import { BrassKey } from '@/components/BrassKey';
import { Closing } from '@/components/Closing';
import { Hero } from '@/components/Hero';
import { Intro } from '@/components/Intro';
import { SiteNav } from '@/components/SiteNav';
import { about } from '@/content/about';
import { contact } from '@/content/contact';
import { heroActions, heroWords, navLinks, pillars } from '@/content/hero';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <Intro />
      <SiteNav links={navLinks} />
      <Hero words={heroWords} pillars={pillars} primary={heroActions.primary} secondary={heroActions.secondary} />
      <About content={about} />
      <Closing content={contact} />
      <BrassKey />
    </div>
  );
}
