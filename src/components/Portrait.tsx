import styles from './Portrait.module.css';

type PortraitProps = {
  name: string;
  photo?: string;
  /** Shown in the portrait's place until there is a photo (a label, or initials in a circle). */
  placeholder: string;
  /** 'portrait' is 4:5; 'circle' is a round portrait, as the design system allows for people. */
  shape?: 'portrait' | 'circle';
  className?: string;
};

/** A speaker's portrait in greyscale, like the design system's PersonCard; linen with a placeholder until there is one. */
export function Portrait({ name, photo, placeholder, shape = 'portrait', className }: PortraitProps) {
  const classes = [styles.portrait, shape === 'circle' ? styles.circle : '', className].filter(Boolean).join(' ');
  return (
    <span className={classes}>
      {photo ? <img src={photo} alt={name} className={styles.photo} /> : <span className={styles.placeholder}>{placeholder}</span>}
    </span>
  );
}
