# Porte 32

Small rooms, one guest, real conversations.

Porte 32 is a curated event series. Each event puts a small group of curious people in a room with one professional for an honest, structured conversation about how their industry actually works. This repo is the website.

## Getting started

Built with Next.js and TypeScript, deployed on Vercel.

```
npm install
npm run dev        # http://localhost:3000
npm run build
npm run typecheck
```

Right now the site is a single coming-soon page (`src/app/page.tsx`).

## Layout

```
Website/
├── CLAUDE.md      how Claude Code works on this project
├── README.md
├── .claude/       session notes for Claude Code
├── design/        design system: rules, tokens, visual reference
├── src/app/       pages (Next.js App Router)
├── src/components/  design system components (TypeScript)
├── public/        static files served as-is
└── Logos/         brand logo files
```

## Working with Claude Code

Rules and workflow live in `CLAUDE.md`. Claude keeps running notes in `.claude/active-session.md` and leaves a short handoff in `.claude/session-log.md` at the end of each session, so the next session picks up where the last one stopped.
