import styles from './SignOff.module.css';

/** The foot of the inner pages: the logo (home) and the copyright under a hairline, as at the end of the home page. */
export function SignOff({ copyright }: { copyright: string }) {
  return (
    <footer className={styles.bar}>
      <a href="/" className={styles.home}>
        <img src="/logo-full-ink.png" alt="Porte 32" className={styles.logo} />
      </a>
      <span className={styles.copyright}>{copyright}</span>
    </footer>
  );
}
