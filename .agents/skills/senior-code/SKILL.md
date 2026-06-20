---
name: senior-code
description: Core architecture rules, folder conventions, and banned patterns for the All Service Rental platform.
---

# Senior Code Standards — All Service Rental

> **Golden Rule:** Every line of code must be intentional, secure, tested, and maintainable.  
> If you are unsure whether something is "good enough," it is not. Raise the bar.

---

## Project Architecture & Folder Convention

```
src/
├── app/                    # Next.js App Router (pages, layouts, loading, error)
│   ├── (auth)/             # Auth route group
│   ├── (customer)/         # Customer-facing route group
│   ├── (marketing)/        # Marketing/public route group
│   ├── admin/              # Admin dashboard
│   ├── vendor/             # Vendor dashboard
│   ├── api/                # API Routes (only when Server Actions won't work)
│   ├── layout.tsx          # Root layout
│   └── global.css          # Global styles
├── components/
│   ├── ui/                 # Atomic, reusable primitives (Button, Input, Modal, etc.)
│   ├── common/             # Shared composed components (AuthProvider, ToastProvider)
│   ├── layout/             # Layout shells (Sidebar, Header, Footer)
│   ├── pages/              # Page-specific composite components
│   ├── dashboard/          # Dashboard widgets
│   └── data/               # Static data / config arrays
├── lib/
│   ├── db.ts               # Singleton Prisma client (MUST exist)
│   ├── auth.ts             # NextAuth config & helpers
│   ├── utils.ts            # Pure utility functions (cn, formatCurrency, etc.)
│   ├── constants.ts        # App-wide constants & enums
│   ├── validations/        # Zod schemas (one file per domain)
│   └── services/           # Business logic layer (one file per domain)
├── hooks/                  # Custom React hooks
├── types/                  # TypeScript interfaces & type definitions
├── config/                 # Environment, feature flags, app config
└── __tests__/              # Test files mirroring src/ structure
```

### Rules
- **Never** put business logic inside page components or API routes. Extract it into `lib/services/`.
- **Never** create "god files." A single file must not exceed **250 lines**. A single component must not exceed **150 lines**. Split ruthlessly.
- **Never** import from `../../../`. Always use the `@/` path alias.
- Group route segments with `(groupName)` for layout isolation without affecting URLs.

---

## Quick Reference: Banned Patterns

| ❌ Banned | ✅ Replacement |
|-----------|----------------|
| `any` | `unknown` + type narrowing |
| `@ts-ignore` | Fix the type or create a proper interface |
| `console.log` in production | `console.error` with context for errors only |
| `useEffect` for data fetching | Server Component + async function |
| Unvalidated `req.body` | `schema.safeParse(body)` |
| `findMany()` without `take` | Always paginate with `take` / cursor |
| Raw SQL string interpolation | Prisma parameterized queries |
| `catch (e) {}` (empty catch) | Log with context + return error response |
| Inline magic numbers | Named constants in `lib/constants.ts` |
| `fetch("/api/...")` from client component | Server Action |
| God component (300+ lines) | Split into sub-components |
