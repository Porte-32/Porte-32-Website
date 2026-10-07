'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';

type TextLinkProps = {
  href?: string;
  arrow?: boolean;
  inverse?: boolean;
  children: ReactNode;
};

export function TextLink({ href = '#', arrow = false, inverse = false, children }: TextLinkProps) {
  const [h, setH] = useState(false);
  const c = inverse ? 'var(--p32-paper)' : h ? 'var(--accent)' : 'var(--fg-1)';
  return (
    <a href={href} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ color: c, font: '500 12px/1 var(--font-body)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-flex', gap: 10, alignItems: 'center', paddingBottom: 6, backgroundImage: `linear-gradient(${c}, ${c})`, backgroundRepeat: 'no-repeat', backgroundPosition: '0 100%', backgroundSize: h ? '100% 1px' : '0% 1px', transition: 'background-size var(--dur) var(--ease), color var(--dur-fast) var(--ease)' }}>
      {children}
      {arrow && <span style={{ transform: h ? 'translateX(4px)' : 'none', transition: 'transform var(--dur) var(--ease)' }}>→</span>}
    </a>
  );
}
