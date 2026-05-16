# Chill Air Client Portal - Design Spec

## Overview

A client portal for Chill Air Limited (HVAC company, Christchurch NZ) that serves two user types: the business owner (Greg Hicks, sole admin) and his clients. The portal is a separate application from the main brochure site (chillair.co.nz), deployed to `portal.chillair.co.nz` via Firebase Hosting.

**Phase 1 scope (this spec):** Core portal with job management, quotes, invoices, bookings, and branded auth. No payments, no Xero integration.

**Phase 2 (future):** Xero integration for invoicing/client sync, online payments via Xero's Stripe integration, client self-registration, email notifications on job status changes.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS v4 |
| State | Zustand (one store per domain) |
| Routing | React Router v7 |
| Forms | react-hook-form + zod |
| Icons | Lucide React |
| Dates | date-fns |
| Backend | Firebase (Auth, Firestore, Storage, Hosting) |
| Fonts | Inter (matches main site) |

## Architecture

- **Separate Git repository** — not in the ChillAir brochure site repo
- **Separate Firebase project** (e.g., `chillair-portal`)
- **Custom domain:** `portal.chillair.co.nz` on Firebase Hosting
- **No runtime connection** to the main brochure site

### Project Structure

```
chillair-portal/
  src/
    components/
      common/        (Button, Modal, Input, Card, Badge, Toast, EmptyState, Spinner)
      layout/        (Header, Sidebar, MobileNav, PageLayout)
      jobs/          (JobCard, JobList, JobForm, JobChecklist)
      clients/       (ClientCard, ClientList, ClientForm)
      quotes/        (QuoteCard, QuoteList, QuoteForm)
      invoices/      (InvoiceCard, InvoiceList, InvoiceForm)
      bookings/      (BookingForm, BookingList)
      calendar/      (CalendarView, EventCard)
      dashboard/     (StatCard, RecentActivity, UpcomingJobs)
    pages/
      auth/          (Login, ForgotPassword, ResetPassword)
      admin/         (Dashboard, Jobs, Clients, Quotes, Invoices, Calendar, Settings)
      client/        (Dashboard, MyJobs, MyQuotes, MyInvoices, BookService, Profile)
    services/
      firebase/      (config.ts, init)
      api/           (auth.ts, clients.ts, jobs.ts, quotes.ts, invoices.ts, bookings.ts, activity.ts)
    stores/          (authStore.ts, jobsStore.ts, clientsStore.ts, quotesStore.ts, invoicesStore.ts, uiStore.ts)
    hooks/           (useAuth.ts, useRealtimeSync.ts)
    types/           (user.ts, job.ts, client.ts, quote.ts, invoice.ts, booking.ts)
    utils/           (cn.ts, formatters.ts, constants.ts)
    routes/          (router.tsx — lazy loading, protected routes)
    App.tsx
  functions/
    src/
      index.ts       (createClientAccount, custom email action handler)
    package.json
  firebase.json
  firestore.rules
  firestore.indexes.json
  storage.rules
  .firebaserc
  CLAUDE.md
```

## User Roles

| Role | Who | Access |
|------|-----|--------|
| `admin` | Greg Hicks (sole user) | Full CRUD on all entities. Create/manage client accounts. View audit log. |
| `client` | Greg's customers | View own jobs, quotes, invoices. Accept/decline quotes. Request bookings. Update own profile. Reset password. |

No other admin accounts needed at this stage. Architecture supports adding more roles later without changes.

## Data Model (Firestore Collections)

### `users`
Auth profile linked to Firebase Auth UID.

| Field | Type | Notes |
|-------|------|-------|
| uid | string | Firebase Auth UID (document ID) |
| email | string | |
| name | string | |
| role | 'admin' \| 'client' | |
| phone | string | Optional |
| address | string | Optional |
| createdAt | timestamp | |
| updatedAt | timestamp | |

### `jobs`

| Field | Type | Notes |
|-------|------|-------|
| id | string | Auto-generated (document ID) |
| jobNumber | string | Human-readable (e.g., JOB-001) |
| clientId | string | Reference to users collection |
| clientName | string | Denormalised for display |
| service | string | e.g., 'Heat Pump Installation', 'Repair', 'Annual Service' |
| description | string | |
| status | 'pending' \| 'in_progress' \| 'completed' \| 'cancelled' | |
| progress | number | 0-100 |
| checklist | array | `[{ label: string, completed: boolean }]` |
| scheduledDate | timestamp | |
| completedDate | timestamp | Optional |
| notes | string | Admin-only notes |
| createdAt | timestamp | |
| updatedAt | timestamp | |
| createdBy | string | Admin UID |

### `quotes`

| Field | Type | Notes |
|-------|------|-------|
| id | string | Auto-generated |
| quoteNumber | string | Human-readable (e.g., QTE-001) |
| clientId | string | |
| clientName | string | Denormalised |
| description | string | |
| lineItems | array | `[{ description: string, quantity: number, unitPrice: number }]` |
| totalAmount | number | |
| status | 'draft' \| 'sent' \| 'accepted' \| 'declined' \| 'expired' | |
| expiryDate | timestamp | |
| acceptedDate | timestamp | Optional |
| createdAt | timestamp | |
| updatedAt | timestamp | |
| createdBy | string | Admin UID |

### `invoices`

| Field | Type | Notes |
|-------|------|-------|
| id | string | Auto-generated |
| invoiceNumber | string | Human-readable (e.g., INV-001) |
| clientId | string | |
| clientName | string | Denormalised |
| description | string | |
| lineItems | array | `[{ description: string, quantity: number, unitPrice: number }]` |
| totalAmount | number | |
| status | 'draft' \| 'sent' \| 'paid' \| 'overdue' | |
| dueDate | timestamp | |
| paidDate | timestamp | Optional |
| pdfUrl | string | Firebase Storage URL (optional) |
| createdAt | timestamp | |
| updatedAt | timestamp | |
| createdBy | string | Admin UID |

### `bookings`

| Field | Type | Notes |
|-------|------|-------|
| id | string | Auto-generated |
| clientId | string | |
| clientName | string | Denormalised |
| service | string | Requested service type |
| preferredDate | timestamp | |
| preferredTime | 'morning' \| 'afternoon' \| 'no_preference' | |
| message | string | Client's notes/description |
| status | 'pending' \| 'confirmed' \| 'cancelled' | |
| createdAt | timestamp | |
| updatedAt | timestamp | |
| createdBy | string | Client UID (self-created) or Admin UID |

### `counters`
Single document (`counters/main`) for atomic number generation.

| Field | Type | Notes |
|-------|------|-------|
| jobNumber | number | Last used number, incremented via transaction |
| quoteNumber | number | Last used number, incremented via transaction |
| invoiceNumber | number | Last used number, incremented via transaction |

Number generation uses a Firestore transaction: read the counter, increment it, format as `JOB-001`, `QTE-001`, `INV-001`. This ensures uniqueness even under concurrent writes.

### `activity`
Append-only audit log.

| Field | Type | Notes |
|-------|------|-------|
| id | string | Auto-generated |
| action | 'create' \| 'update' \| 'delete' | |
| collection | string | Which collection was affected |
| documentId | string | Which document |
| userId | string | Who did it |
| userName | string | Denormalised |
| description | string | Human-readable summary |
| timestamp | timestamp | |

## Pages & Navigation

### Admin Navigation (Sidebar)

1. **Dashboard** — stats cards (active jobs, pending quotes, overdue invoices, upcoming bookings), recent activity feed, upcoming jobs list
2. **Jobs** — filterable list, create/edit modal, status updates, checklist management
3. **Clients** — list with search, create/edit, view client history (their jobs, quotes, invoices)
4. **Quotes** — create with line items, send to client, track acceptance
5. **Invoices** — create with line items, upload PDF, track payment status
6. **Calendar** — month view showing scheduled jobs and bookings
7. **Settings** — admin profile

### Client Navigation (Sidebar on desktop, bottom nav on mobile)

1. **Dashboard** — my active jobs summary, pending quotes, outstanding invoices
2. **My Jobs** — list of own jobs with status, progress bar, checklist (read-only)
3. **My Quotes** — view quotes, accept or decline
4. **My Invoices** — view invoices, download PDF
5. **Book a Service** — form to request a booking
6. **Profile** — update name, phone, address, change password

## Design System

### Colour Palette

Derived from the main Chill Air website to maintain brand consistency.

**Light Mode (default):**
| Token | Value | Usage |
|-------|-------|-------|
| primary | `#0B4D6E` | Buttons, active nav, links |
| primary-light | `#1A6B8F` | Hover states |
| primary-dark | `#063A54` | Pressed states |
| secondary | `#00B4D8` | Accents, highlights |
| accent | `#48CAE4` | Badges, progress bars |
| gold | `#D4A853` | Premium/important indicators |
| surface | `#FFFFFF` | Card backgrounds |
| background | `#F8FAFC` | Page background |
| text | `#334155` | Body text |
| text-muted | `#64748B` | Secondary text |
| border | `#E2E8F0` | Borders, dividers |

**Dark Mode:**
| Token | Value | Usage |
|-------|-------|-------|
| primary | `#00B4D8` | Buttons, active nav, links |
| primary-light | `#48CAE4` | Hover states |
| secondary | `#00d4ff` | Accents |
| surface | `#152742` | Card backgrounds |
| background | `#0f1d32` | Page background |
| text | `#e8f4f8` | Body text |
| text-muted | `#9cb5c9` | Secondary text |
| border | `#264166` | Borders |

Dark mode values drawn from the existing portal prototype's "Dark Ocean" theme.

### Typography
- Font: Inter (Google Fonts) — matches the main site
- Body: 14-16px
- Headings: 18-32px, font-weight 600-700

### Layout
- **Desktop:** Fixed sidebar (260px) + scrollable main content
- **Mobile:** Sidebar collapses to hamburger menu (admin) or bottom navigation bar (client)
- **Header:** Page title, user name/initials avatar, theme toggle, logout

### Accessibility
- WCAG AA contrast ratios on all text
- 44px minimum touch targets on mobile
- Proper heading hierarchy (no skipped levels)
- Focus-visible outlines on all interactive elements
- Alt text on all images
- Semantic HTML (nav, main, aside, button vs div)
- Skip-to-content link
- `aria-label` on icon-only buttons

### Status Colours
Consistent across all entities:

| Status | Light Mode | Dark Mode |
|--------|-----------|-----------|
| Active / In Progress | `#059669` (green-600) | `#22c55e` |
| Pending / Waiting | `#D97706` (amber-600) | `#f59e0b` |
| Completed / Paid | `#2563EB` (blue-600) | `#3b82f6` |
| Cancelled / Expired | `#6B7280` (gray-500) | `#6b7280` |
| Overdue / Declined | `#DC2626` (red-600) | `#ef4444` |
| Draft | `#8B5CF6` (violet-500) | `#a78bfa` |

## Authentication

### Flow
1. Greg creates a client account via admin panel (name, email)
2. Cloud Function creates Firebase Auth user + Firestore profile
3. Cloud Function returns a password reset link; in Phase 1, Greg shares this with the client manually (Phase 2 will add automated branded welcome emails via a mail service)
4. Client sets their password and logs in
5. Clients can reset their own password at any time

### Branded Auth Emails
- Custom email templates in Firebase Console (password reset, email verification)
- Chill Air logo, brand colours, professional layout
- Custom email action handler hosted on `portal.chillair.co.nz/__/auth/action` to avoid Firebase URLs
- All emails sent from a branded address (e.g., `portal@chillair.co.nz` or configured via Firebase)

### Security
- Firebase Auth (email/password)
- Firestore rules enforce role-based access (see Security section)
- Clients cannot escalate their own role
- Session timeout: 60 minutes of inactivity triggers auto-logout (admin portal)
- On logout: clear all Zustand stores, unsubscribe all Firestore listeners, clear localStorage/sessionStorage, redirect to login

## Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

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

    // Default deny
    match /{document=**} {
      allow read, write: if false;
    }

    // Users
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow create: if isAdmin();
      // Clients can only update their own profile — allowlist of safe fields
      allow update: if isOwner(userId)
                    && request.resource.data.diff(resource.data).affectedKeys()
                       .hasOnly(['name', 'phone', 'address', 'updatedAt']);
      allow update: if isAdmin();
      allow delete: if isAdmin();
    }

    // Counters — admin only
    match /counters/{docId} {
      allow read: if isAdmin();
      allow write: if isAdmin();
    }

    // Jobs
    match /jobs/{jobId} {
      allow read: if isAdmin() || (isAuthenticated() && resource.data.clientId == request.auth.uid);
      allow create, update, delete: if isAdmin();
    }

    // Quotes
    match /quotes/{quoteId} {
      allow read: if isAdmin() || (isAuthenticated() && resource.data.clientId == request.auth.uid);
      allow create, delete: if isAdmin();
      allow update: if isAdmin();
      // Clients can only update status (accept/decline)
      allow update: if isAuthenticated()
                    && resource.data.clientId == request.auth.uid
                    && request.resource.data.diff(resource.data).affectedKeys().hasOnly(['status', 'acceptedDate', 'updatedAt'])
                    && request.resource.data.status in ['accepted', 'declined'];
    }

    // Invoices
    match /invoices/{invoiceId} {
      allow read: if isAdmin() || (isAuthenticated() && resource.data.clientId == request.auth.uid);
      allow create, update, delete: if isAdmin();
    }

    // Bookings
    match /bookings/{bookingId} {
      allow read: if isAdmin() || (isAuthenticated() && resource.data.clientId == request.auth.uid);
      // Clients can only create bookings for themselves, with required fields
      allow create: if isAuthenticated()
                    && request.resource.data.clientId == request.auth.uid
                    && request.resource.data.keys().hasAll(['clientId', 'clientName', 'service', 'preferredDate', 'preferredTime', 'status', 'createdAt'])
                    && request.resource.data.status == 'pending';
      allow update, delete: if isAdmin();
    }

    // Activity log — append only, admin read, userId must match caller
    match /activity/{docId} {
      allow read: if isAdmin();
      allow create: if isAuthenticated()
                    && request.resource.data.userId == request.auth.uid;
      allow update, delete: if false;
    }
  }
}
```

## Cloud Functions

### `createClientAccount`
Callable function, admin-only. Creates a Firebase Auth user and Firestore profile for a new client.

**Input:** `{ email: string, name: string, phone?: string, address?: string }`
**Input validation:** zod schema enforces email format, name min 1 / max 100, phone and address optional strings max 200.
**Process:**
1. Verify caller is admin
2. Validate input with zod (reject with `invalid-argument` on failure)
3. Create Firebase Auth user with a temporary random password (32-char alphanumeric)
3. Create Firestore user document with role: 'client'
4. Send password reset email (branded) so client can set their own password
5. Log to activity collection

### Custom Email Action Handler
Hosted page at `portal.chillair.co.nz/__/auth/action` that handles:
- Password reset confirmation
- Email verification
- Branded with Chill Air logo and colours
- No Firebase URLs visible to the end user

## Storage Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {

    // Default deny
    match /{allPaths=**} {
      allow read, write: if false;
    }

    // Invoice PDFs — authenticated users can upload and read
    // Phase 1: uses request.auth != null (no custom claims set yet).
    // Phase 2: tighten to custom claims check when claims are set via Cloud Functions.
    match /invoices/{invoiceId}/{fileName} {
      allow read: if request.auth != null;
      allow write: if request.auth != null
                   && request.resource.size < 10 * 1024 * 1024
                   && request.resource.contentType == 'application/pdf';
    }

    // Branding assets (logo for emails, etc.) — public read, authenticated write
    match /branding/{fileName} {
      allow read: if true;
      allow write: if request.auth != null
                   && request.resource.size < 5 * 1024 * 1024
                   && request.resource.contentType.matches('image/(png|jpeg|svg\\+xml|webp)');
    }
  }
}
```

## Build Configuration

- `build.sourcemap = false` in `vite.config.ts` for production builds
- Console.log statements removed or behind a `import.meta.env.DEV` guard

## Offline & Error Handling

Phase 1 does not require offline support or PWA. The portal assumes an internet connection. Standard error handling: try/catch on all Firestore operations with user-facing toast notifications on failure. No Firestore offline persistence enabled in Phase 1. Phase 2 may add PWA/offline support if Greg needs to update jobs on-site with poor connectivity.

## Pagination

Phase 1 does not implement pagination. With a single admin and a small client base, all collections will be well under 100 documents. If a collection exceeds 50 items, client-side filtering is used. Cursor-based pagination (Firestore `startAfter`) can be added later without structural changes.

## Session Timeout

60 minutes of inactivity triggers auto-logout for both admin and client sessions. Implemented via a last-activity timestamp checked on interaction events.

## Theme Detection

Light mode is the default. On first visit, detect `prefers-color-scheme: dark` and use dark mode if the system preference is set. Persist the user's choice in localStorage thereafter.

## Quote Acceptance Flow

When a client accepts a quote, the status updates to `accepted` with a timestamp. This does not automatically create a job — Greg reviews accepted quotes and manually creates jobs from them. Phase 2 may add email notifications to alert Greg when a quote is accepted.

## Calendar

Simple month-view grid built with date-fns (no external calendar library). Shows scheduled jobs and confirmed bookings as colour-coded dots/entries. No drag-and-drop in Phase 1. Clicking an entry navigates to the job or booking detail.

## Real-Time Sync

- `useRealtimeSync` hook in App root subscribes to relevant collections based on user role
- Admin: subscribes to all jobs, clients, quotes, invoices, bookings
- Client: subscribes to own jobs, quotes, invoices (filtered by `clientId == uid`)
- Changes pushed into Zustand stores automatically
- All listeners unsubscribed on logout

## Phase 2 Readiness

The architecture is designed to accommodate Phase 2 without structural changes:

- **Xero integration:** Add a `services/api/xero.ts` service. Sync clients and invoices. Cloud Functions handle OAuth token refresh.
- **Online payments:** Xero's built-in Stripe integration or direct Stripe Checkout via Cloud Function. Invoice status updates via webhook.
- **Client self-registration:** Add a registration page, modify Firestore rules to allow self-creation of user documents with `role: 'client'`.
- **Email notifications:** Cloud Functions triggered by Firestore writes (job status change, new quote, etc.).

## Out of Scope (Phase 1)

- Payment processing (Stripe/Xero)
- Xero integration
- Client self-registration
- Email notifications on status changes
- File attachments on jobs (beyond invoice PDFs)
- Multi-admin support
- Reporting/analytics
- SMS notifications
