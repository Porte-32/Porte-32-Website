import type { contact as contactContent } from '@/content/contact';
import type { NavLink } from '@/content/hero';
import { Button } from './Button';
import styles from './Closing.module.css';

type ClosingProps = {
  content: typeof contactContent;
  links: NavLink[];
};

/** Renders a heading where the **marked** word is set in bordeaux. */
function Emphasis({ text }: { text: string }) {
  return text.split('**').map((part, i) => (i % 2 ? <span key={i} className={styles.emphasis}>{part}</span> : part));
}

/**
 * The end of the page, on a linen band so it reads as the close: an invitation to the events and how to get in touch,
 * then a sign-off bar with the logo, the site's links and the copyright.
 */
export function Closing({ content, links }: ClosingProps) {
  return (
    <footer id="contact" className={styles.closing}>
      <div className={styles.inner}>
        <div className={styles.invite}>
          <h2 className={styles.heading}><Emphasis text={content.heading} /></h2>
          <p className={styles.lead}>{content.lead}</p>
          <div className={styles.action}>
            <Button href={content.cta.href} size="lg">{content.cta.label}</Button>
          </div>
        </div>

        <div className={styles.contact}>
          <h3 className={styles.title}>{content.title}</h3>
          <a href={`mailto:${content.email}`} className={styles.email}>{content.email}</a>
        </div>

        <div className={styles.bar}>
          <a href="#" className={styles.home}>
            <img src="/logo-full-ink.png" alt="Porte 32" className={styles.logo} />
          </a>
          <nav className={styles.links} aria-label="Footer">
            {links.map(link => <a key={link.label} href={link.href} className={styles.link}>{link.label}</a>)}
          </nav>
          <span className={styles.copyright}>{content.copyright}</span>
        </div>
      </div>
    </footer>
  );
}
