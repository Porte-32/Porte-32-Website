'use client';

import { useState } from 'react';
import type { CSSProperties, MouseEventHandler, ReactNode } from 'react';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'inverse' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  href?: string;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  style?: CSSProperties;
};

export function Button({ variant = 'primary', size = 'md', disabled = false, href, children, onClick, type = 'button', style }: ButtonProps) {
  const [h, setH] = useState(false);
  const pad = size === 'sm' ? '10px 18px' : size === 'lg' ? '18px 34px' : '14px 26px';
  const base: CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: 10, padding: pad, font: '500 12px/1 var(--font-body)', letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', textDecoration: 'none', border: '1.5px solid transparent', borderRadius: 0, cursor: disabled ? 'default' : 'pointer', transition: 'background var(--dur) var(--ease), color var(--dur) var(--ease), border-color var(--dur) var(--ease)', opacity: disabled ? 0.4 : 1, pointerEvents: disabled ? 'none' : 'auto' };
  const variants: Record<NonNullable<ButtonProps['variant']>, CSSProperties> = {
    primary: { background: h ? 'var(--accent-hover)' : 'var(--accent)', color: 'var(--p32-paper)', borderColor: h ? 'var(--accent-hover)' : 'var(--accent)' },
    secondary: { background: h ? 'var(--p32-ink)' : 'transparent', color: h ? 'var(--p32-paper)' : 'var(--p32-ink)', borderColor: 'var(--p32-ink)' },
    inverse: { background: h ? 'transparent' : 'var(--p32-paper)', color: h ? 'var(--p32-paper)' : 'var(--p32-ink)', borderColor: 'var(--p32-paper)' },
    ghost: { background: 'transparent', color: h ? 'var(--accent)' : 'var(--fg-1)', padding: '6px 0', borderColor: 'transparent', borderBottomColor: h ? 'var(--accent)' : 'var(--fg-1)' },
  };
  const shared = {
    onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: { ...base, ...variants[variant], ...style },
  };
  return href
    ? <a href={href} {...shared}>{children}</a>
    : <button type={type} disabled={disabled} {...shared}>{children}</button>;
}
