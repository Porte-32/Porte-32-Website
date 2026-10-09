import type { about as aboutContent } from '@/content/about';
import { Audience } from './Audience';
import { InkText } from './InkText';
import { Stair } from './Stair';
import { Values } from './Values';
import styles from './About.module.css';

type AboutProps = {
  content: typeof aboutContent;
};

/**
 * Homepage About section, read as one story down a left-anchored 12-column grid:
 * the statement, how an event narrows from a world to a small group, who that group is, and what we care about.
 * Short notes and details share the last three columns throughout.
 */
export function About({ content }: AboutProps) {
  const { statement, how, who, values } = content;
  return (
    <section id="about" className={styles.about} aria-label="About Porte 32">
      <div className={styles.inner}>
        <div className={`${styles.screen} ${styles.statementScreen}`}>
          <blockquote className={styles.quote}>
            <span className={styles.mark} aria-hidden="true">“</span>
            <InkText text={statement.text} className={styles.statement} />
            <footer className={styles.attribution}>
              <span className={styles.rule} aria-hidden="true" />
              {statement.author}
              <span className={styles.role}>· {statement.role}</span>
            </footer>
          </blockquote>
        </div>

        <div id="what-we-do" className={`${styles.part} ${styles.screen}`}>
          <h3 className={styles.srOnly}>{how.title}</h3>
          <Stair lines={how.steps} />
        </div>

        <Audience id="who-its-for" lead={who.lead} audiences={who.audiences} />

        <Values id="what-we-stand-for" title={values.title} items={values.items} />
      </div>
    </section>
  );
}
