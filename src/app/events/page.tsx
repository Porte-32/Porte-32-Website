import type { Metadata } from 'next';
import { EventLine } from '@/components/EventLine';
import { events, eventsPage } from '@/content/events';
import styles from './events.module.css';

export const metadata: Metadata = {
  title: 'Upcoming events · Porte32',
};

/** Every upcoming event, one line each; each line opens the event's own page. */
export default function EventsPage() {
  return (
    <>
      <h1 className={styles.heading}>{eventsPage.title}</h1>
      <ul className={styles.list}>
        {events.map(event => (
          <li key={event.slug}>
            <EventLine event={event} portrait={eventsPage.portrait} />
          </li>
        ))}
      </ul>
    </>
  );
}
