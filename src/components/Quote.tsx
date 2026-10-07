import type { ReactNode } from 'react';

type QuoteProps = {
  children: ReactNode;
  author?: string;
  role?: string;
  inverse?: boolean;
};

export function Quote({ children, author, role, inverse = false }: QuoteProps) {
  return (
    <blockquote style={{ margin: 0, display: 'grid', gap: 22, maxWidth: 820 }}>
      <span style={{ font: '500 72px/0.5 var(--font-display)', color: 'var(--ornament)', height: 32 }}>“</span>
      <p style={{ margin: 0, font: '500 clamp(26px,3vw,38px)/1.3 var(--font-display)', color: inverse ? 'var(--fg-inverse)' : 'var(--fg-1)', textWrap: 'pretty' }}>{children}</p>
      {author && (
        <footer style={{ display: 'flex', gap: 14, alignItems: 'center', font: '500 12px/1 var(--font-body)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: inverse ? 'var(--fg-inverse-2)' : 'var(--fg-3)' }}>
          <span style={{ width: 32, height: 1, background: 'var(--ornament)' }}></span>
          {author}
          {role && <span style={{ opacity: 0.8 }}>· {role}</span>}
        </footer>
      )}
    </blockquote>
  );
}
