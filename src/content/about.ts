export type AboutLine = { key: string; detail: string };

/** About copy. Each part leads into the next: one world → one speaker → a small group → who that group is → what we care about. */
export const about = {
  /** Opens About as a quote from the founders, as if they're telling the story. */
  statement: {
    text: 'Porte 32 is a curated series of live talks, each offering an opportunity to explore the speaker’s field and engage in thoughtful discussion.',
    author: 'The founders',
    role: 'Porte 32',
  },

  how: {
    title: 'How it works',
    /** Set as a descending stair: each line starts further in, so the room narrows from a world to a group. */
    steps: [
      { key: 'One world', detail: 'Each event explores a single industry, profession or topic.' },
      { key: 'One speaker', detail: 'Led by someone who knows their field better than anyone.' },
      { key: 'A small group', detail: 'Small enough that everyone can ask questions and take part.' },
    ] satisfies AboutLine[],
  },

  who: {
    /** Fixed start of the line; the audiences complete it one at a time as you scroll. The last is the emphasis. */
    lead: 'Open to',
    audiences: ['students', 'young professionals', 'creatives', 'founders', 'anyone curious'],
  },

  values: {
    title: 'What we care about',
    /** In the order of an evening: the talk, the honest answers, the people, what you leave with. */
    items: [
      { key: 'Craft', detail: 'The real work, up close.' },
      { key: 'Honesty', detail: 'How it actually works.' },
      { key: 'Community', detail: 'People worth knowing.' },
      { key: 'Discovery', detail: 'Something you didn’t expect.' },
    ] satisfies AboutLine[],
  },
};
