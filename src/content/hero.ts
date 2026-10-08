/** A part of a page, shown under its nav link on hover. */
export type NavPart = { title: string; line: string; href: string };
export type NavLink = { label: string; href: string; parts?: NavPart[] };
export type Pillar = { title: string; detail: string };

export const navLinks: NavLink[] = [
  {
    label: 'About',
    href: '#about',
    parts: [
      { title: 'What we do', line: 'One world, one speaker, a small group.', href: '#what-we-do' },
      { title: 'Who it’s for', line: 'Open to anyone curious.', href: '#who-its-for' },
      { title: 'What we stand for', line: 'Craft, honesty, community and discovery.', href: '#what-we-stand-for' },
    ],
  },
  { label: 'Events', href: '#events' },
  { label: 'Speakers', href: '#speakers' },
  { label: 'Founders', href: '#founders' },
];

/** Rotates after "Behind every door," in the hero headline. */
export const heroWords: string[] = [
  'a founder.',
  'a restaurateur.',
  'an artist.',
  'a dentist.',
  'a music producer.',
  'a film director.',
  'a sommelier.',
  'an architect.',
  'a journalist.',
];

export const pillars: Pillar[] = [
  { title: 'Craft', detail: 'How the best in their field actually do the work.' },
  { title: 'Insight', detail: 'See the new, and the familiar, differently.' },
  { title: 'Community', detail: 'A network shaped by shared interests.' },
];

export const heroActions = {
  primary: { label: 'Upcoming events', href: '#events' },
  secondary: { label: 'Our story →', href: '#about' },
};
