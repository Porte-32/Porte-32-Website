import type { ReactNode } from 'react';
import { SignOff } from '@/components/SignOff';
import { SiteNav } from '@/components/SiteNav';
import { contact } from '@/content/contact';
import { navLinks } from '@/content/hero';
import styles from './events.module.css';

/** The events pages: the site nav, the page, and the sign-off at the foot. */
export default function EventsLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.page}>
      <SiteNav links={navLinks} current="Events" />
      <main className={styles.main}>{children}</main>
      <SignOff copyright={contact.copyright} />
    </div>
  );
}
