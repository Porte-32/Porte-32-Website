/** A line envelope at the site's 1.5px weight, sized by its className. Decorative: the link beside it says what it is. */
export function MailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <rect x="1.75" y="4.75" width="20.5" height="14.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 6l10 7.5L22 6" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
