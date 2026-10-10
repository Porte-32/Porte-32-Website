import styles from './Curtain.module.css';

type CurtainProps = {
  label: string;
  items: readonly string[];
  className?: string;
};

// How many times the list repeats in one run, so a run is always wider than the screen.
const REPEAT = 2;

/**
 * The fields we're thinking of opening next, drifting slowly past in one line across the full width of the screen
 * between two faint lines, all fading in and out at the edges. The label is for screen readers only.
 * Each run repeats the list so it is wider than the widest screens, and runs twice back to back so the loop is
 * seamless; only the list itself, once, is read out. It keeps moving under the pointer. Without motion it is a still,
 * wrapped list.
 */
export function Curtain({ label, items, className }: CurtainProps) {
  const run = Array.from({ length: REPEAT }, () => items).flat();
  return (
    <section className={className ? `${styles.curtain} ${className}` : styles.curtain} aria-label={label}>
      <div className={styles.window}>
        <div className={styles.track}>
          <ul className={styles.list}>
            {run.map((item, i) => (
              <li key={i} className={styles.item} aria-hidden={i >= items.length || undefined}>{item}</li>
            ))}
          </ul>
          <ul className={styles.list} aria-hidden="true">
            {run.map((item, i) => <li key={i} className={styles.item}>{item}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
