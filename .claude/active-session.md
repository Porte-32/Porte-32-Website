# Active session

**Task:** Coming-soon page to deploy on Vercel and test the domain.

**Done so far:**
- Chose Next.js 15 (App Router) for Vercel. Added `next.config.ts` and dev/build/start scripts, and updated `tsconfig.json` and `.gitignore`.
- `src/app/`: layout (Bodoni Moda + Hanken Grotesk via next/font), globals.css (imports tokens), coming-soon page, favicon from the monogram.
- `public/logo-full-ink.png`.
- Added `'use client'` to the components that use hooks (Button, TextLink, Input, Checkbox, EventCard). No visual change.
- Fixed: the opsz 11 rule in tokens.css needs `!important` (the `font` shorthand resets it), matching the original design file.
- Build and typecheck pass. Checked desktop and 390px mobile via screenshots.

**Decisions:**
- Next.js on Vercel.
- Coming-soon copy: "Opening soon" / "Behind every door, a conversation." (from the design system tagline).

**Open / blocked:**
- Not committed or pushed yet.
- Vercel project and domain to be connected by the user.
