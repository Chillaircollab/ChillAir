# SEO Playbook for Claude Code

> Reusable instruction set for SEO work across Sidequest Digital projects. Copy into any client project folder or reference from a project's CLAUDE.md.

---

## Ground Rules

1. **Gather context first.** Read the project's `CLAUDE.md` for business name, URL, services, locations, and competitors. If any are missing, ask once — don't guess.
2. **Go hunting.** Use `WebFetch` and `WebSearch` to pull live data. Never ask Joel to paste page source or search results — get them yourself.
3. **Be blunt.** No fluff, no hedging. State what's wrong, what's missing, and what to do. Prioritise by impact.
4. **Output clean artefacts.** Tables, JSON-LD, keyword lists, and content briefs should be copy-paste ready. No explanations unless asked.
5. **Cite everything.** Include URLs and dates so findings can be verified.
6. **Top 3, not top 10.** Joel scopes tight. Prioritise ruthlessly — flag the highest-impact items, not an exhaustive list. More can be requested.
7. **Never rewrite client copy.** Content fidelity is sacred. Recommend structure, topics, and meta content — don't "improve" existing words on the client's site.
8. **NZ English.** Optimise, analyse, colour, etc. Unless the client's site explicitly uses US English.
9. **Know the stack.** Most Sidequest sites are React + Vite SPAs. SEO recommendations must account for this (see Phase 2.4).
10. **Tracker first.** Before any SEO work, check for `seo-tracker.html` in the project. If it doesn't exist, create one (see Phase 8). If it does, read it and update it with your findings. The tracker is the single source of truth.
11. **Fix, don't just report.** If you find missing meta tags, schema, sitemap, alt text, or canonical tags — add them to the codebase yourself. Update the tracker to reflect what you fixed. Joel shouldn't have to action things Claude can do independently.

---

## Phase 0: Project Discovery

Run this before anything else on a new SEO engagement.

### 0.1 — Business Intel Gathering

1. Read the project's `CLAUDE.md` for known business details.
2. Fetch the client's website homepage. Extract:
   - Business name, address, phone (NAP)
   - Services offered (every service page or listed service)
   - Cities/areas served
   - Key selling points and trust signals (reviews, certifications, years in business)
   - Existing schema markup (all types found in page source)
3. Fetch sitemap.xml or sitemap index if it exists. Catalogue all pages by type (service, location, blog, etc.).
4. **Identify the tech stack.** Check for signs of:
   - SPA framework (React, Vue, etc.) — check page source for `<div id="root">`, bundled JS, empty `<body>`
   - SSR/SSG framework (Next.js, Gatsby, Astro) — check for pre-rendered HTML in source
   - Static HTML — check for full HTML content in source
   - Hosting platform — check response headers, DNS, CNAME records
5. Present a structured summary and confirm accuracy before proceeding.

### 0.2 — Competitor Identification

If competitors aren't listed in the project CLAUDE.md:

1. Search Google for the client's primary service + primary city (e.g., "plumber Christchurch").
2. Identify the top 5 from organic results and map pack.
3. List with URLs. Confirm with Joel before analysis begins.

### 0.3 — Client Type Classification

Different client types need different SEO focus. Classify the project:

| Client Type | Primary SEO Focus | Secondary |
|---|---|---|
| **Local service business** | Local pack, GBP, service+location keywords, schema | Content, backlinks |
| **School / education** | Branded search, enrolment keywords, event schema | Content freshness, news |
| **Church / community** | Branded search, location, event listings | Service times schema, community keywords |
| **Event / festival** | Event schema, date-based keywords, social signals | News, media coverage |
| **E-commerce** | Product schema, category pages, transactional keywords | Reviews, shopping feeds |
| **Web app / SaaS** | Informational content, feature keywords, landing pages | Technical SEO, blog strategy |

Tailor all subsequent phases to the client type. Don't run a full local SEO playbook on a web app, and don't skip GBP for a plumber.

---

## Phase 1: Competitor Analysis

### 1.1 — Competitor Teardown

For each confirmed competitor, fetch their site and extract:

| Data Point | What to Look For |
|---|---|
| Services | Every service listed — compare breadth vs. the client |
| Locations | Cities/suburbs targeted — dedicated location pages? |
| Content depth | Word count on key pages, blog frequency, guides |
| Trust signals | Reviews (count + rating), certifications, partnerships, case studies |
| Schema | All structured data types present |
| CTAs | What they ask visitors to do, how aggressively |
| Media | Video, before/after galleries, team photos |
| Site speed | Note if obviously slow or broken |
| Internal linking | Hub-and-spoke structures, service-location cross-linking |
| Tech stack | SPA vs SSR vs static — how are they handling SEO? |

**Output:** A comparison table — client vs. each competitor — with a clear verdict on where the client is weaker, equal, or stronger. Top 3 opportunities highlighted.

### 1.2 — Content Gap Analysis

1. Compare the client's page inventory against each competitor's.
2. Identify topics/pages competitors have that the client doesn't.
3. Identify topics NO competitor covers well (true gaps = biggest opportunity).
4. **Output:** Top 5 content opportunities, ranked by:
   - Search intent strength (informational vs. transactional)
   - Competitive difficulty
   - Relevance to client's services
   - Estimated impact

### 1.3 — Backlink & Authority Snapshot

If Joel has access to Ahrefs, SEMrush, or similar:

1. Ask for access or exported data.
2. Analyse competitor's top 20 pages by traffic.
3. Extract target keywords, volumes, difficulty.
4. **Output:** Spreadsheet-ready table with prioritised keyword targets.

No tool access? Note the gap, recommend which tool and what to look up. Move on.

---

## Phase 2: Technical SEO Audit

### 2.1 — Schema Markup Audit

For every key page:

1. Fetch page source.
2. Extract all structured data (JSON-LD, Microdata, RDFa).
3. Assess each: valid? useful? complete?

**Output — no exceptions:**

**Existing Schema:**
| Page | Schema Type | Valid | Useful | Missing Properties |
|---|---|---|---|---|

**Missing Schema (HIGH priority only):**
| Page | Recommended Schema | Reason |
|---|---|---|

For each HIGH priority item, generate clean JSON-LD. Use business details from Phase 0 where known. Mark unknowns as `"REPLACE: [description]"`.

**Schema types by client type:**

| Type | Local Business | School | Church | Event |
|---|---|---|---|---|
| LocalBusiness / subtype | Required | Required | Required | - |
| Organization | - | Required | Required | Required |
| Service | Required | - | - | - |
| FAQPage | High | Medium | Low | Low |
| Event | If applicable | High (open days) | High (services) | Required |
| BreadcrumbList | Required | Required | Required | Required |
| WebSite + SearchAction | Medium | Medium | Low | Low |
| AggregateRating | High | - | - | - |
| GeoCoordinates | Required | Required | Required | Required |
| OpeningHoursSpecification | Required | Medium | High | - |
| EducationalOrganization | - | Required | - | - |
| Course / Program | - | If applicable | - | - |

### 2.2 — On-Page SEO Audit

For each key page:

| Element | Check | Pass Criteria |
|---|---|---|
| Title tag | Present, unique, keyword, length | Under 60 chars, includes primary keyword |
| Meta description | Present, unique, CTA | Under 155 chars, actionable |
| H1 | One per page | Includes primary keyword |
| H2-H6 | Logical hierarchy | Keyword variations used naturally |
| URL structure | Clean, readable | Keyword-relevant, no query strings |
| Image alt text | Present on all images | Descriptive, keyword where natural |
| Internal links | Key pages linked | From nav and body content |
| Mobile usability | Viewport meta | No horizontal scroll, tap targets sized |
| Canonical tags | Present, correct | Self-referencing or pointing to correct canonical |
| Open Graph tags | Present | og:title, og:description, og:image for social sharing |

**Output:** Table per page — pass/fail/warning per element. Specific fix instructions for every fail.

### 2.3 — Crawlability & Indexing

1. Check robots.txt — anything blocked that shouldn't be?
2. Check for meta robots noindex on key pages.
3. Check sitemap.xml — exists? submitted? includes all key pages?
4. Look for orphan pages (exist but not linked).
5. Check for redirect chains or loops.

### 2.4 — SPA SEO Audit (React + Vite Sites)

**This is critical.** Most Sidequest Digital sites are React SPAs deployed to GitHub Pages or Firebase Hosting. SPAs have inherent SEO challenges that must be addressed.

**Check and report:**

| Issue | What to Look For | Fix |
|---|---|---|
| Empty page source | View source shows only `<div id="root"></div>` with no content | Googlebot can render JS, but it's slow and unreliable. Consider prerendering. |
| react-helmet-async | Is it installed and used on every page? | Every route needs unique title, meta description, canonical, OG tags |
| Missing meta on route change | Navigate between routes — do title/meta update? | Verify Helmet is in every page component, not just App.tsx |
| Hash routing | URLs use `/#/about` instead of `/about` | Switch to `BrowserRouter`. Hash routes are harder for Google to crawl. |
| 404 handling | Does the host serve index.html for all routes? | GitHub Pages: add 404.html. Firebase: configure rewrites in firebase.json. |
| Sitemap generation | Does a sitemap.xml exist with all routes? | SPAs need a manually maintained or build-generated sitemap. |
| Social sharing | Does sharing a link show correct preview? | OG tags must be in the initial HTML or set via prerendering. |
| Prerendering | Is any prerendering in place? | Options: vite-plugin-prerender, react-snap, or migrate to Next.js for SSR |

**SPA SEO Decision Tree:**

1. **Is SEO critical for this project?** (e.g., local business that needs to rank vs. internal portal that doesn't)
   - If NO: Just ensure react-helmet-async is set up. Done.
   - If YES: Continue.
2. **Is the site already built as a Vite SPA?**
   - Add prerendering via vite-plugin-prerender or react-snap for key pages.
   - Ensure sitemap.xml is generated at build time.
   - Verify OG tags render in the prerendered HTML.
3. **Is the site not yet built, and SEO is the primary goal?**
   - Recommend Next.js instead of Vite SPA. Joel uses Next.js for SEO-heavy sites (Signal Co, My Living Hope). This is the right call when organic search is the main traffic driver.

**Implementation checklist for existing Vite SPAs:**

```
[ ] react-helmet-async installed and wrapping App in HelmetProvider
[ ] Every page component sets: title, meta description, canonical, og:title, og:description, og:image
[ ] BrowserRouter used (not HashRouter)
[ ] Hosting configured to serve index.html for all routes (SPA fallback)
[ ] sitemap.xml exists and lists all public routes
[ ] robots.txt exists and allows crawling
[ ] Prerendering configured for key landing pages (if SEO-critical)
[ ] Build outputs checked: view source of built HTML confirms meta tags render
```

### 2.5 — Hosting Platform SEO

**GitHub Pages:**
- Custom domain: CNAME configured, HTTPS enforced
- No server-side redirects — handle via JS or meta refresh (not ideal)
- 404.html must exist for SPA routing
- No HTTP headers control (can't set cache headers, security headers)
- Sitemap must be a static file in the public/ folder

**Firebase Hosting:**
- firebase.json rewrites for SPA routing: `{"source": "**", "destination": "/index.html"}`
- Can set custom headers (cache control, security headers) in firebase.json
- Supports redirects and rewrites natively
- Can serve pre-rendered pages alongside SPA
- Better for SEO-critical sites than GitHub Pages

**When to recommend migration:**
- If a local business site is on GitHub Pages and SEO is a priority, recommend Firebase Hosting for the redirect/header control.
- If SEO is the primary traffic driver, recommend Next.js on Vercel or Firebase.

---

## Phase 3: Keyword Strategy

### 3.1 — High-Intent Local Keywords

For local service businesses. Skip for schools/apps/events.

**Pattern:** [service] + [modifier] + [location]

**Modifiers that signal purchase intent:**
- near me, in [city], [suburb]
- emergency, same day, 24/7, urgent
- cost, price, quote, free quote
- best, top rated, trusted, licensed
- hire, book, call, get

**NZ-specific modifiers:**
- [city] (Christchurch, Auckland, Wellington, etc.)
- [suburb] (Riccarton, Merivale, Addington, etc.)
- "NZ" or "New Zealand" for national services
- Kiwi vernacular where relevant (e.g., "sparky" for electrician, "chippie" for builder)

**Output:** Top 20 keywords per primary service:

| Keyword | Intent | Est. Volume | Difficulty | Priority |
|---|---|---|---|---|

Use WebSearch to validate which terms return local results and map packs.

### 3.2 — Supporting Content Keywords

Informational keywords that feed the transactional pages:

- "How to" + [service topic]
- "Signs you need" + [service]
- "[Service] vs [alternative]"
- "How much does [service] cost in [city]"
- "[Service] [city] regulations/requirements"

**NZ-specific supporting content:**
- NZ building codes / regulations relevant to the service
- Seasonal content (NZ seasons are reversed — winter prep in March, summer in September)
- Local council requirements by region
- NZ consumer rights / guarantees act references where relevant

### 3.3 — Keyword Mapping

Map every keyword to a specific page (existing or planned):

| Keyword | Target Page | Exists? | Action |
|---|---|---|---|
| emergency plumber christchurch | /emergency-plumber | Yes | Optimise title tag |
| how to fix leaking tap | /blog/fix-leaking-tap | No | Create content |

Flag cannibalisation risks. No two pages should target the same keyword unless they're close variants.

### 3.4 — Keywords by Client Type

**Schools:**
- "[School name] enrolment"
- "[School name] reviews"
- "schools in [suburb/city]"
- "[School name] [sport/subject/event]"
- "open day [school name]"

**Churches / Community:**
- "[Church name] service times"
- "church near [suburb]"
- "[Church name] events"
- "[denomination] church [city]"

**Events:**
- "[Event name] [year]"
- "[Event name] tickets"
- "[Event name] dates"
- "[event type] [city] [year]"

---

## Phase 4: Google Business Profile (GBP)

Relevant for local businesses, schools, and churches. Skip for web apps and online-only businesses.

### 4.1 — GBP Post Analysis (Competitors)

For each competitor, search for their GBP and analyse:

| Data Point | What to Extract |
|---|---|
| Post types | Updates, offers, events, products |
| Frequency | How often they post |
| Content themes | Seasonal, promotional, educational, project showcases |
| Keywords used | Keyword-stuffing or strategic? |
| CTAs | Book now, call, learn more, get offer |
| Media | Photos, videos — quality and relevance |
| Engagement signals | Visible interaction patterns |

### 4.2 — GBP Posting Plan

**Output a 4-week calendar:**
- Post type per entry
- Topic/theme tied to a target keyword
- CTA style (direct: "Call now" vs. soft: "Learn more")
- Local landmark or neighbourhood reference where natural
- Media recommendation

**Rules:**
- Every post includes the primary city/suburb naturally
- Every post has a hard CTA — no passive endings
- Reference local landmarks, events, or neighbourhoods where relevant
- Rotate: project showcase, seasonal tip, service highlight, offer/promotion
- Minimum: 2x per week

### 4.3 — GBP Post Drafts

- Under 300 words (Google truncates)
- First sentence hooks — lead with benefit or local reference
- One target keyword naturally — don't force it
- End with specific CTA — "Call [phone] for a free quote today" not "Contact us"
- Suggest image description — what photo should accompany this

---

## Phase 5: Content Briefs & Creation

**Critical rule: Never rewrite existing client copy.** Recommend new content, structure, and meta — but the words on the client's existing pages are theirs. Suggest additions and improvements, not replacements.

### 5.1 — Service Page Brief

- **Target keyword** (primary + 2-3 secondary)
- **Search intent** (what the searcher wants)
- **Recommended title tag** (under 60 chars)
- **Recommended meta description** (under 155 chars, includes CTA)
- **H1 recommendation**
- **Subheading structure** (H2s/H3s with keyword variations)
- **Content sections to include:** what the service is, how it works, pricing/quote CTA, service areas, FAQs, trust signals
- **Internal links** (related services, location pages, blog posts)
- **Schema** (Service, FAQPage, BreadcrumbList)
- **Word count target** (based on competitor page lengths)
- **react-helmet-async implementation** — provide the exact Helmet block for the page component

### 5.2 — Location Page Brief

For businesses serving multiple areas:

- One page per suburb/city — no thin doorway pages
- Unique content per page — not just city name swapped
- Include: local landmarks, travel directions, area-specific service notes
- Schema: LocalBusiness with GeoCoordinates for that area
- Internal link: back to main service page + adjacent location pages

**NZ suburb strategy:**
- Major cities have well-known suburbs that people search by (e.g., "dentist Riccarton" not just "dentist Christchurch")
- Prioritise suburbs by: population density, commercial activity, proximity to the client's physical location
- Don't create pages for suburbs with no search volume — check first

### 5.3 — Blog Content Brief

- **Target keyword** (long-tail informational)
- **Angle** — what makes this different from page-1 results
- **Structure** — recommended headings and sections
- **Internal links** — which service page(s) this supports
- **CTA** — what action the reader should take
- **Schema** — FAQPage if applicable, Article markup

---

## Phase 6: NZ Directory & Citation Building

### 6.1 — NZ Business Directories

Check and report presence on key NZ directories:

| Directory | URL | Priority | Free/Paid |
|---|---|---|---|
| Google Business Profile | google.com/business | Critical | Free |
| Apple Business Connect | businessconnect.apple.com | High | Free |
| Bing Places | bingplaces.com | Medium | Free |
| Yellow NZ | yellow.co.nz | High | Free listing available |
| Finda | finda.co.nz | Medium | Free |
| NoCowboys | nocowboys.co.nz | High (trades) | Free |
| Builderscrack | builderscrack.co.nz | High (trades) | Paid |
| Localist | localist.co.nz | Medium (events) | Free |
| School-specific directories | education.govt.nz, nzqa.govt.nz | High (schools) | N/A |

### 6.2 — NAP Consistency Check

- Search for the business name across directories.
- Flag any inconsistencies in name, address, or phone number.
- **Output:** Table of found listings with consistent/inconsistent status and what needs fixing.

---

## Phase 7: Reporting & Monitoring

### 7.1 — SEO Health Check

Quick audit, in order:

1. Key pages indexed? (`site:domain.com` search)
2. Schema errors? (fetch and validate)
3. Broken links on key pages?
4. New competitor content to watch?
5. GBP posting on schedule?

### 7.2 — Progress Report

| Metric | Last Check | Current | Trend |
|---|---|---|---|
| Pages indexed | - | - | - |
| Schema errors | - | - | - |
| Target keywords tracked | - | - | - |
| GBP posts this month | - | - | - |
| New content published | - | - | - |
| SPA prerendering status | - | - | - |

---

## Phase 8: SEO & Marketing Tracker

Every project should have a living HTML tracker that shows the current state of SEO at a glance. This is the single source of truth for what's done, what's pending, and what Joel can share with clients.

### 8.1 — Check for Existing Tracker

Before doing any SEO work:

1. Search for an existing SEO/marketing tracker:
   - Look for `seo-tracker.html`, `seo.html`, `marketing-tracker.html`, or similar filenames
   - If no obvious match, glob for `*.html` in the project root and docs folders
   - Check the `<title>` and `<h1>` of any HTML files found — it may be titled differently (e.g., "Marketing Dashboard", "SEO Status", "[Client Name] SEO")
   - Also check for references to a tracker in CLAUDE.md or README
2. If a tracker exists (regardless of filename), read it and update it with new findings
3. If no tracker exists, create one as `seo-tracker.html` (see 8.2)

### 8.2 — Create the Tracker

Generate a single self-contained HTML file (`seo-tracker.html`) in the project root. It should include:

**Header section:**
- Client/business name
- Website URL
- Last audit date
- Overall SEO score (out of 100, calculated from sections below)

**Sections (each with status indicators and scores):**

| Section | What to Track |
|---------|--------------|
| **Technical SEO** | SPA rendering status, sitemap exists, robots.txt, canonical tags, page speed, mobile usability, HTTPS |
| **On-Page SEO** | Title tags (per page), meta descriptions, H1s, alt text coverage, internal linking, URL structure |
| **Schema Markup** | Which schema types are implemented, which are missing, validation status |
| **Content** | Word count per key page, blog/content frequency, content gaps identified, content briefs written |
| **Keywords** | Target keywords mapped to pages, estimated search volume, current ranking (if known) |
| **Google Business Profile** | Claimed?, NAP consistent?, posting frequency, review count/rating, photos |
| **Backlinks & Citations** | NZ directory listings status, NAP consistency, known backlinks |
| **Competitor Position** | Where the client sits vs top 3 competitors (brief summary) |

**Per-item status system:**
- Done (green) — implemented and verified
- In Progress (yellow) — being worked on
- Needs Action (red) — not started, high priority
- Not Applicable (grey) — doesn't apply to this project
- Client Action (blue) — requires client input or access (e.g., GBP login, content approval)

**Client Advice section:**
- Top 3 things the client can do themselves (e.g., "Post to Google Business Profile weekly", "Ask happy customers for Google reviews", "Add photos of recent work to GBP")
- Things that need Joel's involvement (e.g., "Schema markup needs deploying", "New service pages needed")
- Quick wins vs long-term plays

**Design requirements:**
- Single HTML file, no dependencies, opens in any browser
- Dark theme consistent with Joel's portal aesthetic
- Collapsible sections so it's not overwhelming
- Print-friendly (clients might print it)
- Mobile responsive (clients will open it on their phone)
- Last updated timestamp that auto-displays

### 8.3 — Auto-Action What You Can

When creating or updating the tracker, don't just document — **fix what you can independently:**

| If you find... | Do this |
|----------------|---------|
| Missing meta descriptions | Write them and add to the codebase (react-helmet-async) |
| Missing schema markup | Generate JSON-LD and add to the relevant page components |
| No sitemap.xml | Generate one with all public routes |
| No robots.txt | Create one with sensible defaults |
| Missing alt text on images | Add descriptive alt text to img tags |
| No canonical tags | Add self-referencing canonicals to all pages |
| No OG tags | Add og:title, og:description, og:image to all pages |
| Heading hierarchy issues | Fix H1/H2/H3 structure |
| Missing skip-to-content link | Add it |

**Don't auto-action:** Content rewrites, GBP changes (need client login), directory submissions (need client details), keyword strategy changes (need Joel's approval).

After making fixes, update the tracker to reflect the new status. Mark items as "Done" with the date.

### 8.4 — Keeping the Tracker Current

- Update the tracker every time SEO work is done on the project
- Include a "Change Log" section at the bottom with dated entries
- The tracker should be the first thing opened when starting any SEO session on the project
- When Joel asks "what's the SEO status of [project]?", the answer is: open the tracker

---

## Quick Commands

| Command | Action |
|---|---|
| "Run a full audit" | Phase 0 + 1 + 2 + 3 |
| "Competitor teardown" | Phase 0.2 + 1.1 + 1.2 |
| "Schema audit" | Phase 0.1 (if needed) + 2.1 |
| "SPA SEO check" | Phase 2.4 |
| "Find keyword gaps" | Phase 0 (if needed) + 3.1 + 3.2 |
| "GBP plan" | Phase 0 (if needed) + 4.1 + 4.2 |
| "Write GBP posts" | Phase 4.3 |
| "Content brief for [page]" | Phase 5.1, 5.2, or 5.3 depending on type |
| "Check directories" | Phase 6.1 + 6.2 |
| "Health check" | Phase 7.1 |
| "Progress report" | Phase 7.2 |
| "SEO tracker" | Phase 8 — find or create the project's SEO tracker, update it, auto-fix what's possible |
| "SEO status" | Open the tracker and summarise current state |
| "Client SEO advice" | Generate the client-facing advice section of the tracker |

---

## Notes

- This playbook is optimised for Sidequest Digital's primary clients: NZ small businesses, schools, churches, and community organisations.
- Most sites are React + Vite SPAs — always check SPA SEO (Phase 2.4) as part of any audit.
- When recommending Next.js over Vite for a new build, Joel already uses this pattern for SEO-heavy sites. It's not a hard sell.
- Priority order when in doubt: schema > on-page > SPA rendering > content > links > directories.
- Joel deploys frequently and reviews visually. SEO changes that require a deploy should be batched with other work where possible.
