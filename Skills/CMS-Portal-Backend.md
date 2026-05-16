# CMS / Portal / Backend Playbook

> Comprehensive instruction set for building client portals, admin dashboards, and CMS-driven backends for Sidequest Digital projects. Drop this into any project folder and reference it from CLAUDE.md.

---

## Ground Rules

1. **Read this entire playbook before writing code.** Understand the full scope, then execute phase by phase.
2. **Edit, don't rewrite.** If files exist, modify them. Never rebuild from scratch unless Joel approves.
3. **Match existing patterns.** If the project already has conventions (naming, folder structure, state management), follow them exactly.
4. **Ship incrementally.** Every phase should leave the app in a deployable state. No half-built features that break the build.
5. **Mobile-first, always.** Sidebar on desktop, bottom nav or hamburger on mobile. Touch targets 44px minimum.
6. **Ask once, build twice.** Gather requirements in one message, not a drip-feed of questions. Then execute.
7. **Firebase is the default backend.** Auth, Firestore, Storage, Hosting, Cloud Functions. Don't suggest alternatives unless Joel asks.

---

## Stack

All new portals use **React + TypeScript + Vite + Tailwind CSS + Firebase**. No exceptions unless Joel says otherwise.

### Core Dependencies (every project)

| Package | Role | Why this one |
|---------|------|-------------|
| **React 18/19** | UI framework | Industry standard, massive ecosystem, Joel's entire portfolio is React |
| **TypeScript** | Type safety | Catches bugs at build time, self-documenting code, better IDE experience |
| **Vite** | Build + dev server | Fast HMR, native ESM, simple config. Next.js only when SSR is needed (rare for portals) |
| **Tailwind CSS v4** | Styling | Utility-first, no context-switching to CSS files, dark mode built-in, consistent spacing/color system |
| **React Router v7** | Client-side routing | Standard for Vite SPAs. Lazy loading, nested routes, protected route wrappers |
| **Zustand** | State management | Minimal boilerplate, one store per feature, no providers/reducers. Never Redux — too heavy for these projects |
| **Lucide React** | Icons | Tree-shakeable, consistent style, covers every UI need. Don't mix icon libraries |
| **react-hook-form + zod** | Forms + validation | Performant (uncontrolled inputs), zod schemas reusable between client and Cloud Functions |
| **Firebase SDK** | Backend | Auth, Firestore, Storage, Hosting, Cloud Functions — one platform, one billing account, one CLI |

### Common Additions (add when the project needs them)

| Package | When to add | Notes |
|---------|------------|-------|
| **dnd-kit** | Drag & drop needed (kanban boards, reordering, segment planning) | Used in Eastercamp production page, 48Hours runsheet |
| **xlsx / PapaParse** | Bulk import/export of data (CSV/Excel) | Used in iSQROLL, Eastercamp, MGSArtsPortal |
| **date-fns** | Date formatting, relative time, calendar logic | Lightweight, tree-shakeable. Don't use moment.js (bloated, deprecated) |
| **vite-plugin-pwa + Workbox** | App needs offline support or install-to-homescreen | Used in Eastercamp, grangetech. Configure caching strategies per asset type |
| **react-helmet-async** | Public-facing pages that need SEO (title, meta, OG tags) | Every public page gets Helmet. Not needed for admin-only portals |
| **TanStack Table** | Complex data tables with sorting, filtering, pagination, column visibility | Used in Twominds, portal.mylivinghope. Overkill for simple lists |
| **TanStack Query** | Server state management for REST APIs or complex caching needs | Not needed when using Firestore real-time listeners (Zustand + onSnapshot handles this) |
| **Recharts** | Data visualisation (charts, graphs, dashboards) | Used in Twominds. Simple API, responsive, composable |
| **Framer Motion** | Animations beyond CSS transitions | Standard for website rebuilds. For portals, usually Tailwind transitions are enough |
| **react-hot-toast** | Drop-in toast notifications | Or build a custom toast component — both patterns exist across projects |
| **DOMPurify** | Rendering user-submitted HTML safely | Only needed if the app has a rich text editor or renders HTML from a CMS |

### What NOT to Use

| Don't use | Use instead | Why |
|-----------|------------|-----|
| Redux / Redux Toolkit | Zustand | Too much boilerplate for the scale of these projects |
| CSS Modules / styled-components | Tailwind | Consistency across all projects, no context-switching |
| moment.js | date-fns | moment is deprecated and 300KB. date-fns is modular and tree-shakeable |
| Axios | Firebase SDK / fetch | Firebase SDK handles all Firestore/Auth/Storage calls. For external APIs, native fetch is fine |
| Next.js | Vite | Unless the project specifically needs SSR for SEO (rare for portals). Vite is simpler and faster to dev with |
| Material UI / Ant Design / Chakra | Custom components + Tailwind | Component libraries add massive bundle size and fight your design. Build lean UI components with Tailwind |
| Firebase Realtime Database | Firestore | Firestore has better querying, offline support, and security rules. RTDB only for very specific real-time needs (presence, typing indicators) |

### When to Deviate

These are the only cases where the standard stack should change:

| Situation | Deviation |
|-----------|-----------|
| SEO is the primary traffic driver (e.g., public marketing site) | Use **Next.js** instead of Vite for SSR/SSG |
| Project needs a headless CMS for editorial content | Add **Sanity** alongside Firebase (48Hours pattern) |
| Native mobile app wrapper needed | Add **Capacitor** on top of the React app (Twominds pattern) |
| E-commerce with Shopify inventory | Add **Shopify Storefront API** (My Living Hope pattern) |
| 3D/WebGL features needed | Add **Three.js + React Three Fiber** (Aorangi pattern) |
| Joel says so | Whatever Joel says |

---

## Phase 0: Requirements Gathering

Ask these in **one message**:

1. What is this portal for? (Who uses it, what do they manage?)
2. What are the user roles? (admin, manager, staff, client, public, etc.)
3. What are the main data types/entities? (e.g., students, lessons, events, tickets)
4. Which entities need full CRUD? Which are read-only?
5. Real-time updates needed? (live data sync, or load-on-page-visit is fine?)
6. Any external integrations? (email, payments, SMS, third-party APIs)
7. Does it need to work offline? (PWA with offline queue?)

**Output a brief spec** (10-15 lines max) summarising the answers. Confirm with Joel before proceeding.

---

## Phase 1: Project Scaffold

### 1.1 — Folder Structure

```
project-root/
├── src/
│   ├── components/
│   │   ├── common/          (Button, Modal, Input, Card, Badge, Toast, EmptyState, Spinner)
│   │   ├── layout/          (Header, Sidebar, MobileNav, PageLayout)
│   │   └── [feature]/       (feature-specific components)
│   ├── pages/
│   │   ├── public/          (if app has public-facing pages)
│   │   ├── portal/          (main portal/manager pages)
│   │   ├── admin/           (admin-only pages)
│   │   └── auth/            (Login, Register, ForgotPassword)
│   ├── services/
│   │   ├── firebase/        (config.ts, init)
│   │   └── api/             (one service file per entity — CRUD + listeners)
│   ├── stores/              (Zustand — one store per feature domain)
│   ├── hooks/               (custom hooks — useAuth, useRealtimeSync, etc.)
│   ├── types/               (TypeScript types — one file per entity)
│   ├── utils/               (helpers, constants, formatters)
│   ├── routes/              (router config with lazy loading)
│   └── App.tsx
├── functions/               (Cloud Functions if needed)
│   ├── src/
│   │   └── index.ts
│   └── package.json
├── firebase.json
├── firestore.rules
├── firestore.indexes.json
├── storage.rules
└── CLAUDE.md
```

**Key conventions:**
- Feature-based folder structure inside `components/`
- One Zustand store per feature domain (not one giant store)
- Service layer in `services/api/` — one file per entity with CRUD + `onSnapshot` listeners
- Types in `types/` — one file per entity
- Lazy-load portal/admin pages with `React.lazy` + Suspense
- `PageLayout` component wraps every page (title, optional filters, optional action button)
- Tailwind for all styling — no CSS modules, no styled-components
- `cn()` utility (clsx + tailwind-merge) for conditional class composition

### 1.2 — Firebase Setup

1. Create Firebase project (or use existing)
2. Enable: Authentication, Firestore, Storage, Hosting
3. Configure `firebase.json`:
   - SPA rewrite: `{"source": "**", "destination": "/index.html"}`
   - Cache headers: no-cache for HTML/JS/CSS, long cache for images
4. Set up `.firebaserc` with project alias
5. Write initial `firestore.rules` (start permissive for dev, lock down before launch)
6. Write initial `storage.rules`

---

## Phase 2: Authentication & Roles

### 2.1 — Auth Service

**Firebase Auth setup:**
- Email/password sign-in (minimum for all projects)
- Google OAuth (optional, good for internal tools)
- Password reset flow
- Email verification (if public registration)

**Auth state listener pattern:**

```
onAuthStateChanged → load user profile from Firestore → set role/permissions → redirect to appropriate page
```

**On logout:** Clear all state, unsubscribe all Firestore listeners, redirect to login.

### 2.2 — Role System

Define roles in a constants file. Every project needs at minimum:
- `admin` — full access to everything
- At least one restricted role

**Common role patterns from existing projects:**

| Project Type | Roles |
|-------------|-------|
| School portal | master, admin, student (tech/media subtypes) |
| Client portal | admin, manager, support, client |
| Event app | admin, lead, member |
| Marketplace | admin, storefront, dealership, nonprofit, general |

**Store roles in the Firestore user profile document**, not just Firebase Auth custom claims (custom claims require Cloud Functions to set and don't update in real-time).

**Role check pattern:**
- Server-side: Firestore rules check `get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role`
- Client-side: Store role in auth state, check before rendering UI elements

### 2.3 — Token-Based Access (Optional)

For external users who shouldn't need a full account (e.g., tutors, staff, clients viewing a specific page):

1. Admin generates a token (32-char random alphanumeric string)
2. Token stored in Firestore with: `userId`, `role`, `expiresAt`, `createdAt`
3. Token passed via URL query param: `?token=abc123`
4. Page validates token against Firestore on load
5. Token grants limited read/write access per Firestore rules

**Use this for:** tutor portals, client review pages, staff task boards, external form responses.

---

## Phase 3: Data Layer

### 3.1 — Firestore Collection Design

**Naming:** lowercase, plural (e.g., `users`, `projects`, `tickets`, `lessons`)

**Every document should have:**
- `createdAt` (serverTimestamp)
- `updatedAt` (serverTimestamp)
- `createdBy` (user ID — who created it)

**Design principles:**
- Flat collections preferred over deep nesting (Firestore queries can't span subcollections easily)
- Use subcollections only for truly owned/scoped data (e.g., `events/{eventId}/tasks`)
- Store denormalised references where needed (e.g., store `tutorName` alongside `tutorId` to avoid extra reads)
- Keep documents under 1MB (Firestore limit) — offload large text/files to Storage

### 3.2 — Service Layer

One file per entity in `services/api/`:

```
Each service exports:
- load[Entity](options?)         // one-time fetch with optional filters, pagination
- subscribeTo[Entity](callback)  // real-time onSnapshot listener, returns unsubscribe fn
- create[Entity](data)           // validate → write → log activity
- update[Entity](id, updates)    // validate → merge → log activity
- delete[Entity](id)             // delete → log activity
```

**Real-time sync pattern:**
- Create a `useRealtimeSync` hook called once in App root
- Subscribe to all relevant collections
- Push changes into Zustand stores
- Return cleanup function that unsubscribes all listeners

### 3.3 — State Management (Zustand)

- One store per feature domain: `useAuthStore`, `useDataStore`, `useUIStore` (minimum)
- Larger apps: one store per entity (`useTeamsStore`, `useTicketsStore`, etc.)
- Store pattern:
  - State: the data + loading flags
  - Actions: `set[Entity]`, `add[Entity]`, `update[Entity]`, `remove[Entity]`, `clearAll`
  - No async logic in stores — keep that in services
- Persist store (optional): use Zustand `persist` middleware for UI preferences (theme, sidebar state)

### 3.4 — Activity Logging

Every portal should have an audit trail. Log mutations with:

```
{
  action: 'create' | 'update' | 'delete',
  collection: 'tickets',
  documentId: 'abc123',
  userId: 'user-uid',
  userName: 'Joel',
  description: 'Created ticket: Login bug',
  timestamp: serverTimestamp(),
  metadata: { previousValue?, newValue? }   // optional for sensitive changes
}
```

Store in an `activity` or `auditLog` collection. Display in admin settings or a dedicated activity page.

---

## Phase 4: UI Components & Layout

### 4.1 — Layout Structure

**Desktop:** Fixed sidebar (240-280px) + main content area
**Mobile:** Sidebar collapses to hamburger menu OR bottom navigation bar
**Header:** Page title, user info, theme toggle, optional action buttons

**Sidebar contents:**
- Logo/app name at top
- Navigation groups (collapsible sections)
- User profile card at bottom
- Role-based visibility — hide nav items the user can't access

### 4.2 — Core UI Components

Build these first (or verify they exist) before building any pages:

| Component | Purpose | Notes |
|-----------|---------|-------|
| **Modal** | All create/edit forms | Overlay + centered dialog, focus trap, close on escape |
| **Toast** | Success/error/warning/info feedback | Auto-dismiss (3-5s), queue-based, max 3-5 visible |
| **Button** | Primary, secondary, outline, danger, ghost | Consistent sizing, loading state |
| **Input/Textarea** | Form fields | With labels, validation errors, focus states |
| **Card** | Content containers | Header, body, optional footer |
| **Badge/Status** | Status indicators | Color-coded per status (active=green, pending=yellow, etc.) |
| **Table** | Data display | Sortable headers, search/filter, row actions |
| **Empty State** | No data placeholder | Icon + message + optional action button |
| **Loading** | Spinner and/or skeleton screens | Both global overlay and inline variants |
| **Pagination** | Page through large datasets | Cursor-based preferred (Firestore `startAfter`) |

### 4.3 — Theme System

- Use Tailwind `dark:` class variant for dark mode
- Toggle via `class="dark"` on `<html>` element
- Persist preference in localStorage (or Zustand persist)
- Detect system preference on first visit via `prefers-color-scheme`
- Define brand colours in `tailwind.config` or Tailwind v4 CSS theme
- Semantic colour tokens via Tailwind custom theme (e.g., `bg-surface`, `text-muted`, `border-subtle`)

### 4.4 — Navigation & Routing

- React Router with `<NavLink>` for active states
- Lazy-load non-critical pages with `React.lazy` + Suspense
- `lazyRetry` wrapper to handle stale chunks after deploy (retry once with cache bust)
- `<ProtectedRoute>` wrapper that checks auth + role before rendering
- `<AdminRoute>` wrapper for admin-only pages
- Redirect unauthenticated users to login

### 4.5 — CRUD UI Pattern

Every entity follows the same UI flow:

**List View:**
1. Page title + "Add New" button
2. Search bar + filter controls (status, type, date range, etc.)
3. Table or card grid showing items
4. Each row/card has: view, edit, delete actions
5. Pagination at bottom

**Create/Edit:**
1. Modal (preferred) or dedicated page
2. Form fields matching the entity schema
3. Client-side validation before submit
4. On save: validate → call service → show toast → close modal → list auto-updates
5. Loading state on save button

**Delete:**
1. Confirmation dialog ("Are you sure?")
2. On confirm: call service → show toast → list auto-updates

**View/Detail (if needed):**
- Separate page or expanded section
- All entity data displayed read-only
- Edit button to switch to edit mode
- Related data shown (e.g., a student's lessons, a project's tickets)

---

## Phase 5: Security

### 5.1 — Firestore Rules

**Start with this structure and customise per project:**

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }

    function isAdmin() {
      return isAuthenticated() &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }

    // Users collection
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow write: if isOwner(userId) || isAdmin();
    }

    // Activity/audit log
    match /activity/{docId} {
      allow read: if isAdmin();
      allow create: if isAuthenticated();
      allow update, delete: if false;  // immutable
    }

    // Per-entity rules (customise per project)
    match /{collection}/{docId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated();
      allow update: if isAuthenticated();
      allow delete: if isAdmin();
    }
  }
}
```

**Important:** The `get()` call in `isAdmin()` costs a read on EVERY rule evaluation. For high-traffic apps, migrate to Firebase Custom Claims instead (requires Cloud Functions).

### 5.2 — Client-Side Security

- **Sanitize user input** — React escapes by default, but avoid `dangerouslySetInnerHTML`. If rich HTML is needed, use a sanitizer library.
- **Validate with zod** on the client, and enforce the same rules in Firestore rules (server-side validation)
- **Never trust client-side role checks alone** — always enforce in Firestore rules
- **Session timeout** for admin portals (30-60 min inactivity → auto-logout)
- **Environment variables** — use Vite's `import.meta.env` for Firebase config, never hardcode secrets

### 5.3 — Storage Rules

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null
                   && request.resource.size < 10 * 1024 * 1024  // 10MB max
                   && request.resource.contentType.matches('image/.*|application/pdf');
    }
  }
}
```

Customise per project: restrict paths, file types, and sizes as needed.

---

## Phase 6: Common Features

These are features that appear in almost every portal. Build them in this order after the core CRUD is working.

### 6.1 — Search & Filtering

- Debounced search input (300ms delay)
- Filter by status, type, date range, assigned user
- Client-side filtering for small datasets (< 500 items)
- Firestore query constraints for large datasets (`where`, `orderBy`, `limit`, `startAfter`)
- Show active filters as removable chips
- "Clear all filters" button

### 6.2 — File Uploads

- Firebase Storage for all file uploads
- Compress images client-side before upload (target < 500KB for thumbnails)
- Show upload progress indicator
- Validate file type and size before upload
- Generate storage path: `{collection}/{docId}/{filename}`
- Store download URL in Firestore document

### 6.3 — Email Notifications

**Options (simplest to most capable):**
1. **EmailJS** — client-side, no backend needed, free tier available. Good for: form responses, simple alerts.
2. **Cloud Functions + SendGrid/Mailgun** — server-side, triggered by Firestore writes. Good for: transactional emails, automated notifications.
3. **mailto: fallback** — if email service not configured, open user's email client with pre-filled content.

Always check if the email service is configured before attempting to send. Fall back gracefully.

### 6.4 — PWA Support

For any portal that will be used on mobile devices:

1. Install `vite-plugin-pwa` and configure in `vite.config.ts`
2. Configure manifest (app name, icons, theme colour, standalone display)
3. Configure Workbox caching strategies:
   - Static assets (JS, CSS, images): cache-first
   - API/Firestore: network-first with fallback
   - HTML: stale-while-revalidate
   - Fonts: cache-first, long expiry
4. Enable Firestore offline persistence (`synchronizeTabs: true`)
5. Optional: IndexedDB-backed offline operation queue (sync on reconnect)
6. Custom install prompt (capture `beforeinstallprompt` event)
7. Auto-update service worker on new deploy

### 6.5 — Import/Export

Many portals need bulk data operations:

**Import:**
- CSV or Excel upload (use PapaParse for CSV, xlsx library for Excel)
- Preview data before importing
- Validate rows, show errors
- Batch write to Firestore (max 500 operations per batch)

**Export:**
- Generate CSV/Excel from current filtered view
- Include all visible columns
- Filename: `{entity}-export-{date}.csv`

### 6.6 — Dashboard / Home Page

The landing page after login. Should show:
- Key stats (counts, recent activity)
- Today's relevant items (today's events, overdue tasks, pending approvals)
- Quick actions (create new, view recent)
- Keep it scannable — cards/stats grid at top, recent activity list below

---

## Phase 7: Deployment

### 7.1 — Pre-Deploy Checklist

```
[ ] Firestore rules locked down (no open writes to sensitive collections)
[ ] Storage rules restrict file types and sizes
[ ] No hardcoded admin emails/UIDs in client code (use Firestore roles)
[ ] Firebase config uses environment variables (not hardcoded API keys in source)
[ ] Console.log statements removed or behind a debug flag
[ ] All forms have validation (client-side + Firestore rules)
[ ] Mobile layout tested (sidebar collapses, touch targets adequate)
[ ] Loading states present on all async operations
[ ] Error handling on all Firestore calls (try/catch + user-facing toast)
[ ] PWA manifest and service worker working (if applicable)
```

### 7.2 — Firebase Deploy

```bash
# Full deploy
firebase deploy

# Hosting only (frontend changes)
firebase deploy --only hosting

# Rules only
firebase deploy --only firestore:rules

# Functions only
firebase deploy --only functions
```

### 7.3 — Cache Headers

In `firebase.json`:
- HTML/JS/CSS: `"Cache-Control": "no-cache"` (always fetch latest)
- Images/fonts: `"Cache-Control": "public, max-age=86400"` (1 day)
- Service worker: `"Cache-Control": "no-cache, must-revalidate"`

---

## Quick Reference: Naming Conventions

| Thing | Convention | Example |
|-------|-----------|---------|
| Firestore collections | lowercase plural | `users`, `tickets`, `lessons` |
| Firestore document fields | camelCase | `firstName`, `createdAt`, `isActive` |
| Variables/functions | camelCase | `loadTickets()`, `currentUser` |
| Components | PascalCase | `TicketList`, `EditModal` |
| Hooks | use + PascalCase | `useAuth`, `useRealtimeSync` |
| Zustand stores | use + Name + Store | `useAuthStore`, `useTicketsStore` |
| CSS classes | Tailwind utilities | `flex items-center gap-4` |
| Types/Interfaces | PascalCase | `Ticket`, `UserProfile`, `TaskStatus` |
| Constants/Enums | UPPER_SNAKE or PascalCase | `ROLE_PERMISSIONS`, `TaskStatus` |
| Service files | entity name | `tickets.ts`, `users.ts`, `auth.ts` |
| Store files | entity + Store | `authStore.ts`, `ticketsStore.ts` |

---

## Quick Reference: Status Colour System

Use consistent colours across all portals:

| Status | Colour | Hex (dark theme) |
|--------|--------|-------------------|
| Active / Open / Live | Green | `#22c55e` |
| Pending / Waiting / In Progress | Yellow/Amber | `#f59e0b` |
| Completed / Resolved / Done | Blue | `#3b82f6` |
| Cancelled / Rejected / Archived | Grey | `#6b7280` |
| Error / Danger / Overdue | Red | `#ef4444` |
| Info / Default | Slate | `#94a3b8` |

---

## Anti-Patterns to Avoid

- **Don't use Redux.** Zustand is the standard. No exceptions.
- **Don't use CSS modules or styled-components.** Tailwind only.
- **Don't nest Firestore subcollections more than 2 levels deep.** It makes queries painful.
- **Don't skip the service layer.** Never call Firestore directly from components. Always go through `services/api/`.
- **Don't forget cleanup.** Every `onSnapshot` listener needs an unsubscribe function called on logout/unmount.
- **Don't render user-provided HTML without sanitization.** Use a whitelist-based sanitizer if HTML is needed.
- **Don't hardcode admin checks by email.** Use Firestore role field.
- **Don't batch more than 500 operations.** Firestore batch limit. Chunk larger imports.
- **Don't skip loading states.** Every async operation needs a spinner, skeleton, or disabled button.
- **Don't forget the empty state.** Every list/table needs a "no data yet" message with a clear action.
- **Don't put async logic in Zustand stores.** Stores hold state and simple actions. Async work lives in services.
- **Don't eagerly load all pages.** Use `React.lazy` for portal/admin pages. Only eagerly load the login and dashboard.

---

*Last updated: 2026-03-22*
*Built from analysis of: 48Hours, iSQROLL, MGSArtsPortal, grangetech, portal.sidequest.nz, Eastercamp*
