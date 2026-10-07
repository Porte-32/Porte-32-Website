import type { CSSProperties, ReactNode } from 'react';

type TagTone = 'line' | 'brass' | 'bordeaux' | 'inverse';

type TagProps = {
  tone?: TagTone;
  children: ReactNode;
};

const tones: Record<TagTone, CSSProperties> = {
  line: { border: '1px solid var(--line-strong)', color: 'var(--fg-1)' },
  brass: { border: '1px solid var(--ornament)', color: 'var(--p32-brass)' },
  bordeaux: { background: 'var(--p32-bordeaux-tint)', color: 'var(--p32-bordeaux)', border: '1px solid transparent' },
  inverse: { border: '1px solid var(--line-inverse)', color: 'var(--fg-inverse)' },
};

export function Tag({ tone = 'line', children }: TagProps) {
  return <span style={{ display: 'inline-flex', alignItems: 'center', padding: '6px 10px', font: '500 11px/1 var(--font-body)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', borderRadius: 0, ...tones[tone] }}>{children}</span>;
}
