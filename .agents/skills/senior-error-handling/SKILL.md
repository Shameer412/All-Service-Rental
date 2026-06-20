---
name: senior-error-handling
description: Graceful error handling — AppError class, contextual logging, user-friendly messages, API route patterns.
---

# Error Handling — Graceful, Logged, User-Friendly

## The Three Rules
1. **Never** swallow errors silently (`catch (e) {}`).
2. **Always** log with context: `console.error("[functionName]", { userId, input }, error)`.
3. **Always** return a user-friendly message — never expose stack traces or DB errors to clients.

## Standard Pattern
```typescript
// Service Layer
export async function getVendorTrucks(vendorId: string): Promise<Truck[]> {
  try {
    return await prisma.truck.findMany({
      where: { vendorId },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("[getVendorTrucks]", { vendorId }, error);
    throw new AppError("Failed to fetch trucks", "TRUCK_FETCH_ERROR");
  }
}

// Custom error class — src/lib/errors.ts
export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
  ) {
    super(message);
    this.name = "AppError";
  }
}
```

## API Route Error Handling
```typescript
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // ... logic
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("[GET /api/endpoint]", error);

    if (error instanceof AppError) {
      return NextResponse.json(
        { success: false, error: error.message, code: error.code },
        { status: error.statusCode },
      );
    }

    return NextResponse.json(
      { success: false, error: "Internal server error", code: "INTERNAL_ERROR" },
      { status: 500 },
    );
  }
}
```
