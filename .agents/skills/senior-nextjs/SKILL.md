---
name: senior-nextjs
description: Next.js 16 App Router patterns — RSC-first, Server Actions, error/loading boundaries, SEO metadata.
---

# Next.js 16 App Router — Framework Mastery

## Server Components First
- **Default** every component to RSC (no directive). Only add `"use client"` when you need:
  - `useState`, `useEffect`, `useRef`, or any React hook
  - Event handlers (`onClick`, `onChange`, etc.)
  - Browser APIs (`window`, `document`, `localStorage`)
- **Never** mark a layout or page as `"use client"` unless absolutely necessary. Push interactivity to the smallest leaf component.

## Data Fetching
```typescript
// ✅ CORRECT: Fetch in the Server Component where data is consumed
export default async function TrucksPage() {
  const trucks = await getTrucksByVendor(vendorId);
  return <TruckList trucks={trucks} />;
}

// ❌ WRONG: Fetching in a client component via useEffect
"use client";
export default function TrucksPage() {
  const [trucks, setTrucks] = useState([]);
  useEffect(() => { fetch("/api/trucks").then(...) }, []); // NO!
}
```

## Server Actions (preferred over API routes)
```typescript
"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { truckSchema } from "@/lib/validations/truck";
import { createTruck } from "@/lib/services/truck";

export async function addTruckAction(formData: FormData): Promise<ApiResponse<Truck>> {
  try {
    const raw = Object.fromEntries(formData);
    const parsed = truckSchema.safeParse(raw);

    if (!parsed.success) {
      return { success: false, error: parsed.error.message, code: "VALIDATION_ERROR" };
    }

    const truck = await createTruck(parsed.data);
    revalidatePath("/vendor/trucks");
    return { success: true, data: truck };
  } catch (error) {
    console.error("[addTruckAction]", error);
    return { success: false, error: "Failed to add truck", code: "INTERNAL_ERROR" };
  }
}
```

## Error & Loading Boundaries
- **Every** route segment MUST have:
  - `loading.tsx` — shows a skeleton/spinner during async loading
  - `error.tsx` — catches runtime errors with a friendly UI and retry button
  - `not-found.tsx` — for invalid dynamic routes
```typescript
"use client";
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      <h2 className="text-xl font-semibold text-red-400">Something went wrong</h2>
      <p className="text-gray-400">{error.message}</p>
      <button onClick={reset} className="px-4 py-2 bg-blue-600 rounded-lg">
        Try Again
      </button>
    </div>
  );
}
```

## Metadata & SEO
- **Every** page MUST export `metadata` or `generateMetadata()`:
```typescript
export const metadata: Metadata = {
  title: "Fleet Management | All Service Rental",
  description: "Manage your truck fleet, track maintenance, and monitor performance.",
};
```
