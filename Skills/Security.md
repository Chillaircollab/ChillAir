# Security Playbook

> Security checklist and implementation guide for Sidequest Digital projects. Focused on the React + Firebase stack. Run this before any project goes live with real users or handles payments.

---

## When to Use This

- **Before launch** — run the full audit checklist
- **During development** — reference specific sections as you build auth, rules, storage, etc.
- **Periodic review** — revisit on live projects every few months, especially after adding new features
- **After adding payments** — extra scrutiny on Stripe integration and user data

---

## The Threat Model for Sidequest Projects

You're not building banking software. But you ARE building apps with:
- Real user accounts and passwords
- Personal data (names, emails, phone numbers, addresses)
- Payment processing (Stripe)
- Admin portals with elevated privileges
- File uploads
- Public-facing forms

**The realistic threats are:**
1. Someone accessing another user's data (IDOR / broken access control)
2. Someone gaining admin access they shouldn't have
3. XSS or injection through user-submitted content
4. Abuse of public endpoints (spam, scraping, DDoS)
5. Leaked API keys or secrets
6. Stale tokens or sessions that never expire
7. File uploads being used to serve malicious content

This playbook addresses all of these.

---

## 1. Firestore Security Rules

This is your primary line of defence. Firestore rules are server-side — they can't be bypassed from the client.

### 1.1 — The Golden Rules

1. **Never use open rules in production.** If you see `allow read, write: if true` — that's a development shortcut that must be removed before launch.
2. **Default deny.** If a collection doesn't have explicit rules, it should be inaccessible.
3. **Every write rule must validate the data.** Don't just check auth — check the data shape too.
4. **Test rules changes before deploying.** Use the Firebase Emulator or the Rules Playground in the console.

### 1.2 — Rule Patterns

**Base template (start every project with this):**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // === HELPER FUNCTIONS ===

    function isAuthenticated() {
      return request.auth != null;
    }

    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }

    function getUserRole() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role;
    }

    function isAdmin() {
      return isAuthenticated() && getUserRole() == 'admin';
    }

    function isAdminOrRole(role) {
      return isAuthenticated() && (getUserRole() == 'admin' || getUserRole() == role);
    }

    // === DEFAULT: DENY EVERYTHING ===
    match /{document=**} {
      allow read, write: if false;
    }

    // === COLLECTION RULES (override default deny per collection) ===

    // Users
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow create: if isOwner(userId);
      allow update: if isOwner(userId) || isAdmin();
      allow delete: if isAdmin();

      // Prevent users from escalating their own role
      allow update: if isOwner(userId)
                    && (!request.resource.data.diff(resource.data).affectedKeys().hasAny(['role']));
    }

    // Audit log — append only
    match /activity/{docId} {
      allow read: if isAdmin();
      allow create: if isAuthenticated();
      allow update, delete: if false;
    }
  }
}
```

### 1.3 — Preventing Privilege Escalation

**The #1 rule: users must never be able to change their own role.**

```javascript
// BAD — user can update anything on their profile, including role
match /users/{userId} {
  allow update: if isOwner(userId);
}

// GOOD — user can update their profile but NOT the role field
match /users/{userId} {
  allow update: if isOwner(userId)
                && (!request.resource.data.diff(resource.data).affectedKeys().hasAny(['role', 'isAdmin']));
}
```

**Also watch for:** `tier`, `subscription`, `permissions`, `credits` — any field that grants elevated access should be admin-write-only or managed by Cloud Functions.

### 1.4 — Insecure Direct Object References (IDOR)

IDOR = someone changes an ID in a URL or API call to access someone else's data.

**How Firestore rules prevent this:**

```javascript
// User can only read their own orders
match /orders/{orderId} {
  allow read: if isAuthenticated()
              && resource.data.userId == request.auth.uid;
}

// User can only read conversations they're part of
match /conversations/{convoId} {
  allow read: if isAuthenticated()
              && request.auth.uid in resource.data.participants;
}
```

**On the client side:** Don't rely on hiding UI elements. Even if a button is hidden, someone can call Firestore directly from the browser console. The rules must enforce access.

### 1.5 — Data Validation in Rules

Don't just check who's writing — check what they're writing:

```javascript
match /listings/{listingId} {
  allow create: if isAuthenticated()
                && request.resource.data.keys().hasAll(['title', 'description', 'price', 'userId'])
                && request.resource.data.title is string
                && request.resource.data.title.size() > 0
                && request.resource.data.title.size() <= 200
                && request.resource.data.price is number
                && request.resource.data.price >= 0
                && request.resource.data.userId == request.auth.uid;
}
```

### 1.6 — The getUserRole() Performance Problem

Calling `get()` in rules costs a Firestore read on EVERY rule evaluation. If you have 1000 users making 10 requests each, that's 10,000 extra reads just for role checks.

**When it's fine:** Low-traffic portals, school tools, internal apps (< 1000 daily active users).

**When to migrate:** High-traffic public apps (iSQROLL, 48Hours).

**The fix: Firebase Custom Claims**

Custom claims are stored in the auth token (free to check, no extra reads):

```typescript
// Cloud Function to set a user's role
export const setUserRole = onCall(async (request) => {
  // Verify the caller is an admin
  if (request.auth?.token?.role !== 'admin') {
    throw new HttpsError('permission-denied', 'Only admins can set roles');
  }

  const { userId, role } = request.data;
  await getAuth().setCustomUserClaims(userId, { role });
  return { success: true };
});
```

```javascript
// In Firestore rules — no get() call needed
function isAdmin() {
  return request.auth != null && request.auth.token.role == 'admin';
}
```

**Trade-off:** Custom claims require a Cloud Function to set, and the user needs to refresh their token (sign out/in or force refresh) to pick up changes. For most Sidequest projects, the `get()` approach is fine.

---

## 2. Authentication Security

### 2.1 — Password Policy

Firebase Auth defaults are weak. Enforce stronger passwords in your signup form:

```typescript
const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Must contain an uppercase letter')
  .regex(/[a-z]/, 'Must contain a lowercase letter')
  .regex(/[0-9]/, 'Must contain a number');
```

Firebase Auth will accept any password of 6+ characters, so this validation is client-side only. For true enforcement, use a Cloud Function that creates users on the server.

### 2.2 — Session Management

- **Inactivity timeout:** Auto-logout after 30-60 minutes of inactivity for admin portals.
- **Token refresh:** Firebase Auth tokens expire after 1 hour by default and auto-refresh. This is fine for most apps.
- **Logout cleanup:** On logout, clear ALL state (Zustand stores), unsubscribe ALL Firestore listeners, clear any localStorage/sessionStorage, and redirect to login.

```typescript
const logout = async () => {
  // Unsubscribe all listeners first
  useDataStore.getState().unsubscribers.forEach(unsub => unsub());

  // Clear all stores
  useAuthStore.getState().reset();
  useDataStore.getState().clearAll();
  useUIStore.getState().reset();

  // Clear any cached data
  localStorage.removeItem('theme');
  sessionStorage.clear();

  // Sign out of Firebase
  await signOut(auth);

  // Redirect
  navigate('/login');
};
```

### 2.3 — Admin Account Protection

- **Never hardcode admin emails in client code.** Use Firestore roles or custom claims.
- **Require email verification** before granting admin access.
- **Log all admin actions** to the audit trail (activity collection).
- **Consider 2FA** for admin accounts on high-value apps (Firebase supports this via multi-factor auth).

### 2.4 — Token-Based Access Security

For token-based external access (tutor portals, client review pages):

- Tokens must have an **expiry date** (30-90 days max).
- Tokens should be **single-use or scoped** to a specific resource.
- Store tokens in Firestore with `expiresAt` and validate in rules:

```javascript
match /tutorTokens/{tokenId} {
  allow read: if resource.data.expiresAt > request.time;
}
```

- **Never put sensitive data in the token itself.** The token is just a key to look up permissions in Firestore.
- Rotate tokens periodically for long-lived access.

---

## 3. Cloud Functions Security

### 3.1 — Callable Functions: Always Verify the Caller

```typescript
export const adminAction = onCall(async (request) => {
  // ALWAYS check auth
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'Must be logged in');
  }

  // ALWAYS check role for admin functions
  if (request.auth.token.role !== 'admin') {
    throw new HttpsError('permission-denied', 'Admin only');
  }

  // ALWAYS validate input
  const { userId } = request.data;
  if (!userId || typeof userId !== 'string') {
    throw new HttpsError('invalid-argument', 'userId is required');
  }

  // Now do the thing
});
```

### 3.2 — HTTP Functions: Rate Limiting

Callable functions have built-in App Check support. HTTP functions (onRequest) are exposed to the internet and need rate limiting:

```typescript
import { onRequest } from 'firebase-functions/v2/https';

// Simple in-memory rate limiter (resets on cold start)
const requestCounts = new Map<string, { count: number; resetTime: number }>();

function rateLimit(ip: string, maxRequests = 60, windowMs = 60000): boolean {
  const now = Date.now();
  const record = requestCounts.get(ip);

  if (!record || now > record.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  return true;
}

export const publicEndpoint = onRequest(async (req, res) => {
  const ip = req.ip || req.headers['x-forwarded-for'] || 'unknown';

  if (!rateLimit(String(ip))) {
    res.status(429).json({ error: 'Too many requests. Try again later.' });
    return;
  }

  // Handle request
});
```

**For production-scale rate limiting:** Use Firebase App Check, or put Cloud Functions behind an API gateway (e.g., Firebase Hosting rewrites + Cloudflare).

### 3.3 — Input Validation in Functions

Never trust data from the client, even from authenticated users:

```typescript
import { z } from 'zod';

const createListingSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(5000),
  price: z.number().min(0).max(1000000),
  category: z.enum(['general', 'vehicle', 'fundraiser']),
});

export const createListing = onCall(async (request) => {
  if (!request.auth) throw new HttpsError('unauthenticated', 'Must be logged in');

  const result = createListingSchema.safeParse(request.data);
  if (!result.success) {
    throw new HttpsError('invalid-argument', result.error.issues[0].message);
  }

  // Use result.data (validated and typed)
});
```

### 3.4 — Secrets Management

- **Never hardcode API keys, Stripe secrets, or third-party credentials in function source code.**
- Use Firebase Functions config or Google Secret Manager:

```bash
# Set a secret
firebase functions:secrets:set STRIPE_SECRET_KEY

# Access in code
import { defineSecret } from 'firebase-functions/params';
const stripeSecret = defineSecret('STRIPE_SECRET_KEY');

export const processPayment = onCall(
  { secrets: [stripeSecret] },
  async (request) => {
    const stripe = new Stripe(stripeSecret.value());
    // ...
  }
);
```

- **Firebase client config (apiKey, projectId, etc.) is safe to be public.** These are project identifiers, not secrets. Security is enforced by Firestore rules and Auth, not by hiding the config.

---

## 4. Client-Side Security

### 4.1 — XSS Prevention

React escapes content by default, which handles most XSS. Watch out for:

**Danger zones:**
```typescript
// NEVER do this with user-submitted content
<div dangerouslySetInnerHTML={{ __html: userContent }} />

// If you MUST render HTML (e.g., rich text editor output), sanitise first
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userContent) }} />
```

**Safe by default:**
```typescript
// React escapes this automatically — safe
<p>{userContent}</p>
<span>{comment.text}</span>
```

**Other XSS vectors to watch:**
- URL params rendered into the page: `const query = searchParams.get('q')` — safe if rendered as text, dangerous if used in `href` or `src`
- `window.location` manipulation
- `eval()` — never use this
- `href="javascript:..."` — validate URLs before rendering them as links

### 4.2 — Form Validation

Validate on both sides. Client-side for UX, Firestore rules / Cloud Functions for security:

```typescript
// Client-side (zod + react-hook-form) — for UX
const schema = z.object({
  email: z.string().email('Invalid email'),
  name: z.string().min(1, 'Name is required').max(100),
  message: z.string().min(1).max(5000),
});

// Server-side (Firestore rules) — for security
// match /contactSubmissions/{docId} {
//   allow create: if request.resource.data.email is string
//                 && request.resource.data.email.size() > 0
//                 && request.resource.data.message.size() <= 5000;
// }
```

**Never rely on client-side validation alone.** Someone can bypass your React form entirely and write directly to Firestore from the browser console.

### 4.3 — Sensitive Data in the Client

- **Never store secrets in environment variables that start with `VITE_`.** Vite embeds these in the built JS bundle — they're visible to anyone who views page source.
- `VITE_FIREBASE_API_KEY` is fine (it's a public identifier).
- `STRIPE_SECRET_KEY` is NOT fine — this must only exist in Cloud Functions.
- **Never log sensitive data to console.** Remove `console.log(user)` before production — it exposes auth tokens and personal data.

### 4.4 — URL Parameter Safety

```typescript
// BAD — using URL param to fetch any user's data
const { userId } = useParams();
const userData = await getDoc(doc(db, 'users', userId));

// GOOD — verify the logged-in user matches (or is admin)
const { userId } = useParams();
const currentUser = useAuthStore(s => s.user);

if (userId !== currentUser.uid && !isAdmin(currentUser)) {
  navigate('/unauthorized');
  return;
}
```

This is defence-in-depth. Firestore rules should also enforce this, but client-side checks prevent unnecessary reads and provide better UX.

---

## 5. Storage Security

### 5.1 — Storage Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {

    // Default deny
    match /{allPaths=**} {
      allow read, write: if false;
    }

    // Profile avatars — user can only write to their own path
    match /avatars/{userId}/{fileName} {
      allow read: if request.auth != null;
      allow write: if request.auth != null
                   && request.auth.uid == userId
                   && request.resource.size < 5 * 1024 * 1024  // 5MB
                   && request.resource.contentType.matches('image/(jpeg|png|webp|gif)');
    }

    // Project files — authenticated users can upload
    match /files/{projectId}/{fileName} {
      allow read: if request.auth != null;
      allow write: if request.auth != null
                   && request.resource.size < 10 * 1024 * 1024  // 10MB
                   && request.resource.contentType.matches('image/.*|application/pdf|application/msword|application/vnd.openxmlformats.*');
    }

    // Public assets (logos, etc.) — anyone can read, admin can write
    match /public/{fileName} {
      allow read: if true;
      allow write: if request.auth != null
                   && request.auth.token.role == 'admin';
    }
  }
}
```

### 5.2 — Client-Side Upload Validation

Don't wait for storage rules to reject bad files — validate before uploading:

```typescript
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

function validateFile(file: File): string | null {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return 'File type not allowed. Use JPEG, PNG, WebP, or GIF.';
  }
  if (file.size > MAX_FILE_SIZE) {
    return 'File is too large. Maximum size is 5MB.';
  }
  return null; // valid
}
```

### 5.3 — Image Compression

Compress images client-side before uploading to save storage costs and bandwidth:

```typescript
async function compressImage(file: File, maxWidth = 1200, quality = 0.8): Promise<Blob> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ratio = Math.min(maxWidth / img.width, 1);
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => resolve(blob!), 'image/jpeg', quality);
    };
    img.src = URL.createObjectURL(file);
  });
}
```

---

## 6. Stripe / Payment Security

### 6.1 — The Cardinal Rule

**All payment logic lives in Cloud Functions. The client only creates checkout sessions and handles redirects.**

```typescript
// CLIENT — creates a checkout session (no sensitive data)
const createCheckout = async (priceId: string) => {
  const createSession = httpsCallable(functions, 'createCheckoutSession');
  const { data } = await createSession({ priceId });
  window.location.href = data.url; // Redirect to Stripe
};

// CLOUD FUNCTION — creates the actual session (has Stripe secret)
export const createCheckoutSession = onCall(
  { secrets: [stripeSecret] },
  async (request) => {
    if (!request.auth) throw new HttpsError('unauthenticated', 'Must be logged in');

    const stripe = new Stripe(stripeSecret.value());
    const session = await stripe.checkout.sessions.create({
      customer_email: request.auth.token.email,
      line_items: [{ price: request.data.priceId, quantity: 1 }],
      mode: 'payment',
      success_url: 'https://yourapp.com/success',
      cancel_url: 'https://yourapp.com/cancel',
    });

    return { url: session.url };
  }
);
```

### 6.2 — Webhook Security

Stripe webhooks confirm that payments actually completed. **Always verify the webhook signature:**

```typescript
import { onRequest } from 'firebase-functions/v2/https';

const endpointSecret = defineSecret('STRIPE_WEBHOOK_SECRET');

export const stripeWebhook = onRequest(
  { secrets: [endpointSecret] },
  async (req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;
    try {
      event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret.value());
    } catch (err) {
      res.status(400).send('Webhook signature verification failed');
      return;
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        // Fulfil the order
        break;
      case 'payment_intent.payment_failed':
        // Notify the user
        break;
    }

    res.status(200).send('OK');
  }
);
```

### 6.3 — Price Validation

**Never trust prices from the client.** Always look up the price server-side:

```typescript
// BAD — client sends the price
const { price } = request.data;
await stripe.paymentIntents.create({ amount: price }); // User could send $0

// GOOD — server looks up the price
const { priceId } = request.data;
const price = await stripe.prices.retrieve(priceId); // Stripe is the source of truth
```

---

## 7. Firebase App Check (Optional but Recommended)

App Check verifies that requests to your backend come from your actual app, not from someone using curl or Postman to hit your APIs.

### When to add it:
- Public-facing apps with user registration (iSQROLL)
- Apps with payment processing
- Anything where API abuse would cost you money

### How to set up:
1. Enable App Check in Firebase Console
2. Register your app with reCAPTCHA v3 (web) or Play Integrity (Android)
3. Enforce in Firestore/Storage/Functions

```typescript
// In your Firebase init
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('your-recaptcha-site-key'),
  isTokenAutoRefreshEnabled: true,
});
```

---

## 8. Dependency Security

### 8.1 — npm Audit

Run periodically and before every launch:

```bash
npm audit
npm audit fix
```

**Don't ignore high/critical vulnerabilities.** If `npm audit fix` can't resolve them, check if the vulnerable package is in your direct dependencies or just a transitive dependency.

### 8.2 — Keep Dependencies Updated

- Update Firebase SDK when new versions drop (security patches)
- Update React, Vite, and Tailwind quarterly
- Pin exact versions in `package.json` for production apps (no `^` or `~` for critical deps)

### 8.3 — Lock Files

Always commit `package-lock.json`. It ensures everyone (and every deploy) uses the exact same dependency versions.

---

## Pre-Launch Security Audit Checklist

Run this before any project goes live. Check every item.

### Firestore Rules
```
[ ] No `allow read, write: if true` rules remain
[ ] Default deny rule exists (match /{document=**} allow: false)
[ ] Users cannot modify their own role/tier/permissions fields
[ ] Users can only read/write their own data (or data they're authorised for)
[ ] Data validation exists on write rules (type checking, required fields, size limits)
[ ] Admin-only collections are locked to admin role
[ ] Audit log is append-only (no update/delete)
[ ] Rules tested in Firebase Emulator or Rules Playground
```

### Storage Rules
```
[ ] Default deny rule exists
[ ] File size limits set per path
[ ] File type restrictions set per path (no .exe, .sh, etc.)
[ ] Users can only write to their own paths (where applicable)
[ ] Public paths are read-only for non-admins
```

### Authentication
```
[ ] Password validation enforced (8+ chars, mixed case, number)
[ ] Logout clears all state, listeners, and cached data
[ ] Session timeout implemented for admin portals
[ ] No admin emails/UIDs hardcoded in client code
[ ] Email verification required (if public registration)
```

### Cloud Functions
```
[ ] All callable functions verify auth
[ ] Admin functions verify role
[ ] Input validated with zod or equivalent
[ ] Secrets stored in Firebase Secrets / Secret Manager (not hardcoded)
[ ] HTTP endpoints have rate limiting
[ ] Stripe webhook signature verified
```

### Client-Side
```
[ ] No dangerouslySetInnerHTML with unsanitised user content
[ ] No VITE_ env vars containing secrets
[ ] No console.log of user objects or auth tokens
[ ] URL params validated before use
[ ] Forms have both client-side and server-side validation
[ ] File uploads validated (type + size) before sending
```

### Dependencies
```
[ ] npm audit shows no high/critical vulnerabilities
[ ] package-lock.json committed
[ ] Firebase SDK is reasonably current
```

### General
```
[ ] Firebase config uses environment variables (even though they're public)
[ ] Source maps disabled in production build (vite config: build.sourcemap = false)
[ ] Error messages don't leak internal details to users
[ ] Activity/audit logging in place for admin actions
```

---

## Quick Reference: What Goes Where

| Data | Where | Why |
|------|-------|-----|
| Firebase API key, project ID | `VITE_` env vars or hardcoded | Public identifiers, not secrets |
| Stripe publishable key | `VITE_STRIPE_PUBLISHABLE_KEY` | Designed to be public |
| Stripe secret key | Firebase Secrets (Cloud Functions only) | Never expose to client |
| SendGrid / Twilio API keys | Firebase Secrets (Cloud Functions only) | Never expose to client |
| User roles | Firestore `users` collection + Firestore rules | Server-enforced |
| User roles (high traffic) | Firebase Custom Claims + Firestore rules | No extra reads |
| Payment amounts | Stripe price IDs (server-side lookup) | Never trust client-sent prices |
| File validation | Client-side (UX) + Storage rules (security) | Both layers required |
| Input validation | Client-side (zod/UX) + Firestore rules or Cloud Functions (security) | Both layers required |

---

*Last updated: 2026-03-22*
*Built for the React + TypeScript + Vite + Firebase stack used across Sidequest Digital projects*
