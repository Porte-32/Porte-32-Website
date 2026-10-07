'use client';

import { useState } from 'react';
import type { ChangeEvent, ReactNode } from 'react';

type CheckboxProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  children?: ReactNode;
};

export function Checkbox({ checked, defaultChecked = false, onChange, children }: CheckboxProps) {
  const [c, setC] = useState(defaultChecked);
  const on = checked ?? c;
  return (
    <label style={{ display: 'inline-flex', gap: 12, alignItems: 'center', cursor: 'pointer', font: '400 15px/1.4 var(--font-body)', color: 'var(--fg-1)' }}>
      <input type="checkbox" checked={on} onChange={e => { setC(e.target.checked); onChange?.(e); }} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
      <span style={{ width: 16, height: 16, border: '1.5px solid var(--p32-ink)', background: on ? 'var(--p32-ink)' : 'transparent', display: 'grid', placeItems: 'center', transition: 'background var(--dur-fast) var(--ease)', flex: 'none' }}>{on && <span style={{ width: 6, height: 6, background: 'var(--p32-paper)' }}></span>}</span>
      {children}
    </label>
  );
}
