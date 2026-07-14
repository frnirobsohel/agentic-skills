# Project Context (Always-On Core File)

This file defines the **default** tech stack when the user has not specified otherwise. Skip this file for plain HTML/CSS tasks.

## Default Tech Stack (Use these unless the user explicitly says otherwise)

| Layer | Technology | Version |
|---|---|---|
| **Framework** | Next.js (App Router) | 15+ |
| **UI Library** | React | 19+ |
| **Language** | TypeScript | 5+ (strict mode) |
| **Styling** | Tailwind CSS | v4 |
| **Component System** | shadcn/ui | Latest |
| **State (Server)** | TanStack Query | v5 |
| **State (URL)** | nuqs | Latest |
| **State (Global)** | Zustand | Latest |
| **Forms** | React Hook Form + Zod | Latest |
| **Testing** | Vitest + React Testing Library + Playwright | Latest |
| **Build Tool** | Vite (Vite apps) or Turbopack (Next.js) | Latest |
| **Linting/Formatting** | Biome | Latest |
| **Monorepo** | Turborepo (for multi-app projects) | Latest |

## Standard Next.js App Router Folder Structure

Every Next.js project MUST follow this structure:
```text
/src
  /app
    /layout.tsx        (Root layout — fonts, global providers)
    /page.tsx          (Homepage)
    /(routes)          (Route groups for organization)
      /dashboard
        /page.tsx
        /loading.tsx   ← REQUIRED alongside every page.tsx
        /error.tsx     ← REQUIRED alongside every page.tsx
  /components
    /ui                (Raw shadcn/ui primitives — do not modify)
    /shared            (App-wide shared components)
    /features          (Feature-specific components)
  /lib                 (Utilities: cn(), fetchers, date helpers)
  /hooks               (Custom React hooks)
  /types               (Shared TypeScript interfaces and types)
  /actions             (Server Actions — all "use server" files)
  /config              (App config: env validation, constants)
```

## Environment Variables
- Validate ALL environment variables at startup using Zod in `/config/env.ts`.
- Never access `process.env` directly in components. Always import from the validated config.

## Deployment Target
- Default: Vercel
- Always call `revalidatePath()` or `revalidateTag()` after every Server Action mutation.
