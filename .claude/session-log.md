# Session log

Handoff notes between Claude Code sessions. One entry per session, newest at the bottom. Keep each entry short.

Template:

```
## Session N — YYYY-MM-DD
**Done:**
**Changed:**
**Decided:**
**Open:**
**Next:**
```

---

## Session 1 — 2026-10-07
**Done:**
- Set up the Claude Code project files (`CLAUDE.md`, `README.md`, `.claude/`).
- Made `Website/` the git repo root and pushed to GitHub (`Porte-32/Porte-32-Website`).
- Added the design system (v1): original in `design/design-system.html`, rules in `design/DESIGN.md`, tokens in `design/tokens.css`.
- Extracted the design system's logos into `Logos/` (`logo-full-ink`, `logo-full-reversed`, `monogram`, `monogram-ivory`).
- Ported all 13 reference components to TypeScript React in `src/components/` with identical styles.
- Added minimal `package.json`, strict `tsconfig.json`, `.gitignore`. `npm run typecheck` passes.

**Changed:** `CLAUDE.md`, `README.md`, `.claude/*`, `.gitignore`, `package.json`, `tsconfig.json`, `design/*`, `Logos/*`, `src/components/*`

**Decided:**
- TypeScript (strict), minimal dependencies, step-by-step workflow.
- `design/DESIGN.md` is the visual source of truth. Look: warm paper and ink, bordeaux for action, brass for ornament, Bodoni Moda plus Hanken Grotesk, square corners, slow motion.
- Components must look exactly like the design system reference. Don't restyle them.
- UI work uses the `frontend-design` skill inside the design system.

**Open:**
- No framework chosen. No dev, build or lint commands yet.
- Header and footer logo paths still point to `assets/`. Fonts are not loaded yet.
- Copy to decide: tagline ("Behind every door, a conversation." from the design system vs. the README's), and audience (the design system says students and young professionals; the brief is broader).
- Components haven't been checked visually in a browser yet.

**Next:** Choose a framework (Next.js or Astro + React), set it up, and load the fonts and tokens.

## Session 2 — 2026-10-08
**Done:**
- Replaced the coming-soon page with Hero v4 from Claude Design: floating glass nav (`SiteNav`, slims on scroll down, wakes on scroll up/hover), hero with rotating word and Craft/Insight/Community tabs (`Hero`), scroll-driven brass key (`BrassKey`, sits behind content).
- Built the About section after many rejected rounds: statement that inks in word by word on scroll (`InkText`); "How it works" as a pinned scroll stage where a dot field narrows to one brass speaker dot and a ring of ten (`HowStage`, phrases clickable); centred prose for audience and values with key words in spaced capitals.
- Copy lives in `src/content/hero.ts` and `src/content/about.ts` (`**word**` = spaced capitals).

**Changed:** `src/app/page.tsx`, `page.module.css`, `src/components/{SiteNav,Hero,BrassKey,About,InkText,HowStage}.*`, `src/content/*`

**Decided:**
- User's taste bar: nothing templated (no 01/02 numbering, caps eyebrows, dash labels, identical card grids, fade-ups everywhere). Reference sites: 245.maisonestelle.com, thetwentytwo.com/london. Pace content so each idea is read.
- Kept the pill-shaped glass nav and its shadow although DESIGN.md says square corners and no shadows.
- "One guest" became "One speaker"; speaker line: "Led by someone who knows their field better than anyone."

**Open:**
- Nothing committed or pushed yet.
- Nav links and CTAs point to #events, #speakers, #founders, which don't exist yet.
- Brass key drifts behind the HowStage text column; user may want it hidden there.
- Audience and values passages (centred prose) not yet confirmed by the user.
- No lint script exists; only `npm run typecheck`.
- Vercel deploy and domain still to be connected by the user.

**Next:** Get feedback on the rest of About, then Events section.
