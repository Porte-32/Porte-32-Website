# Porte 32 design system (v1)

This is the source of truth for how the site looks. The full visual reference is `design-system.html`; open it in a browser. Tokens are in `tokens.css`. This file covers the rules that the tokens alone don't capture.

**Feel:** a private salon. Warm paper, ink, and a little bordeaux and brass. Quiet, editorial, generous with space.

## Colour

- The page is never pure white. Grounds are **Paper** (`--bg`) and **Linen** (`--bg-alt`). Dark bands and the footer use **Nuit** (`--bg-inverse`).
- Text is warm ink, never `#000`. Secondary text uses Ink 2 (`--fg-2`). Don't use lighter greys on paper for body copy.
- **Bordeaux** (`--accent`) is for action: buttons and active links. **Brass** (`--ornament`) is for ornament: rules, numerals, small marks.
- Rough proportion on a page: Paper 62%, Linen 18%, Ink 14%, accents 6% or less.
- Approved pairings: Paper/Ink, Linen/Ink, Nuit/Paper, Bordeaux/Paper, Stone/Ink.
- In code, use the semantic aliases (`--bg`, `--fg-1`, `--accent`...), not the raw `--p32-*` values.

## Type

- **Display/headings:** Bodoni Moda, weight 500, optical size 11 (`font-variation-settings: "opsz" 11`).
- **Body:** Hanken Grotesk. Body 16px with 1.6 leading, lead 20px, small 14px. Keep line length under about 68 characters.
- **Emphasis:** one upright Bordeaux word per headline, by colour only. No italics. On dark grounds use Brass light.
- **Labels:** 11–12px, weight 500, uppercase, tracking 0.16–0.22em. Used for eyebrows, meta, navigation and buttons.
- **Numerals:** Didone numerals as in "32". Edition numbers are written "Nº 14", often in brass.

## Layout and shape

- 4px spacing scale, from `--space-1` to `--space-10` (4 to 144px). Be generous at the top end.
- Container is 1240px. The gutter is fluid (`--gutter`).
- **Square corners everywhere.** Circles are only for portraits and the monogram.
- Lines: 1px hairline (`--line`), and a 1.5px frame in ink (the logo's weight).
- Shadows almost never. `--shadow-lift` exists for rare cases.

## Motion

- Slow, eased, never bouncy. Use `--ease` throughout.
- Timing: 180ms for hover colour and underlines, 320ms for buttons and menus, 700ms for image reveals and fade-ups.
- Entrances are a fade plus a 12px rise. Nothing else.

## Logo

- Files are in `/Logos`: `logo-full-ink.png` (primary), `logo-full-reversed.png` (on Nuit or Bordeaux), `monogram.png` and `monogram-ivory.png` (the P|32 roundel, for favicons and avatars).
- Minimum width 120px on screen. Clear space equals the height of the keyhole.
- Only recolour to Ink, Paper or Brass. No shadows, outlines or tilt.

## Components

These are built in TypeScript in `src/components/` as exact ports of the reference components in `design-system.html`. They look identical to the reference. Use them instead of rebuilding.

| Component | Notes |
|---|---|
| Button | `primary` (bordeaux), `secondary` (ink outline), `inverse` (on dark), `ghost` (underlined). Sizes sm/md/lg. Square, uppercase label. |
| TextLink | Uppercase label. Underline grows in on hover. Optional → arrow. |
| Tag | `line`, `brass`, `bordeaux` (tint fill), `inverse`. |
| Eyebrow | Optional brass number, then a short brass rule, then a spaced-caps label. |
| SectionHeading | Eyebrow, H2 with one emphasis word, optional lead intro. |
| EventCard | Large day and month on the left. Edition, discipline and status tags. Title, speaker and role, time and venue. Top hairline. |
| PersonCard | 4:5 portrait (or circle), shown in greyscale. Name, brass role label, bio. |
| Quote | Brass opening quote mark, display-serif text, rule and author. |
| Input / Select / Checkbox | Underline-only fields, uppercase labels. Square checkbox with an ink fill. |
| SiteHeader | Logo, uppercase nav with a brass underline for the active link, ink "Join" button. |
| SiteFooter | Nuit background, monogram, display-serif tagline, email, link columns. |
