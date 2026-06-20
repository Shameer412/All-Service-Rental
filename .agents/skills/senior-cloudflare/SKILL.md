---
name: senior-cloudflare
description: Cloudflare Workers edge deployment rules — Web Standard APIs, worker size limits, no Node.js APIs.
---

# Cloudflare Workers / Edge Deployment

- **No Node.js-only APIs** in edge routes (no `fs`, no `path`, no `crypto` from Node).
- Use Web Standard APIs: `fetch`, `Request`, `Response`, `URL`, `crypto.subtle`.
- Keep server action / API route bundles small — Cloudflare has a 1MB worker size limit.
- Test with `npm run build:cf` before deploying to catch edge incompatibilities early.
