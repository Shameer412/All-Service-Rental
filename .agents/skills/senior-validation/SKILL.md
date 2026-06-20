---
name: senior-validation
description: Zod validation rules — shared schemas between client (React Hook Form) and server (Server Actions/API).
---

# Validation — Trust Nothing

## Zod Schema Rules
- **Every** user input (forms, query params, API bodies) MUST be validated with Zod.
- Place schemas in `src/lib/validations/<domain>.ts`.
- Schemas must be **shared** between client (React Hook Form) and server (Server Actions/API).

```typescript
// src/lib/validations/truck.ts
import { z } from "zod";

export const truckSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100),
  type: z.enum(["BOX_TRUCK", "FLATBED", "REFRIGERATED", "DUMP_TRUCK", "SEMI_TRUCK", "MOVING_VAN"]),
  year: z.coerce.number().int().min(1990).max(new Date().getFullYear() + 1),
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  dailyRate: z.coerce.number().positive("Daily rate must be positive"),
  weeklyRate: z.coerce.number().positive("Weekly rate must be positive"),
  monthlyRate: z.coerce.number().positive("Monthly rate must be positive"),
  city: z.string().min(1),
  state: z.string().length(2, "Use 2-letter state code"),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, "Invalid ZIP code"),
  description: z.string().min(20, "Description must be at least 20 characters"),
});

export type TruckInput = z.infer<typeof truckSchema>;
```

## React Hook Form Integration
```typescript
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { truckSchema, type TruckInput } from "@/lib/validations/truck";

export function TruckForm() {
  const form = useForm<TruckInput>({
    resolver: zodResolver(truckSchema),
    defaultValues: { type: "BOX_TRUCK" },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const result = await addTruckAction(data);
    if (!result.success) {
      toast.error(result.error);
      return;
    }
    toast.success("Truck added successfully!");
  });

  return <form onSubmit={onSubmit}>...</form>;
}
```
