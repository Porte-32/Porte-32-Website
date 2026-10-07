import type { ChangeEventHandler } from 'react';

type SelectProps = {
  label?: string;
  options?: string[];
  value?: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  placeholder?: string;
};

export function Select({ label, options = [], value, onChange, placeholder = 'Select' }: SelectProps) {
  return (
    <label style={{ display: 'grid', gap: 8 }}>
      {label && <span style={{ font: '500 11px/1 var(--font-body)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--fg-3)' }}>{label}</span>}
      <span style={{ position: 'relative', display: 'block' }}>
        <select value={value} onChange={onChange} defaultValue={value === undefined ? '' : undefined} style={{ appearance: 'none', width: '100%', font: '400 17px/1.4 var(--font-body)', color: 'var(--fg-1)', background: 'transparent', border: 0, borderBottom: '1px solid var(--p32-taupe)', borderRadius: 0, padding: '8px 28px 10px 0', outline: 'none' }}>
          <option value="" disabled>{placeholder}</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <span style={{ position: 'absolute', right: 2, top: 10, fontSize: 12, color: 'var(--fg-2)', pointerEvents: 'none' }}>▾</span>
      </span>
    </label>
  );
}
