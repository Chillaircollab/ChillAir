# Joel Tempero — The Ultimate Working Profile

> A living profile of how Joel Tempero thinks, builds, communicates, and collaborates with AI coding assistants. Drop this into any Claude Code project for immediate context.

---

## Who Joel Is

- **Role**: Founder of Sidequest Digital — a one-person web development agency based in Christchurch, New Zealand
- **Clients**: Small businesses, schools, churches, community organisations, events, and startups across NZ
- **Background**: Not a traditional software engineer — a creative builder and digital problem-solver who has rapidly levelled up through hands-on AI-assisted development
- **Wears every hat**: Client management, design decisions, development, deployment, testing coordination
- **Other roles**: Runs media teams for events (Eastercamp), involved in education (Middleton Grange School tech/arts), film festivals (48Hours, 24CHCH), and church communities

---

## How Joel Thinks

### Builder Mentality
Joel thinks in terms of "what does the client need?" and works backwards from there. He doesn't get lost in architecture debates — he wants something working that he can show people. Theory comes second to a functioning demo. He'll iterate from there. "Just build it and we'll iterate" is a real quote and a real philosophy.

### Visually Driven
Joel sees the end result in his head and iterates toward it through conversation. He understands things best when he can see them — builds demos to pitch clients, uses live URLs to gather feedback, and makes decisions by looking at the deployed result, not by reading code diffs. Deploy early, deploy often.

### Systems Thinker
Despite preferring practical over theoretical, Joel naturally builds systems. He created a standardised 13-phase website rebuild workflow (CLAUDE-WebsiteInstructions.md) and reuses it across 17+ client projects. He structures projects with clear phases, session logs, and documented decisions. He thinks in repeatable processes.

### Pragmatic Scoping
Joel understands what can wait. He regularly defers features to "post-launch" and focuses on what's needed now. He's comfortable with demo modes, mock data, open Firestore rules during development, and placeholder flows — as long as there's a clear path to production. When he says something is out of scope or should wait, he's usually right. Don't try to talk him into building more than he's asked for.

### Commercially Aware
Decisions factor in client budget, timeline, and what's actually needed for launch vs what can wait. He'll defer features to "post-launch" without hesitation if they're not critical.

### Fast Pattern Recognition
After seeing 2-3 examples of a style, Joel extrapolates what the rest should look like. He has strong opinions but holds them loosely — will pivot quickly if something better emerges. Comfortable with ambiguity, happy to try something and adjust rather than plan every detail upfront.

---

## How Joel Communicates

### Style
- **Brief and direct** — short messages, no fluff, expects the same back
- **Conversational tone** — casual language ("aye", "haha", "meh", "lets go"). Match this energy, don't be formal
- **Action-oriented** — gives a direction and expects execution, not a list of questions back
- **Context-light instructions** — often gives short directives ("fix the mobile nav", "add sponsors") and expects Claude to understand the full scope from project context
- **Says what he means** — if something's wrong, he'll tell you. If he likes something, he'll say so (or just move on to the next thing, which is its own form of approval)
- **Doesn't repeat himself** — if he's given a correction or preference once, he expects it to stick. Pay attention to feedback the first time.
- **Trusts you to fill gaps** — he'll give you the "what" and expects you to handle the "how." If he says "add seller banners to listing cards," he means figure out the data fetching, caching, layout, and edge cases yourself

### Feedback Signals — Know What They Mean
| What Joel says | What it means | What to do |
|---|---|---|
| "nice" / "yeah this is good" | Acceptable baseline, not finished | Keep listening for the next direction |
| "love it" / "brilliant" / "stunning" | Genuine approval | Lock it in |
| "it's a bit safe" | Not creative enough | Push the creativity significantly |
| "kinda meh" | Fundamentally not working | Needs a rethink, not a tweak |
| "too templatey" | Layout is too uniform/predictable | Break the pattern, make it unique |
| "messy" | Too much visual noise | Simplify |
| "still snapping" | Animation/transition issue | Needs to be buttery smooth |
| Mentions mobile | Responsiveness problem | Check and fix immediately — it's a priority |

### Feedback Patterns
- Says what he doesn't like more easily than what he does — negative signals mean push harder
- Often gives feedback in clusters — multiple small adjustments in one message rather than one big rewrite request
- Will sometimes change direction mid-flow — this isn't indecision, it's refinement through exploration
- Thinks in "vibes" not specs — will say "crank it up" or "make it more interesting" and expects creative interpretation

---

## How Joel Builds

### Tech Stack Preferences

**For brochure/business websites (majority of projects):**
- React + TypeScript + Vite (standard scaffold)
- Tailwind CSS (v3 or v4 depending on project era)
- Framer Motion for subtle animations
- Lucide React for icons
- react-router-dom for routing
- react-helmet-async for SEO
- react-intersection-observer for scroll animations
- Deployed to GitHub Pages or Firebase Hosting

**For web apps and portals:**
- React + TypeScript + Vite + Tailwind
- Firebase (Auth, Firestore, Storage, Cloud Functions, Hosting)
- Zustand for state management (never Redux)
- react-hook-form + zod for forms
- PWA capabilities (service worker, manifest)

**For simpler tools/portals:**
- Vanilla HTML/CSS/JS (single-file SPAs)
- Firebase backend
- PWA with service worker

**Specialist stacks (when the project demands it):**
- Next.js for SSR/SEO-heavy sites (Signal Co, My Living Hope storefront)
- Capacitor for mobile-native wrappers (Twominds)
- Three.js + React Three Fiber for 3D (Aorangi)
- Shopify Storefront API + Sanity CMS for headless e-commerce (My Living Hope)
- Custom Node.js CMS with Handlebars templating + TipTap editor (MiddletonGrangeWeb)
- TanStack Query + TanStack Table for data-heavy dashboards (portal.mylivinghope, Twominds)
- Recharts for data visualisation, PapaParse/ExcelJS for CSV/Excel import-export (Twominds)

**Constants across all projects:**
- Mobile-first responsive design, always
- WCAG accessibility basics (semantic HTML, alt text, keyboard nav, focus states)
- Vite is the default build tool (~90% of React projects) — Next.js only when SSR is needed
- Firebase as the go-to backend (12+ projects use it)
- GitHub Pages for static sites, Firebase Hosting for apps

### Code Organisation
- Feature-based folder structures for larger apps
- Typed data files (src/data/) for repeated content
- One page component per route (src/pages/)
- Shared/reusable components separated (src/components/)
- Zustand stores with `use[Name]Store` naming convention
- Service layer pattern (src/services/api/) for Firebase operations
- camelCase variables/functions, PascalCase components/types

### Development Process
- **Edit, don't rewrite.** Strongly against rewriting files from scratch. Always edit existing code. Saves tokens, preserves existing work, avoids regressions.
- **Incremental and deployable.** Prefers changes that can be deployed as they're made, not massive PRs that sit for days. Build in small, testable increments.
- **Mobile-first.** Responsive design is a baseline expectation, not an afterthought.
- **Practical testing.** Values tests that catch real bugs over theoretical coverage. Don't write tests for the sake of test counts.
- **Deploys frequently.** Sometimes 3-5 times per session to validate work in real environments. Uses Firebase CLI directly (no CI/CD for most projects).
- **Keeps documentation current.** Session logs, progress trackers, and project docs get updated as work happens, not retroactively.

### Deployment Habits
- GitHub Pages for static sites via push to main
- Firebase CLI for apps (multiple Firebase accounts: joel@tempero.nz, leojfx@gmail.com)
- No git for some projects — deploys directly via Firebase CLI (Eastercamp, some school projects)

---

## Design Philosophy

### Visual Preferences
- Dark themes with accent colours for admin tools; light, clean designs for public-facing sites
- Subtle animations that add life without distracting — fade-up on scroll (once), gentle hovers, floating, parallax via Framer Motion
- Large, bold typography — not afraid of huge text
- Interactive elements — things you can click, hover, explore
- Generous whitespace — let content breathe
- Each section of a site should have its own identity while maintaining brand consistency

### Design Principles
- **Content fidelity is sacred** — never change client copy, never "improve" their words
- **Brand authenticity** — extract real brand colours from client sites, no generic gradients. Every site should feel crafted for that specific business
- **Creativity over convention** — every page should feel unique, never templatey or cookie-cutter
- **Polish and personality** — generic corporate feel is the enemy. Everything should have character
- **Accessibility (pragmatic)** — cares genuinely but won't sacrifice creativity for rigid compliance. Will course-correct when reminded
- **The user experience** — how something feels to interact with matters as much as how it looks

### Anti-Patterns (Things Joel Hates)
- Generic grids, small cramped content, corporate stock feel
- Scroll indicators, animated counters, bouncing arrows
- "Welcome to..." headers
- Cookie-cutter alternating layouts
- Anything that looks like a template
- Generic blue/purple gradients

---

## How to Work With Joel

### Session Flow
1. **Start**: Read CLAUDE.md, summarise state, propose next steps
2. **Work**: Joel gives brief instructions, Claude executes in focused batches
3. **Review**: Joel checks the deployed result (not code), gives feedback
4. **Iterate**: Quick rounds of fixes based on visual review
5. **Wrap-up**: Update CLAUDE.md with progress, decisions, next steps

### Project Lifecycle Pattern
1. **Research phase** — crawl existing site, extract content verbatim, document everything
2. **Scaffold** — Vite + React + TS + Tailwind, standard structure
3. **Build blitz** — rapid page-by-page construction, deploying frequently
4. **Polish** — mobile responsiveness, animations, brand refinement
5. **Client review** — deploy demo, gather feedback, iterate
6. **Launch prep** — DNS, security rules, production config

### The Rules
1. **Start fast.** Read context, summarise, ask what to work on. No preamble.
2. **Be autonomous.** He gives a task, you execute. Ask clarifying questions only when genuinely ambiguous.
3. **Show, don't ask.** Build it and present it rather than asking 10 clarifying questions.
4. **Propose creative ideas proactively.** Joel responds well to "here's what I'd do" followed by options.
5. **Execute in batches.** Group related work logically and knock it out efficiently.
6. **Be honest about problems.** If something is broken or complex, say so directly upfront.
7. **Track your work.** Update session logs and documentation as you go.
8. **Don't over-engineer.** The minimum viable solution that works correctly is the right solution.
9. **Confirm before deploying or doing anything destructive.** Never deploy, delete, or modify production resources without his green light.
10. **Respect the momentum.** When Joel is in flow and firing off feedback, match the pace. Don't slow down with unnecessary confirmation steps.

### Things to Avoid
- Rewriting entire files when a targeted edit would do
- Adding docstrings, comments, or type annotations to code you didn't change
- Suggesting "improvements" to surrounding code when fixing a bug
- Over-explaining what you did — he can read the diff
- Asking redundant questions when the answer is in the project context
- Pushing to external services without being asked
- Being precious about code quality at the expense of shipping
- Long explanations when a short answer would do

### Collaboration Strengths
- Joel is excellent at providing reference material (brand guidelines, existing sites, design docs, Excel data)
- Creates structured project documentation (phase deliverables, proposals, trackers)
- Maintains good separation between client-facing and dev-facing docs
- Willing to do multiple sessions on complex projects (iSQROLL: 22+, 48Hours: 11+)
- Names things well and keeps projects organised in logical folders

---

## Project Portfolio

Joel manages ~45+ client projects spanning:

| Category | Examples | Typical Stack |
|----------|----------|---------------|
| School websites | Whanganui High, Middleton Grange (custom CMS) | React + Vite + Tailwind / Node + Handlebars + Firebase |
| School portals/tools | MGS Arts Portal, Grange Tech, MGS Sports, MGS House, MGS Connect | Vanilla JS + Firebase PWA |
| Church/community | SWBC, My Living Hope, Kiwi Church, Forge | Various (static to Firebase apps, Shopify headless) |
| Small business sites | Chelsea Park, Alpine, Elmwood Dental, Parry Field, Signal Co, Kathbee, Roti Chai, PCFM, SBM | React + Vite + Tailwind (website rebuild pattern) |
| Event sites | 24CHCH, 48Hours, Eastercamp, SBM Conference | Static HTML or React + Firebase |
| Web apps | iSQROLL (marketplace), Commotion (events), JameChores, Twominds, portal.mylivinghope | React + Firebase + Stripe / Capacitor |
| Personal/creative | Flynn Adamson, Good Dog Spa, Eveleen, Just Stories, North Storybook | Static or React rebuilds |
| Education/specialty | A1 (Arrowsmith), Aorangi (3D), Honoa (video + Firebase), MGS 2025 Lookback | Various |

### Flagship Projects
- **iSQROLL**: Full marketplace platform — 22+ sessions, React + Firebase + Stripe, 527 migrated users, 29 Cloud Functions, 224 tests. Most complex project.
- **48Hours Film Festival**: Platform migration from Java/Struts — Sanity CMS + Firebase + React, 4,760 films, 168 news articles, full portal system. Most ambitious content migration.
- **Eastercamp**: Event management PWA — React + Firebase, 33 pages, real-time sync, drag-and-drop, push notifications. Personal project for a camp he runs media at.

---

## Values & Principles

1. **Practical over perfect** — a working demo beats a theoretical architecture
2. **Content is king** — never modify client copy; the words are theirs
3. **Brand authenticity** — every site should feel bespoke, not templated
4. **Mobile-first, always** — most NZ small business customers browse on phones
5. **Accessibility by default** — semantic HTML, alt text, focus states, keyboard nav
6. **Move fast, iterate** — deploy early, get feedback, refine
7. **Document everything** — session logs, CLAUDE.md, decision records, phase deliverables
8. **Systems over heroics** — build repeatable processes
9. **Respect the scope** — know what to build now vs. defer to post-launch
10. **Trust but verify** — delegates to AI confidently, reviews by looking at the live result

---

## Quick Reference for New Projects

- **Check for CLAUDE.md** in the project root. If it exists, read it and pick up where you left off.
- **If no CLAUDE.md**, scan the folder, identify the stack, and create one using the template from global CLAUDE.md.
- **For website rebuilds**: Look for CLAUDE-WebsiteInstructions.md — the 13-phase workflow guide.
- **Default tech**: React + TypeScript + Vite + Tailwind + Framer Motion + Lucide React
- **Backend default**: Firebase (Auth + Firestore + Storage + Hosting)
- **State management**: Zustand (never Redux)
- **SSR**: Next.js only when SEO or Shopify integration demands it
- **Keep responses brief.** Joel reads fast and decides fast.
- **Deploy frequently.** He reviews by looking at the live URL.
- **Update CLAUDE.md** at the end of every session.
- **Never rewrite from scratch.** Edit existing files. Incremental changes.
- **Mobile-first, accessible, brand-authentic** — non-negotiable.

---

*Last updated: 2026-03-21*
*Compiled from analysis of 45+ client projects across Sidequest Digital*
