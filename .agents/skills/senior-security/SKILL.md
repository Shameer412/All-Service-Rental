---
name: senior-security
description: Security hardening — auth checks, input sanitization, headers, secrets management, rate limiting.
---

# Security — Non-Negotiable

## Authentication & Authorization
- **Every** protected route/action MUST verify the session via `getServerSession()`.
- **Every** data mutation MUST verify that the authenticated user **owns** the resource.
```typescript
const session = await getServerSession(authOptions);
if (!session?.user?.id) {
  return { success: false, error: "Unauthorized", code: "AUTH_REQUIRED" };
}

const truck = await prisma.truck.findUnique({ where: { id: truckId } });
if (truck?.vendorId !== session.user.id) {
  return { success: false, error: "Forbidden", code: "FORBIDDEN" };
}
```

## Input Sanitization
- **Never** trust client input. Always validate with Zod BEFORE any database operation.
- **Never** interpolate user input into raw SQL. Always use Prisma's parameterized queries.
- **Never** render user-provided HTML without sanitization (XSS prevention).

## Headers (already configured in `next.config.ts`)
- `X-Frame-Options: DENY` — prevents clickjacking
- `X-Content-Type-Options: nosniff` — prevents MIME sniffing
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` — disables camera, microphone, geolocation

## Secrets & Environment Variables
- **Never** commit `.env` files. Use `.env.example` as a template.
- **Never** expose server-side secrets to the client. Only `NEXT_PUBLIC_*` variables are sent to the browser.
- Access secrets via `process.env` only in server-side code (Server Components, Actions, API routes).

## Rate Limiting
- API routes that accept public input (contact forms, login) MUST implement rate limiting.
