import type { about as aboutContent } from '@/content/about';
import { HowStage } from './HowStage';
import { InkText } from './InkText';
import styles from './About.module.css';

type AboutProps = {
  content: typeof aboutContent;
};

/** Renders copy where **marked** words are set in spaced capitals. */
function Rich({ text }: { text: string }) {
  return text.split('**').map((part, i) =>
    i % 2 ? <span key={i} className={styles.caps}>{part}</span> : part,
  );
}

/** Homepage About section: a short centred passage, set like a printed invitation. */
export function About({ content }: AboutProps) {
  const { how, who, values, cta } = content;
  return (
    <section id="about" className={styles.about} aria-label="About Porte 32">
      <div className={styles.opening}>
        <InkText text={content.statement} className={styles.statement} />
      </div>

      <div className={styles.how}>
        <HowStage title={how.title} steps={how.steps} />
      </div>

      <div className={styles.block}>
        <h3 className={styles.srOnly}>{who.title}</h3>
        <p className={styles.audience}>{who.audience}</p>
        <p className={styles.note}>{who.note}</p>
      </div>

      <div className={styles.block}>
        <h3 className={styles.srOnly}>{values.title}</h3>
        <p className={styles.prose}><Rich text={values.text} /></p>
      </div>

      <a href={cta.href} className={styles.cta}>{cta.label}</a>
    </section>
  );
}
