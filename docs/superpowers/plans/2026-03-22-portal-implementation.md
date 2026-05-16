# Chill Air Client Portal — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a client portal for Chill Air Limited — admin (Greg) manages jobs, clients, quotes, invoices; clients view their own data, accept/decline quotes, and book services. Deployed to `portal.chillair.co.nz` via Firebase Hosting.

**Architecture:** React SPA with Firebase backend (Auth, Firestore, Storage, Hosting). Zustand for state, real-time Firestore listeners for live updates. Role-based access: single admin + multiple clients. Separate git repo at `D:\Sidequest Digital\Dev Projects\Clients\ChillAir\portal\`.

**Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS v4, Zustand, React Router v7, react-hook-form, zod, date-fns, Lucide React, Firebase SDK

**Spec:** `docs/superpowers/specs/2026-03-22-portal-design.md`

---

## File Structure

```
portal/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Textarea.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Toast.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   ├── Spinner.tsx
│   │   │   ├── ConfirmDialog.tsx
│   │   │   └── StatusBadge.tsx
│   │   ├── layout/
│   │   │   ├── AppLayout.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── MobileNav.tsx
│   │   │   └── PageLayout.tsx
│   │   ├── jobs/
│   │   │   ├── JobCard.tsx
│   │   │   ├── JobList.tsx
│   │   │   ├── JobForm.tsx
│   │   │   └── JobChecklist.tsx
│   │   ├── clients/
│   │   │   ├── ClientCard.tsx
│   │   │   ├── ClientList.tsx
│   │   │   └── ClientForm.tsx
│   │   ├── quotes/
│   │   │   ├── QuoteCard.tsx
│   │   │   ├── QuoteList.tsx
│   │   │   └── QuoteForm.tsx
│   │   ├── invoices/
│   │   │   ├── InvoiceCard.tsx
│   │   │   ├── InvoiceList.tsx
│   │   │   └── InvoiceForm.tsx
│   │   ├── bookings/
│   │   │   ├── BookingCard.tsx
│   │   │   ├── BookingList.tsx
│   │   │   └── BookingForm.tsx
│   │   ├── calendar/
│   │   │   └── CalendarView.tsx
│   │   └── dashboard/
│   │       ├── StatCard.tsx
│   │       ├── RecentActivity.tsx
│   │       └── UpcomingJobs.tsx
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── LoginPage.tsx
│   │   │   └── ForgotPasswordPage.tsx
│   │   ├── admin/
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── AdminJobs.tsx
│   │   │   ├── AdminClients.tsx
│   │   │   ├── AdminClientDetail.tsx
│   │   │   ├── AdminQuotes.tsx
│   │   │   ├── AdminInvoices.tsx
│   │   │   ├── AdminCalendar.tsx
│   │   │   └── AdminSettings.tsx
│   │   └── client/
│   │       ├── ClientDashboard.tsx
│   │       ├── ClientJobs.tsx
│   │       ├── ClientQuotes.tsx
│   │       ├── ClientInvoices.tsx
│   │       ├── ClientBookService.tsx
│   │       └── ClientProfile.tsx
│   ├── services/
│   │   ├── firebase/
│   │   │   └── config.ts
│   │   └── api/
│   │       ├── auth.ts
│   │       ├── clients.ts
│   │       ├── jobs.ts
│   │       ├── quotes.ts
│   │       ├── invoices.ts
│   │       ├── bookings.ts
│   │       └── activity.ts
│   ├── stores/
│   │   ├── authStore.ts
│   │   ├── jobsStore.ts
│   │   ├── clientsStore.ts
│   │   ├── quotesStore.ts
│   │   ├── invoicesStore.ts
│   │   ├── bookingsStore.ts
│   │   └── uiStore.ts
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useRealtimeSync.ts
│   │   └── useInactivityTimeout.ts
│   ├── types/
│   │   ├── user.ts
│   │   ├── job.ts
│   │   ├── client.ts
│   │   ├── quote.ts
│   │   ├── invoice.ts
│   │   ├── booking.ts
│   │   └── activity.ts
│   ├── utils/
│   │   ├── cn.ts
│   │   ├── formatters.ts
│   │   └── constants.ts
│   ├── routes/
│   │   └── router.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── functions/
│   ├── src/
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
├── public/
│   └── favicon.ico
├── firebase.json
├── firestore.rules
├── firestore.indexes.json
├── storage.rules
├── .firebaserc
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── CLAUDE.md
```

---

## Task 1: Parent Repo Gitignore + Portal Project Scaffold

**Files:**
- Modify: `D:\Sidequest Digital\Dev Projects\Clients\ChillAir\.gitignore`
- Create: `portal/` directory with Vite + React + TS scaffold

- [ ] **Step 1: Add `portal/` to parent repo's `.gitignore`**

Append to `D:\Sidequest Digital\Dev Projects\Clients\ChillAir\.gitignore`:
```
# Portal is a separate project with its own git repo
portal/
```

- [ ] **Step 2: Scaffold the Vite project**

```bash
cd "D:\Sidequest Digital\Dev Projects\Clients\ChillAir"
npm create vite@latest portal -- --template react-ts
```

- [ ] **Step 3: Initialise git in the portal directory**

```bash
cd "D:\Sidequest Digital\Dev Projects\Clients\ChillAir\portal"
git init
```

- [ ] **Step 4: Install core dependencies**

```bash
cd "D:\Sidequest Digital\Dev Projects\Clients\ChillAir\portal"
npm install react-router-dom zustand react-hook-form @hookform/resolvers zod date-fns lucide-react firebase clsx tailwind-merge
```

- [ ] **Step 5: Install dev dependencies**

```bash
cd "D:\Sidequest Digital\Dev Projects\Clients\ChillAir\portal"
npm install -D tailwindcss @tailwindcss/vite
```

- [ ] **Step 6: Verify build passes**

```bash
cd "D:\Sidequest Digital\Dev Projects\Clients\ChillAir\portal"
npm run build
```
Expected: Build succeeds with zero errors.

- [ ] **Step 7: Commit scaffold**

```bash
cd "D:\Sidequest Digital\Dev Projects\Clients\ChillAir\portal"
git add -A
git commit -m "chore: scaffold Vite + React + TS project with dependencies"
```

---

## Task 2: Tailwind + Theme Configuration

**Files:**
- Create: `src/index.css`
- Modify: `vite.config.ts`
- Create: `src/utils/cn.ts`

- [ ] **Step 1: Configure Vite with Tailwind plugin**

`vite.config.ts`:
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    sourcemap: false,
  },
})
```

- [ ] **Step 2: Set up Tailwind CSS with brand theme**

Replace contents of `src/index.css`:
```css
@import "tailwindcss";

@theme {
  /* Brand colours — light mode */
  --color-primary: #0B4D6E;
  --color-primary-light: #1A6B8F;
  --color-primary-dark: #063A54;
  --color-secondary: #00B4D8;
  --color-accent: #48CAE4;
  --color-gold: #D4A853;

  /* Status colours */
  --color-status-active: #059669;
  --color-status-pending: #D97706;
  --color-status-completed: #2563EB;
  --color-status-cancelled: #6B7280;
  --color-status-overdue: #DC2626;
  --color-status-draft: #8B5CF6;

  /* Surface colours */
  --color-surface: #FFFFFF;
  --color-surface-elevated: #F8FAFC;
  --color-background: #F1F5F9;
  --color-border: #E2E8F0;
  --color-border-light: #F1F5F9;

  /* Text */
  --color-text-primary: #334155;
  --color-text-secondary: #64748B;
  --color-text-muted: #94A3B8;
  --color-text-inverse: #FFFFFF;

  /* Sidebar */
  --color-sidebar-bg: #0B4D6E;
  --color-sidebar-text: #E2E8F0;
  --color-sidebar-hover: #1A6B8F;
  --color-sidebar-active: #00B4D8;

  /* Font */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* Dark mode overrides */
.dark {
  --color-primary: #00B4D8;
  --color-primary-light: #48CAE4;
  --color-primary-dark: #0099B8;
  --color-secondary: #00d4ff;
  --color-accent: #48CAE4;

  --color-status-active: #22c55e;
  --color-status-pending: #f59e0b;
  --color-status-completed: #3b82f6;
  --color-status-cancelled: #6b7280;
  --color-status-overdue: #ef4444;
  --color-status-draft: #a78bfa;

  --color-surface: #152742;
  --color-surface-elevated: #1a3250;
  --color-background: #0f1d32;
  --color-border: #264166;
  --color-border-light: #1a3250;

  --color-text-primary: #e8f4f8;
  --color-text-secondary: #9cb5c9;
  --color-text-muted: #6a8da6;
  --color-text-inverse: #0f1d32;

  --color-sidebar-bg: #0a1628;
  --color-sidebar-text: #9cb5c9;
  --color-sidebar-hover: #152742;
  --color-sidebar-active: #00B4D8;
}

@layer base {
  body {
    @apply bg-background text-text-primary font-sans antialiased;
  }
}
```

- [ ] **Step 3: Create `cn` utility**

`src/utils/cn.ts`:
```typescript
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

- [ ] **Step 4: Update `index.html` with Inter font**

Add to `<head>` in `index.html`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

- [ ] **Step 5: Verify build passes**

```bash
npm run build
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: configure Tailwind v4 with Chill Air brand theme and dark mode"
```

---

## Task 3: Firebase Configuration

**Files:**
- Create: `src/services/firebase/config.ts`
- Create: `.env.example`
- Create: `firebase.json`
- Create: `.firebaserc`
- Create: `firestore.rules`
- Create: `firestore.indexes.json`
- Create: `storage.rules`

- [ ] **Step 1: Create `.env.example`**

`.env.example`:
```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

- [ ] **Step 2: Create Firebase config service**

`src/services/firebase/config.ts`:
```typescript
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getFunctions } from 'firebase/functions'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export const functions = getFunctions(app)
export default app
```

- [ ] **Step 3: Create `firebase.json`**

```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      { "source": "**", "destination": "/index.html" }
    ],
    "headers": [
      {
        "source": "**/*.@(js|css)",
        "headers": [{ "key": "Cache-Control", "value": "no-cache" }]
      },
      {
        "source": "**/*.@(jpg|jpeg|gif|png|svg|webp|ico|woff2)",
        "headers": [{ "key": "Cache-Control", "value": "public, max-age=86400" }]
      }
    ]
  },
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  },
  "storage": {
    "rules": "storage.rules"
  },
  "functions": {
    "source": "functions"
  }
}
```

- [ ] **Step 4: Create `.firebaserc`**

```json
{
  "projects": {
    "default": "chillair-portal"
  }
}
```

- [ ] **Step 5: Create Firestore rules**

`firestore.rules` — copy the full rules from the spec (Section: Firestore Security Rules). Includes: default deny, users (allowlist update), counters (admin only), jobs, quotes (client accept/decline), invoices, bookings (validated create), activity (userId match).

- [ ] **Step 6: Create `firestore.indexes.json`**

```json
{
  "indexes": [
    {
      "collectionGroup": "jobs",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "clientId", "order": "ASCENDING" },
        { "fieldPath": "createdAt", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "quotes",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "clientId", "order": "ASCENDING" },
        { "fieldPath": "createdAt", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "invoices",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "clientId", "order": "ASCENDING" },
        { "fieldPath": "createdAt", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "bookings",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "clientId", "order": "ASCENDING" },
        { "fieldPath": "createdAt", "order": "DESCENDING" }
      ]
    }
  ],
  "fieldOverrides": []
}
```

- [ ] **Step 7: Create Storage rules**

`storage.rules` — **NOTE:** The spec's storage rules reference `request.auth.token.role` (custom claims), but custom claims are not set in Phase 1. Use `request.auth != null` for write access instead. In Phase 1, only Greg (the sole authenticated admin) uploads files, so this is acceptable. Phase 2 should add custom claims via Cloud Functions for tighter control.

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if false;
    }
    match /invoices/{invoiceId}/{fileName} {
      allow read: if request.auth != null;
      allow write: if request.auth != null
                   && request.resource.size < 10 * 1024 * 1024
                   && request.resource.contentType == 'application/pdf';
    }
    match /branding/{fileName} {
      allow read: if true;
      allow write: if request.auth != null
                   && request.resource.size < 5 * 1024 * 1024
                   && request.resource.contentType.matches('image/(png|jpeg|svg\\+xml|webp)');
    }
  }
}
```

- [ ] **Step 8: Update `.gitignore`**

Add to the portal `.gitignore`:
```
.env
.env.local
```

- [ ] **Step 9: Verify build passes**

```bash
npm run build
```

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: add Firebase config, Firestore rules, Storage rules, and indexes"
```

---

## Task 4: TypeScript Types + Zod Schemas

**Files:**
- Create: `src/types/user.ts`
- Create: `src/types/job.ts`
- Create: `src/types/client.ts` (alias — clients are users with role 'client')
- Create: `src/types/quote.ts`
- Create: `src/types/invoice.ts`
- Create: `src/types/booking.ts`
- Create: `src/types/activity.ts`

- [ ] **Step 1: Create user types**

`src/types/user.ts`:
```typescript
import { z } from 'zod'
import { Timestamp } from 'firebase/firestore'

export const UserRole = {
  ADMIN: 'admin',
  CLIENT: 'client',
} as const

export type UserRole = (typeof UserRole)[keyof typeof UserRole]

export interface UserProfile {
  uid: string
  email: string
  name: string
  role: UserRole
  phone?: string
  address?: string
  createdAt: Timestamp
  updatedAt: Timestamp
}

export const updateProfileSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  phone: z.string().max(20).optional().or(z.literal('')),
  address: z.string().max(200).optional().or(z.literal('')),
})

export type UpdateProfileData = z.infer<typeof updateProfileSchema>
```

- [ ] **Step 2: Create job types**

`src/types/job.ts`:
```typescript
import { z } from 'zod'
import { Timestamp } from 'firebase/firestore'

export const JobStatus = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const

export type JobStatus = (typeof JobStatus)[keyof typeof JobStatus]

export interface ChecklistItem {
  label: string
  completed: boolean
}

export interface Job {
  id: string
  jobNumber: string
  clientId: string
  clientName: string
  service: string
  description: string
  status: JobStatus
  progress: number
  checklist: ChecklistItem[]
  scheduledDate: Timestamp
  completedDate?: Timestamp
  notes?: string
  createdAt: Timestamp
  updatedAt: Timestamp
  createdBy: string
}

export const jobSchema = z.object({
  clientId: z.string().min(1, 'Client is required'),
  service: z.string().min(1, 'Service is required'),
  description: z.string().min(1, 'Description is required').max(2000),
  status: z.enum(['pending', 'in_progress', 'completed', 'cancelled']),
  scheduledDate: z.string().min(1, 'Scheduled date is required'),
  notes: z.string().max(2000).optional().or(z.literal('')),
  checklist: z.array(z.object({
    label: z.string().min(1),
    completed: z.boolean(),
  })).optional(),
})

export type JobFormData = z.infer<typeof jobSchema>
```

- [ ] **Step 3: Create quote types**

`src/types/quote.ts`:
```typescript
import { z } from 'zod'
import { Timestamp } from 'firebase/firestore'

export const QuoteStatus = {
  DRAFT: 'draft',
  SENT: 'sent',
  ACCEPTED: 'accepted',
  DECLINED: 'declined',
  EXPIRED: 'expired',
} as const

export type QuoteStatus = (typeof QuoteStatus)[keyof typeof QuoteStatus]

export interface LineItem {
  description: string
  quantity: number
  unitPrice: number
}

export interface Quote {
  id: string
  quoteNumber: string
  clientId: string
  clientName: string
  description: string
  lineItems: LineItem[]
  totalAmount: number
  status: QuoteStatus
  expiryDate: Timestamp
  acceptedDate?: Timestamp
  createdAt: Timestamp
  updatedAt: Timestamp
  createdBy: string
}

const lineItemSchema = z.object({
  description: z.string().min(1, 'Description is required'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  unitPrice: z.number().min(0, 'Price must be positive'),
})

export const quoteSchema = z.object({
  clientId: z.string().min(1, 'Client is required'),
  description: z.string().min(1, 'Description is required').max(2000),
  lineItems: z.array(lineItemSchema).min(1, 'At least one line item is required'),
  expiryDate: z.string().min(1, 'Expiry date is required'),
})

export type QuoteFormData = z.infer<typeof quoteSchema>
```

- [ ] **Step 4: Create invoice types**

`src/types/invoice.ts`:
```typescript
import { z } from 'zod'
import { Timestamp } from 'firebase/firestore'

export const InvoiceStatus = {
  DRAFT: 'draft',
  SENT: 'sent',
  PAID: 'paid',
  OVERDUE: 'overdue',
} as const

export type InvoiceStatus = (typeof InvoiceStatus)[keyof typeof InvoiceStatus]

export interface Invoice {
  id: string
  invoiceNumber: string
  clientId: string
  clientName: string
  description: string
  lineItems: { description: string; quantity: number; unitPrice: number }[]
  totalAmount: number
  status: InvoiceStatus
  dueDate: Timestamp
  paidDate?: Timestamp
  pdfUrl?: string
  createdAt: Timestamp
  updatedAt: Timestamp
  createdBy: string
}

const invoiceLineItemSchema = z.object({
  description: z.string().min(1, 'Description is required'),
  quantity: z.number().min(1),
  unitPrice: z.number().min(0),
})

export const invoiceSchema = z.object({
  clientId: z.string().min(1, 'Client is required'),
  description: z.string().min(1, 'Description is required').max(2000),
  lineItems: z.array(invoiceLineItemSchema).min(1, 'At least one line item is required'),
  dueDate: z.string().min(1, 'Due date is required'),
})

export type InvoiceFormData = z.infer<typeof invoiceSchema>
```

- [ ] **Step 5: Create booking types**

`src/types/booking.ts`:
```typescript
import { z } from 'zod'
import { Timestamp } from 'firebase/firestore'

export const BookingStatus = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
} as const

export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus]

export const PreferredTime = {
  MORNING: 'morning',
  AFTERNOON: 'afternoon',
  NO_PREFERENCE: 'no_preference',
} as const

export type PreferredTime = (typeof PreferredTime)[keyof typeof PreferredTime]

export interface Booking {
  id: string
  clientId: string
  clientName: string
  service: string
  preferredDate: Timestamp
  preferredTime: PreferredTime
  message: string
  status: BookingStatus
  createdAt: Timestamp
  updatedAt: Timestamp
  createdBy: string
}

export const bookingSchema = z.object({
  service: z.string().min(1, 'Service is required'),
  preferredDate: z.string().min(1, 'Preferred date is required'),
  preferredTime: z.enum(['morning', 'afternoon', 'no_preference']),
  message: z.string().max(1000).optional().or(z.literal('')),
})

export type BookingFormData = z.infer<typeof bookingSchema>
```

- [ ] **Step 6: Create activity types**

`src/types/activity.ts`:
```typescript
import { Timestamp } from 'firebase/firestore'

export interface ActivityEntry {
  id: string
  action: 'create' | 'update' | 'delete'
  collection: string
  documentId: string
  userId: string
  userName: string
  description: string
  timestamp: Timestamp
}
```

- [ ] **Step 7: Create client type alias**

`src/types/client.ts`:
```typescript
// Clients are users with role 'client'. This re-export provides a semantic alias
// so components and stores can import `Client` instead of `UserProfile`.
export type { UserProfile as Client } from './user'
```

- [ ] **Step 8: Verify build passes**

```bash
npm run build
```

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: add TypeScript types and zod validation schemas for all entities"
```

---

## Task 5: Constants + Utility Functions

**Files:**
- Create: `src/utils/constants.ts`
- Create: `src/utils/formatters.ts`

- [ ] **Step 1: Create constants**

`src/utils/constants.ts`:
```typescript
export const SERVICE_TYPES = [
  'Heat Pump Installation',
  'Heat Pump Repair',
  'Annual Service',
  'Maintenance',
  'Ventilation System',
  'Air Conditioning',
  'Hot Water Heat Pump',
  'Pool Heat Pump',
  'Other',
] as const

export const ADMIN_NAV_ITEMS = [
  { label: 'Dashboard', path: '/admin', icon: 'LayoutDashboard' },
  { label: 'Jobs', path: '/admin/jobs', icon: 'Wrench' },
  { label: 'Clients', path: '/admin/clients', icon: 'Users' },
  { label: 'Quotes', path: '/admin/quotes', icon: 'FileText' },
  { label: 'Invoices', path: '/admin/invoices', icon: 'Receipt' },
  { label: 'Calendar', path: '/admin/calendar', icon: 'Calendar' },
  { label: 'Settings', path: '/admin/settings', icon: 'Settings' },
] as const

export const CLIENT_NAV_ITEMS = [
  { label: 'Dashboard', path: '/client', icon: 'LayoutDashboard' },
  { label: 'My Jobs', path: '/client/jobs', icon: 'Wrench' },
  { label: 'My Quotes', path: '/client/quotes', icon: 'FileText' },
  { label: 'My Invoices', path: '/client/invoices', icon: 'Receipt' },
  { label: 'Book a Service', path: '/client/book', icon: 'CalendarPlus' },
  { label: 'Profile', path: '/client/profile', icon: 'User' },
] as const

export const INACTIVITY_TIMEOUT_MS = 60 * 60 * 1000 // 60 minutes
```

- [ ] **Step 2: Create formatters**

`src/utils/formatters.ts`:
```typescript
import { Timestamp } from 'firebase/firestore'
import { format, formatDistanceToNow, isAfter } from 'date-fns'

export function formatDate(timestamp: Timestamp | undefined): string {
  if (!timestamp) return '—'
  return format(timestamp.toDate(), 'dd MMM yyyy')
}

export function formatDateTime(timestamp: Timestamp | undefined): string {
  if (!timestamp) return '—'
  return format(timestamp.toDate(), 'dd MMM yyyy, h:mm a')
}

export function formatRelativeTime(timestamp: Timestamp | undefined): string {
  if (!timestamp) return '—'
  return formatDistanceToNow(timestamp.toDate(), { addSuffix: true })
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-NZ', {
    style: 'currency',
    currency: 'NZD',
  }).format(amount)
}

export function isOverdue(dueDate: Timestamp): boolean {
  return isAfter(new Date(), dueDate.toDate())
}

export function formatJobNumber(num: number): string {
  return `JOB-${String(num).padStart(3, '0')}`
}

export function formatQuoteNumber(num: number): string {
  return `QTE-${String(num).padStart(3, '0')}`
}

export function formatInvoiceNumber(num: number): string {
  return `INV-${String(num).padStart(3, '0')}`
}
```

- [ ] **Step 3: Verify build passes**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add constants and formatter utilities"
```

---

## Task 6: Zustand Stores

**Files:**
- Create: `src/stores/authStore.ts`
- Create: `src/stores/jobsStore.ts`
- Create: `src/stores/clientsStore.ts`
- Create: `src/stores/quotesStore.ts`
- Create: `src/stores/invoicesStore.ts`
- Create: `src/stores/bookingsStore.ts`
- Create: `src/stores/uiStore.ts`

- [ ] **Step 1: Create auth store**

`src/stores/authStore.ts`:
```typescript
import { create } from 'zustand'
import type { UserProfile } from '../types/user'

interface AuthState {
  user: UserProfile | null
  loading: boolean
  setUser: (user: UserProfile | null) => void
  setLoading: (loading: boolean) => void
  reset: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user, loading: false }),
  setLoading: (loading) => set({ loading }),
  reset: () => set({ user: null, loading: false }),
}))
```

- [ ] **Step 2: Create entity stores**

Each entity store follows the same pattern. Create all six files:

`src/stores/jobsStore.ts`:
```typescript
import { create } from 'zustand'
import type { Job } from '../types/job'

interface JobsState {
  jobs: Job[]
  loading: boolean
  setJobs: (jobs: Job[]) => void
  addJob: (job: Job) => void
  updateJob: (id: string, updates: Partial<Job>) => void
  removeJob: (id: string) => void
  setLoading: (loading: boolean) => void
  clearAll: () => void
}

export const useJobsStore = create<JobsState>((set) => ({
  jobs: [],
  loading: true,
  setJobs: (jobs) => set({ jobs, loading: false }),
  addJob: (job) => set((s) => ({ jobs: [...s.jobs, job] })),
  updateJob: (id, updates) =>
    set((s) => ({
      jobs: s.jobs.map((j) => (j.id === id ? { ...j, ...updates } : j)),
    })),
  removeJob: (id) => set((s) => ({ jobs: s.jobs.filter((j) => j.id !== id) })),
  setLoading: (loading) => set({ loading }),
  clearAll: () => set({ jobs: [], loading: false }),
}))
```

Repeat the same pattern for `clientsStore.ts` (UserProfile[]), `quotesStore.ts` (Quote[]), `invoicesStore.ts` (Invoice[]), `bookingsStore.ts` (Booking[]).

`src/stores/uiStore.ts`:
```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UIState {
  sidebarOpen: boolean
  theme: 'light' | 'dark' | 'system'
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  reset: () => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      theme: 'system',
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setTheme: (theme) => set({ theme }),
      reset: () => set({ sidebarOpen: true, theme: 'system' }),
    }),
    { name: 'chillair-portal-ui' }
  )
)
```

- [ ] **Step 3: Verify build passes**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add Zustand stores for auth, entities, and UI state"
```

---

## Task 7: Firebase Service Layer

**Files:**
- Create: `src/services/api/auth.ts`
- Create: `src/services/api/jobs.ts`
- Create: `src/services/api/quotes.ts`
- Create: `src/services/api/invoices.ts`
- Create: `src/services/api/bookings.ts`
- Create: `src/services/api/activity.ts`
- Create: `src/services/api/clients.ts`

- [ ] **Step 1: Create auth service**

`src/services/api/auth.ts`:
```typescript
import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  type User,
} from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../firebase/config'
import type { UserProfile } from '../../types/user'

export function subscribeToAuth(callback: (user: UserProfile | null) => void) {
  return onAuthStateChanged(auth, async (firebaseUser: User | null) => {
    if (!firebaseUser) {
      callback(null)
      return
    }
    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))
    if (userDoc.exists()) {
      callback({ uid: firebaseUser.uid, ...userDoc.data() } as UserProfile)
    } else {
      callback(null)
    }
  })
}

export async function login(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password)
}

export async function logout() {
  return firebaseSignOut(auth)
}

export async function resetPassword(email: string) {
  return sendPasswordResetEmail(auth, email)
}
```

- [ ] **Step 2: Create jobs service**

`src/services/api/jobs.ts` — reference implementation for the entity service pattern. All other entity services (quotes, invoices, bookings) follow this same structure.

```typescript
import {
  collection, doc, onSnapshot, query, where, orderBy,
  runTransaction, serverTimestamp, updateDoc, deleteDoc,
  Timestamp,
} from 'firebase/firestore'
import { db } from '../firebase/config'
import type { Job, JobFormData } from '../../types/job'
import { formatJobNumber } from '../../utils/formatters'
import { logActivity } from './activity'

const jobsRef = collection(db, 'jobs')

// Real-time listener — admin gets all, client gets own
export function subscribeToJobs(
  callback: (jobs: Job[]) => void,
  clientId?: string // pass for client role, omit for admin
) {
  const q = clientId
    ? query(jobsRef, where('clientId', '==', clientId), orderBy('createdAt', 'desc'))
    : query(jobsRef, orderBy('createdAt', 'desc'))

  return onSnapshot(q, (snapshot) => {
    const jobs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Job)
    callback(jobs)
  })
}

// Create with atomic counter for jobNumber
export async function createJob(
  data: JobFormData,
  clientName: string,
  adminUid: string,
  adminName: string
): Promise<string> {
  const counterRef = doc(db, 'counters', 'main')

  const jobId = await runTransaction(db, async (transaction) => {
    const counterSnap = await transaction.get(counterRef)
    const currentNum = counterSnap.exists() ? counterSnap.data().jobNumber || 0 : 0
    const nextNum = currentNum + 1

    const newJobRef = doc(jobsRef)
    transaction.update(counterRef, { jobNumber: nextNum })
    transaction.set(newJobRef, {
      jobNumber: formatJobNumber(nextNum),
      clientId: data.clientId,
      clientName,
      service: data.service,
      description: data.description,
      status: data.status,
      progress: 0,
      checklist: data.checklist || [],
      scheduledDate: Timestamp.fromDate(new Date(data.scheduledDate)),
      notes: data.notes || '',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      createdBy: adminUid,
    })
    return newJobRef.id
  })

  await logActivity({
    action: 'create',
    collection: 'jobs',
    documentId: jobId,
    userId: adminUid,
    userName: adminName,
    description: `Created job: ${data.service} for ${clientName}`,
  })

  return jobId
}

export async function updateJob(
  id: string, updates: Partial<Job>,
  adminUid: string, adminName: string
) {
  await updateDoc(doc(db, 'jobs', id), {
    ...updates,
    updatedAt: serverTimestamp(),
  })
  await logActivity({
    action: 'update',
    collection: 'jobs',
    documentId: id,
    userId: adminUid,
    userName: adminName,
    description: `Updated job ${id}`,
  })
}

export async function deleteJob(
  id: string, adminUid: string, adminName: string
) {
  await deleteDoc(doc(db, 'jobs', id))
  await logActivity({
    action: 'delete',
    collection: 'jobs',
    documentId: id,
    userId: adminUid,
    userName: adminName,
    description: `Deleted job ${id}`,
  })
}
```

All other entity services follow this same pattern: `subscribe[Entity]`, `create[Entity]` (with counter transaction), `update[Entity]`, `delete[Entity]`, plus activity logging on every mutation.

- [ ] **Step 3: Create quotes service**

`src/services/api/quotes.ts` — same pattern as jobs. Additionally includes `acceptQuote(id)` and `declineQuote(id)` functions that only update `status` and `acceptedDate`/`updatedAt` (matching the Firestore rule allowlist for client updates).

- [ ] **Step 4: Create invoices service**

`src/services/api/invoices.ts` — same pattern. Includes `uploadInvoicePdf(invoiceId, file)` using Firebase Storage at path `invoices/{invoiceId}/{filename}`, storing the download URL in the invoice document.

- [ ] **Step 5: Create bookings service**

`src/services/api/bookings.ts` — same pattern. The `createBooking` function is callable by clients (sets `clientId` to the current user's UID, `status` to `pending`).

- [ ] **Step 6: Create activity service**

`src/services/api/activity.ts` — `logActivity(entry)` writes to the `activity` collection. `subscribeToActivity(callback)` listens to recent activity (admin only, ordered by timestamp desc, limit 50).

- [ ] **Step 7: Create clients service**

`src/services/api/clients.ts` — `subscribeToClients(callback)` listens to all users with `role == 'client'`. Admin only. `updateClientProfile(uid, data)` updates a client's profile.

- [ ] **Step 8: Verify build passes**

```bash
npm run build
```

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: add Firebase service layer for all entities with real-time listeners"
```

---

## Task 8: Auth Hooks + Real-Time Sync Hook

**Files:**
- Create: `src/hooks/useAuth.ts`
- Create: `src/hooks/useRealtimeSync.ts`
- Create: `src/hooks/useInactivityTimeout.ts`

- [ ] **Step 1: Create useAuth hook**

`src/hooks/useAuth.ts`:
```typescript
import { useEffect } from 'react'
import { useAuthStore } from '../stores/authStore'
import { subscribeToAuth } from '../services/api/auth'

export function useAuth() {
  const { setUser, setLoading } = useAuthStore()

  useEffect(() => {
    setLoading(true)
    const unsubscribe = subscribeToAuth((user) => {
      setUser(user)
    })
    return unsubscribe
  }, [setUser, setLoading])

  return useAuthStore()
}
```

- [ ] **Step 2: Create useRealtimeSync hook**

`src/hooks/useRealtimeSync.ts` — subscribes to all relevant collections based on user role. Admin: all collections. Client: own jobs, quotes, invoices filtered by `clientId`. Returns cleanup function that unsubscribes all listeners. Called once in App root.

- [ ] **Step 3: Create useInactivityTimeout hook**

`src/hooks/useInactivityTimeout.ts` — tracks last activity timestamp via mousemove, keydown, click events. Checks every 60 seconds if `INACTIVITY_TIMEOUT_MS` has elapsed. If so, calls logout and redirects to login. Cleans up event listeners on unmount.

- [ ] **Step 4: Verify build passes**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add auth, real-time sync, and inactivity timeout hooks"
```

---

## Task 9: Common UI Components

**Files:**
- Create all files in `src/components/common/`

- [ ] **Step 1: Create Button component**

`src/components/common/Button.tsx` — variants: `primary`, `secondary`, `outline`, `danger`, `ghost`. Sizes: `sm`, `md`, `lg`. Props: `loading` (shows spinner, disables), `disabled`, `fullWidth`. All buttons have min 44px touch target. Uses `cn()` for class composition.

- [ ] **Step 2: Create Input + Textarea + Select components**

Form field components with: label, error message display, focus states, `forwardRef` for react-hook-form compatibility. Input supports `type` prop. All have consistent sizing and border styling.

- [ ] **Step 3: Create Card component**

`src/components/common/Card.tsx` — container with `surface` background, border, rounded corners. Optional `header`, `footer` slots. Hover variant for clickable cards.

- [ ] **Step 4: Create Modal component**

`src/components/common/Modal.tsx` — overlay + centered dialog. Props: `open`, `onClose`, `title`, `size` (sm/md/lg). Close on Escape key. Close on overlay click. Focus trap. Rendered via React portal. Body scroll lock when open.

- [ ] **Step 5: Create Badge + StatusBadge components**

`Badge.tsx` — generic coloured badge. `StatusBadge.tsx` — maps entity status strings to the correct status colour from the theme. Used across jobs, quotes, invoices, bookings.

- [ ] **Step 6: Create Toast component**

`src/components/common/Toast.tsx` — toast notification system. Types: `success`, `error`, `warning`, `info`. Auto-dismiss after 4 seconds. Max 3 visible. Managed via a simple toast store or context. Positioned top-right.

- [ ] **Step 7: Create EmptyState + Spinner + ConfirmDialog**

`EmptyState.tsx` — icon + message + optional action button. Used on every list when no data exists.
`Spinner.tsx` — simple CSS spinner, inline and full-page variants.
`ConfirmDialog.tsx` — modal with message, confirm button (danger variant), cancel button. Used for delete confirmations.

- [ ] **Step 8: Verify build passes**

```bash
npm run build
```

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: add common UI components (Button, Modal, Input, Card, Badge, Toast, etc.)"
```

---

## Task 10: Layout Components

**Files:**
- Create: `src/components/layout/AppLayout.tsx`
- Create: `src/components/layout/Sidebar.tsx`
- Create: `src/components/layout/Header.tsx`
- Create: `src/components/layout/MobileNav.tsx`
- Create: `src/components/layout/PageLayout.tsx`

- [ ] **Step 1: Create Sidebar**

`Sidebar.tsx` — fixed left sidebar (260px). Chill Air logo at top. Nav items rendered from `ADMIN_NAV_ITEMS` or `CLIENT_NAV_ITEMS` based on role. Uses `NavLink` for active state styling. User profile card at bottom with name, role, logout button. Hidden on mobile (replaced by MobileNav).

- [ ] **Step 2: Create Header**

`Header.tsx` — top bar in the main content area. Shows: hamburger menu button (mobile), page title, theme toggle (sun/moon icon), user avatar (initials circle), logout button.

- [ ] **Step 3: Create MobileNav**

`MobileNav.tsx` — bottom navigation bar visible only on mobile (< 768px). Shows the most important nav items as icon + label. Hamburger menu opens a slide-out drawer with full navigation on mobile.

- [ ] **Step 4: Create PageLayout**

`PageLayout.tsx` — wrapper for every page. Props: `title`, `subtitle?`, `action?` (button in top-right, e.g., "New Job"). Renders Header + main content area with consistent padding.

- [ ] **Step 5: Create AppLayout**

`AppLayout.tsx` — the root layout rendered for authenticated users. Renders Sidebar + main content outlet (React Router `<Outlet />`). Handles theme class on `<html>` element based on uiStore theme + system preference detection (detect `prefers-color-scheme` on first visit if theme is `system`). Calls `useRealtimeSync()` and `useInactivityTimeout()`.

**Accessibility:** Add a visually-hidden skip-to-content link as the **first focusable element** inside AppLayout:
```tsx
<a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-surface focus:text-primary">
  Skip to content
</a>
```
And add `id="main-content"` to the main content area.

**Logout cleanup:** AppLayout should provide a `fullLogout` function (via context or passed to Sidebar/Header) that:
1. Unsubscribes all Firestore listeners (handled by useRealtimeSync cleanup)
2. Calls `firebaseSignOut(auth)`
3. Calls `reset()` / `clearAll()` on all Zustand stores (authStore, jobsStore, clientsStore, quotesStore, invoicesStore, bookingsStore)
4. Clears `sessionStorage`
5. Does NOT clear localStorage (preserves theme preference from uiStore persist)
6. Navigates to `/login`

- [ ] **Step 6: Verify build passes**

```bash
npm run build
```

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add layout components (Sidebar, Header, MobileNav, PageLayout, AppLayout)"
```

---

## Task 11: Router + Auth Pages

**Files:**
- Create: `src/routes/router.tsx`
- Create: `src/pages/auth/LoginPage.tsx`
- Create: `src/pages/auth/ForgotPasswordPage.tsx`
- Modify: `src/App.tsx`
- Modify: `src/main.tsx`

- [ ] **Step 1: Create router configuration**

`src/routes/router.tsx` — React Router v7 with:
- `/login` — LoginPage
- `/forgot-password` — ForgotPasswordPage
- `/auth/action` — ResetPasswordPage (handles password reset links from email)
- `/admin/*` — lazy-loaded admin pages, wrapped in `<ProtectedRoute role="admin">`
- `/client/*` — lazy-loaded client pages, wrapped in `<ProtectedRoute role="client">`
- `/` — redirects to `/admin` or `/client` based on role
- `*` — 404 page

`ProtectedRoute` component: checks auth state, redirects to `/login` if not authenticated, redirects to correct portal if wrong role.

- [ ] **Step 2: Create LoginPage**

`LoginPage.tsx` — centred card with Chill Air logo, email + password fields (react-hook-form + zod), login button with loading state, "Forgot password?" link. Error toast on failed login. Redirects to `/admin` or `/client` based on role after successful login.

- [ ] **Step 3: Create ForgotPasswordPage**

`ForgotPasswordPage.tsx` — centred card with email field, "Send Reset Link" button, success message, back to login link. Calls `resetPassword()` from auth service.

- [ ] **Step 4: Create ResetPasswordPage**

**Files:** Create `src/pages/auth/ResetPasswordPage.tsx`

This page handles the link from password reset emails. It reads the `oobCode` query parameter from the URL, verifies it, and lets the user set a new password. Branded with Chill Air logo and colours — this is the custom email action handler that replaces the default Firebase URL.

```typescript
import { useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { verifyPasswordResetCode, confirmPasswordReset } from 'firebase/auth'
import { auth } from '../../services/firebase/config'

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams()
  const oobCode = searchParams.get('oobCode') || ''
  const [password, setPassword] = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const [status, setStatus] = useState<'form' | 'success' | 'error'>('form')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password !== confirmPw) {
      setError('Passwords do not match')
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }
    try {
      await verifyPasswordResetCode(auth, oobCode)
      await confirmPasswordReset(auth, oobCode, password)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  // Render: branded card with Chill Air logo
  // - 'form' state: new password + confirm password fields, submit button
  // - 'success' state: "Password updated" message + link to /login
  // - 'error' state: "Invalid or expired link" message + link to /forgot-password
}
```

- [ ] **Step 5: Wire up App.tsx and main.tsx**

`App.tsx` — renders `useAuth()` hook, shows full-page spinner while loading, renders router.
`main.tsx` — renders `<App />` with `<BrowserRouter>`.

- [ ] **Step 5: Verify build passes and login page renders**

```bash
npm run build && npm run dev
```
Open `http://localhost:5173/login` — should see the login page.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add router, protected routes, login and forgot password pages"
```

---

## Task 12: Admin Dashboard Page

**Files:**
- Create: `src/pages/admin/AdminDashboard.tsx`
- Create: `src/components/dashboard/StatCard.tsx`
- Create: `src/components/dashboard/RecentActivity.tsx`
- Create: `src/components/dashboard/UpcomingJobs.tsx`

- [ ] **Step 1: Create StatCard**

`StatCard.tsx` — displays a metric with icon, label, value, and optional trend indicator. Uses Card component.

- [ ] **Step 2: Create RecentActivity**

`RecentActivity.tsx` — renders the last 10 activity entries from the activity store. Shows: icon per action type, description, relative timestamp.

- [ ] **Step 3: Create UpcomingJobs**

`UpcomingJobs.tsx` — shows jobs with `scheduledDate` in the next 7 days. Sorted by date. Links to job detail.

- [ ] **Step 4: Create AdminDashboard page**

`AdminDashboard.tsx` — uses PageLayout with title "Dashboard". Stats grid (4 columns on desktop, 2 on mobile): active jobs count, pending quotes count, overdue invoices count, pending bookings count. Below: two-column layout with UpcomingJobs and RecentActivity.

- [ ] **Step 5: Verify build passes**

```bash
npm run build
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add admin dashboard with stats, upcoming jobs, and activity feed"
```

---

## Task 13: Admin Jobs Page

**Files:**
- Create: `src/pages/admin/AdminJobs.tsx`
- Create: `src/components/jobs/JobList.tsx`
- Create: `src/components/jobs/JobCard.tsx`
- Create: `src/components/jobs/JobForm.tsx`
- Create: `src/components/jobs/JobChecklist.tsx`

- [ ] **Step 1: Create JobCard**

`JobCard.tsx` — displays job summary: job number, client name, service, status badge, progress bar, scheduled date. Click opens edit. Action buttons: edit, delete.

- [ ] **Step 2: Create JobChecklist**

`JobChecklist.tsx` — renders checklist items with checkboxes. Admin can toggle items. Shows progress percentage. Used both in the form and in a read-only view for clients.

- [ ] **Step 3: Create JobForm**

`JobForm.tsx` — modal form for creating/editing jobs. Fields: client select (dropdown of all clients), service select (from SERVICE_TYPES), description, scheduled date, status, notes, checklist items (add/remove/reorder). Uses react-hook-form + zod. On submit: calls createJob or updateJob service.

- [ ] **Step 4: Create JobList**

`JobList.tsx` — renders JobCards in a responsive grid. Search bar (filters by client name, job number, service). Status filter tabs (All, Pending, In Progress, Completed). Shows EmptyState when no jobs match.

- [ ] **Step 5: Create AdminJobs page**

`AdminJobs.tsx` — uses PageLayout with title "Jobs" and action button "New Job" (opens JobForm modal in create mode). Renders JobList.

- [ ] **Step 6: Verify build passes**

```bash
npm run build
```

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add admin jobs page with CRUD, checklist, search, and filtering"
```

---

## Task 14: Admin Clients Page

**Files:**
- Create: `src/pages/admin/AdminClients.tsx`
- Create: `src/pages/admin/AdminClientDetail.tsx`
- Create: `src/components/clients/ClientList.tsx`
- Create: `src/components/clients/ClientCard.tsx`
- Create: `src/components/clients/ClientForm.tsx`

- [ ] **Step 1: Create ClientCard**

`ClientCard.tsx` — shows client name, email, phone, job count. Click navigates to client detail page.

- [ ] **Step 2: Create ClientForm**

`ClientForm.tsx` — modal form for creating a new client (calls `createClientAccount` Cloud Function) or editing an existing client's profile. Fields: name, email (create only — read-only on edit), phone, address.

- [ ] **Step 3: Create ClientList**

`ClientList.tsx` — search bar, responsive card grid. EmptyState when no clients.

- [ ] **Step 4: Create AdminClients page**

`AdminClients.tsx` — PageLayout with "New Client" action button. Renders ClientList.

- [ ] **Step 5: Create AdminClientDetail page**

`AdminClientDetail.tsx` — shows client profile at top, then tabbed view of their jobs, quotes, and invoices (filtered by clientId). Edit button opens ClientForm.

- [ ] **Step 6: Verify build passes**

```bash
npm run build
```

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add admin clients page with CRUD and client detail view"
```

---

## Task 15: Admin Quotes Page

**Files:**
- Create: `src/pages/admin/AdminQuotes.tsx`
- Create: `src/components/quotes/QuoteList.tsx`
- Create: `src/components/quotes/QuoteCard.tsx`
- Create: `src/components/quotes/QuoteForm.tsx`

- [ ] **Step 1: Create QuoteCard**

`QuoteCard.tsx` — quote number, client name, description summary, total amount (formatted as NZD), status badge, expiry date.

- [ ] **Step 2: Create QuoteForm**

`QuoteForm.tsx` — modal form. Fields: client select, description, line items (dynamic add/remove rows — description, quantity, unit price), expiry date. Auto-calculates total. Status select (admin can change).

- [ ] **Step 3: Create QuoteList + AdminQuotes page**

Same pattern as Jobs — search, status filter tabs, EmptyState, "New Quote" action button.

- [ ] **Step 4: Verify build passes and commit**

```bash
npm run build
git add -A
git commit -m "feat: add admin quotes page with line items and CRUD"
```

---

## Task 16: Admin Invoices Page

**Files:**
- Create: `src/pages/admin/AdminInvoices.tsx`
- Create: `src/components/invoices/InvoiceList.tsx`
- Create: `src/components/invoices/InvoiceCard.tsx`
- Create: `src/components/invoices/InvoiceForm.tsx`

- [ ] **Step 1: Create InvoiceCard**

`InvoiceCard.tsx` — invoice number, client name, total amount, status badge, due date. Overdue invoices highlighted.

- [ ] **Step 2: Create InvoiceForm**

`InvoiceForm.tsx` — modal form. Fields: client select, description, line items (same as quotes), due date, status. Optional PDF upload (file input, uploads to Firebase Storage, stores URL). Download PDF link if URL exists.

- [ ] **Step 3: Create InvoiceList + AdminInvoices page**

Same list/filter/search pattern. "New Invoice" action button.

- [ ] **Step 4: Verify build passes and commit**

```bash
npm run build
git add -A
git commit -m "feat: add admin invoices page with PDF upload and CRUD"
```

---

## Task 17: Admin Calendar Page

**Files:**
- Create: `src/pages/admin/AdminCalendar.tsx`
- Create: `src/components/calendar/CalendarView.tsx`

- [ ] **Step 1: Create CalendarView**

`CalendarView.tsx` — simple month grid built with date-fns. Shows: month/year header with prev/next buttons, day-of-week headers, day cells. Each cell shows colour-coded dots for: scheduled jobs (primary colour), confirmed bookings (green), pending bookings (amber). Clicking a day shows a popover or sidebar with the day's items. Clicking an item navigates to the job or booking.

- [ ] **Step 2: Create AdminCalendar page**

`AdminCalendar.tsx` — PageLayout with title "Calendar". Renders CalendarView with data from jobs and bookings stores.

- [ ] **Step 3: Verify build passes and commit**

```bash
npm run build
git add -A
git commit -m "feat: add admin calendar page with month view"
```

---

## Task 18: Admin Settings Page

**Files:**
- Create: `src/pages/admin/AdminSettings.tsx`

- [ ] **Step 1: Create AdminSettings**

`AdminSettings.tsx` — PageLayout with title "Settings". Sections:
1. **Profile** — edit name, phone (uses updateProfileSchema + react-hook-form)
2. **Theme** — light/dark/system toggle
3. **Account** — change password link (sends reset email to own address)

- [ ] **Step 2: Verify build passes and commit**

```bash
npm run build
git add -A
git commit -m "feat: add admin settings page"
```

---

## Task 19: Client Pages — Dashboard, Jobs, Profile

**Files:**
- Create: `src/pages/client/ClientDashboard.tsx`
- Create: `src/pages/client/ClientJobs.tsx`
- Create: `src/pages/client/ClientProfile.tsx`

- [ ] **Step 1: Create ClientDashboard**

`ClientDashboard.tsx` — simplified dashboard. Stats: active jobs, pending quotes, outstanding invoices. Lists: current jobs (top 3), recent quotes. Quick action: "Book a Service" button.

- [ ] **Step 2: Create ClientJobs**

`ClientJobs.tsx` — read-only list of the client's jobs. Shows status, progress bar, checklist (read-only checkmarks). No edit/delete actions.

- [ ] **Step 3: Create ClientProfile**

`ClientProfile.tsx` — edit name, phone, address (react-hook-form + updateProfileSchema). Change password section (sends reset email). Theme toggle.

- [ ] **Step 4: Verify build passes and commit**

```bash
npm run build
git add -A
git commit -m "feat: add client dashboard, jobs, and profile pages"
```

---

## Task 20: Client Pages — Quotes, Invoices, Bookings

**Files:**
- Create: `src/pages/client/ClientQuotes.tsx`
- Create: `src/pages/client/ClientInvoices.tsx`
- Create: `src/pages/client/ClientBookService.tsx`
- Create: `src/components/bookings/BookingForm.tsx`
- Create: `src/components/bookings/BookingCard.tsx`
- Create: `src/components/bookings/BookingList.tsx`

- [ ] **Step 1: Create ClientQuotes**

`ClientQuotes.tsx` — list of client's quotes. Each quote shows details, line items, total. "Accept" and "Decline" buttons on quotes with status `sent`. Accept/decline calls the quote service functions (`acceptQuote`, `declineQuote`). Confirmation dialog before declining.

- [ ] **Step 2: Create ClientInvoices**

`ClientInvoices.tsx` — list of client's invoices. Shows status, amount, due date. "Download PDF" button if `pdfUrl` exists. Overdue invoices highlighted.

- [ ] **Step 3: Create BookingForm + BookingCard + BookingList**

`BookingForm.tsx` — form for requesting a booking. Fields: service type (select from SERVICE_TYPES), preferred date (date picker), preferred time (morning/afternoon/no preference), message (textarea). On submit: calls createBooking service. Shows success toast.
`BookingCard.tsx` — displays booking summary with status badge.
`BookingList.tsx` — list of bookings with EmptyState.

- [ ] **Step 4: Create ClientBookService**

`ClientBookService.tsx` — PageLayout with BookingForm at top + list of client's existing bookings below.

- [ ] **Step 5: Verify build passes and commit**

```bash
npm run build
git add -A
git commit -m "feat: add client quotes, invoices, and booking pages"
```

---

## Task 21: Cloud Functions

**Files:**
- Create: `functions/src/index.ts`
- Create: `functions/package.json`
- Create: `functions/tsconfig.json`

- [ ] **Step 1: Initialise functions directory**

```bash
cd "D:\Sidequest Digital\Dev Projects\Clients\ChillAir\portal"
mkdir -p functions/src
```

`functions/package.json`:
```json
{
  "name": "chillair-portal-functions",
  "scripts": {
    "build": "tsc",
    "serve": "npm run build && firebase emulators:start --only functions",
    "deploy": "firebase deploy --only functions"
  },
  "engines": { "node": "20" },
  "main": "lib/index.js",
  "dependencies": {
    "firebase-admin": "^12.0.0",
    "firebase-functions": "^5.0.0",
    "zod": "^3.23.0"
  },
  "devDependencies": {
    "typescript": "^5.4.0"
  }
}
```

`functions/tsconfig.json`:
```json
{
  "compilerOptions": {
    "module": "commonjs",
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "outDir": "lib",
    "sourceMap": true,
    "strict": true,
    "target": "es2020",
    "esModuleInterop": true
  },
  "compileOnSave": true,
  "include": ["src"]
}
```

- [ ] **Step 2: Create `createClientAccount` Cloud Function**

`functions/src/index.ts`:
```typescript
import { onCall, HttpsError } from 'firebase-functions/v2/https'
import { initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore, FieldValue } from 'firebase-admin/firestore'
import { z } from 'zod'
import { randomBytes } from 'crypto'

initializeApp()

const createClientSchema = z.object({
  email: z.string().email('Invalid email'),
  name: z.string().min(1).max(100),
  phone: z.string().max(20).optional(),
  address: z.string().max(200).optional(),
})

export const createClientAccount = onCall(async (request) => {
  // Verify caller is admin
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'Must be logged in')
  }

  const callerDoc = await getFirestore()
    .doc(`users/${request.auth.uid}`)
    .get()
  if (!callerDoc.exists || callerDoc.data()?.role !== 'admin') {
    throw new HttpsError('permission-denied', 'Admin only')
  }

  // Validate input
  const result = createClientSchema.safeParse(request.data)
  if (!result.success) {
    throw new HttpsError('invalid-argument', result.error.issues[0].message)
  }

  const { email, name, phone, address } = result.data
  const tempPassword = randomBytes(16).toString('hex')

  // Create Firebase Auth user
  const userRecord = await getAuth().createUser({
    email,
    password: tempPassword,
    displayName: name,
  })

  // Create Firestore profile
  await getFirestore().doc(`users/${userRecord.uid}`).set({
    uid: userRecord.uid,
    email,
    name,
    role: 'client',
    phone: phone || '',
    address: address || '',
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  })

  // Log activity
  await getFirestore().collection('activity').add({
    action: 'create',
    collection: 'users',
    documentId: userRecord.uid,
    userId: request.auth.uid,
    userName: callerDoc.data()?.name || 'Admin',
    description: `Created client account for ${name}`,
    timestamp: FieldValue.serverTimestamp(),
  })

  // Generate password reset link and return it
  // NOTE: generatePasswordResetLink creates the link but does NOT send an email.
  // Phase 1 limitation: the admin UI should display this link so Greg can share it
  // with the client (e.g., copy to clipboard, or paste into an email).
  // Phase 2: integrate a mail service (Firebase Extensions "Trigger Email" or
  // Nodemailer) to send a branded welcome email automatically.
  const resetLink = await getAuth().generatePasswordResetLink(email, {
    url: 'https://portal.chillair.co.nz/login',
  })

  return { uid: userRecord.uid, resetLink }
})
```

- [ ] **Step 3: Install function dependencies**

```bash
cd "D:\Sidequest Digital\Dev Projects\Clients\ChillAir\portal\functions"
npm install
```

- [ ] **Step 4: Build functions**

```bash
cd "D:\Sidequest Digital\Dev Projects\Clients\ChillAir\portal\functions"
npm run build
```

- [ ] **Step 5: Commit**

```bash
cd "D:\Sidequest Digital\Dev Projects\Clients\ChillAir\portal"
git add -A
git commit -m "feat: add createClientAccount Cloud Function with zod validation"
```

---

## Task 22: CLAUDE.md + Final Build Verification

**Files:**
- Create: `portal/CLAUDE.md`

- [ ] **Step 1: Create portal CLAUDE.md**

Create a CLAUDE.md for the portal project following the template from the global instructions. Include: tech stack, folder structure, build commands (`npm run dev`, `npm run build`, `firebase deploy`), code conventions, current progress, next steps.

- [ ] **Step 2: Full build verification**

```bash
cd "D:\Sidequest Digital\Dev Projects\Clients\ChillAir\portal"
npm run build
```
Expected: Zero errors, zero warnings.

- [ ] **Step 3: Dev server smoke test**

```bash
npm run dev
```
Open `http://localhost:5173` — verify:
- Login page renders with Chill Air branding
- Theme toggle works (light/dark)
- No console errors

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "docs: add CLAUDE.md for portal project"
```

---

## Task 23: Firebase Project Setup (Manual — requires Joel)

This task requires Joel's Firebase account access. Document as instructions.

- [ ] **Step 1: Create Firebase project**

Go to https://console.firebase.google.com → Create project → Name: `chillair-portal`

- [ ] **Step 2: Enable services**

- Authentication → Email/Password provider
- Cloud Firestore → Create database (production mode)
- Storage → Get started
- Hosting → Get started

- [ ] **Step 3: Get config values**

Project Settings → General → Your apps → Add web app → Copy config values into `.env`:
```
VITE_FIREBASE_API_KEY=xxx
VITE_FIREBASE_AUTH_DOMAIN=chillair-portal.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=chillair-portal
VITE_FIREBASE_STORAGE_BUCKET=chillair-portal.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=xxx
VITE_FIREBASE_APP_ID=xxx
```

- [ ] **Step 4: Create admin user**

In Firebase Console → Authentication → Add user → Greg's email + temporary password.

Then in Firestore → Create `users` collection → Add document with ID = the auth UID:
```json
{
  "uid": "<auth-uid>",
  "email": "greg@chillair.co.nz",
  "name": "Greg Hicks",
  "role": "admin",
  "phone": "",
  "address": "",
  "createdAt": "<server timestamp>",
  "updatedAt": "<server timestamp>"
}
```

- [ ] **Step 5: Create counters document**

Firestore → Create `counters` collection → Add document with ID `main`:
```json
{
  "jobNumber": 0,
  "quoteNumber": 0,
  "invoiceNumber": 0
}
```

- [ ] **Step 6: Deploy rules and hosting**

```bash
cd "D:\Sidequest Digital\Dev Projects\Clients\ChillAir\portal"
firebase login
firebase deploy
```

- [ ] **Step 7: Configure custom domain**

Firebase Hosting → Add custom domain → `portal.chillair.co.nz` → Follow DNS instructions.

- [ ] **Step 8: Customise email templates**

Firebase Console → Authentication → Templates → Customise:
- Password reset email: add Chill Air logo, brand colours, professional copy
- Email address verification: same branding
- Set "from" name to "Chill Air"

---

## Execution Order Summary

| Task | Description | Dependencies |
|------|------------|-------------|
| 1 | Project scaffold | None |
| 2 | Tailwind + theme | Task 1 |
| 3 | Firebase config | Task 1 |
| 4 | Types + schemas | Task 1 |
| 5 | Constants + utils | Task 4 |
| 6 | Zustand stores | Task 4 |
| 7 | Service layer | Tasks 3, 4, 6 |
| 8 | Auth + sync hooks | Tasks 6, 7 |
| 9 | Common UI components | Task 2 |
| 10 | Layout components | Tasks 5, 9 |
| 11 | Router + auth pages (incl. ResetPasswordPage) | Tasks 8, 10 |
| 12 | Admin dashboard | Task 11 |
| 13 | Admin jobs | Tasks 9, 11 |
| 14 | Admin clients | Tasks 9, 11 |
| 15 | Admin quotes | Tasks 9, 11 |
| 16 | Admin invoices | Tasks 9, 11 |
| 17 | Admin calendar | Tasks 9, 11 |
| 18 | Admin settings | Task 11 |
| 19 | Client pages — dashboard, jobs, profile | Tasks 9, 11 |
| 20 | Client pages — quotes, invoices, bookings | Tasks 9, 11 |
| 21 | Cloud Functions | Task 3 |
| 22 | CLAUDE.md + verification | All above |
| 23 | Firebase setup (manual) | Task 22 |

**Parallelisable groups:**
- Tasks 2, 3, 4 can run in parallel after Task 1
- Tasks 5, 6 can run in parallel after Task 4
- Tasks 9, 7 can run in parallel
- Tasks 12-20 can run in parallel after Task 11
- Task 21 can run in parallel with Tasks 12-20
