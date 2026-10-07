import type { CSSProperties } from 'react';

type FooterColumn = { title: string; links: string[] };

type SiteFooterProps = {
  monogram?: string;
  tagline?: string;
  columns?: FooterColumn[];
  email?: string;
};

const defaultColumns: FooterColumn[] = [
  { title: 'Porte32', links: ['About', 'Founders', 'Programme'] },
  { title: 'Follow', links: ['Instagram', 'LinkedIn'] },
];

const lab: CSSProperties = { font: '500 11px/1 var(--font-body)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--p32-brass-light)' };

export function SiteFooter({ monogram = 'assets/monogram-ivory.png', tagline = 'Behind every door, a conversation.', columns = defaultColumns, email = 'hello@porte32.com' }: SiteFooterProps) {
  return (
    <footer style={{ background: 'var(--bg-inverse)', color: 'var(--fg-inverse)', padding: 'var(--space-9) var(--gutter) var(--space-6)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,2fr) repeat(auto-fit,minmax(140px,1fr))', gap: 48, alignItems: 'start' }}>
        <div style={{ display: 'grid', gap: 24, justifyItems: 'start' }}>
          <img src={monogram} alt="Porte32" style={{ height: 72 }} />
          <p style={{ margin: 0, font: '500 26px/1.3 var(--font-display)', maxWidth: 360 }}>{tagline}</p>
          <a href={'mailto:' + email} style={{ color: 'var(--fg-inverse)', font: '400 15px/1 var(--font-body)', textUnderlineOffset: '0.3em' }}>{email}</a>
        </div>
        {columns.map(c => (
          <div key={c.title} style={{ display: 'grid', gap: 14 }}>
            <span style={lab}>{c.title}</span>
            {c.links.map(l => <a key={l} href="#" style={{ color: 'var(--fg-inverse-2)', textDecoration: 'none', font: '400 15px/1 var(--font-body)' }}>{l}</a>)}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 'var(--space-8)', paddingTop: 20, borderTop: '1px solid var(--line-inverse)', display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', font: '400 12px/1 var(--font-body)', color: 'var(--fg-inverse-2)', letterSpacing: '0.04em' }}>
        <span>© Porte32</span>
        <span>Networking &amp; education for students and young professionals</span>
      </div>
    </footer>
  );
}
