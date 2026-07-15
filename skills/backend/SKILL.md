---
name: backend-integration
description: >-
  Connects backend systems, APIs, and databases with frontend client-side state and UI/UX layouts.
  Use when the user mentions backend, backend integration, api integration, fullstack, data fetching, api contract, state sync, backend-frontend, or api connection.
version: 1.0.0
metadata:
  category: Backend
  priority: High
triggers:
  keywords:
    - backend integration
    - api integration
    - fullstack
    - data fetching
    - api contract
    - state sync
    - backend-frontend
    - frontend-backend
    - api connection
    - client-server
---

# Backend & Fullstack Integration Playbook

## Mission
Act as a Lead Fullstack Architect. Bridge backend databases and business logic with frontend state managers and design systems. Prioritize type-safety across boundaries, standard client-server contracts (REST/GraphQL), robust client-side state synchronization, explicit error boundaries mapping database violations to friendly UI states, and secure token lifecycle management.

## Priority Table

| Priority | Category | Impact | Must-Have Checks | Anti-Patterns (Avoid) |
|----------|----------|--------|------------------|-----------------------|
| 1 | API Contracts & Type Safety | CRITICAL | Shared TypeScript/Pydantic types, schema-first design, code-gen or tRPC | Ad-hoc payload changes, typing API responses as `any` |
| 2 | Error & Form Validation | CRITICAL | RFC 7807 problem details, validator mapping directly to form input UI states | generic 500 error alerts, ignoring specific field errors |
| 3 | State Synchronization & Caching | HIGH | Cache key invalidation, stale-while-revalidate (TanStack Query/SWR) | Manually syncing local state in global stores without refetch keys |
| 4 | Optimistic Updates | HIGH | Rollback mechanisms, client UI responding instantly to mutations | Stalled UI waiting for network roundtrips on simple tasks |
| 5 | Session & Auth Syncing | HIGH | Secure httpOnly cookie token storage, JWT silent refresh rotation | Storing plain JWTs in localStorage, unauthenticated UI flash |
| 6 | Realtime state | MEDIUM | Connection lifecycles, message rate limits, reconnection reconciliation | Uncontrolled state updates on socket stream, memory leaks |

---

## Core Reference Files (load based on task)

| File | Load when |
| :--- | :--- |
| `references/api-contracts-types.md` | Designing REST/GraphQL endpoints, contract-first specs, type synchronization |
| `references/error-handling-forms.md` | Designing field validation errors, RFC 7807 payload structures, mapping errors to form inputs |
| `references/state-sync-caching.md` | Implementing React Query/SWR hooks, optimistic UI state, pagination caching |
| `references/auth-session.md` | Setting up login/auth flows, silent JWT refresh, httpOnly cookies, secure routing |
| `templates/api-contract.md.template` | Documenting new endpoint schemas, request headers, payload shapes, and status codes |
| `templates/error-map-spec.md.template` | Building error-to-UI input mapping specifications for a complex form |

Full index: `references/README.md`

## Cross-Skill Rule
- For language-specific backend implementations: Load **Go Playbook** (`skills/go/SKILL.md`), **Python Playbook** (`skills/python/SKILL.md`), **PHP Playbook** (`skills/php/SKILL.md`), or **Rust Playbook** (`skills/rust/SKILL.md`).
- For client-side UI component development, client routing, or bundlers: Load **Frontend Playbook** (`skills/frontend/SKILL.md`).
- For CSS styling, brand theme design, layout grid, or accessibility: Load **UI/UX Playbook** (`skills/uiux/SKILL.md`).

---

## Pre-Flight Checklist
- [ ] API contract designed and shared using schemas (OpenAPI/GraphQL/tRPC)?
- [ ] Database field validation errors mapped to UI inputs?
- [ ] UI states for data fetching defined (Loading, Success, Empty, Error)?
- [ ] Optimistic update rollback logic defined for user interaction mutations?
- [ ] JWT refresh flow runs silently without disrupting user sessions?
- [ ] Authentication state synced between cookies/local context and routing middlewares?
