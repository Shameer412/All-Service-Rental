---
name: senior-state
description: Zustand state management rules — one store per domain, client-only UI state, typed stores.
---

# State Management — Zustand + React Patterns

## Zustand Store Rules
- One store per domain: `useAuthStore`, `useFleetStore`, `useBookingStore`.
- **Never** put server-fetched data in Zustand. That belongs in RSC or React Query.
- Use Zustand only for **client-side UI state** (filters, modals, sidebar toggle, wizard step).

```typescript
// ✅ CORRECT: Focused, typed Zustand store
import { create } from "zustand";

interface FleetFilterState {
  type: TruckType | null;
  city: string;
  priceRange: [number, number];
  setType: (type: TruckType | null) => void;
  setCity: (city: string) => void;
  setPriceRange: (range: [number, number]) => void;
  reset: () => void;
}

export const useFleetFilters = create<FleetFilterState>((set) => ({
  type: null,
  city: "",
  priceRange: [0, 10000],
  setType: (type) => set({ type }),
  setCity: (city) => set({ city }),
  setPriceRange: (priceRange) => set({ priceRange }),
  reset: () => set({ type: null, city: "", priceRange: [0, 10000] }),
}));
```
