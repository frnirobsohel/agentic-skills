---
name: frontend-agentic-skills
description: >-
  Develops and reviews React/Next.js/TypeScript web apps with strict coding standards and performance.
  Use when the user mentions frontend, react, next.js, tailwind, css, html, javascript, typescript,
  components, state management, web vitals, server actions, or gen-ui.
version: 1.0.0
metadata:
  category: Frontend
  priority: High
triggers:
  keywords:
    - frontend
    - react
    - next.js
    - nextjs
    - tailwind
    - css
    - html
    - javascript
    - typescript
    - web app
    - client-side
    - state management
    - component
    - web vitals
    - rsc
    - gen-ui
    - server action

# Frontend Production Playbook (Legendary Level)

## Mission
Act as a top 1% frontend engineer. You MUST enforce strict coding standards, type safety, and performance. Always consult the relevant reference file before writing any code.

## Priority Table

| Priority | Category | Impact | Must-Have Checks |
|----------|----------|--------|-----------------|
| 1 | Performance & Web Vitals | CRITICAL | LCP < 2.5s, CLS < 0.1, INP < 200ms |
| 2 | RSC Architecture | CRITICAL | `"use client"` only at leaf nodes, no data waterfalls |
| 3 | Type Safety | HIGH | Strict TypeScript, no `any`, no default exports |
| 4 | Naming Conventions | HIGH | `handleClick`, `isLoading`, `UserCardProps` — see coding-standards.md |
| 5 | Technical & Programmatic Accessibility (Implementation-time) | HIGH | Semantic HTML, ARIA attributes (roles/live/busy), focus trapping, keyboard handlers |
| 6 | Security & Observability | HIGH | Zod validation, Error Boundaries, Sentry |

---

## Core Files (load based on task type)

| File | Load when |
| :--- | :--- |
| `references/project-context.md` | Next.js/React/TypeScript app work — **skip for plain HTML/CSS-only tasks** |
| `references/coding-standards.md` | Writing or reviewing TypeScript/React code — **skip for plain HTML/CSS-only tasks** |

## Task-Based Reference Files (load 1–2 per task)

| File | Load when |
| :--- | :--- |
| `references/nextjs-conventions.md` | Next.js 15, App Router, Server Actions, caching |
| `references/architecture.md` | Monorepo, Feature-Sliced Design, RSC patterns |
| `references/state-management.md` | React Query, Zustand, nuqs, URL state |
| `references/components-css.md` | Components, Tailwind CVA, CSS patterns |
| `references/performance-testing.md` | Web Vitals, Vitest, Playwright, observability |
| `references/gen-ui.md` | AI streaming UI, Vercel AI SDK |

Full index: `references/README.md`

## Cross-Skill Rule

For visual design, spacing, color, or design-time accessibility requirements (contrast ratios, focus ring styling, touch targets) → load **UI/UX Playbook** (`skills/uiux/SKILL.md`), not duplicate those rules here. Use this playbook for programmatic/technical accessibility implementation (semantic tags, screen reader attributes, focus traps, keyboard handlers).

---

## Pre-Flight Checklist (Before Finishing Any Task)
- [ ] Loaded only task-relevant reference files (not the entire `references/` folder)?
- [ ] For React/TS tasks: read `project-context.md` and `coding-standards.md`?
- [ ] Naming conventions followed (`handleX`, `isX`, `UserCardProps`)?
- [ ] No default exports (React/TS components)?
- [ ] `"use client"` only at leaf nodes (Next.js tasks)?
- [ ] UI verified against **UI/UX Playbook** (`skills/uiux/SKILL.md`) when visual design is involved?
