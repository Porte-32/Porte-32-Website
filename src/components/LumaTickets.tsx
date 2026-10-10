import styles from './LumaTickets.module.css';

type LumaTicketsProps = {
  title: string;
  /** The Luma event id ('evt-…'). Without it, the frame shows where the tickets will go. */
  luma?: string;
  pending: string;
  seats: number;
};

/** The event's tickets, booked through Luma's own widget, in a fine ink frame. */
export function LumaTickets({ title, luma, pending, seats }: LumaTicketsProps) {
  return (
    <section className={styles.tickets} aria-labelledby="tickets-title">
      <h2 id="tickets-title" className={styles.title}>{title}</h2>
      <p className={styles.seats}>{seats} seats</p>
      {luma ? (
        <iframe src={`https://lu.ma/embed/event/${luma}/simple`} title={title} className={styles.frame} allowFullScreen />
      ) : (
        <p className={styles.pending}>{pending}</p>
      )}
    </section>
  );
}
