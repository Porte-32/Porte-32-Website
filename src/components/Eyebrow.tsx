import type { ReactNode } from 'react';

type EyebrowProps = {
  number?: string;
  rule?: boolean;
  tone?: 'default' | 'inverse';
  children: ReactNode;
};

export function Eyebrow({ number, rule = true, tone = 'default', children }: EyebrowProps) {
  const c = tone === 'inverse' ? 'var(--fg-inverse-2)' : 'var(--fg-3)';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, font: '500 12px/1 var(--font-body)', letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: c }}>
      {number && <span style={{ color: 'var(--ornament)', fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 15, letterSpacing: '0.04em' }}>{number}</span>}
      {rule && <span style={{ width: 32, height: 1, background: 'var(--ornament)' }}></span>}
      <span>{children}</span>
    </div>
  );
}
