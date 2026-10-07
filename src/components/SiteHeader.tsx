type SiteHeaderProps = {
  logo?: string;
  links?: string[];
  active?: string;
  cta?: string;
  onNavigate?: (target: string) => void;
  inverse?: boolean;
};

export function SiteHeader({ logo = 'assets/logo-full-ink.png', links = ['About', 'Programme', 'Speakers', 'Founders'], active, cta = 'Join', onNavigate, inverse = false }: SiteHeaderProps) {
  const c = inverse ? 'var(--fg-inverse)' : 'var(--fg-1)';
  return (
    <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, padding: '22px var(--gutter)', borderBottom: `1px solid ${inverse ? 'var(--line-inverse)' : 'var(--line)'}`, background: inverse ? 'var(--bg-inverse)' : 'var(--bg)' }}>
      <a href="#" onClick={e => { e.preventDefault(); onNavigate?.('Home'); }} style={{ display: 'block', lineHeight: 0 }}><img src={logo} alt="Porte32" style={{ height: 30 }} /></a>
      <nav style={{ display: 'flex', gap: 36, alignItems: 'center', flexWrap: 'wrap' }}>
        {links.map(l => <a key={l} href="#" onClick={e => { e.preventDefault(); onNavigate?.(l); }} style={{ font: '500 12px/1 var(--font-body)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: c, textDecoration: 'none', paddingBottom: 6, borderBottom: `1px solid ${active === l ? 'var(--ornament)' : 'transparent'}` }}>{l}</a>)}
        {cta && <a href="#" onClick={e => { e.preventDefault(); onNavigate?.(cta); }} style={{ font: '500 12px/1 var(--font-body)', letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: inverse ? 'var(--p32-ink)' : 'var(--p32-paper)', background: inverse ? 'var(--p32-paper)' : 'var(--p32-ink)', padding: '11px 18px', textDecoration: 'none' }}>{cta}</a>}
      </nav>
    </header>
  );
}
