# CLAUDE.md — Porte 32 website

## What we're building

Porte 32 runs small, curated events where a handful of curious people sit down with one credible professional and hear how their world really works: the path they took, the calls they make, what the industry is like from the inside.

The site exists to explain that idea, show upcoming and past events, and get the right people to sign up. Visitors are students, young professionals, creatives, founders and career switchers. The tone of the brand is personal and thoughtful, not corporate. It is not a careers fair or a networking night.

## How we work

- **One step at a time.** The user sets the next step. Finish it, report back, wait. Don't run ahead.
- **The user owns the decisions.** Design, content, structure and scope are theirs. If something isn't clear, ask rather than guess.
- **Build only what was asked.** No extra pages, features or "while I was here" refactors.
- **Design work goes through the `frontend-design` skill**, working inside the design system below. Don't invent a new direction.

## Design system

`design/DESIGN.md` is the source of truth for visuals. Read it before any UI work.

- `design/tokens.css` holds every colour, type, spacing and motion token. Use the semantic tokens. No hard-coded hex values or one-off sizes.
- `design/design-system.html` is the full visual reference, with reference components. Open it in a browser.
- `src/components/` holds the design system components in TypeScript. They are exact ports of the reference; don't change how they look.
- Logos are in `Logos/`.
- If something isn't covered, ask. Don't extend the system yourself.

## Code principles

- TypeScript everywhere, strict mode.
- Few dependencies. Add one only when it clearly earns its place, and say why.
- Simple and readable beats clever.
- Small components with one job each. Reuse before creating.
- Content (events, speakers, copy) lives in typed data files, not hard-coded across components, so adding an event never means touching layout code.
- Match the conventions already in the repo.

## Every change

1. Read the relevant files and understand what's there.
2. Make the smallest clean change that does the job.
3. Run the type check and lint (and tests, if any). Fix anything you broke.
4. Note what you did in `.claude/active-session.md`.

## Sessions

Two files in `.claude/` carry context between sessions. Keep both short. They are notes, not transcripts.

- `active-session.md`: scratchpad for the session in progress.
- `session-log.md`: one handoff entry per finished session, newest at the bottom.

**Starting:** read this file, the last entry in `session-log.md`, and `active-session.md` if it has anything in it. Then look at the code before touching it.

**Ending:** run the checks, add a handoff to `session-log.md` using the template at the top of that file, then clear `active-session.md` back to its blank headings.

## Commands

Next.js (App Router), deployed on Vercel. Pages live in `src/app/`.

- `npm run dev`: local dev server at http://localhost:3000
- `npm run build`: production build (also type-checks)
- `npm run typecheck`: TypeScript check

Fonts load through `next/font` in `src/app/layout.tsx`. Static files (logos) go in `public/`. Components that use React hooks need `'use client'` at the top.
