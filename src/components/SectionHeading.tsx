import { Eyebrow } from './Eyebrow';

type SectionHeadingProps = {
  number?: string;
  eyebrow?: string;
  title: string;
  /** One word from the title, shown in the accent colour. */
  emphasis?: string;
  intro?: string;
  align?: 'left' | 'center';
  inverse?: boolean;
};

export function SectionHeading({ number, eyebrow, title, emphasis, intro, align = 'left', inverse = false }: SectionHeadingProps) {
  const parts = emphasis && title.includes(emphasis) ? title.split(emphasis) : [title];
  return (
    <div style={{ display: 'grid', gap: 22, maxWidth: 760, textAlign: align, justifyItems: align === 'center' ? 'center' : 'start', margin: align === 'center' ? '0 auto' : 0 }}>
      {eyebrow && <Eyebrow number={number} tone={inverse ? 'inverse' : 'default'}>{eyebrow}</Eyebrow>}
      <h2 style={{ margin: 0, font: '500 var(--text-h2)/var(--leading-heading) var(--font-display)', letterSpacing: 'var(--tracking-display)', color: inverse ? 'var(--fg-inverse)' : 'var(--fg-1)', textWrap: 'balance' }}>
        {parts[0]}{parts.length > 1 && <span style={{ color: inverse ? 'var(--p32-brass-light)' : 'var(--accent)' }}>{emphasis}</span>}{parts[1]}
      </h2>
      {intro && <p style={{ margin: 0, font: '400 var(--text-lead)/1.55 var(--font-body)', color: inverse ? 'var(--fg-inverse-2)' : 'var(--fg-2)', maxWidth: 600, textWrap: 'pretty' }}>{intro}</p>}
    </div>
  );
}
