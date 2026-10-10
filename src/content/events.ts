/**
 * The events. Each one gets a line on /events and its own page at /events/<slug>.
 * To add an event, add an entry here; nothing else needs to change.
 *
 * PLACEHOLDERS: these three are made-up samples to show how the pages look. The speakers are not real people.
 * Replace them with real events, add each speaker's photo, and set `luma` to the event's Luma id (the `evt-…` part of its embed link)
 * so its tickets show on the page.
 */
export type PorteEvent = {
  slug: string;
  edition: string;
  field: string;
  title: string;
  /** `photo`: a portrait in /public (e.g. '/speakers/clara-mendes.jpg'), shown in greyscale. */
  speaker: { name: string; role: string; bio: string; photo?: string };
  /** Local date and start time, as 'YYYY-MM-DDTHH:MM'. */
  start: string;
  /** Length in minutes. */
  duration: number;
  /** Where, short: the area and city. */
  location: string;
  /** A Google Maps link for the location, if there is one; the location becomes a link to it. */
  maps?: string;
  seats: number;
  /** A few short paragraphs about the evening. */
  about: string[];
  /** The Luma event id, e.g. 'evt-AbC123'. Until it is set, the page shows where the tickets will go. */
  luma?: string;
};

export const events: PorteEvent[] = [
  {
    slug: 'what-the-edit-decides',
    edition: 'Nº 01',
    field: 'Film',
    title: 'What the edit decides',
    speaker: {
      name: 'Clara Mendes',
      role: 'Film editor',
      bio: 'Clara has cut features and documentaries for fifteen years, most of them in a dark room in Soho. She started as a runner and still keeps the first timeline she was trusted with.',
    },
    start: '2026-11-12T19:00',
    duration: 120,
    location: 'Soho, London',
    seats: 12,
    about: [
      'Most of a film is made after the shoot, by someone the audience never sees. Clara talks through how a story is found in hundreds of hours of footage, what gets cut and who gets the final say.',
      'Bring questions. The evening is a conversation, not a lecture, and it runs for as long as the room wants it to.',
    ],
  },
  {
    slug: 'the-house-before-the-drawing',
    edition: 'Nº 02',
    field: 'Architecture',
    title: 'The house before the drawing',
    speaker: {
      name: 'Tomás Reyes',
      role: 'Architect',
      bio: 'Tomás runs a small practice working mostly on homes and restorations. Before that he spent eight years at a large firm on towers he never once walked into.',
    },
    start: '2026-12-03T19:00',
    duration: 90,
    location: 'Clerkenwell, London',
    seats: 10,
    about: [
      'What happens between the first meeting with a client and the first line on paper. Tomás explains how a brief really gets written, what a planning officer wants to hear, and why most of the job is listening.',
      'Held in his studio, among the models and the drawings that never got built.',
    ],
  },
  {
    slug: 'the-first-ten-minutes',
    edition: 'Nº 03',
    field: 'Venture Capital',
    title: 'The first ten minutes',
    speaker: {
      name: 'Hannah Okafor',
      role: 'Early-stage investor',
      bio: 'Hannah backs companies before they have much more than a founder and an idea. She was a founder herself first, and says that is the only reason she reads every email.',
    },
    start: '2027-01-21T19:00',
    duration: 120,
    location: 'Marylebone, London',
    seats: 12,
    about: [
      'How an investor decides, and how quickly. Hannah walks through the pitches she said yes to, the ones she still regrets passing on, and what she is really listening for in the first ten minutes.',
      'For anyone building something, thinking about it, or just curious how the money moves.',
    ],
  },
];

export const eventsPage = {
  title: 'Upcoming events',
  portrait: 'Portrait',
  back: 'All events',
  ticketsTitle: 'Tickets',
  ticketsPending: 'Tickets will open here on Luma.',
  questions: 'Any other questions?',
};
