---
name: senior-performance
description: Performance rules — dynamic imports, pagination, bundle size, database indexing.
---

# Performance — Fast by Default

## Next.js Optimizations
- Use `React.lazy()` and `next/dynamic` for heavy client components (Recharts, Swiper, DatePicker).
- Use `loading.tsx` skeletons to prevent layout shift.
- Leverage React Compiler (`reactCompiler: true` in prod) — avoid manual `useMemo`/`useCallback` unless profiling shows a bottleneck.

## Database Performance
- **Always** add `@@index` for fields used in `WHERE`, `ORDER BY`, or `JOIN` clauses.
- **Always** paginate large lists with `take` + `skip` or cursor-based pagination.
- **Never** fetch all records without a limit: `findMany()` without `take` is banned.

## Bundle Size
- **Never** import entire libraries: `import _ from "lodash"` → use `import groupBy from "lodash/groupBy"`.
- **Always** use `lucide-react` tree-shaking: `import { Truck } from "lucide-react"`, never the whole package.
