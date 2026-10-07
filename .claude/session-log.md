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
