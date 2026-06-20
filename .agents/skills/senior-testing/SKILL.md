---
name: senior-testing
description: Testing strategy — Vitest, RTL, Playwright, what must be tested, test patterns, file naming.
---

# Testing — Ship with Confidence

## Testing Strategy
| Layer           | Tool           | Coverage Target |
|-----------------|----------------|-----------------|
| Unit Tests      | Vitest         | Utility functions, Zod schemas, services |
| Component Tests | Vitest + RTL   | Interactive UI components |
| Integration     | Vitest         | Server Actions, API routes |
| E2E             | Playwright     | Critical user flows |

## What MUST Be Tested
- ✅ Every Zod validation schema (valid + invalid inputs)
- ✅ Every service function in `lib/services/`
- ✅ Every Server Action (success + error + auth paths)
- ✅ Every custom hook
- ✅ Form components (submission, validation errors, loading states)
- ✅ Critical user flows E2E: signup → login → book truck → payment

## Test File Naming
```
src/lib/validations/truck.ts       → src/__tests__/lib/validations/truck.test.ts
src/lib/services/truck.ts          → src/__tests__/lib/services/truck.test.ts
src/components/ui/Button.tsx       → src/__tests__/components/ui/Button.test.tsx
```

## Test Patterns
```typescript
import { describe, it, expect } from "vitest";
import { truckSchema } from "@/lib/validations/truck";

describe("truckSchema", () => {
  it("accepts valid truck data", () => {
    const valid = {
      title: "2024 Freightliner Box Truck",
      type: "BOX_TRUCK",
      year: 2024,
      make: "Freightliner",
      model: "M2 106",
      dailyRate: 150,
      weeklyRate: 900,
      monthlyRate: 3200,
      city: "Houston",
      state: "TX",
      zipCode: "77001",
      description: "Well-maintained box truck perfect for local deliveries and moving.",
    };
    expect(truckSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects negative daily rate", () => {
    const invalid = { ...validTruck, dailyRate: -50 };
    const result = truckSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it("rejects invalid zip code", () => {
    const invalid = { ...validTruck, zipCode: "ABC" };
    const result = truckSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });
});
```
