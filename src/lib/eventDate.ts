const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/** An event's local start ('YYYY-MM-DDTHH:MM') in the pieces the pages show, without any time-zone shifting. */
export function eventDate(start: string) {
  const [date, time] = start.split('T');
  const [y, m, d] = date.split('-').map(Number);
  const weekday = DAYS[new Date(Date.UTC(y, m - 1, d)).getUTCDay()];
  return { day: String(d), month: MONTHS[m - 1], year: String(y), weekday, time };
}

/** A length in minutes in words: '2 hours', '1½ hours', '45 minutes'. */
export function duration(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (hours === 0) return `${minutes} minutes`;
  if (rest === 0) return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
  if (rest === 30) return `${hours}½ hours`;
  return `${hours} h ${rest} min`;
}
