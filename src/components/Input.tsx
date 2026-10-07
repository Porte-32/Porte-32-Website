import { useState } from 'react';
import type { ChangeEventHandler, CSSProperties } from 'react';

type InputProps = {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  hint?: string;
  error?: string;
  inverse?: boolean;
  multiline?: boolean;
};

export function Input({ label, type = 'text', placeholder, value, onChange, hint, error, inverse = false, multiline = false }: InputProps) {
  const [f, setF] = useState(false);
  const fg = inverse ? 'var(--fg-inverse)' : 'var(--fg-1)';
  const line = error ? 'var(--danger)' : f ? (inverse ? 'var(--p32-brass-light)' : 'var(--p32-ink)') : (inverse ? 'var(--line-inverse)' : 'var(--p32-taupe)');
  const fieldStyle: CSSProperties = { font: '400 17px/1.4 var(--font-body)', color: fg, background: 'transparent', border: 0, borderBottom: `1px solid ${line}`, borderRadius: 0, padding: '8px 0 10px', outline: 'none', resize: 'vertical', transition: 'border-color var(--dur-fast) var(--ease)' };
  const shared = { placeholder, value, onChange, onFocus: () => setF(true), onBlur: () => setF(false), style: fieldStyle };
  return (
    <label style={{ display: 'grid', gap: 8 }}>
      {label && <span style={{ font: '500 11px/1 var(--font-body)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: inverse ? 'var(--fg-inverse-2)' : 'var(--fg-3)' }}>{label}</span>}
      {multiline ? <textarea rows={4} {...shared} /> : <input type={type} {...shared} />}
      {(hint || error) && <span style={{ font: '400 13px/1.4 var(--font-body)', color: error ? 'var(--danger)' : 'var(--fg-3)' }}>{error || hint}</span>}
    </label>
  );
}
