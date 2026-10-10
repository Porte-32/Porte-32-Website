import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LumaTickets } from '@/components/LumaTickets';
import { MailIcon } from '@/components/MailIcon';
import { Portrait } from '@/components/Portrait';
import { contact } from '@/content/contact';
import { events, eventsPage } from '@/content/events';
import { duration, eventDate } from '@/lib/eventDate';
import styles from './event.module.css';

type EventPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return events.map(event => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = events.find(e => e.slug === slug);
  if (!event) return {};
  return { title: `${event.title} · Porte32`, description: event.about[0] };
}

/**
 * One event. The top mirrors its line on the events page, larger: the speaker's portrait on the left (on phones, a
 * small round portrait beside the speaker's name instead), then its field
 * and number, the title, the speaker, and when, how long and where on one line, divided by fine rules. Beneath a
 * hairline, the evening and then the speaker on the left, the tickets (Luma) on the right, staying in view. At the end,
 * for anything else: our email.
 */
export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = events.find(e => e.slug === slug);
  if (!event) notFound();
  const date = eventDate(event.start);
  const [lead, ...rest] = event.about;
  const initials = event.speaker.name.split(' ').map(word => word[0]).join('');

  return (
    <article>
      <a href="/events" className={styles.back}>
        <span aria-hidden="true">←</span> {eventsPage.back}
      </a>

      <header className={styles.header}>
        <Portrait name={event.speaker.name} photo={event.speaker.photo} placeholder={eventsPage.portrait} className={styles.portrait} />
        <div className={styles.intro}>
          <p className={styles.meta}>
            {event.field}
            <span className={styles.edition}>{event.edition}</span>
          </p>
          <h1 className={styles.title}>{event.title}</h1>
          <div className={styles.byline}>
            <Portrait name={event.speaker.name} photo={event.speaker.photo} placeholder={initials} shape="circle" className={styles.avatar} />
            <p className={styles.speaker}>
              with <strong>{event.speaker.name}</strong>, {event.speaker.role.toLowerCase()}
            </p>
          </div>
          <ul className={styles.details}>
            <li>{date.weekday} {date.day} {date.month}</li>
            <li>{date.time}</li>
            <li>{duration(event.duration)}</li>
            <li>{event.maps ? <a href={event.maps} target="_blank" rel="noopener noreferrer">{event.location}</a> : event.location}</li>
          </ul>
        </div>
      </header>

      <div className={styles.body}>
        <div className={styles.story}>
          <p className={styles.lead}>{lead}</p>
          {rest.map(p => <p key={p} className={styles.text}>{p}</p>)}

          <section className={styles.person}>
            <h2 className={styles.name}>{event.speaker.name}</h2>
            <p className={styles.role}>{event.speaker.role}</p>
            <p className={styles.text}>{event.speaker.bio}</p>
          </section>
        </div>
        <aside className={styles.aside}>
          <LumaTickets title={eventsPage.ticketsTitle} luma={event.luma} pending={eventsPage.ticketsPending} seats={event.seats} />
        </aside>
      </div>

      <footer className={styles.questions}>
        <p className={styles.ask}>{eventsPage.questions}</p>
        <a href={`mailto:${contact.email}`} className={styles.email}>
          <MailIcon className={styles.icon} />
          {contact.email}
        </a>
      </footer>
    </article>
  );
}
