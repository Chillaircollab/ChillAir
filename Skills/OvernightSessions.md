# Overnight Sessions Playbook

A comprehensive instruction set for Claude Code to build autonomously when the developer is away. Reference this file at the start of any unattended session.

> **Note:** Despite the name, this playbook isn't just for overnight use. Joel may kick this off during the day while he's busy with client meetings, offsite, or otherwise occupied. The same rules apply — work autonomously, don't wait for input, and leave everything in a reviewable state. The only difference is Joel might check in partway through, so keep CLAUDE.md current at all times.

---

## Core Philosophy

This is an autonomous session. Joel is unavailable. You have hours. **Use them.**

The goal is not to cautiously build 3 pages and call it a night. The goal is to build the entire site, critique it like Joel would, fix everything, critique again, verify all content and images, and leave Joel waking up to something he can immediately start iterating on — not something he has to fix before he can even review.

**You are not done until:**
- Every page is built with real content
- Every image is downloaded, verified, and wired in
- You've run at least 2 full critique rounds referencing Joel's actual preferences
- The build passes cleanly
- CLAUDE.md is current and accurate

---

## Safety Boundaries

**You are running unattended. Joel cannot intervene. These rules are absolute.**

### Do NOT touch anything outside the project

- **Only read/write files inside the current project directory.** No accessing other project folders, system files, or user directories.
- **Do not modify global config files** (~/.gitconfig, ~/.npmrc, ~/.claude/settings.json, etc.)
- **Do not install global packages** (`npm install -g` is forbidden). Project-local `npm install` is fine.
- **Do not modify environment variables** outside of project `.env` files.

### Do NOT interact with remote services

- **No deploying.** No `firebase deploy`, no `npm run deploy`, no pushing to any hosting platform. Building is local only.
- **No git push.** You may commit locally if the project uses git, but never push to a remote. Joel reviews and pushes himself.
- **No creating or modifying GitHub issues, PRs, or comments.**
- **No sending emails, messages, or notifications** to any external service.
- **No signing up for services, creating accounts, or generating API keys.**
- **No writing to external databases.** Firestore, Supabase, any remote DB — read-only during research if needed, never write.

### Network access: research only

- **WebFetch and curl are allowed** for downloading images and crawling the client's existing site during the research phase.
- **WebSearch is allowed** for finding brand/social media presence during research.
- **npm install is allowed** for adding project dependencies (local only).
- **All other network activity is prohibited.** No posting to APIs, no webhook triggers, no uploading files to third-party services.

### Do NOT run destructive commands

- No `rm -rf` outside the project directory.
- No `git reset --hard`, `git clean -f`, or `git checkout .` that would discard uncommitted work.
- No killing processes, stopping services, or modifying system state.
- No modifying Windows registry, system services, or scheduled tasks.
- If `npm run build` or `npm run dev` fails, debug it — don't nuke `node_modules` and reinstall unless it's genuinely the fix, and document why.

### When in doubt, don't

If an action feels risky, could affect something outside the project, or could be hard to reverse — **skip it and document it in CLAUDE.md** as something that needs Joel's input. A missed optimisation is nothing compared to a wrecked environment.

---

## Ground Rules

1. **Never stop after the first pass.** The first build is a draft. Critiques turn drafts into quality. Budget time for at least 2 critique-and-fix rounds.
2. **Real content or nothing.** No lorem ipsum, no "[Photo of X]", no placeholder gradients where images should be. If you can't get the real content, document exactly what's missing and why.
3. **Images are sacred.** Download them during research, verify they're not 0-byte, wire them in as you build, and check them again at the end. This is the #1 thing that goes wrong.
4. **Content fidelity is non-negotiable.** Every word from the original site must be preserved exactly. No rewording, no "improving", no summarising. Copy verbatim.
5. **Document as you go, not at the end.** Update CLAUDE.md after every major milestone. If you timeout mid-task, the next session needs to know exactly where things stand.
6. **Leave it buildable.** Every change should leave the project in a state where `npm run build` passes. No half-finished refactors across 5 files.
7. **Make reversible decisions.** Avoid architectural choices that are hard to undo. When in doubt, choose the simpler option and flag it for Joel's review.

---

## Session Structure

### Phase 1: Orient (2 minutes)

1. Read CLAUDE.md for project state
2. Read JoelTempero.md to internalise Joel's preferences, anti-patterns, and feedback signals
3. Read any project-specific instructions (CLAUDE-WebsiteInstructions.md, CMS-Portal-Backend.md, etc.)
4. Check for a plan or task list from the previous session
5. Identify the highest-priority incomplete work
6. If no CLAUDE.md exists, create one before doing anything else

### Phase 2: Plan (3 minutes)

1. Break the session into discrete, ordered tasks
2. Create tasks using TaskCreate so progress is trackable
3. Prioritise ruthlessly: "If I only complete half, what's the most valuable half?"
4. Plan critique rounds into the schedule — they're not optional extras
5. Identify research that can run in parallel via agents

### Phase 3: Execute (the bulk of the session)

**The Build-Critique Cycle:**

```
Research → Build pages → Critique as Joel → Fix issues → Build more → Critique again → Verify content & images → Final polish
```

This is not linear. It's a loop. After every 3-4 pages built, run a critique. After fixing critique issues, build more. After all pages are done, run a full critique. Fix everything. Run another critique. Only then move to final verification.

After completing each task:
- Mark it complete with TaskUpdate
- Run `npm run build` — fix immediately if broken
- Update CLAUDE.md progress section

### Phase 4: Verify & Polish (before session ends)

1. Run the full Content & Image Verification (see below)
2. Run a final critique round
3. Run `npm run build` — must pass clean
4. Start dev server, verify it loads
5. Update CLAUDE.md with: session log, next steps, known issues
6. Ensure all files are saved

---

## Research Phase

**Always complete research before writing any code.** The research approach depends on the project type. Pick the right one below.

---

### Research Type A: Website Rebuild

For client website rebuilds — extracting and rebuilding an existing site.

Launch these agents simultaneously:

**Agent 1: Site Crawler**
- Extract all page content from the original site
- If WebFetch returns 403s, fall back to curl via Bash
- Save raw content to `research/content-document.md`
- Extract: page titles, headings, body copy (verbatim), navigation structure, footer content, CTAs, contact details
- Map the full site structure (every page, every subpage, every hidden footer link)
- Check for hidden pages: privacy policy, terms, sitemaps, blog archives, team member pages, portfolio detail pages

**Agent 2: External Presence**
- Search for the brand on social media (TikTok, Instagram, YouTube, LinkedIn, Facebook)
- Find podcast appearances, interviews, press mentions
- Check review platforms (Google Reviews, Goodreads, Amazon, etc.)
- Document follower counts, notable features, key quotes

**Agent 3: Visual & Brand Research**
- Extract exact brand colours from CSS (custom properties, computed styles)
- Identify fonts (Google Fonts links, @font-face declarations, font-family values)
- Download the logo and any brand assets
- Note visual tone: dark/light, minimal/busy, corporate/casual
- Identify what makes this brand unique — this drives the entire design

**Agent 4: Image Download (CRITICAL)**

**This agent is non-negotiable. Images must be downloaded during research.**

The original site may go offline, images may be behind CDN caching that expires, hotlinking may be blocked in production. Download everything now.

```
public/images/
├── logo/           # Logo files (SVG preferred, PNG fallback)
├── hero/           # Hero/banner images
├── about/          # Team/person photos
├── services/       # Service-related imagery
├── projects/       # Portfolio/project photos
├── testimonials/   # Client photos if available
└── misc/           # Anything else
```

**Process:**
1. Grep ALL image URLs from extracted HTML (img src, background-image, og:image, etc.)
2. Filter to unique URLs, prefer full-resolution over thumbnails
3. Download in batches using curl with timeout handling
4. Rename to descriptive kebab-case filenames (not `IMG_2847.jpg` but `team-photo-workshop.jpg`)
5. **Verify no 0-byte files** — run `find public/images -size 0` and re-download failures
6. **Count images per page** — cross-reference against original site to catch any missed

**Wire images into components as you build, not as a separate step.** Every component that renders an image should reference the local downloaded file from day one.

---

### Research Type B: Portal / Admin App

For building new portals, dashboards, or admin tools (no existing site to crawl).

**Agent 1: Existing Project Analysis**
- Read the project CLAUDE.md for requirements, user roles, entities, and current progress
- Read any related playbooks (CMS-Portal-Backend.md, Security.md)
- Scan the existing codebase: folder structure, existing components, services, stores, types
- Identify patterns already in use — match them exactly
- Document what exists vs what needs to be built

**Agent 2: Data Model Research**
- If the project has sample data (Excel files, CSV exports, JSON), read and analyse it
- Document all entities, their fields, relationships, and data types
- Identify which collections exist in Firestore vs which need to be created
- Check existing Firestore rules and note gaps
- Map out the CRUD requirements per entity

**Agent 3: Reference Project Scan (if applicable)**
- If this portal is similar to an existing Sidequest project, scan that project for reusable patterns
- Extract: component patterns, service layer structure, state management approach, UI patterns
- Note what worked well and what to avoid (check known issues in that project's CLAUDE.md)
- Don't copy code — extract patterns and adapt them

**Output:** Before writing code, produce a brief spec in CLAUDE.md:
- Entities and their fields
- User roles and what each can access
- Pages to build (with priority order)
- Data model (collections, relationships)
- Any unknowns that need Joel's input

---

### Research Type C: SEO & Content

For SEO audits, content strategy, or marketing-focused work.

**Agent 1: Site Audit**
- Fetch the client's site and extract: page titles, meta descriptions, H1s, schema markup, sitemap.xml
- Check for SPA SEO issues (empty page source, missing Helmet, hash routing)
- Run through the technical SEO checklist from SEO.md Phase 2

**Agent 2: Competitor Analysis**
- Search Google for the client's primary service + location
- Identify top 5 organic results + map pack results
- Fetch each competitor's site: compare content depth, schema, page count, trust signals
- Document gaps and opportunities

**Agent 3: Keyword Research**
- Identify high-intent keywords: [service] + [location] + [modifier]
- Check which terms return local results vs informational results
- Map keywords to existing or planned pages
- Prioritise by intent strength and competition

**Output:** Save to `research/seo-audit.md` or update the project CLAUDE.md with findings, prioritised recommendations, and specific implementation tasks.

---

### Research Type D: Data Migration / Import

For projects that need existing data imported (Excel, CSV, JSON, old database exports).

**Agent 1: Source Data Analysis**
- Read all provided data files (Excel, CSV, JSON)
- Document: row counts, column names, data types, relationships between sheets/files
- Identify data quality issues: missing fields, inconsistent formats, duplicates, encoding problems
- Map source columns to target Firestore document fields

**Agent 2: Target Schema Design**
- Design the Firestore collection structure based on the source data
- Define TypeScript types for each entity
- Identify required indexes
- Plan the import order (parent entities before children)

**Agent 3: Validation Rules**
- Define validation rules for each field (required, type, min/max, format)
- Identify rows that will fail validation and how to handle them (skip, fix, flag)
- Plan batch import size (max 500 per Firestore batch)

**Output:** Save to `research/import-plan.md`:
- Source → target field mapping table
- Data quality issues and how each will be handled
- Import order and estimated batch count
- TypeScript types for all entities
- Validation rules

---

### Research: General Principles (All Types)

Regardless of project type:

1. **Save research outputs to files** — `research/` directory or `research/content-document.md`. Don't keep it all in memory.
2. **Run research agents in parallel** — they're independent, launch them all at once.
3. **Verify research before building** — spot-check extracted content against the source. One bad crawl can poison an entire build.
4. **Document unknowns** — if you can't find something or it's ambiguous, note it in CLAUDE.md as needing Joel's input. Don't guess.
5. **Research is not optional** — even under time pressure, skipping research means building on assumptions. Assumptions cause rework.

---

## The Critique Loop

This is where overnight sessions earn their value. Joel can't review while he's asleep, so you have to be Joel.

### How to Critique

**Read JoelTempero.md before every critique round.** Specifically internalise:

**Joel's Anti-Patterns (things he hates — check for ALL of these):**
- Generic grids, small cramped content, corporate stock feel
- Scroll indicators, animated counters, bouncing arrows
- "Welcome to..." headers
- Cookie-cutter alternating left-right layouts
- Anything that looks like a template
- Generic blue/purple gradients
- "Learn more" as the only CTA text everywhere
- Every page having the same structure (hero → cards → CTA)

**Joel's Design Principles (what he wants):**
- Each section should have its own identity while maintaining brand consistency
- Large, bold typography — not afraid of huge text
- Generous whitespace — let content breathe
- Interactive elements that reward exploration
- Subtle animations that add life without distracting (fade-up on scroll, once only, gentle hovers)
- Content fidelity is sacred — never change client copy
- Brand authenticity — extract real brand colours, no generic gradients
- Creativity over convention — every page should feel unique

**Joel's Feedback Signals (apply these to your own work):**
- If a section feels "a bit safe" → push the creativity significantly
- If a section feels "kinda meh" → needs a rethink, not a tweak
- If a section feels "too templatey" → break the pattern, make it unique
- If a section feels "messy" → simplify

### Critique Agent Prompt Template

Launch as a background Agent:

```
You are reviewing a website rebuild as if you were Joel Tempero (read JoelTempero.md in the project root or Skills folder for his exact preferences).

Read all .tsx files in src/pages/ and src/components/.

For each page, evaluate:
1. Layout variety — does this page feel different from the others, or is it the same hero → cards → CTA pattern?
2. Content accuracy — is this real content from the original site, or generic filler? Check for placeholder text, "Lorem ipsum", "[Photo of X]", "Welcome to..."
3. Brand alignment — does the colour palette, typography, and tone match the original brand?
4. Visual creativity — would Joel say this is "too templatey" or "a bit safe"?
5. Image usage — are real images wired in? Any broken references or missing downloads?
6. Mobile responsiveness — are there obvious mobile issues (cramped text, tiny touch targets, horizontal scroll)?
7. Accessibility basics — proper heading hierarchy, alt text on images, focus states?
8. Anti-pattern check — any animated counters, bouncing arrows, scroll indicators, generic gradients, "Learn more" everywhere?

For each issue found, provide:
- The specific file and line/section
- What's wrong (be blunt — Joel prefers direct feedback)
- A concrete fix (not "consider improving" but "change X to Y")

End with:
- Overall score /10
- The top 5 highest-impact changes (ranked)
- A one-line verdict: would Joel say "love it", "nice", "kinda meh", or "too templatey"?
```

### When to Run Critiques

- **After the first full build** (all pages exist): Critique round 1
- **After fixing round 1 issues**: Critique round 2
- **After all pages are complete and polished**: Final critique
- **Minimum 2 rounds, no maximum.** If the score is below 7/10, keep going.

### Processing Critique Feedback

1. Read the full critique before changing anything
2. Prioritise: layout variety > content accuracy > brand alignment > visual polish > micro-optimisations
3. Implement ALL specific fixes suggested (not just the easy ones)
4. Run `npm run build` after implementing
5. If the critique flags content that doesn't match the original, go back to the research and verify

---

## Content & Image Verification

**Run this check at least twice: once mid-session, once before finishing.**

### Image Verification (every time)

```
1. List all image files in public/images/ — count them
2. For each page component, grep for image references
3. Cross-reference: does every image referenced in code exist on disk?
4. Cross-reference: does every downloaded image get used somewhere?
5. Check for 0-byte files: find public/images -size 0
6. Check for broken imports: npm run build will catch missing files
7. Verify image paths are relative (./images/ or /images/), not hotlinking the original site
```

### Content Verification (every time)

For each page, verify against the original site content:

```
- [ ] Page title / H1 matches original exactly
- [ ] All body text matches original exactly (not paraphrased, not "improved")
- [ ] All list items / bullet points present and correct
- [ ] CTAs use the original button text (not generic "Learn More")
- [ ] Contact details are accurate (phone, email, address)
- [ ] Social links point to the right profiles
- [ ] Team member names, titles, and bios are verbatim
- [ ] Testimonials are exact quotes with correct attribution
- [ ] Service/product descriptions are word-for-word
- [ ] No content from the original site has been omitted
```

**If you find discrepancies, fix them immediately.** Content fidelity is the one thing Joel will never compromise on.

---

## Timeout Protection

Sessions can timeout without warning. Protect against this:

### Update CLAUDE.md Constantly

- After every completed page
- After every critique round
- After every significant fix
- **Never let more than 20 minutes pass without a CLAUDE.md update**

### Atomic Work Units

- Complete one page fully before starting the next
- Don't start a refactor across 5 files simultaneously
- Each task should leave `npm run build` passing

### The "What If I Timeout Right Now?" Test

At any point, ask: "If the session ends right now, can the next session pick up cleanly?" If not, stop and document.

### Session Log Format

```markdown
### [Date] — Overnight Session
**Status:** [In progress / Completed]
**Build:** [Clean / Broken + error details]

**Completed:**
- [What was built]
- [Critique rounds completed and scores]
- [Issues found and fixed]

**In progress (if session timed out):**
- [What was being worked on]
- [Current state of that work]

**Needs Joel's input:**
- [Any decisions that require human judgment]

**Image status:** [X downloaded, Y verified, Z wired in]
**Content status:** [X pages verified against original]
```

---

## Parallel Work Patterns

### Good Parallelism (use Agent tool)
- All 4 research agents at session start
- Critique agents running in background while you fix previous round's issues
- Independent image downloads
- Building page X while critique agent reviews pages A-C

### Bad Parallelism (avoid)
- Editing the same file from multiple agents
- Building components that depend on each other simultaneously
- Running builds while actively editing files

---

## Build Phase

### Page Build Order

1. **Layout** (Navbar, Footer, ScrollToTop, FadeIn wrapper) — shared components first
2. **Home** — this is the showcase page, spend the most time here
3. **About** — establishes credibility
4. **Core offering pages** (Services, Products, What We Do) — revenue/conversion pages
5. **Supporting pages** (Contact, Blog/News, FAQ, 404)
6. **Critique round 1** — after all pages exist
7. **Fix everything from critique** — don't cherry-pick, fix it all
8. **Critique round 2** — verify fixes, catch new issues
9. **Content & image verification** — full pass
10. **Final polish** — animations, transitions, mobile edge cases

### Build Discipline

- Run `npm run build` after every page or major component
- Fix TypeScript errors immediately — never let them accumulate
- Remove unused imports as you go
- Use real content from research, not placeholder text
- Wire in downloaded images as you build each component, not later
- Every page gets `react-helmet-async` meta tags (title, description, og:title, og:description)

---

## Common Pitfalls

### 1. Placeholder Syndrome
**Problem:** Building placeholder divs "to be replaced later" — they never get replaced.
**Fix:** Download and wire in real images during research. If an image genuinely isn't available, use a realistic gradient with correct aspect ratio and a `{/* TODO: need actual image of X */}` comment.

### 2. Layout Monotony
**Problem:** Every page: hero → cards grid → CTA. Joel calls this "too templatey".
**Fix:** Vary deliberately. Use editorial 2-column layouts, full-bleed dark sections, sticky sidebars, asymmetric grids, oversized typography sections, image-driven layouts. Each page should have at least one section that looks nothing like the others.

### 3. FadeIn Overuse
**Problem:** Wrapping every list item in its own FadeIn creates a popcorn effect.
**Fix:** Wrap entire sections in a single FadeIn. Only use per-item stagger for hero-level content (3-4 items max). Cap delays: `Math.min(i * 0.1, 0.3)`.

### 4. Generic Headings
**Problem:** "Our Services", "What We Offer", "Get In Touch" — could be any website.
**Fix:** Use the brand's actual language from the research. A heading should tell you which site you're on without seeing the logo.

### 5. Forgetting SEO Basics
**Problem:** SPA with no meta tags.
**Fix:** Every page gets Helmet with: title, description, og:title, og:description, og:type. Canonical URL on home page.

### 6. Unused Import Accumulation
**Problem:** Removing a component but leaving the import — TypeScript build fails.
**Fix:** After any refactor, immediately check imports at the top of the file.

### 7. Not Verifying Image Downloads
**Problem:** curl silently fails, leaving 0-byte files.
**Fix:** After every download batch, run `find public/images -size 0` and re-download. Do this at least twice during the session.

### 8. Losing Work to Timeouts
**Problem:** 25 minutes of changes, timeout before updating CLAUDE.md.
**Fix:** Update CLAUDE.md after every completed task. The session log is the lifeline.

### 9. Content Drift
**Problem:** Subtly rewording original copy to "sound better" or fit the layout.
**Fix:** Never change a single word of client content. If it doesn't fit the layout, change the layout.

### 10. Single Critique Round
**Problem:** Running one critique, fixing the big issues, and calling it done.
**Fix:** Always run at least 2 critique rounds. The second round catches issues introduced by the first round's fixes, plus subtler problems that only become visible once the big stuff is resolved.

---

## Quality Checklist (Run Before Session Ends)

```
BUILD
[ ] npm run build passes with zero errors
[ ] Dev server starts and loads the home page
[ ] No TypeScript errors

CONTENT
[ ] No placeholder text visible ("[Photo of X]", "Lorem ipsum", "TODO")
[ ] All text matches original site verbatim (verified page by page)
[ ] Contact details are accurate
[ ] Team member names/titles/bios are correct
[ ] Testimonials are exact quotes

IMAGES
[ ] All images downloaded to public/images/
[ ] No 0-byte image files
[ ] All images load in the browser (no broken icons)
[ ] Images referenced from local files, not hotlinking original site
[ ] Image count matches original site (no missing images)

NAVIGATION
[ ] All nav links work
[ ] Mobile menu opens and closes
[ ] Footer links work
[ ] Logo links to home
[ ] 404 page exists and renders

DESIGN (Joel's Standards)
[ ] No generic "Welcome to..." headers
[ ] No animated counters or bouncing arrows
[ ] Layout varies between pages (not all hero → cards → CTA)
[ ] Brand colours used throughout (not generic blue/purple)
[ ] Typography feels intentional and brand-appropriate
[ ] Generous whitespace — content breathes
[ ] Each page has at least one section that feels unique

MOBILE
[ ] Site works on 320px viewport
[ ] No horizontal scroll on any page
[ ] Touch targets are 44px minimum
[ ] Mobile nav is fully functional

ACCESSIBILITY
[ ] All images have descriptive alt text
[ ] Heading hierarchy is correct (no skipped levels)
[ ] Skip-to-content link present
[ ] Focus states visible on interactive elements

SEO
[ ] react-helmet-async on every page (title + description minimum)
[ ] OG tags on at least the home page

DOCUMENTATION
[ ] CLAUDE.md updated with current progress
[ ] Session log entry added with date and details
[ ] Next steps are specific and ordered
[ ] Known issues listed (resolved ones removed)
[ ] Image/content verification status documented
```

---

## Handoff to Developer

When Joel wakes up, he should be able to:

1. Run `npm run dev` and see a complete, working site
2. Read CLAUDE.md and know exactly what was done, what's next, and what needs his input
3. See real content and real images on every page — not placeholders
4. Browse every page and think "great, I can start iterating on this"
5. Trust that the content matches the original site word-for-word

**The overnight session is successful when Joel's first reaction is to start giving design feedback, not to start fixing broken builds or missing content.**

---

*Last updated: 2026-03-22*
*Designed to work alongside: CLAUDE-WebsiteInstructions.md, JoelTempero.md, CMS-Portal-Backend.md*
