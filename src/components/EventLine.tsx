import type { PorteEvent } from '@/content/events';
import { eventDate } from '@/lib/eventDate';
import { Portrait } from './Portrait';
import styles from './EventLine.module.css';

type EventLineProps = {
  event: PorteEvent;
  /** Shown in the portrait's place until the speaker has a photo. */
  portrait: string;
};

/**
 * One event on the events page, as a line between hairlines: the speaker's portrait on the left (greyscale, 4:5, as
 * in the design system's PersonCard), then its field and number, the title, the speaker, and when and where; the date
 * large on the right. The whole line opens the event's page. Hover or tap: a brass rule draws along its top, the
 * title turns bordeaux and the field ink.
 */
export function EventLine({ event, portrait }: EventLineProps) {
  const date = eventDate(event.start);
  return (
    <a href={`/events/${event.slug}`} className={styles.line}>
      <Portrait name={event.speaker.name} photo={event.speaker.photo} placeholder={portrait} />
      <span className={styles.body}>
        <span className={styles.meta}>
          {event.field}
          <span className={styles.edition}>{event.edition}</span>
        </span>
        <span className={styles.title}>{event.title}</span>
        <span className={styles.speaker}>
          with <strong>{event.speaker.name}</strong>, {event.speaker.role.toLowerCase()}
        </span>
        <span className={styles.when}>
          {date.weekday} {date.day} {date.month} · {date.time}
          <span className={styles.place}>
            <span className={styles.sep}> · </span>
            {event.location}
          </span>
        </span>
      </span>
      <span className={styles.date}>
        <span className={styles.day}>{date.day}</span>
        <span className={styles.month}>{date.month}</span>
      </span>
    </a>
  );
}
