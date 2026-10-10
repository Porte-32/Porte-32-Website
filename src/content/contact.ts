/**
 * The closing screen: the question that answers the hero's "Behind every door,", the way on to the events,
 * and the sign-off with how to reach us.
 */
export const contact = {
  heading: 'Which door will you open next?',
  cta: { label: 'Upcoming events', href: '#events' },

  email: 'events@porte32.com',
  linkedin: { label: 'LinkedIn', href: 'https://www.linkedin.com/company/porte-32' },

  // The fields we're thinking of opening next, drifting past under the closing (Curtain).
  doors: {
    label: "Doors we're opening", // read out by screen readers only
    items: [
      'Fashion',
      'Film',
      'Music',
      'Entrepreneurship',
      'Venture Capital',
      'Architecture',
      'Hospitality',
      'Technology',
      'Sports',
      'Psychology',
    ],
  },

  copyright: '© 2026 Porte 32',
};
