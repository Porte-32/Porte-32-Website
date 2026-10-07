type PersonCardProps = {
  name: string;
  role?: string;
  bio?: string;
  image?: string;
  shape?: 'portrait' | 'circle';
  placeholder?: string;
};

export function PersonCard({ name, role, bio, image, shape = 'portrait', placeholder = 'Portrait' }: PersonCardProps) {
  const ratio = shape === 'circle' ? '1 / 1' : '4 / 5';
  return (
    <figure style={{ margin: 0, display: 'grid', gap: 16 }}>
      <div style={{ aspectRatio: ratio, background: 'var(--p32-linen)', borderRadius: shape === 'circle' ? '50%' : 0, overflow: 'hidden', display: 'grid', placeItems: 'center', border: image ? 0 : '1px solid var(--line)' }}>
        {image
          ? <img src={image} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(1) contrast(1.05)' }} />
          : <span style={{ font: '500 11px/1 var(--font-body)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--fg-3)' }}>{placeholder}</span>}
      </div>
      <figcaption style={{ display: 'grid', gap: 6 }}>
        <span style={{ font: '500 24px/1.15 var(--font-display)', color: 'var(--fg-1)' }}>{name}</span>
        {role && <span style={{ font: '500 11px/1.3 var(--font-body)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--ornament)' }}>{role}</span>}
        {bio && <span style={{ font: '400 15px/1.55 var(--font-body)', color: 'var(--fg-2)', textWrap: 'pretty' }}>{bio}</span>}
      </figcaption>
    </figure>
  );
}
