---
name: senior-typescript
description: Zero-tolerance TypeScript strictness rules — no any, explicit types, discriminated unions, const enums.
---

# TypeScript — Zero Tolerance for Weakness

## Strictness
- `strict: true` is already enabled in `tsconfig.json`. **Never** disable it.
- **Absolutely NEVER** use `any`. Use `unknown` + type narrowing, or create a proper type.
- **Never** use `// @ts-ignore` or `// @ts-expect-error` without a linked issue explaining why.
- **Never** use non-null assertions (`!`) unless you can mathematically prove it's safe.

## Typing Patterns
```typescript
// ✅ CORRECT: Explicit return types on all exported functions
export function calculateCommission(rental: number, rate: number): number {
  return rental * rate;
}

// ✅ CORRECT: Discriminated unions for API responses
interface SuccessResponse<T> {
  success: true;
  data: T;
}
interface ErrorResponse {
  success: false;
  error: string;
  code: string;
}
type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

// ✅ CORRECT: Use `interface` for objects, `type` for unions/intersections
interface TruckFilters {
  type?: TruckType;
  city?: string;
  minRate?: number;
  maxRate?: number;
}

// ❌ WRONG: Untyped object, implicit any
const filters = {};
const data: any = await fetch(...);
```

## Enums & Constants
- Mirror Prisma enums in TypeScript using `as const` objects for runtime safety:
```typescript
export const TRUCK_STATUS = {
  AVAILABLE: "AVAILABLE",
  RENTED: "RENTED",
  MAINTENANCE: "MAINTENANCE",
  UNAVAILABLE: "UNAVAILABLE",
} as const;
export type TruckStatus = (typeof TRUCK_STATUS)[keyof typeof TRUCK_STATUS];
```
