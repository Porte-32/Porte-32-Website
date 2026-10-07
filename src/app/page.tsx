import { Eyebrow } from '@/components';
import styles from './page.module.css';

export default function ComingSoon() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <img src="/logo-full-ink.png" alt="Porte32" className={styles.logo} />
      </header>

      <main className={styles.main}>
        <div className={styles.reveal}>
          <Eyebrow>Opening soon</Eyebrow>
        </div>
        <h1 className={`${styles.title} ${styles.reveal}`}>
          Behind every <span className={styles.emphasis}>door</span>, a conversation.
        </h1>
        <p className={`${styles.lead} ${styles.reveal}`}>
          Small, curated sessions where a handful of curious people sit down with one professional to hear how their world really works.
        </p>
      </main>

      <footer className={styles.footer}>
        <span>© {new Date().getFullYear()} Porte32</span>
        <span>Website coming soon</span>
      </footer>
    </div>
  );
}
