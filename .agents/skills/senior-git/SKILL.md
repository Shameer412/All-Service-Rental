---
name: senior-git
description: Git workflow — conventional commits, pre-commit checklist, code quality gates.
---

# Git & Code Quality

## Commit Messages
Follow Conventional Commits:
```
feat(vendor): add truck listing form with Zod validation
fix(payment): handle Authorize.net timeout gracefully
refactor(auth): extract session helper into lib/auth
test(truck): add validation schema unit tests
```

## Pre-Commit Checklist
Before every commit, verify:
- [ ] `npm run lint` passes with zero errors
- [ ] `npm run build` completes successfully
- [ ] All new code has explicit TypeScript types
- [ ] No `any`, `@ts-ignore`, or `console.log` (use `console.error` for errors only)
- [ ] Every form has Zod validation on both client and server
- [ ] Every protected action checks auth + ownership
- [ ] New UI components are responsive (test at 375px, 768px, 1280px)
- [ ] No hardcoded strings — use constants or env vars
