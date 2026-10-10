import styles from './Portrait.module.css';

type PortraitProps = {
  name: string;
  photo?: string;
  /** Shown in the portrait's place until there is a photo. */
  placeholder: string;
  className?: string;
};

/** A speaker's portrait, 4:5 and greyscale like the design system's PersonCard; linen with a label until there is one. */
export function Portrait({ name, photo, placeholder, className }: PortraitProps) {
  return (
    <span className={className ? `${styles.portrait} ${className}` : styles.portrait}>
      {photo ? <img src={photo} alt={name} className={styles.photo} /> : <span className={styles.placeholder}>{placeholder}</span>}
    </span>
  );
}
