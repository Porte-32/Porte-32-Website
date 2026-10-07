'use client';

import { useState } from 'react';
import { Tag } from './Tag';

export type EventCardProps = {
  edition?: string;
  day: string;
  month: string;
  title: string;
  speaker?: string;
  role?: string;
  discipline?: string;
  venue?: string;
  time?: string;
  status?: string;
  href?: string;
};

export function EventCard({ edition, day, month, title, speaker, role, discipline, venue, time, status, href = '#' }: EventCardProps) {
  const [h, setH] = useState(false);
  return (
    <a href={href} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ display: 'grid', gridTemplateColumns: '84px minmax(0,1fr)', gap: 24, padding: '28px 0', borderTop: '1px solid var(--line)', color: 'var(--fg-1)', textDecoration: 'none' }}>
      <div style={{ display: 'grid', alignContent: 'start', gap: 6 }}>
        <span style={{ font: '500 48px/1 var(--font-display)' }}>{day}</span>
        <span style={{ font: '500 11px/1 var(--font-body)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--fg-3)' }}>{month}</span>
      </div>
      <div style={{ display: 'grid', gap: 12 }}>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          {edition && <span style={{ font: '500 14px/1 var(--font-display)', color: 'var(--ornament)' }}>{edition}</span>}
          {discipline && <Tag>{discipline}</Tag>}
          {status && <Tag tone="bordeaux">{status}</Tag>}
        </div>
        <h3 style={{ margin: 0, font: '500 var(--text-h3)/1.15 var(--font-display)', color: h ? 'var(--accent)' : 'var(--fg-1)', transition: 'color var(--dur-fast) var(--ease)', textWrap: 'balance' }}>{title}</h3>
        {speaker && <div style={{ font: '400 15px/1.5 var(--font-body)', color: 'var(--fg-2)' }}><span style={{ color: 'var(--fg-1)', fontWeight: 500 }}>{speaker}</span>{role && <> — {role}</>}</div>}
        <div style={{ font: '400 13px/1.4 var(--font-body)', color: 'var(--fg-3)', letterSpacing: '0.02em' }}>{[time, venue].filter(Boolean).join('  ·  ')}</div>
      </div>
    </a>
  );
}
